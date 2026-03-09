# Mingxi's Personal Website

Built with Astro and Tailwind CSS. Features sections for academic work, poker games, writing, and more.

## 🚀 Features

- **Design**: Clean black, white, and grey color scheme
- **Responsive**: Works beautifully on all devices
- **Content Management**: Edit content using simple Markdown files
- **Performance**: Built with Astro for optimal speed
- **Stack**: Astro + Tailwind CSS + TypeScript

## 📁 Project Structure

```
/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable Astro components
│   ├── content/         # Markdown content files
│   │   ├── poems/       
│   │   ├── articles/    
│   │   ├── projects/    
│   │   └── poker-games/ 
│   ├── layouts/         # Page layouts
│   ├── pages/           # Website pages
│   └── styles/          # Global styles
└── package.json
```

## 🛠️ Use as a Template

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone this repository
```bash
git clone <your-repo-url>
cd personal-website
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:4321`

## ✏️ Editing Content

All content is managed through Markdown files in the `src/content/` directory.

### Eg. Adding a New Poem

Create a new file in `src/content/poems/`:

```markdown
---
title: "Your Poem Title"
date: "Month Year"
category: "Category Name"
---

Your poem content goes here...
```

### Adding a New Article

Create a new file in `src/content/articles/`:

```markdown
---
title: "Your Article Title"
date: "Month Day, Year"
readTime: "X min"
tags: ["Tag1", "Tag2"]
---

Your article content goes here...
```

### Adding a New Project

Create a new file in `src/content/projects/`:

```markdown
---
title: "Project Name"
description: "Brief description"
tags: ["Tech1", "Tech2"]
github: "https://github.com/username/repo"
featured: true
---

Project details...
```

### Adding a New Poker Game

Create a new file in `src/content/poker-games/`:

```markdown
---
name: "Game Name"
variant: "Hold'em Variant"
description: "Game description"
difficulty: "Easy"
players: "2-10"
rules:
  - "Rule 1"
  - "Rule 2"
---

Additional game information...
```

## 🎨 Customization

### Colors

The site uses a black, white, and grey color scheme. To customize:
- Edit Tailwind classes in component files
- Modify `src/styles/global.css` for custom styles

### Personal Information

Update the following:
1. **Navigation**: Edit initials in `src/components/Navigation.astro`
2. **Footer**: Update social links in `src/components/Footer.astro`
3. **About Page**: Edit your story in `src/pages/about.astro`
4. **Resume**: Add your PDF resume to `public/resume.pdf`

## 🚀 Deployment to GitHub Pages

### Option 1: Automatic Deployment

This project includes a GitHub Actions workflow that automatically deploys to GitHub Pages when you push to the main branch.

1. **Update Site Configuration**:
   Edit `astro.config.mjs`:
   ```js
   site: 'https://yourusername.github.io',
   // If deploying to a repo (not username.github.io), uncomment:
   // base: '/repo-name',
   ```

2. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/repo-name.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Under "Source", select "GitHub Actions"

4. **Done!** Your site will be live at `https://yourusername.github.io/repo-name`

### Option 2: Manual Deployment

```bash
npm run build
# Deploy the ./dist folder to your hosting provider
```

## 📝 Available Commands

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:4321`      |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |

## 🔧 Tech Stack

- **Framework**: [Astro](https://astro.build)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **TypeScript**: Type-safe development
- **Deployment**: GitHub Pages (or any static hosting)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and customize it for your own use!

## 📧 Contact

Update the contact information in:
- `src/components/Footer.astro`
- `src/pages/about.astro`
- `src/pages/misc.astro`

---

Built with ❤️ using Astro and Tailwind CSS
