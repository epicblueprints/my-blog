# My Blog

A personal blog built with Next.js 14, TypeScript, and Tailwind CSS.

Visit: https://www.sauravray.net

## 🚀 Quick Start for Development

### Prerequisites
- Node.js 18+ 
- npm, pnpm, or yarn

### Installation

```bash
# Install dependencies
npm install
# or if using pnpm
pnpm install
```

### Development Workflow

#### 1. Start Development Server
```bash
# Standard development mode
npm run dev

# Turbo mode (faster, experimental)
npm run dev:turbo
```

Your blog will be available at `http://localhost:3000`

#### 2. Make Changes & Test
- Edit files in the `app/` directory
- Changes will auto-reload in your browser
- Check console for any errors

#### 3. Verify Your Changes
```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Run both checks
npm run test
```

#### 4. Production Testing
```bash
# Build for production
npm run build

# Test production build locally
npm run start
```

## Project Structure

The blog is organized into several key directories within the `app/` folder:

- **/blog**: Contains all the long-form blog posts.
- **/notes**: A space for shorter, more frequent updates, organized by month.
- **/til**: "Today I Learned" posts for capturing quick insights.
- **/components**: Reusable React components used throughout the site.
- **/lib**: Utility functions and helpers, including MDX processing.

The main pages and layout are defined in `app/page.tsx` and `app/layout.tsx`.

## 🛠️ Common Development Tasks

### Adding Content

#### New Blog Post
1. Create a new file in `app/blog/posts/`
2. Add your content in MDX format
3. Test locally with `npm run dev`

#### New Notes Entry (Discovery Log)
1. Create a new file in `app/notes/posts/` with format: `month_year_discovery_log.mdx`
2. Keep the file open and append color-coded entries as you discover things
3. Test locally with `npm run dev`

### Viewing Your Content
After running `npm run dev`, visit:
- Homepage: `http://localhost:3000`
- Blog list: `http://localhost:3000/blog`
- Your new article: `http://localhost:3000/blog/modern_web_development_guide`
- **Notes section**: `http://localhost:3000/notes`
- Sample discovery log: `http://localhost:3000/notes/december_2024_discovery_log`

### Article Features
Your new comprehensive article includes:
- **Table of Contents (TOC)**: 
  - **Desktop**: Hover over the menu icon on the left sidebar
  - **Mobile**: Tap the floating button in the bottom-right corner
  - **Scrollable content**: Long TOCs are fully scrollable with custom scrollbars
- **Enhanced Styling**: Beautiful quotes, code blocks, and callout boxes
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Mobile-First**: Touch-friendly interactions with backdrop dismiss
- **Accessibility**: Full keyboard navigation and screen reader support

### Styling Changes
- Edit `app/global.css` for global styles
- Use Tailwind classes for component styling
- Changes will hot-reload automatically

### Troubleshooting
```bash
# Clear cache if you encounter issues
npm run clean

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 🚀 Deployment

This blog is optimized for deployment on Vercel, but can be deployed anywhere that supports Next.js.

```bash
# Production build
npm run build
```

