# Rallypoint One Resource Guides

Technical publications and research from Rallypoint One LLC.

**Live Site:** [https://rallypointone.github.io/resource-guides](https://rallypointone.github.io/resource-guides)

---

## Quick Start (5 Minutes)

### Step 1: Create the Repository

1. Go to [github.com/RallypointOne](https://github.com/RallypointOne)
2. Click **"New repository"**
3. Name it: `resource-guides`
4. Set to **Public** (required for free GitHub Pages)
5. **Do NOT** initialize with README (we're uploading files)
6. Click **"Create repository"**

### Step 2: Upload Files

**Option A: GitHub Web Upload (Easiest)**
1. On your new empty repo page, click **"uploading an existing file"**
2. Drag and drop ALL files from this folder
3. Click **"Commit changes"**

**Option B: Git Command Line**
```bash
cd resource-guides
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/RallypointOne/resource-guides.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to **Settings** → **Pages** (left sidebar)
2. Under "Build and deployment":
   - Source: **GitHub Actions**
3. That's it! The workflow will run automatically.

### Step 4: Wait ~2 Minutes

The GitHub Action will build and deploy your site. Check progress at:
- **Actions** tab → See the running workflow

Your site will be live at:
**https://rallypointone.github.io/resource-guides**

---

## Adding New Documents

### Method 1: Quick Add (Recommended)

1. Create a new `.md` file in the `docs/` folder
2. Add this frontmatter at the top:

```yaml
---
layout: default
title: Your Document Title
nav_order: 3
description: "Brief description for search"
has_toc: true
---

# Your Document Title

Your content here...
```

3. Commit and push — the site updates automatically in ~2 minutes

### Method 2: Using GitHub Web Interface

1. Go to your repository on GitHub
2. Navigate to `docs/` folder
3. Click **"Add file"** → **"Create new file"**
4. Name it `your-document.md`
5. Paste your markdown content with frontmatter
6. Click **"Commit new file"**

---

## File Structure

```
resource-guides/
├── _config.yml              # Site configuration
├── _sass/
│   ├── color_schemes/
│   │   └── rp1.scss         # RP1 brand colors
│   └── custom/
│       └── custom.scss      # Custom styles (hover footnotes, tables)
├── _includes/
│   └── head_custom.html     # Custom scripts
├── assets/
│   ├── images/
│   │   └── logo.png         # RP1 logo
│   └── js/
│       └── footnotes.js     # Hover tooltip functionality
├── docs/
│   └── ml-downscaling-naval.md  # Your research documents go here
├── index.md                 # Homepage
├── Gemfile                  # Ruby dependencies
└── .github/
    └── workflows/
        └── deploy.yml       # Auto-deployment workflow
```

---

## Customization

### Change Colors

Edit `_sass/color_schemes/rp1.scss`:
```scss
$rp1-red: #c23a2b;      // Primary accent
$rp1-charcoal: #4a4a4a; // Text/headings
```

### Update Site Title

Edit `_config.yml`:
```yaml
title: Rallypoint One Resource Guides
description: Your description here
```

### Change Navigation Order

In each document's frontmatter, adjust `nav_order`:
```yaml
nav_order: 2  # Lower numbers appear first
```

---

## Features

- ✅ **Sticky sidebar navigation** - Always know where you are
- ✅ **Hover footnotes** - See citations without scrolling
- ✅ **Full-text search** - Find content across all documents
- ✅ **Mobile responsive** - Works on all devices
- ✅ **Auto-deploy** - Push changes, site updates automatically
- ✅ **SEO optimized** - Proper meta tags and sitemap

---

## Troubleshooting

**Site not updating?**
- Check the Actions tab for build errors
- Ensure GitHub Pages is set to "GitHub Actions" source

**Footnotes not showing tooltips?**
- Clear browser cache (Ctrl+Shift+R)
- Check browser console for JavaScript errors

**Logo not showing?**
- Verify `assets/images/logo.png` exists
- Check `_config.yml` has correct path

---

## Support

For issues with this template, contact your technical team or refer to:
- [Just the Docs Documentation](https://just-the-docs.github.io/just-the-docs/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

---

© 2025 Rallypoint One LLC
