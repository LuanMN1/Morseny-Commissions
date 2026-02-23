# Morseny Commissions

A front-end art portfolio website for digital art and commissions: characters (icons, busts, full body, RPG tokens), illustrations, and more. Built with React and Vite, with a baby blue palette and bilingual support (Portuguese and English).

## Features

- **Responsive layout** with alternating left/right sections for gallery categories
- **Language switcher** (PT-BR / English) with persistence via `localStorage`
- **Expandable images** — click the expand button on any art card for a near-fullscreen view
- **Smooth navigation** — header links scroll to the correct section (Personagens, Others, Contact)
- **Custom separator** — place a PNG in `public/separador/separador.png` to show between hero and gallery

## Tech stack

- **React 18** + **Vite 5**
- CSS (no UI framework), CSS variables for the baby blue palette
- Fonts: Outfit (body), Playfair Display (headings)

## Getting started

### Prerequisites

- Node.js 18+

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Build for production

```bash
npm run build
```

Output is in `dist/`. Deploy that folder to any static host (Vercel, Netlify, GitHub Pages, etc.).

## Adding your art

1. Put image files in **`public/artes/`** (e.g. `public/artes/my-art.png`).
2. In `src/components/Gallery.jsx`, edit the `artItems` object and set the `image` path for each slot, e.g.:
   - `image: '/artes/my-art.png'`
   - Use `image: null` for placeholder cards (“Add your art”).
3. Optional: set `title` for a caption and `ratio` to `'1'` (square), `'portrait'` (3:4), or `'thumb'` (16:9).

## Customization

- **Footer links** — Edit `src/components/Footer.jsx` to update Instagram, Twitter/X, or add email.
- **Separator image** — Add `public/separador/separador.png`; it appears between the hero and the gallery. Omit it if you don’t want a separator.
- **Translations** — All UI strings are in `src/translations.js` (PT and EN). Adjust or add keys there.

## Project structure

```
src/
  components/     # Header, Hero, Gallery, ArtCard, Footer
  contexts/       # LanguageContext (pt/en)
  data/           # categories
  translations.js # PT-BR and EN strings
public/
  artes/          # Your artwork images
  separador/      # Optional separator PNG
```

## Pushing to GitHub

1. Create a new repository on GitHub named **Morseny Commissions** (e.g. **Morseny-Commissions**): [github.com/new](https://github.com/new). Leave “Add a README” unchecked (this project already has one).
2. In this project folder, run (replace `YOUR_USERNAME` with your GitHub username):

```bash
git remote add origin https://github.com/YOUR_USERNAME/Morseny-Commissions.git
git push -u origin main
```

## License

Private / personal use. Adjust as needed for your portfolio.
