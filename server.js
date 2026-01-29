const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const marked = require('marked');
const app = express();

// Configuration
const WEB_ROOT = path.join(__dirname, 'www');
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Utility: Get folder structure and metadata
function getFolderStructure(dir) {
  const structure = {};
  
  const readDir = (currentPath, currentObj) => {
    const files = fs.readdirSync(currentPath);
    
    files.forEach(file => {
      const fullPath = path.join(currentPath, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        currentObj[file] = {};
        readDir(fullPath, currentObj[file]);
      } else if (file.endsWith('.md')) {
        currentObj[file] = {
          type: 'file',
          path: fullPath,
          relativePath: path.relative(WEB_ROOT, fullPath)
        };
      }
    });
  };
  
  readDir(dir, structure);
  return structure;
}

// Utility: Parse markdown file
function parseMarkdownFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const html = marked.parse(content);
  
  // Extract title from filename
  const filename = path.basename(filePath, '.md');
  const title = filename.replace(/[._-]/g, ' ');
  
  return { html, title, filename };
}

// Utility: Build navigation menu
function buildMenu(structure, baseUrl = '/') {
  const menu = [];
  
  Object.entries(structure).forEach(([key, value]) => {
    if (value.type === 'file') {
      menu.push({
        label: value.relativePath.replace(/\\/g, '/').replace(/\.md$/, ''),
        url: `${baseUrl}content/${value.relativePath.replace(/\\/g, '/')}`,
        isFile: true
      });
    } else if (typeof value === 'object' && Object.keys(value).length > 0) {
      menu.push({
        label: key,
        submenu: buildMenu(value, baseUrl),
        isDirectory: true
      });
    }
  });
  
  return menu;
}

// Routes

// Language mapping for 11 official South African languages
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

// Home page
app.get('/', (req, res) => {
  const lang = req.query.lang || 'EN';
  
  res.render('index', {
    title: 'Central Bank',
    navigation: navigationStructure.main,
    lang,
    langName: LANGUAGES[lang],
    availableLanguages: Object.keys(LANGUAGES)
  });
});

