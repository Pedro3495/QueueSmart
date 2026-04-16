# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture

**Entry point**: `server.js` — Express app, EJS view engine, serves static files from `public/`.

**Folder structure:**
- `views/` — EJS templates rendered with `res.render()`
- `public/css/` — one CSS file per page, served as static assets
- `server/db.js` — PostgreSQL Pool connection (reads credentials from `.env`)
- `server/routes/` — route handlers (auth.js, filas.js — currently empty)

**Environment**: `.env` at root with `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `PORT`.

**Request flow**: browser → `server.js` route → `res.render('template')` → EJS view uses `/css/pagename.css`.

**CSS path convention**: always use absolute paths like `/css/login.css` — Express static middleware serves from `public/`, so `public/css/login.css` is accessed as `/css/login.css`.

## Design & Accessibility

- **Font**: Plus Jakarta Sans (400, 500, 600, 700) via Google Fonts
- **Color primary**: `#1b7942` (green); dark panel: `#08321a`
- **Accessibility standard**: WCAG 2.2 Nível AA — 4.5:1 contrast minimum, visible focus rings on all interactives, full keyboard navigation
- **Layout pattern**: auth pages use split-panel (brand left / form right on desktop, stacked on mobile)
- See `.impeccable.md` for full design system reference
