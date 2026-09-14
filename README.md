# Badsha Faysal — Portfolio Website

Modern personal portfolio for **Badsha Faysal**, Senior Structural Detailer (Steel & Civil).

## Folder Structure (easy daily updates)

```
badsha-portfolio/
├── index.html          ← Main page
├── css/
│   └── style.css       ← All styles
├── js/
│   └── main.js         ← Theme, filters, animations
├── images/             ← Project photos & profile
├── videos/             ← 3D model reels
├── icons/              ← (optional extra icons)
├── posts/              ← Daily work updates (future)
└── README.md
```

## Features
- Real 3D video reel in hero (auto-plays when visible)
- Dark / Light mode
- Project filter (Industrial / Multi-storey / Portal)
- LinkedIn + Email + Phone + WhatsApp contact icons
- Clean steel-structure logo
- Smooth scroll animations
- Fully responsive
- Ready for free hosting

## Free Publishing (GitHub Pages)

1. Create GitHub account → New repository named: **`badshafaysal.github.io`**
2. Upload **all folders and files** from this package
3. Settings → Pages → Deploy from branch `main` / root
4. Site live at: **https://badshafaysal.github.io**

## How to update daily

### Add a new project image
1. Put the image in `images/` (e.g. `project-14.jpg`)
2. Copy one of the existing project cards in `index.html` and change the image path + text

### Add a new video
1. Put the video in `videos/`
2. Update the `<video src="...">` in the hero section of `index.html`

### Future daily posts
You can later add simple HTML files inside `posts/` and link them from the main page.

## Contact form
Currently opens your email app.  
For a real form later: use free Formspree and replace the form action.

---

Built for free · Modular · Easy to update
