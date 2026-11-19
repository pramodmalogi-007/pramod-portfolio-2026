# Pramod Shrishail Maloji – Portfolio
Static React + Vite + Three.js site. No backend.

## Run locally
    npm install
    npm run dev        # dev server
    npm run build      # production build -> dist/
    npm run preview

## Edit
- Content: `src/data.js` · Resume file: `public/resume/Pramod_Maloji_Resume.pdf`
- Portrait: `public/images/pramod.png` (transparent PNG), drawn onto the hero frame by `portraitTexture()` in `src/components/three.jsx`.

## Deploy to GitHub Pages (later)
1. Create a repo named `pramod-portfolio` (the Vite `base` in `vite.config.js` is `/pramod-portfolio/`; change it if the repo name differs).
2. `git init && git add . && git commit -m "Initial commit" && git branch -M main`
3. `git remote add origin https://github.com/pramodmalogi-007/pramod-portfolio.git && git push -u origin main`
4. Repo → Settings → Pages → Source: **GitHub Actions**. The included workflow builds and deploys on every push to `main`.
Site URL: https://pramodmalogi-007.github.io/pramod-portfolio/
