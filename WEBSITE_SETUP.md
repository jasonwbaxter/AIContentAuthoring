# Custom Branded Website Setup

This website automatically generates navigation menus and displays content based on your folder structure.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### 3. Access Content
- **Home**: `http://localhost:3000/`
- **Language Selection**: `http://localhost:3000/?lang=EN-US`
- **Content**: `http://localhost:3000/content/EN-US/Clarity%20Deployment%20Guide.pdf`

## 📁 Project Structure

```
.
├── server.js                 # Express server
├── package.json             # Dependencies
├── config.json              # Site configuration
├── www/                     # Content directory
│   ├── EN-US/              # English content
│   ├── PT/                 # Portuguese content
│   └── ARF/                # Afrikaans content
├── views/                   # EJS templates
│   ├── index.ejs           # Home page
│   ├── content.ejs         # Content page
│   ├── _menu.ejs           # Menu component
│   └── 404.ejs             # Error page
└── public/                  # Static assets
    ├── styles/             # CSS files
    │   ├── main.css        # Main styles
    │   ├── brand.css       # Brand customization
    │   └── content.css     # Content styles
    └── scripts/            # JavaScript
        └── main.js         # Main script
```

## 🎨 Customizing Your Brand

Edit `public/styles/brand.css` to customize:
- **Primary Color**: `--brand-primary`
- **Secondary Color**: `--brand-secondary`
- **Accent Color**: `--brand-accent`
- **Font Family**: `--font-family-base`
- **Spacing & Border Radius**: Various CSS variables

## 📝 Adding Content

1. Create markdown files in the `www/[LANGUAGE]/` directories
2. File names are automatically converted to navigation menu items
3. The website automatically:
   - Parses markdown files
   - Generates breadcrumb navigation
   - Creates sidebar menus
   - Applies consistent styling

### Example File Structure
```
www/
├── EN-US/
│   ├── Getting Started.md
│   ├── Guides/
│   │   ├── Installation.md
│   │   └── Configuration.md
│   └── API/
│       └── Reference.md
└── PT/
    ├── Começar.md
    └── Guias/
        └── Instalação.md
```

## 🔧 Advanced Configuration

### Update Site Metadata
Edit `config.json` to customize:
- Site title and description
- Brand colors
- Default language
- Server port

### Modify Templates
Edit files in `views/` directory:
- `index.ejs` - Home page layout
- `content.ejs` - Content page layout
- `_menu.ejs` - Navigation menu

## 📦 API Endpoints

### Get Menu Structure
```bash
GET /api/menu/:lang
```

Example response:
```json
{
  "menu": [
    {
      "label": "Getting Started.md",
      "url": "/content/EN-US/Getting%20Started.md",
      "isFile": true
    },
    {
      "label": "Guides",
      "isDirectory": true,
      "submenu": [...]
    }
  ],
  "language": "EN-US"
}
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Using Docker
Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Deploy to Azure, AWS, or Heroku
1. Build the Docker image
2. Push to your container registry
3. Deploy using your platform's deployment tool

## 🌐 Multi-Language Support

The site automatically detects available languages from the `www/` folder structure:
- **Language codes**: `EN-US`, `PT`, `ARF`
- **Switching languages**: Click language buttons in header or use `?lang=CODE` query parameter
- **Menu updates**: Navigation automatically updates when language is changed

## 🔍 Troubleshooting

### Port Already in Use
Change the port in `config.json` or use:
```bash
PORT=8080 npm run dev
```

### Content Not Appearing
1. Ensure markdown files are in `www/[LANGUAGE]/` directories
2. Check file extensions are `.md`
3. Restart the server after adding new content

### Styling Issues
1. Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
2. Check `public/styles/` files for errors
3. Verify CSS variables in `brand.css`

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [EJS Templating](https://ejs.co/)
- [Marked Markdown Parser](https://marked.js.org/)
- [Microsoft Design System](https://fluent2.microsoft.design/)

## 📄 License

This project is part of the AI Content Authoring showcase.

---

**Questions or need customization?** Check the configuration files and template files to extend functionality!