// Content page
app.get('/content/:lang/*', (req, res) => {
  const { lang } = req.params;
  const filePath = req.params[0];
  const fullPath = path.join(WEB_ROOT, lang, filePath.replace(/\//g, path.sep));
  
  if (!fullPath.endsWith('.md')) {
    return res.status(400).json({ error: 'Only markdown files are supported' });
  }
  
  if (!fs.existsSync(fullPath)) {
    return res.status(404).render('404', { message: 'Content not found' });
  }
  
  try {
    const { html, title } = parseMarkdownFile(fullPath);
    
    res.render('content', {
      title,
      html,
      navigation: navigationStructure.main,
      lang,
      langName: LANGUAGES[lang],
      availableLanguages: Object.keys(LANGUAGES),
      breadcrumb: filePath.split('/').slice(0, -1)
    });
  } catch (error) {
    res.status(500).render('404', { message: 'Error rendering content', error: error.message });
  }
});

// Search route: simple full-text search within markdown files for a language
app.get('/search', (req, res) => {
  const q = (req.query.q || '').trim();
  const lang = req.query.lang || 'EN';
  const results = [];
  if (!q) {
    return res.render('search', { title: 'Search', q, results, navigation: navigationStructure.main, lang, langName: LANGUAGES[lang], availableLanguages: Object.keys(LANGUAGES) });
  }

  const searchRoot = path.join(WEB_ROOT, lang);

  const walk = (dir) => {
    const entries = fs.readdirSync(dir);
    entries.forEach(name => {
      const full = path.join(dir, name);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        walk(full);
      } else if (name.endsWith('.md')) {
        try {
          const content = fs.readFileSync(full, 'utf8');
          if (content.toLowerCase().includes(q.toLowerCase()) || name.toLowerCase().includes(q.toLowerCase())) {
            const rel = path.relative(WEB_ROOT, full).replace(/\\/g, '/');
            const { title } = parseMarkdownFile(full);
            const excerpt = content.replace(/[#*_`>\[\]\(\)]/g, '').replace(/\s+/g, ' ').slice(0, 200);
            results.push({
              title,
              url: `/content/${lang}/${rel}`,
              excerpt
            });
          }
        } catch (e) {
          // skip problematic files
        }
      }
    });
  };

  try {
    if (fs.existsSync(searchRoot)) walk(searchRoot);
  } catch (e) { }

  res.render('search', { title: `Search: ${q}`, q, results, navigation: navigationStructure.main, lang, langName: LANGUAGES[lang], availableLanguages: Object.keys(LANGUAGES) });
});

// API: Get menu structure
app.get('/api/menu/:lang', (req, res) => {
  const { lang } = req.params;
  
  res.json({ navigation: navigationStructure.main, language: lang });
});

// API: Summarize content with AI
app.post('/api/summarize', express.json(), (req, res) => {
  const { content, language } = req.body;
  
  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }
  
  // Placeholder for AI summarization
  // In production, this would call an AI service like Azure OpenAI, Azure AI Services, etc.
  const summary = `Summary (${LANGUAGES[language] || language}): This is a placeholder summary. Integrate with Azure OpenAI or similar service for actual AI summarization.`;
  
  res.json({ summary });
});

// API: Generate audio recap
app.post('/api/audio-recap', express.json(), (req, res) => {
  const { text, language } = req.body;
  
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }
  
  // Placeholder for audio generation
  // In production, this would call Azure Speech Services or similar
  const audioUrl = '/audio/recap.mp3';
  
  res.json({ 
    audioUrl,
    message: 'Audio recap generation started. Integrate with Azure Speech Services for actual audio synthesis.'
  });
});

// ========== NAVIGATION STRUCTURE ==========

const navigationStructure = {
  main: [
    {
      label: 'About',
      path: '/about/',
      submenu: [
        { label: 'Mandate & Role', path: '/about/mandate/', icon: '📋' },
        { label: 'Leadership & Governance', path: '/about/governance/', icon: '🏛️' },
        { label: 'Policies & Compliance', path: '/about/policies/', icon: '⚖️' },
        { label: 'Careers', path: '/about/careers/', icon: '👔' }
      ]
    },
    {
      label: 'Monetary Policy & Markets',
      path: '/policy-markets/',
      submenu: [
        { label: 'Repo & MPC', path: '/policy-markets/repo-mpc/', icon: '📊' },
        { label: 'Market Operations', path: '/policy-markets/market-operations/', icon: '💼' },
        { label: 'Rates', path: '/policy-markets/rates/', icon: '📈' }
      ]
    },
    {
      label: 'Data & Publications',
      path: '/data-publications/',
      submenu: [
        { label: 'Publications', path: '/data-publications/publications/', icon: '📄' },
        { label: 'Data Hub', path: '/data-publications/data-hub/', icon: '📊' },
        { label: 'Indicators', path: '/data-publications/indicators/', icon: '📉' },
        { label: 'Download Centre', path: '/data-publications/downloads/', icon: '⬇️' }
      ]
    },
    {
      label: 'News & Media',
      path: '/news/',
      submenu: [
        { label: 'Speeches', path: '/news/speeches/', icon: '🎤' },
        { label: 'Press Kits', path: '/news/press-kits/', icon: '📦' }
      ]
    },
    {
      label: 'Help & Contact',
      path: '/help-contact/',
      submenu: [
        { label: 'Contact Us', path: '/help-contact/', icon: '📞' },
        { label: 'FAQs', path: '/help-contact/faqs/', icon: '❓' },
        { label: 'Forms', path: '/help-contact/forms/', icon: '📋' },
        { label: 'Whistleblowing', path: '/help-contact/whistleblowing/', icon: '🔔' },
        { label: 'Fraud & Scams', path: '/help-contact/fraud-scams/', icon: '⚠️' },
        { label: 'Supported Browsers', path: '/help-contact/supported-browsers/', icon: '🌐' }
      ]
    }
  ],
  footer: [
    { label: 'Privacy Policy', path: '/privacy', icon: '🔐' },
    { label: 'PAIA', path: '/paia', icon: '📄' },
    { label: 'Cookie Policy', path: '/cookies', icon: '🍪' },
    { label: 'Sitemap', path: '/sitemap', icon: '🗺️' },
    { label: 'RSS Feed', path: '/feed.xml', icon: '📡' },
    { label: 'Disclaimer', path: '/disclaimer', icon: '⚠️' },
    { label: 'Internet Banking', path: '#internet-banking', external: true, icon: '🏧' },
    { label: 'Procurement', path: '#procurement', external: true, icon: '🛒' },
    { label: 'Extranets', path: '#extranets', external: true, icon: '🔐' }
  ]
};

// ========== NAVIGATION ROUTES ==========

// Get navigation structure (API)
app.get('/api/navigation', (req, res) => {
  res.json(navigationStructure);
});

// About Section Routes
app.get('/about/', (req, res) => {
  const lang = req.query.lang || 'EN';
  res.render('sections/about/index', { 
    title: 'About Central Bank',
    lang,
    langName: LANGUAGES[lang],
    availableLanguages: Object.keys(LANGUAGES),
    navigation: navigationStructure.main
  });
});

app.get('/about/mandate/', (req, res) => {
  const lang = req.query.lang || 'EN';
  res.render('sections/about/mandate', {
    title: 'Mandate & Role',
    lang,
    langName: LANGUAGES[lang],
    availableLanguages: Object.keys(LANGUAGES),
    navigation: navigationStructure.main,
    currentPage: 'mandate'
  });
});

app.get('/about/governance/', (req, res) => {
  const lang = req.query.lang || 'EN';
  res.render('sections/about/governance', {
    title: 'Leadership & Governance',
    lang,
    langName: LANGUAGES[lang],
    availableLanguages: Object.keys(LANGUAGES),
    navigation: navigationStructure.main,
    currentPage: 'governance'
  });
});

app.get('/about/policies/', (req, res) => {
  const lang = req.query.lang || 'EN';
  res.render('sections/about/policies', {
    title: 'Policies & Compliance',
    lang,
    langName: LANGUAGES[lang],
    availableLanguages: Object.keys(LANGUAGES),
    navigation: navigationStructure.main,
    currentPage: 'policies'
  });
});

app.get('/about/careers/', (req, res) => {
  const lang = req.query.lang || 'EN';
  res.render('sections/about/careers', {
    title: 'Careers',
    lang,
    langName: LANGUAGES[lang],
    availableLanguages: Object.keys(LANGUAGES),
    navigation: navigationStructure.main,
    currentPage: 'careers'
  });
});

// Monetary Policy Routes
app.get('/policy-markets/', (req, res) => {
  const lang = req.query.lang || 'EN';
  res.render('sections/policy-markets/index', {
    title: 'Monetary Policy & Markets',
    lang,
    langName: LANGUAGES[lang],
    availableLanguages: Object.keys(LANGUAGES),
    navigation: navigationStructure.main
  });
});

app.get('/policy-markets/repo-mpc/', (req, res) => {
  const lang = req.query.lang || 'EN';
  res.render('sections/policy-markets/repo-mpc', {
    title: 'Repo & MPC',
    lang,
    langName: LANGUAGES[lang],
    availableLanguages: Object.keys(LANGUAGES),
    navigation: navigationStructure.main,
    currentPage: 'repo-mpc'
  });
});

app.get('/policy-markets/market-operations/', (req, res) => {
  const lang = req.query.lang || 'EN';
  res.render('sections/policy-markets/market-operations', {
    title: 'Market Operations',
    lang,
    langName: LANGUAGES[lang],
    availableLanguages: Object.keys(LANGUAGES),
    navigation: navigationStructure.main,
    currentPage: 'market-operations'
  });
});

app.get('/policy-markets/rates/', (req, res) => {
  const lang = req.query.lang || 'EN';
  res.render('sections/policy-markets/rates', {
    title: 'Interest Rates',
    lang,
    langName: LANGUAGES[lang],
    availableLanguages: Object.keys(LANGUAGES),
    navigation: navigationStructure.main,
    currentPage: 'rates'
  });
});

// Data & Publications Routes
app.get('/data-publications/', (req, res) => {
  const lang = req.query.lang || 'EN';
  res.render('sections/data-publications/index', {
    title: 'Data & Publications',
    lang,
    langName: LANGUAGES[lang],
    availableLanguages: Object.keys(LANGUAGES),
    navigation: navigationStructure.main
  });
});

app.get('/data-publications/publications/', (req, res) => {
  const lang = req.query.lang || 'EN';
  const type = req.query.type || 'all';
  const year = req.query.year || 'all';
  
  res.render('sections/data-publications/publications', {
    title: 'Publications',
    lang,
    langName: LANGUAGES[lang],
    availableLanguages: Object.keys(LANGUAGES),
    navigation: navigationStructure.main,
    filters: { type, year },
    publications: [] // TODO: Load from database/files
  });
});

app.get('/data-publications/data-hub/', (req, res) => {
  const lang = req.query.lang || 'EN';
  
  const dataCategories = [
    { id: 'money-banking', label: 'Money & Banking', icon: '🏦' },
    { id: 'capital-market', label: 'Capital Market', icon: '📈' },
    { id: 'financial-accounts', label: 'National Financial Account', icon: '💰' },
    { id: 'public-finance', label: 'Public Finance', icon: '💼' },
    { id: 'external-accounts', label: 'External Economic Accounts', icon: '🌍' },
    { id: 'national-accounts', label: 'National Accounts', icon: '📊' },
    { id: 'indicators', label: 'General Economic Indicators', icon: '📉' },
    { id: 'experimental', label: 'Experimental Tables', icon: '🔬' }
  ];
  
  res.render('sections/data-publications/data-hub', {
    title: 'Data Hub',
    lang,
    langName: LANGUAGES[lang],
    availableLanguages: Object.keys(LANGUAGES),
    navigation: navigationStructure.main,
    dataCategories
  });
});

app.get('/data-publications/indicators/', (req, res) => {
  const lang = req.query.lang || 'EN';
  
  const indicators = [
    { id: 'cpi', label: 'Consumer Price Index (CPI)', value: '6.5%', unit: 'YoY', lastUpdated: new Date('2026-01-15'), source: 'Central Bank' },
    { id: 'ppi', label: 'Producer Price Index (PPI)', value: '4.2%', unit: 'YoY', lastUpdated: new Date('2026-01-10'), source: 'Central Bank' },
    { id: 'repo-rate', label: 'Repo Rate', value: '8.25%', unit: 'pa', lastUpdated: new Date('2026-01-29'), source: 'Central Bank' },
    { id: 'prime-rate', label: 'Prime Lending Rate', value: '11.75%', unit: 'pa', lastUpdated: new Date('2026-01-29'), source: 'Central Bank' },
    { id: 'usd-zar', label: 'USD/ZAR Exchange Rate', value: '17.85', unit: 'ZAR/USD', lastUpdated: new Date('2026-01-30'), source: 'Central Bank' },
    { id: 'zaronia', label: 'ZARONIA Rate', value: '8.12%', unit: 'pa', lastUpdated: new Date('2026-01-30'), source: 'Central Bank' }
  ];
  
  res.render('sections/data-publications/indicators', {
    title: 'Indicators',
    lang,
    langName: LANGUAGES[lang],
    availableLanguages: Object.keys(LANGUAGES),
    navigation: navigationStructure.main,
    indicators
  });
});

app.get('/data-publications/downloads/', (req, res) => {
  const lang = req.query.lang || 'EN';
  const category = req.query.category || 'all';
  
  res.render('sections/data-publications/downloads', {
    title: 'Download Centre',
    lang,
    langName: LANGUAGES[lang],
    availableLanguages: Object.keys(LANGUAGES),
    navigation: navigationStructure.main,
    category,
    downloads: [] // TODO: Load from file system
  });
});

// News & Media Routes
app.get('/news/', (req, res) => {
  const lang = req.query.lang || 'EN';
  res.render('sections/news/index', {
    title: 'News & Media',
    lang,
    langName: LANGUAGES[lang],
    availableLanguages: Object.keys(LANGUAGES),
    navigation: navigationStructure.main
  });
});

app.get('/news/speeches/', (req, res) => {
  const lang = req.query.lang || 'EN';
  res.render('sections/news/speeches', {
    title: 'Speeches',
    lang,
    langName: LANGUAGES[lang],
    availableLanguages: Object.keys(LANGUAGES),
    navigation: navigationStructure.main,
    currentPage: 'speeches'
  });
});

app.get('/news/press-kits/', (req, res) => {
  const lang = req.query.lang || 'EN';
  res.render('sections/news/press-kits', {
    title: 'Press Kits',
    lang,
    langName: LANGUAGES[lang],
    availableLanguages: Object.keys(LANGUAGES),
    navigation: navigationStructure.main,
    currentPage: 'press-kits'
  });
});

// Help & Contact Routes
app.get('/help-contact/', (req, res) => {
  const lang = req.query.lang || 'EN';
  res.render('sections/help-contact/index', {
    title: 'Help & Contact',
    lang,
    langName: LANGUAGES[lang],
    availableLanguages: Object.keys(LANGUAGES),
    navigation: navigationStructure.main
  });
});

app.get('/help-contact/faqs/', (req, res) => {
  const lang = req.query.lang || 'EN';
  res.render('sections/help-contact/faqs', {
    title: 'FAQs',
    lang,
    langName: LANGUAGES[lang],
    availableLanguages: Object.keys(LANGUAGES),
    navigation: navigationStructure.main,
    currentPage: 'faqs'
  });
});

app.get('/help-contact/forms/', (req, res) => {
  const lang = req.query.lang || 'EN';
  res.render('sections/help-contact/forms', {
    title: 'Forms',
    lang,
    langName: LANGUAGES[lang],
    availableLanguages: Object.keys(LANGUAGES),
    navigation: navigationStructure.main,
    currentPage: 'forms'
  });
});

app.get('/help-contact/whistleblowing/', (req, res) => {
  const lang = req.query.lang || 'EN';
  res.render('sections/help-contact/whistleblowing', {
    title: 'Whistleblowing',
    lang,
    langName: LANGUAGES[lang],
    availableLanguages: Object.keys(LANGUAGES),
    navigation: navigationStructure.main,
    currentPage: 'whistleblowing'
  });
});

app.get('/help-contact/fraud-scams/', (req, res) => {
  const lang = req.query.lang || 'EN';
  res.render('sections/help-contact/fraud-scams', {
    title: 'Fraud & Scams',
    lang,
    langName: LANGUAGES[lang],
    availableLanguages: Object.keys(LANGUAGES),
    navigation: navigationStructure.main,
    currentPage: 'fraud-scams'
  });
});

app.get('/help-contact/supported-browsers/', (req, res) => {
  const lang = req.query.lang || 'EN';
  res.render('sections/help-contact/supported-browsers', {
    title: 'Supported Browsers',
    lang,
    langName: LANGUAGES[lang],
    availableLanguages: Object.keys(LANGUAGES),
    navigation: navigationStructure.main,
    currentPage: 'supported-browsers'
  });
});

// Policy Routes
app.get('/privacy', (req, res) => {
  const lang = req.query.lang || 'EN';
  res.render('sections/policies/privacy', {
    title: 'Privacy Policy',
    lang,
    langName: LANGUAGES[lang],
    availableLanguages: Object.keys(LANGUAGES)
  });
});

app.get('/paia', (req, res) => {
  const lang = req.query.lang || 'EN';
  res.render('sections/policies/paia', {
    title: 'PAIA',
    lang,
    langName: LANGUAGES[lang],
    availableLanguages: Object.keys(LANGUAGES)
  });
});

app.get('/cookies', (req, res) => {
  const lang = req.query.lang || 'EN';
  res.render('sections/policies/cookies', {
    title: 'Cookie Policy',
    lang,
    langName: LANGUAGES[lang],
    availableLanguages: Object.keys(LANGUAGES)
  });
});

app.get('/disclaimer', (req, res) => {
  const lang = req.query.lang || 'EN';
  res.render('sections/policies/disclaimer', {
    title: 'Disclaimer',
    lang,
    langName: LANGUAGES[lang],
    availableLanguages: Object.keys(LANGUAGES)
  });
});

// Sitemap
app.get('/sitemap', (req, res) => {
  const lang = req.query.lang || 'EN';
  const langName = LANGUAGES[lang] || 'English';
  const availableLanguages = Object.keys(LANGUAGES);
  res.render('sitemap', { 
    navigation: navigationStructure, 
    lang, 
    langName, 
    availableLanguages 
  });
});

// Sitemap XML (for search engines)
app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml');
  res.render('sitemap.xml', { navigation: navigationStructure });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📁 Content root: ${WEB_ROOT}`);
  console.log(`🌍 Available languages: ${Object.keys(LANGUAGES).join(', ')}`);
  console.log(`📢 Central Bank Content Portal`);
});

module.exports = app;
