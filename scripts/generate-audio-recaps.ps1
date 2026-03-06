param(
    [string[]]$Languages = @('EN', 'AF', 'XH', 'ZU'),
    [switch]$Overwrite,
    [int]$MaxWords = 165,
    [int]$SpeechRate = 1,
    [string]$RootPath = (Get-Location).Path,
    [ValidateSet('Local', 'Azure')]
    [string]$Provider = 'Local'
)

$ErrorActionPreference = 'Stop'

# Normalize language input so both "AF,XH,ZU" and "AF XH ZU" styles work.
if ($Languages.Count -eq 1 -and $Languages[0] -match ',') {
    $Languages = $Languages[0].Split(',') | ForEach-Object { $_.Trim() } | Where-Object { $_ }
}

function Remove-MarkdownArtifacts {
    param([string]$Text)

    $clean = [regex]::Replace($Text, '(?s)```.*?```', ' ')
    $clean = [regex]::Replace($clean, '!\[[^\]]*\]\(([^\)]*)\)', ' ')
    $clean = [regex]::Replace($clean, '\[([^\]]+)\]\(([^\)]+)\)', '$1')
    $clean = [regex]::Replace($clean, '(?m)^\s*\|?\s*[-:]{3,}.*$', ' ')
    $clean = [regex]::Replace($clean, '(?m)^\s*>\s*', '')
    $clean = $clean -replace '(?m)^\s{0,3}#{1,6}\s*', ''
    $clean = $clean -replace '(?m)^\s*[-*+]\s+', ''
    $clean = $clean -replace '(?m)^\s*\d+\.\s+', ''
    $clean = $clean -replace '(?m)^\s*\|', ''
    $clean = $clean -replace '\|', ' '
    $clean = $clean -replace '[*_`~]', ''
    return [regex]::Replace($clean, '\s+', ' ').Trim()
}

function Get-Words {
    param([string]$Text)

    if ([string]::IsNullOrWhiteSpace($Text)) {
        return @()
    }

    return ($Text -split '\s+' | Where-Object { $_ -and $_.Trim().Length -gt 0 })
}

function Truncate-ByWords {
    param(
        [string]$Text,
        [int]$Limit
    )

    $words = Get-Words -Text $Text
    if ($words.Count -le $Limit) {
        return $Text.Trim()
    }

    return (($words | Select-Object -First $Limit) -join ' ').TrimEnd('.', ',', ';', ':') + '.'
}

function Get-RequiredCulturePrefix {
    param([string]$LanguageCode)

    $map = @{
        'EN' = 'en-'
        'AF' = 'af-'
        'XH' = 'xh-'
        'ZU' = 'zu-'
    }

    if (-not $map.ContainsKey($LanguageCode)) {
        throw "Unsupported language code '$LanguageCode'. Supported values: $($map.Keys -join ', ')."
    }

    return $map[$LanguageCode]
}

function Get-LocaleForLanguage {
    param([string]$LanguageCode)

    $map = @{
        'EN' = 'en-US'
        'AF' = 'af-ZA'
        'XH' = 'xh-ZA'
        'ZU' = 'zu-ZA'
    }

    if (-not $map.ContainsKey($LanguageCode)) {
        throw "Unsupported language code '$LanguageCode'. Supported values: $($map.Keys -join ', ')."
    }

    return $map[$LanguageCode]
}

function Get-VoiceOverrideFromEnv {
    param([string]$LanguageCode)

    $name = "AZURE_SPEECH_VOICE_{0}" -f $LanguageCode
    return [Environment]::GetEnvironmentVariable($name)
}

function Get-AzureSpeechToken {
    param(
        [string]$Region,
        [string]$ApiKey
    )

    $tokenUri = "https://{0}.api.cognitive.microsoft.com/sts/v1.0/issueToken" -f $Region
    $headers = @{ 'Ocp-Apim-Subscription-Key' = $ApiKey }
    return Invoke-RestMethod -Method Post -Uri $tokenUri -Headers $headers
}

function Get-AzureSpeechVoices {
    param(
        [string]$Region,
        [string]$Token
    )

    $uri = "https://{0}.tts.speech.microsoft.com/cognitiveservices/voices/list" -f $Region
    $headers = @{ 'Authorization' = "Bearer $Token" }
    return Invoke-RestMethod -Method Get -Uri $uri -Headers $headers
}

