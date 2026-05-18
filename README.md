# SCP Foundation Database

A premium, cinematic single-page application for browsing SCP Foundation entries. Built with React + Vite.

![SCP Foundation](https://img.shields.io/badge/SCP-Foundation-cc0000?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==)

## Features

- 🔍 **Search** — Filter entries by SCP ID, description, or containment procedures
- 🏷️ **Classification Filters** — Toggle between All, Safe, Euclid, and Keter
- 📋 **Detail Modal** — Click any card to view full SCP documentation
- 🎨 **Dark Cinematic Theme** — Professional SCP Foundation aesthetic
- 📱 **Fully Responsive** — 3-column → 2-column → 1-column grid
- ♿ **Accessible** — ARIA labels, keyboard navigation, focus management
- ⚡ **Smooth Animations** — Card hover effects, modal transitions, staggered load

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 19   | UI Framework |
| Vite 6     | Build Tool & Dev Server |
| Vanilla CSS | Styling (CSS Custom Properties) |
| Inter + Share Tech Mono | Typography (Google Fonts) |

## Getting Started

### Prerequisites

- **Node.js** v18 or later
- **npm** v9 or later

### Run Locally

```bash
# 1. Clone or download the project
cd scp-foundation

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized output will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## Deploy on Netlify

### Option A: Drag & Drop (Easiest)

1. Run `npm run build`
2. Go to [Netlify Drop](https://app.netlify.com/drop)
3. Drag and drop the `dist/` folder
4. Your site is live! 🎉

### Option B: Connect Git Repository

1. Push this project to GitHub
2. Go to [Netlify](https://app.netlify.com) → "New Site from Git"
3. Select your repository
4. Set build command: `npm run build`
5. Set publish directory: `dist`
6. Click "Deploy Site"

## Project Structure

```
scp-foundation/
├── public/
│   └── images/          # SCP images (optional)
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Fixed top navigation
│   │   ├── SearchFilter.jsx # Search + classification filters
│   │   ├── SCPCard.jsx      # Individual entry card
│   │   ├── SCPList.jsx      # Responsive card grid
│   │   └── SCPDetail.jsx    # Detail modal overlay
│   ├── data/
│   │   └── scpData.json     # SCP entries data
│   ├── App.jsx              # Root component (state management)
│   ├── index.css            # Global styles + design system
│   └── main.jsx             # React entry point
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── package.json
└── README.md
```

## Adding SCP Images

Place images in the `public/images/` folder. The `image` field in `scpData.json` should be a relative path like `images/SCP-005.jpg`.

If an image is missing or fails to load, a styled "CLASSIFIED" placeholder is shown automatically.

## License

This project is for educational purposes only. SCP Foundation content is licensed under CC-BY-SA 3.0.
