# Central Bank Content Portal - Updates

## Overview
The AI Content Authoring website has been completely updated to serve as the **Central Bank Content Portal** with support for all 11 official South African languages and new AI-powered features.

---

## 🌍 Language Support (11 Official South African Languages)

The website now supports all 11 official languages of South Africa:

| Code | Language | Folder |
|------|----------|--------|
| EN | English | `/www/EN` |
| AF | Afrikaans | `/www/AF` |
| ND | Ndebele | `/www/ND` |
| NS | Northern Sotho | `/www/NS` |
| ST | Sotho | `/www/ST` |
| SS | Swati | `/www/SS` |
| TS | Tsonga | `/www/TS` |
| TN | Tswana | `/www/TN` |
| VE | Venda | `/www/VE` |
| XH | Xhosa | `/www/XH` |
| ZU | Zulu | `/www/ZU` |

### Language Switching
Users can switch languages using the language switcher in the header. The language codes appear in the top navigation bar.

---

## ✨ New AI Features

### 1. **Summarize with AI** Button
- Located at the top of each article
- Generates an AI-powered summary of the content
- Uses gradient styling (purple to indigo)
- Shows loading state with spinner animation
- Displays summary in a collapsible panel
- **Backend**: `/api/summarize` endpoint in `server.js`

### 2. **Audio Recap** Button
- Located at the top of each article
- Generates an audio recap of article content
- Integrates with speech synthesis services
- Displays audio player in a collapsible panel
- **Backend**: `/api/audio-recap` endpoint in `server.js`

### Feature Styling
- Modern gradient backgrounds (purple/indigo theme)
- Smooth animations and transitions
- Responsive design for mobile and desktop
- Accessible with proper ARIA labels
- Loading states with animated spinner

---

## 🎨 Branding Updates

### Title Changes
- Old: "AI Content Authoring"
- New: **"Central Bank"**
- Applied throughout all pages (header, footer, browser title)

### Header
- Updated logo to display "Central Bank"
- Language switcher shows both codes and full language names
- Sticky navigation for easy language switching

### Footer
- Updated copyright to "© 2026 Central Bank"

---

## 📁 File Structure Changes

### Removed
- Old language folders:
  - `/www/EN-US` (dummy content)
  - `/www/PT` (Portuguese - not a SA language)
  - `/www/ARF` (old Afrikaans folder)
- All dummy `.md` files (PDF and image references)

### Created
- 11 new language folders in `/www` directory:
  - `/www/EN`, `/www/AF`, `/www/ND`, `/www/NS`, `/www/ST`
  - `/www/SS`, `/www/TS`, `/www/TN`, `/www/VE`, `/www/XH`, `/www/ZU`

---

## 🔧 Technical Updates

### Server Configuration (`server.js`)
```javascript
// New language mapping
const LANGUAGES = {
  'EN': 'English',
  'AF': 'Afrikaans',
  'ND': 'Ndebele',
  'NS': 'Northern Sotho',
  'ST': 'Sotho',
  'SS': 'Swati',
  'TS': 'Tsonga',
  'TN': 'Tswana',
  'VE': 'Venda',
  'XH': 'Xhosa',
  'ZU': 'Zulu'
};
```

### New API Endpoints

#### `/api/summarize` (POST)
- Accepts: `{ content: string, language: string }`
- Returns: `{ summary: string }`
- Currently returns placeholder text
- Ready for integration with Azure OpenAI or similar services

#### `/api/audio-recap` (POST)
- Accepts: `{ text: string, language: string }`
- Returns: `{ audioUrl: string, message: string }`
- Currently returns placeholder audio URL
- Ready for integration with Azure Speech Services

### Updated Views

#### `views/index.ejs`
- Updated title to "Central Bank"
- Language switcher with full language names in tooltips
- Home page greeting includes language name

#### `views/content.ejs`
- New AI tools bar with Summarize and Audio Recap buttons
- AI feature panels (hidden by default, shown on button click)
- Summary panel with collapsible header
- Audio player integrated in recap panel
- Inline JavaScript for API calls and UI interactions

### Updated Styles

#### `public/styles/content.css`
- New `.ai-tools` section styling
- `.ai-button` gradient styling with hover effects
- `.ai-panel` with slide-down animation
- `.ai-panel-header` with close button
- `.ai-panel-content` with proper spacing
- Loading spinner animation
- Responsive design considerations

#### `public/styles/main.css`
- No breaking changes, fully compatible
- Supports new language codes seamlessly

### Updated Scripts

#### `public/scripts/main.js`
- New `initializeAIFeatures()` function
- New `setButtonLoading()` utility function
- Button state management (loading, disabled, active)
- Hover effects and visual feedback

---

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Running the Server
```bash
npm start
# Server runs on http://localhost:3000
```

### Development Mode
```bash
npm run dev
# Uses nodemon for auto-reload
```

---

## 📝 Adding Content

### Create New Articles
1. Navigate to `/www/{LANGUAGE_CODE}/` folder
2. Create a new `.md` markdown file
3. File will automatically appear in the menu on page refresh
4. Example path: `/www/EN/Getting Started.md`

### Content Organization
Articles can be organized in subfolders:
- `/www/EN/Guides/Setup.md`
- `/www/EN/FAQ/Common Questions.md`
- Menu will reflect folder structure automatically

---

## 🔌 Integration Points for AI Services

### Summarization
To integrate with Azure OpenAI or another AI service:

1. Update `/api/summarize` endpoint in `server.js`
2. Call your AI service with the content
3. Return formatted summary
4. Add authentication tokens to environment variables

### Text-to-Speech
To integrate with Azure Speech Services or similar:

1. Update `/api/audio-recap` endpoint in `server.js`
2. Call your speech synthesis service
3. Generate audio file and store in `/public/audio/`
4. Return URL to audio file
5. Add API keys to environment variables

---

## 🌐 Language-Specific Implementations

### Current Status
- 11 language folders created and ready
- Default language: English (EN)
- Language parameter in all routes: `?lang=EN`, `?lang=AF`, etc.

### Future Enhancements
- Add auto-detect based on browser locale
- Implement language-specific content encoding
- Add locale-specific date/time formatting
- Right-to-left (RTL) support for applicable languages

---

## ✅ Testing Checklist

- [ ] Language switcher works for all 11 languages
- [ ] Menu loads correctly for each language
- [ ] Summarize with AI button appears on content pages
- [ ] Audio Recap button appears on content pages
- [ ] AI panels open/close correctly
- [ ] API endpoints respond (placeholder responses)
- [ ] Mobile responsive design works
- [ ] Footer displays correct branding

---

## 📚 Documentation

### Key Files
- [Server Configuration](server.js) - Express server setup
- [Index Template](views/index.ejs) - Homepage layout
- [Content Template](views/content.ejs) - Article layout with AI features
- [Styles](public/styles/content.css) - AI feature styling
- [Scripts](public/scripts/main.js) - Frontend interactivity

---

## 🎯 Next Steps

1. **Deploy Content**: Add markdown files to language folders
2. **Integrate AI Services**: Connect to Azure OpenAI/Speech Services
3. **Configure Environment**: Add API keys and endpoints
4. **Test All Languages**: Ensure content loads correctly
5. **Monitor Performance**: Track API response times
6. **Gather Feedback**: User experience with AI features

---

## 📞 Support

For questions about implementation or feature requests, refer to:
- `server.js` for backend logic
- `views/` for template updates
- `public/styles/content.css` for AI feature styling
- `public/scripts/main.js` for frontend interactions