function Resolve-AzureVoice {
    param(
        [string]$LanguageCode,
        [string]$Locale,
        [object[]]$Voices
    )

    $override = Get-VoiceOverrideFromEnv -LanguageCode $LanguageCode
    if (-not [string]::IsNullOrWhiteSpace($override)) {
        $match = $Voices | Where-Object { $_.ShortName -eq $override } | Select-Object -First 1
        if (-not $match) {
            throw "Voice override '$override' for language '$LanguageCode' was not found in Azure voice list."
        }
        return $match
    }

    $preferred = $Voices | Where-Object { $_.Locale -eq $Locale -and $_.ShortName -match 'Neural' } | Select-Object -First 1
    if ($preferred) { return $preferred }

    $fallback = $Voices | Where-Object { $_.Locale -eq $Locale } | Select-Object -First 1
    if ($fallback) { return $fallback }

    throw "No Azure voice found for locale '$Locale' (language '$LanguageCode')."
}

function Invoke-AzureSpeechSynthesis {
    param(
        [string]$Region,
        [string]$Token,
        [string]$Locale,
        [string]$VoiceName,
        [string]$Text,
        [string]$OutputPath
    )

    $escapedText = [System.Security.SecurityElement]::Escape($Text)
    $ssml = @"
<speak version='1.0' xml:lang='$Locale'>
  <voice name='$VoiceName'>$escapedText</voice>
</speak>
"@

    $uri = "https://{0}.tts.speech.microsoft.com/cognitiveservices/v1" -f $Region
    $headers = @{
        'Authorization' = "Bearer $Token"
        'Content-Type' = 'application/ssml+xml'
        'X-Microsoft-OutputFormat' = 'riff-24khz-16bit-mono-pcm'
        'User-Agent' = 'AIContentAuthoring-AudioGenerator'
    }

    Invoke-RestMethod -Method Post -Uri $uri -Headers $headers -Body $ssml -OutFile $OutputPath
}

function Build-PodcastScript {
    param(
        [string]$Title,
        [string]$PlainText,
        [int]$WordLimit
    )

    $sentences = [regex]::Split($PlainText, '(?<=[\.!\?])\s+') | Where-Object { $_.Trim().Length -gt 25 }
    $picked = @()

    foreach ($sentence in $sentences) {
        $picked += (Truncate-ByWords -Text $sentence.Trim() -Limit 26)
        if ($picked.Count -ge 4) {
            break
        }
    }

    if ($picked.Count -eq 0) {
        $picked = @('This update highlights the major developments and what to watch next for households, businesses, and policy.')
    }

    $script = @(
        "Welcome to the quick podcast recap of $Title."
        'Here are the top takeaways.'
        ($picked -join ' ')
        'Bottom line: this report shows where momentum is improving, where risks remain, and what to monitor next.'
        'Thanks for listening.'
    ) -join ' '

    return Truncate-ByWords -Text $script -Limit $WordLimit
}

$useAzure = $Provider -eq 'Azure'

$synth = $null
$installedVoices = @()
$azureRegion = $null
$azureApiKey = $null
$azureToken = $null
$azureTokenIssuedAt = $null
$azureVoices = @()

if ($useAzure) {
    $azureRegion = [Environment]::GetEnvironmentVariable('AZURE_SPEECH_REGION')
    $azureApiKey = [Environment]::GetEnvironmentVariable('AZURE_SPEECH_KEY')

    if ([string]::IsNullOrWhiteSpace($azureRegion) -or [string]::IsNullOrWhiteSpace($azureApiKey)) {
        throw 'Azure provider requires AZURE_SPEECH_REGION and AZURE_SPEECH_KEY environment variables.'
    }

    $azureToken = Get-AzureSpeechToken -Region $azureRegion -ApiKey $azureApiKey
    $azureTokenIssuedAt = Get-Date
    $azureVoices = @(Get-AzureSpeechVoices -Region $azureRegion -Token $azureToken)
    if (-not $azureVoices -or $azureVoices.Count -eq 0) {
        throw 'Azure voice list is empty. Verify speech resource and region settings.'
    }
}
else {
    Add-Type -AssemblyName System.Speech
    $synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
    $synth.Rate = $SpeechRate
    $synth.Volume = 100

    $installedVoices = $synth.GetInstalledVoices() | ForEach-Object {
        [pscustomobject]@{
            Name = $_.VoiceInfo.Name
            Culture = $_.VoiceInfo.Culture.Name
        }
    }
}

