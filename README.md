# FIX MAN UNITED

**WE CAN'T FIX THE CLUB. BUT WE CAN FIX THE TABLE.**

A meme web app for Manchester United fans. Drag United anywhere from 1st to 20th while the other 19 clubs stay locked in place.

## Stack

- React + Vite + TypeScript
- Tailwind CSS
- [@dnd-kit](https://dndkit.com/) for drag and drop
- Framer Motion, Lucide React, html-to-image

## Local development

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Deploy on Vercel

1. Push this repo to GitHub (or import directly).
2. Create a new project on [Vercel](https://vercel.com).
3. Framework preset: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`

No environment variables required.

## How it works

- Manchester United starts at **18th**.
- Only United is draggable; other clubs shift by one place when you drop United on a row.
- Reactions and the delusion meter update with every position change.
- **Share** uses the Web Share API when available; otherwise downloads a PNG.

---

*This is a meme. Don't take it seriously.*