# Quick Start Guide - Central Bank Portal

## 🚀 Getting Started in 5 Minutes

### Step 1: Start the Server
```bash
cd c:\source\AIContentAuthoring
npm install  # (Only needed first time)
npm start
```

### Step 2: Open in Browser
```
http://localhost:3000
```

### Step 3: Switch Languages
Click any language code in the top-right corner:
- **EN** = English
- **AF** = Afrikaans  
- **ND** = Ndebele
- **NS** = Northern Sotho
- **ST** = Sotho
- **SS** = Swati
- **TS** = Tsonga
- **TN** = Tswana
- **VE** = Venda
- **XH** = Xhosa
- **ZU** = Zulu

### Step 4: Add Content
Create `.md` files in language folders:
```
/www/EN/Welcome.md
/www/AF/Welkom.md
/www/ST/Karabo.md
```

Refresh browser - content appears automatically!

---

## 📝 Creating Articles

### Basic Article
Create file: `/www/EN/My First Article.md`

Content:
```markdown
# Article Title

This is the article body.

## Section Heading

More content here.
```

### With Subfolders
```
/www/EN/
├── Getting Started.md
├── Guides/
│   ├── Setup.md
│   └── Configuration.md
└── FAQ/
    └── Common Questions.md
```

---

## 🤖 AI Features (When Integrated)

### Summarize Button
1. Open any article
2. Click **✨ Summarize with AI**
3. Summary appears below in a panel
4. Close with **✕** button

### Audio Recap Button
1. Open any article
2. Click **🎵 Audio Recap**
3. Audio player appears
4. Click play to listen
5. Close with **✕** button

---

## 🔌 Integration Checklist

### For Azure OpenAI (Summarization)
- [ ] Add Azure OpenAI API key to environment
- [ ] Update `/api/summarize` in `server.js`
- [ ] Test summarization feature
- [ ] Deploy

### For Azure Speech Services (Audio)
- [ ] Add Speech Services API key to environment
- [ ] Update `/api/audio-recap` in `server.js`
- [ ] Test audio generation
- [ ] Deploy

---

## 📂 Project Structure
```
AIContentAuthoring/
├── server.js              ← Backend server
├── package.json           ← Dependencies
├── views/                 ← HTML templates
│   ├── index.ejs         ← Home page
│   ├── content.ejs       ← Article page with AI features
│   └── _menu.ejs         ← Navigation menu
├── public/
│   ├── styles/           ← CSS files
│   │   ├── main.css
│   │   ├── brand.css
│   │   └── content.css
│   ├── scripts/          ← JavaScript
│   │   └── main.js
│   └── audio/            ← Audio files (future)
└── www/                  ← Content folders
    ├── EN/               ← English articles
    ├── AF/               ← Afrikaans articles
    ├── ND/               ← Ndebele articles
    └── ... (9 more)
```

---

## 🎯 Common Tasks

### Add a New Language
Language folders are pre-created. Just add content!

### Change Default Language
Edit `server.js` line ~104:
```javascript
const lang = req.query.lang || 'EN';  // Change 'EN' to desired language
```

### Change Website Title
Edit `server.js` line ~109:
```javascript
title: 'Central Bank',  // Change here
```

### Customize AI Button Text
Edit `views/content.ejs` lines 58 & 62:
```html
<button>✨ Your Custom Text</button>
```

---

## 🧪 Testing the Site

### Test Language Switching
1. Start server: `npm start`
2. Visit: `http://localhost:3000`
3. Click each language code (EN, AF, ND, etc.)
4. Menu should be empty (no content added yet)

### Test with Sample Content
Add a file: `www/EN/Welcome.md`
```markdown
# Welcome to Central Bank

This is test content.
```

Refresh browser - "Welcome" appears in menu!

### Test AI Buttons
1. Click on an article
2. See **✨ Summarize with AI** and **🎵 Audio Recap** buttons
3. Click buttons (will show placeholder messages until services configured)

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port in server.js line:
const PORT = process.env.PORT || 3001;  # Change 3000 to 3001
```

### Language Folder Not Found
- Check folder name matches language code (EN, AF, ND, etc.)
- Folder must be exactly in `/www/` directory
- Refresh browser after creating folder

### Menu Not Showing
- Add `.md` files to language folder
- Files must have `.md` extension (not .txt or .doc)
- Refresh browser

### AI Buttons Not Working
- Click button to see response
- Currently shows placeholder message
- Will work once APIs integrated
- Check browser console for errors (F12 > Console)

---

## 📚 Documentation Files

- **UPDATES.md** - Detailed technical documentation
- **COMPLETION_SUMMARY.md** - What was implemented
- **README.md** - Original project info (optional to update)

---

## 🎨 Customization

### Change AI Button Color
Edit `public/styles/content.css` line ~140:
```css
.ai-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  /* Change these hex colors */
}
```

### Change Theme Colors
Edit `public/styles/main.css` lines 5-11:
```css
:root {
  --primary-color: #0078d4;      /* Change these */
  --secondary-color: #107c10;
  --text-dark: #333333;
  /* ... etc */
}
```

---

## ✅ You're All Set!

Your **Central Bank Content Portal** is ready to use!

Next steps:
1. Add articles to language folders
2. Integrate AI services (OpenAI, Speech Services)
3. Deploy to production
4. Share with your team

---

**Happy Content Creation! 🎉**

