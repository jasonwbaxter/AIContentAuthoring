# Central Bank Website - AI Content Authoring Platform

A modern, accessible web platform for a Central Bank featuring AI-enhanced content management, multilingual support (11 South African languages), and comprehensive data publication capabilities.

![Status](https://img.shields.io/badge/status-active-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Version](https://img.shields.io/badge/version-2.0-blue)

---

## ⚠️ Disclaimer

This is a sample solution provided as-is for educational and demonstration purposes. Microsoft and the project contributors make no warranties, express or implied, with respect to the sample code. The sample code is not intended for production use without substantial modification and thorough testing. 

**Use at your own risk.** You are responsible for determining the appropriateness of using the sample code for your situation and for any consequences of use. Before deploying to production, you must:
- Conduct thorough security and performance testing
- Review and modify code as needed for your specific requirements
- Ensure compliance with your organization's policies and standards
- Implement proper error handling, logging, and monitoring

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Usage](#usage)
- [AI Features](#ai-features)
- [Contributing](#contributing)
- [Technology Stack](#technology-stack)
- [Documentation](#documentation)
- [License](#license)

---

## Overview

This project is a comprehensive web platform designed for the Central Bank, combining modern web development practices with AI-powered features for content management and accessibility. The platform includes:

- **Navigation System**: Modern 5-category mega menu with full keyboard accessibility
- **Data Hub**: Centralized repository for publications, data, and indicators
- **Multilingual Support**: Complete support for 11 South African official languages
- **AI Features**: Summarization and audio recap capabilities for content
- **Accessibility**: WCAG AA compliant with comprehensive keyboard navigation

### Project Phases

**Phase 1 (Completed)**: Central Bank rebranding, language folder setup, AI feature integration
**Phase 2 (Completed)**: Navigation restructuring, data consolidation, footer reorganization
**Phase 3 (Planned)**: Real data integration, search functionality, advanced analytics

---

## ✨ Features

### 🎨 Modern Navigation

- **5-Category Mega Menu**: About, Monetary Policy & Markets, Data & Publications, News & Media, Help & Contact
- **Responsive Design**: Desktop, tablet, and mobile layouts
- **Keyboard Accessible**: Full support for Tab, Arrow Keys, Enter, Escape
- **Mobile Hamburger Menu**: Automatic toggle at ≤768px breakpoint
- **11 Languages**: Complete language switching for all South African official languages

### 📊 Data & Publications Hub

- **Publications Page**: Advanced filtering by type (5 categories) and year (4 years)
- **Data Hub**: 8 categories with 24 datasets in CSV/JSON formats
- **Key Indicators**: 6 live economic indicators with tile and table views
- **Download Center**: Centralized file downloads and bulk export options
- **Responsive Tables**: Accessible data comparison with proper semantic markup

### 🤖 AI-Powered Features

- **Summarize with AI**: Generate concise summaries of content using AI
- **Audio Recap**: Convert text to speech for accessibility and convenience
- **Content Enhancement**: AI-assisted metadata generation and tagging
- **Smart Search**: Intelligent search capabilities (prepared for implementation)

### ♿ Accessibility

- **WCAG 2.1 Level AA**: Compliance with web accessibility standards
- **Screen Reader Support**: Full ARIA roles, labels, and semantic HTML
- **Keyboard Navigation**: Comprehensive keyboard support throughout
- **Color Contrast**: 4.5:1 minimum contrast ratio (WCAG AA)
- **Touch Friendly**: 44x44px minimum touch targets on mobile
- **Reduced Motion**: Respects user preferences for motion-safe experience

### 🌍 Internationalization

- **11 Languages**: EN, AF, ND, NS, ST, SS, TS, TN, VE, XH, ZU
- **Language Switcher**: Easy language selection in header
- **URL-Based**: Language parameter for shareable links (?lang=CODE)
- **Consistent Structure**: All pages translated and properly formatted

---

## 📁 Project Structure

```
central-bank-website/
│
├── server.js                           # Express server (25+ routes)
├── package.json                        # Dependencies
├── config.json                         # Configuration
│
├── public/
│   ├── styles/
│   │   ├── main.css                   # Core styles
│   │   ├── brand.css                  # Brand identity
│   │   ├── content.css                # Content page styles
│   │   ├── navigation.css             # Mega menu styles
│   │   └── sections.css               # Section page styles
│   └── scripts/
│       ├── main.js                    # Core functionality
│       └── navigation.js              # Mega menu interactivity
│
├── views/
│   ├── index.ejs                      # Homepage
│   ├── content.ejs                    # Content pages
│   ├── 404.ejs                        # 404 page
│   ├── _header.ejs                    # Shared mega menu header
│   ├── _footer.ejs                    # Shared footer
│   ├── sitemap.ejs                    # HTML sitemap
│   └── sections/                      # Section pages (30 files)
│       ├── about/
│       ├── monetary-policy/
│       ├── data-publications/
│       ├── news/
│       ├── help/
│       └── policies/
│
├── www/
│   ├── EN/                            # English content
│   ├── AF/                            # Afrikaans
│   ├── XH/                            # Xhosa
│   └── ... (8 more languages)
│
└── Documentation/
    ├── DOCUMENTATION_INDEX.md          # Documentation guide
    ├── PHASE2_COMPLETION_SUMMARY.md   # Technical reference
    ├── NAVIGATION_QUICK_REFERENCE.md  # Quick start guide
    └── ACCESSIBILITY_TESTING_GUIDE.md # Testing procedures
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ ([Download](https://nodejs.org/))
- npm or yarn
- Git (for version control)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/central-bank-website.git
cd central-bank-website

# 2. Install dependencies
npm install

# 3. Start the development server
npm start

# 4. Open in browser
# Navigate to http://localhost:3000
```

### First Steps

1. **Visit Homepage**: `http://localhost:3000`
2. **Test Navigation**: Click menu items and test keyboard navigation
3. **Explore Data Hub**: Visit `http://localhost:3000/data-publications`
4. **Change Language**: Use language switcher in header
5. **View Sitemap**: Visit `http://localhost:3000/sitemap`

---

## 📖 Installation

### System Requirements

- **Node.js**: 16.0.0 or higher
- **npm**: 7.0.0 or higher
- **Modern Browser**: Chrome 90+, Firefox 88+, Safari 14+

### Detailed Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/central-bank-website.git

# Navigate to project directory
cd central-bank-website

# Install dependencies
npm install

# Create .env file (optional, for environment variables)
cat > .env << EOF
PORT=3000
NODE_ENV=development
EOF

# Start the server
npm start

# For development with auto-reload
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

### Verification

After installation, verify everything works:

```bash
# Check server is running
curl http://localhost:3000

# Check API endpoint
curl http://localhost:3000/api/navigation

# Verify all routes
curl http://localhost:3000/data-publications
```

---

## 💻 Usage

### Starting the Server

```bash
npm start
```

The server will start on `http://localhost:3000`

### Development Mode

For development with automatic reload on file changes:

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

### Testing

```bash
npm test
```

### Available Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/about` | About section |
| `/data-publications` | Data Hub |
| `/sitemap` | Site map |
| `/api/navigation` | Navigation JSON API |
| `/?lang=CODE` | Language switching |

---

## 🤖 AI Features

### Summarize with AI

Summarizes long-form content into concise summaries:

```bash
POST /api/summarize
Content-Type: application/json

{
  "text": "Long text to summarize",
  "language": "EN"
}
```

### Audio Recap

Converts text to speech:

```bash
POST /api/audio-recap
Content-Type: application/json

{
  "text": "Text to convert to audio",
  "language": "EN"
}
```

### Integration

Both features are integrated into the content pages with:
- "Summarize with AI" button
- "Audio Recap" player
- Language-aware processing
- Accessible output formats

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Getting Started

1. **Fork the Repository**
   ```bash
   # Click "Fork" on GitHub
   ```

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/central-bank-website.git
   cd central-bank-website
   ```

3. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Making Changes

#### Code Style

- Use consistent indentation (2 spaces)
- Follow existing code patterns
- Add comments for complex logic
- Keep functions small and focused

#### File Structure

- CSS: Use component-based organization
- JavaScript: Use ES6+ syntax
- Templates: Use semantic HTML5
- Markdown: Follow standard formatting

#### Example: Adding a New Page

```bash
# 1. Create the page file
mkdir -p views/sections/new-section
touch views/sections/new-section/new-page.ejs

# 2. Add route to server.js
# app.get('/new-section/new-page', (req, res) => {
#   res.render('sections/new-section/new-page', { ... });
# });

# 3. Create the content
# Include _header, main content, _footer

# 4. Test locally
npm start

# 5. Commit and push
git add views/sections/new-section/new-page.ejs server.js
git commit -m "feat: add new section page"
git push origin feature/your-feature-name
```

### Submitting Changes

1. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request**
   - Go to GitHub repository
   - Click "New Pull Request"
   - Describe your changes
   - Reference any related issues

3. **PR Guidelines**
   - Clear, descriptive title
   - Detailed description of changes
   - List any breaking changes
   - Add screenshots if UI changes
   - Ensure all tests pass

### Contribution Types

#### Bug Reports

```markdown
**Describe the bug**
Clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior.

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment**
- OS: [e.g., Windows 10]
- Browser: [e.g., Chrome 95]
- Node.js version: [e.g., 16.13.0]
```

#### Feature Requests

```markdown
**Is your feature related to a problem?**
Clear description of the problem.

**Describe the solution you'd like**
What you want to happen.

**Describe alternatives considered**
Any alternative solutions considered.

**Additional context**
Any other context about the feature request.
```

#### Documentation

- Improve existing documentation
- Add examples and tutorials
- Fix typos and clarity issues
- Translate documentation

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**: feat, fix, docs, style, refactor, test, chore
**Example**: `feat(navigation): add search functionality`

---

## 🛠️ Technology Stack

### Frontend

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)**: Interactive features
- **EJS**: Server-side templating

### Backend

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **API**: RESTful architecture

### Tools & Libraries

- **Git**: Version control
- **npm**: Package management
- **VS Code**: Recommended editor

### Deployment

- **Node.js Server**: Production hosting
- **Environment Variables**: Configuration management
- **Process Manager**: PM2 (recommended for production)

---

## 📚 Documentation

### Main Documentation

- **[DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)**: Navigation guide for all documentation
- **[PHASE2_COMPLETION_SUMMARY.md](./PHASE2_COMPLETION_SUMMARY.md)**: Detailed technical reference
- **[NAVIGATION_QUICK_REFERENCE.md](./NAVIGATION_QUICK_REFERENCE.md)**: Quick start and common tasks
- **[ACCESSIBILITY_TESTING_GUIDE.md](./ACCESSIBILITY_TESTING_GUIDE.md)**: Testing procedures and checklist

### Quick References

- API Routes: See server.js (line 150-548)
- Navigation Structure: See NAVIGATION_QUICK_REFERENCE.md
- CSS Classes: See public/styles/navigation.css and sections.css
- Component Structure: See views/_header.ejs and _footer.ejs

### For Developers

- Technical implementation details in PHASE2_COMPLETION_SUMMARY.md
- Development tips in NAVIGATION_QUICK_REFERENCE.md
- Code examples throughout documentation

---

## 📋 Development Checklist

Before deploying to production:

- [ ] All routes tested and working
- [ ] Keyboard navigation verified
- [ ] Mobile responsiveness confirmed
- [ ] All pages accessible (keyboard + screen reader)
- [ ] No console errors
- [ ] Database connections tested (if applicable)
- [ ] Environment variables configured
- [ ] HTTPS/SSL certificate installed
- [ ] Backups configured
- [ ] Monitoring set up

---

## 🐛 Troubleshooting

### Server Won't Start

```bash
# Check Node.js installation
node --version

# Check npm installation
npm --version

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Try with sudo if permission denied
sudo npm start
```

### Port Already in Use

```bash
# Use different port
PORT=3001 npm start

# Or kill process on port 3000
npx kill-port 3000
```

### Styles Not Loading

```bash
# Clear browser cache: Ctrl+Shift+Delete
# Or do hard refresh: Ctrl+Shift+R

# Check CSS files exist
ls public/styles/
```

See [NAVIGATION_QUICK_REFERENCE.md](./NAVIGATION_QUICK_REFERENCE.md) for more troubleshooting.

---

## 📞 Support

### Getting Help

1. **Check Documentation**: Start with relevant documentation file
2. **Search Issues**: Look for similar issues on GitHub
3. **Create Issue**: If not found, create a detailed issue
4. **Email Support**: Contact support@central-bank.gov.za

### Reporting Issues

Include:
- Detailed description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, browser, Node.js version)
- Screenshots if applicable
- Error messages and logs

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE](./LICENSE) file for details.

### MIT License Summary

- ✅ Use for personal and commercial purposes
- ✅ Modify and distribute
- ✅ Include in proprietary software
- ❌ Hold liable for issues
- ⚠️ Include copyright and license notice

---

## 🙏 Acknowledgments

- All South African languages team
- Web accessibility experts
- Open source community
- Contributors and testers

---

## 📞 Contact

- **Project Lead**: development@central-bank.gov.za
- **Issues**: GitHub Issues
- **Pull Requests**: GitHub Pull Requests
- **General Inquiries**: info@central-bank.gov.za

---

## 🗺️ Roadmap

### Phase 3 (Planned)

- [ ] Real database integration
- [ ] Full-text search implementation
- [ ] User authentication
- [ ] Advanced analytics
- [ ] Email subscriptions
- [ ] PDF export functionality

### Future Enhancements

- [ ] Mobile native app
- [ ] API documentation portal
- [ ] Advanced data visualization
- [ ] Machine learning recommendations
- [ ] Blockchain integration

---

## 📊 Project Status

- **Phase 1**: ✅ Complete (Rebranding & AI Integration)
- **Phase 2**: ✅ Complete (Navigation & Data Hub)
- **Phase 3**: 🟡 Planned (Advanced Features)
- **Maintenance**: 🟢 Active

---

**Last Updated**: January 30, 2026  
**Version**: 2.0  
**Status**: Active & Maintained

For more information, visit [Documentation Index](./DOCUMENTATION_INDEX.md)
