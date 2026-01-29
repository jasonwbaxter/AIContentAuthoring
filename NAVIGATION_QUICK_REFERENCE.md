# Navigation & Data Hub - Quick Reference Guide

## 🚀 Quick Start

### Start the Server
```bash
npm start
```
Server runs on http://localhost:3000

### Test URLs
```
Homepage:       http://localhost:3000/
Navigation:     http://localhost:3000/api/navigation
Sitemap:        http://localhost:3000/sitemap
Sitemap XML:    http://localhost:3000/sitemap.xml

Data & Publications Hub:
  Main Hub:     http://localhost:3000/data-publications
  Publications: http://localhost:3000/data-publications/publications
  Data Hub:     http://localhost:3000/data-publications/data-hub
  Indicators:   http://localhost:3000/data-publications/indicators
  Downloads:    http://localhost:3000/data-publications/downloads

With Filters:
  Type filter:  http://localhost:3000/data-publications/publications?type=bulletin
  Year filter:  http://localhost:3000/data-publications/publications?year=2025
  Language:     http://localhost:3000/?lang=AF (all pages support ?lang parameter)
```

---

## 🎨 Navigation Structure

### Main Categories (Header Mega Menu)
1. **About** → /about
   - Mandate → /about/mandate
   - Governance → /about/governance
   - Policies & Compliance → /about/policies
   - Careers → /about/careers

2. **Monetary Policy & Markets** → /monetary-policy
   - Repo & MPC → /monetary-policy/repo-mpc
   - Market Operations → /monetary-policy/market-ops
   - Interest Rates → /monetary-policy/rates

3. **Data & Publications** → /data-publications
   - Publications → /data-publications/publications
   - Data Hub → /data-publications/data-hub
   - Indicators → /data-publications/indicators
   - Downloads → /data-publications/downloads

4. **News & Media** → /news
   - Newsroom → /news/newsroom
   - Speeches → /news/speeches
   - Press Kits → /news/press-kits

5. **Help & Contact** → /help
   - Contact Us → /help/contact
   - FAQs → /help/faq
   - Forms → /help/forms
   - Whistleblowing → /help/whistleblowing
   - Fraud & Scams → /help/fraud-scams
   - Browsers → /help/browsers

### Footer Links
**About**
- About the Bank → /about
- Our History → /about/mandate

**Services**
- Annual Reports
- Financial Statements
- Investor Relations

**Utilities**
- Privacy Policy → /privacy
- PAIA Manual → /paia
- Cookies → /cookies
- Disclaimer → /disclaimer
- RSS Feed
- Sitemap → /sitemap

**External**
- Extranets (external)
- Internet Banking (external)
- Procurement (external)

---

## ⌨️ Keyboard Navigation

### Navigation Menu
| Key | Action |
|-----|--------|
| **Tab** | Move to next item |
| **Shift+Tab** | Move to previous item |
| **Arrow Right/Down** | Expand submenu or move next |
| **Arrow Left/Up** | Collapse submenu or move previous |
| **Enter** | Activate menu item |
| **Escape** | Close mega menu |
| **Space** | Activate button |

### Mobile Menu
| Key | Action |
|-----|--------|
| **Tab** | Navigate menu items |
| **Escape** | Close mobile menu |
| **Enter** | Follow link or toggle submenu |

---

## 🎯 Key Features

### Data & Publications

#### Publications Page Features
- **Filter by Type**: Bulletin, Policy, Research, Report, Statement
- **Filter by Year**: 2026, 2025, 2024, 2023
- **Sort**: Newest first (default)
- **Pagination**: 10 items per page
- **Export**: PDF/Word download links

#### Data Hub Categories
1. **Money & Banking** - 3 datasets
2. **Capital Market** - 3 datasets
3. **Financial Accounts** - 3 datasets
4. **Public Finance** - 3 datasets
5. **External Accounts** - 3 datasets
6. **National Accounts** - 3 datasets
7. **General Indicators** - 3 datasets
8. **Experimental Data** - 3 datasets

*Each dataset includes:*
- Name, description
- Last updated date
- Update frequency
- CSV & JSON download
- Sample preview

#### Indicator Tiles
1. **CPI** - Consumer Price Index
2. **PPI** - Producer Price Index
3. **Repo** - Repo Rate
4. **Prime** - Prime Lending Rate
5. **USD/ZAR** - Exchange Rate
6. **ZARONIA** - Overnight Rate

*Features:*
- Large, readable display
- Current value + trend
- Last updated timestamp
- Accessible comparison table
- Bulk download (CSV/Excel/JSON)

---

## 📱 Responsive Design

### Breakpoints
| Device | Width | Layout |
|--------|-------|--------|
| Mobile | <768px | Hamburger menu, single column |
| Tablet | 768px-1199px | Hamburger menu, 2 columns |
| Desktop | ≥1200px | Full mega menu, 3+ columns |

### Mobile Features
- Hamburger menu icon appears at 768px
- Full-screen dropdown menu
- Touch-friendly buttons (44x44px minimum)
- Smooth slide animations
- Back button to collapse

---

## 🌍 Language Support

### Supported Languages
All 11 South African official languages:
- EN (English)
- AF (Afrikaans)
- ND (Ndebele)
- NS (Northern Sotho)
- ST (Sotho)
- SS (Swati)
- TS (Tsonga)
- TN (Tswana)
- VE (Venda)
- XH (Xhosa)
- ZU (Zulu)

### Language Switching
- Click language in header dropdown
- URL updates with `?lang=CODE`
- All page content uses selected language
- Works on all pages and routes

---

## 🛠️ Development Tips