$generated = @()
$skipped = @()

try {
    foreach ($lang in $Languages) {
        $code = $lang.ToUpperInvariant()
        $culturePrefix = Get-RequiredCulturePrefix -LanguageCode $code
        $locale = Get-LocaleForLanguage -LanguageCode $code

        $voiceDisplay = ''
        $localVoiceName = $null
        $azureVoiceName = $null

        if ($useAzure) {
            $selectedAzureVoice = Resolve-AzureVoice -LanguageCode $code -Locale $locale -Voices $azureVoices
            $azureVoiceName = $selectedAzureVoice.ShortName
            $voiceDisplay = "{0} [{1}]" -f $selectedAzureVoice.ShortName, $selectedAzureVoice.Locale
        }
        else {
            $matchingVoices = $installedVoices | Where-Object { $_.Culture.StartsWith($culturePrefix, [System.StringComparison]::OrdinalIgnoreCase) }
            if (-not $matchingVoices -or $matchingVoices.Count -eq 0) {
                $available = ($installedVoices | ForEach-Object { "{0} ({1})" -f $_.Name, $_.Culture }) -join ', '
                throw "No installed voice for language '$code' requiring culture prefix '$culturePrefix'. Available voices: $available"
            }

            $selectedVoice = $matchingVoices | Select-Object -First 1
            $localVoiceName = $selectedVoice.Name
            $voiceDisplay = "{0} [{1}]" -f $selectedVoice.Name, $selectedVoice.Culture
            $synth.SelectVoice($localVoiceName)
        }

        $langDir = Join-Path $RootPath ("www/$code")
        if (-not (Test-Path $langDir)) {
            Write-Warning "Skipping missing folder: $langDir"
            continue
        }

        $markdownFiles = Get-ChildItem $langDir -File -Filter '*.md'
        foreach ($md in $markdownFiles) {
            $slug = [System.IO.Path]::GetFileNameWithoutExtension($md.Name)
            $outputPath = Join-Path $langDir ("$slug-audio.wav")

            if ((-not $Overwrite) -and (Test-Path $outputPath)) {
                $skipped += [pscustomobject]@{ Lang = $code; File = $md.Name; Reason = 'Audio already exists' }
                continue
            }

            $raw = Get-Content $md.FullName -Raw
            $plain = Remove-MarkdownArtifacts -Text $raw

            $titleLine = ((Get-Content $md.FullName | Where-Object { $_ -match '^\s*#\s+' } | Select-Object -First 1) -replace '^\s*#\s+', '').Trim()
            if ([string]::IsNullOrWhiteSpace($titleLine)) {
                $titleLine = ($slug -replace '-', ' ')
            }

            $script = Build-PodcastScript -Title $titleLine -PlainText $plain -WordLimit $MaxWords

            if ($useAzure) {
                $now = Get-Date
                if (($now - $azureTokenIssuedAt).TotalMinutes -ge 8) {
                    $azureToken = Get-AzureSpeechToken -Region $azureRegion -ApiKey $azureApiKey
                    $azureTokenIssuedAt = $now
                }

                Invoke-AzureSpeechSynthesis -Region $azureRegion -Token $azureToken -Locale $locale -VoiceName $azureVoiceName -Text $script -OutputPath $outputPath
            }
            else {
                $synth.SetOutputToWaveFile($outputPath)
                $synth.Speak($script)
            }

            $generated += [pscustomobject]@{
                Lang = $code
                Markdown = $md.Name
                Audio = [System.IO.Path]::GetFileName($outputPath)
                Voice = $voiceDisplay
                ScriptWords = (Get-Words -Text $script).Count
                Provider = $Provider
            }
        }
    }
}
finally {
    if ($synth) {
        $synth.Dispose()
    }
}

if ($generated.Count -gt 0) {
    Write-Host 'Generated audio files:'
    $generated | Sort-Object Lang, Markdown | Format-Table -AutoSize
}

if ($skipped.Count -gt 0) {
    Write-Host "\nSkipped files:"
    $skipped | Sort-Object Lang, File | Format-Table -AutoSize
}
