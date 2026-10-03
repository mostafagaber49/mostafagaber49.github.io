# Mostafa Gaber — Cinematic 3D Portfolio V4

A cinematic, bilingual (English / Arabic), responsive Back-End Developer portfolio built with React, Vite, Three.js / React Three Fiber, Framer Motion and Lenis.

## Fixed public URL

The project is configured for GitHub Pages with this permanent project URL:

`https://mostafagaber49.github.io/mostafa-gaber-portfolio/`

The URL stays the same when you add projects. GitHub Actions rebuilds and redeploys the same Pages site after every push to `main`.

### One-time setup

1. Create a **public GitHub repository** named `mostafa-gaber-portfolio` under `mostafagaber49`.
2. Upload this project to that repository and push the `main` branch.
3. In GitHub: **Settings → Pages → Source → GitHub Actions**.
4. Wait for the workflow named **Deploy Portfolio to GitHub Pages** to finish.
5. Open the fixed URL above.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Add a new project

Open `src/main.jsx` and add one object to the `projects` array. The project selector automatically includes it.

```js
{
  name: "New Project",
  type: "Backend API",
  desc: "Short project description.",
  stack: ["NestJS", "MongoDB", "Redis"],
  repo: "https://github.com/mostafagaber49/new-project"
}
```

Push to `main` and the same Pages URL updates automatically.

## Language

The language button switches the entire interface between English and Arabic and updates the document direction (`ltr` / `rtl`) automatically.

## Performance decisions

- WebGL DPR is capped to reduce GPU load on high-DPI devices.
- Particle count is reduced on small screens.
- No large external 3D model is required.
- Animations are primarily transform/opacity based.
- `prefers-reduced-motion` is respected.
- GitHub Pages receives a production Vite build through Actions.

## CV

Keep `public/Mustafa_Gaber_CV.pdf` in place to keep the CV buttons working.