### Adding a New Publication
Edit `server.js`, find the publications route (around line 340):
```javascript
const publications = [
  {
    id: 1,
    title: 'Publication Title',
    abstract: 'Brief description...',
    date: '2026-01-27',
    type: 'bulletin',
    downloadUrl: '/files/publication.pdf',
    languages: ['EN', 'AF', 'XH']
  },
  // Add more publications here
];
```

### Adding a New Indicator
Edit `server.js`, find the indicators route (around line 400):
```javascript
const indicators = [
  {
    id: 'cpi',
    label: 'Indicator Name',
    value: '125.4',
    unit: '%',
    change: '+2.3',
    trend: 'up',
    lastUpdated: new Date().toLocaleDateString(),
    source: 'Statistics South Africa'
  },
  // Add more indicators here
];
```

### Adding a New Navigation Item
Edit `server.js`, find `navigationStructure` constant:
```javascript
const navigationStructure = {
  main: [
    {
      label: 'Category Name',
      path: '/category-path',
      submenu: [
        { label: 'Subcategory', path: '/category/sub-path' },
        // Add more submenus
      ]
    }
    // Add more main categories
  ]
};
```

### Creating a New Section Page
1. Create new folder: `views/sections/category-name/`
2. Create new file: `page-name.ejs`
3. Use template:
```ejs
<!DOCTYPE html>
<html lang="<%= lang %>">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title - Central Bank</title>
  <link rel="stylesheet" href="/styles/main.css">
  <link rel="stylesheet" href="/styles/navigation.css">
  <link rel="stylesheet" href="/styles/sections.css">
</head>
<body>
  <%- include('_header', { navigation, lang, langName, availableLanguages }) %>
  
  <main class="content">
    <!-- Your content here -->
  </main>
  
  <%- include('_footer') %>
  
  <script src="/scripts/main.js"></script>
  <script src="/scripts/navigation.js"></script>
</body>
</html>
```
4. Add route in `server.js`:
```javascript
app.get('/category-name/page-name', (req, res) => {
  const lang = req.query.lang || 'EN';
  const langName = LANGUAGES[lang] || 'English';
  const availableLanguages = Object.keys(LANGUAGES);
  res.render('sections/category-name/page-name', {
    title: 'Page Title',
    navigation: navigationStructure,
    lang,
    langName,
    availableLanguages
  });
});
```

---

## 🐛 Troubleshooting

### Problem: Mega menu not appearing
**Solution**: Check that navigation.css is loaded in browser DevTools. Verify `<% navigation %>` variable is passed to _header.ejs template.

### Problem: Mobile menu not toggling
**Solution**: Verify navigation.js is loaded. Check browser console for JavaScript errors. Ensure viewport meta tag is present.

### Problem: Language switcher not working
**Solution**: Check that `availableLanguages` variable is passed to templates. Verify LANGUAGES object in server.js contains all 11 languages.

### Problem: Indicators not displaying
**Solution**: Check that `/data-publications/indicators` route exists in server.js. Verify indicators array has correct data structure. Check indicator.ejs template for correct data binding.

### Problem: Filter not working on publications
**Solution**: Verify query parameters are being read: `req.query.type` and `req.query.year`. Check that publications array has correct type values ('bulletin', 'policy', etc.).

### Problem: CSS not loading
**Solution**: Verify CSS files exist in `public/styles/`. Check that link tags use correct paths `/styles/filename.css`. Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete).

### Problem: Footer not appearing
**Solution**: Verify _footer.ejs exists in views/. Check that `<%- include('_footer') %>` is in the template. Ensure footer CSS is loaded from navigation.css.

---

## 📊 Testing Checklist

### Functionality Testing
- [ ] Homepage loads without errors
- [ ] All navigation links work and go to correct pages
- [ ] Mega menu expands/collapses on hover
- [ ] Mobile menu appears at 768px and below
- [ ] Publications filter by type and year
- [ ] Data Hub shows all 8 categories
- [ ] Indicators display all 6 tiles
- [ ] Downloads page loads
- [ ] Sitemap page displays all links
- [ ] Language switcher changes language on all pages

### Keyboard Navigation Testing
- [ ] Tab moves through all focusable elements
- [ ] Arrow keys navigate mega menu items
- [ ] Enter activates links/buttons
- [ ] Escape closes open menus
- [ ] Focus indicators visible on all elements
- [ ] No keyboard traps (user can Tab out of any element)

### Accessibility Testing
- [ ] Screen reader announces all headings
- [ ] Screen reader announces navigation landmarks
- [ ] Color contrast is sufficient (4.5:1 for WCAG AA)
- [ ] No content depends on color alone
- [ ] Images have alt text (if present)
- [ ] Form labels are associated with inputs

### Responsive Testing
- [ ] Mobile (375px): All content visible, no horizontal scroll
- [ ] Tablet (768px): Hamburger menu appears
- [ ] Desktop (1200px): Full mega menu visible
- [ ] All breakpoints: Content readable and well-organized
- [ ] Touch: Buttons are large enough (44x44px minimum)

### Performance Testing
- [ ] Page loads in < 3 seconds
- [ ] No console JavaScript errors
- [ ] No 404 errors for CSS/JS files
- [ ] Images are optimized (if present)
- [ ] CSS is minified (production)

---

## 📞 Support

For issues or questions:
1. Check this guide first
2. Review PHASE2_COMPLETION_SUMMARY.md for detailed docs
3. Check browser console for errors (F12)
4. Check server console for any error messages
5. Contact development team

---

**Last Updated**: January 2026  
**Version**: 2.0 (Phase 2 Complete)
