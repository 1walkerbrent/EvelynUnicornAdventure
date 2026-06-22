# Evelyn's Unicorn Adventure

A local-play, browser-based unicorn creature-collector RPG for Evelyn.
Collect creatures, build a team, solve problems, and prove yourself in elemental Trials.

## Getting started

```bash
npm install
npm run dev          # → http://localhost:5173
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start dev server with hot reload |
| `npm test` | Run unit tests (Vitest) |
| `npm run test:watch` | Tests in watch mode |
| `npm run build` | Type-check + production build → `dist/` |
| `npm run preview` | Preview the production build locally |

## Project structure

```
src/
  engine/         Pure functions — types, stat formulas, type-chart (no React)
  content/        Typed data files — creatures, zones (no logic)
  state/          Zustand store + localStorage save/load
  screens/        Top-level React screens (WorldMap, Party)
  components/     Shared UI components (CreatureSprite, Nav)
```

**Rule:** content files never import from engine logic; engine files never import React.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. Vercel auto-detects Vite — leave all settings as default.
4. Click **Deploy**. Live at `https://your-project.vercel.app`.

> **Before shipping:** replace `public/icon.svg` with proper `icon-192.png` and `icon-512.png`
> files and update the PWA manifest in `vite.config.ts` for full installability on all platforms.

## Build milestones

| # | Status | Scope |
|---|---|---|
| M0 | Done | Scaffold, types, save/load, navigation skeleton |
| M1 | Planned | Zone 1 playable — character creation, quests, 3v3 battle engine |
| M2 | Planned | Zones 2–6, Explore mode, real Leonardo art, badge caps |
| M3 | Planned | Polish, audio, balance tuning |
