# Badsha Faysal — Portfolio Website (Redesigned)

Elegant, polished personal portfolio for **Badsha Faysal**, Senior Structural Detailer (Steel & Civil).

Built as a fast static site — ready for **Cloudflare Pages** (or any static host).

## Folder Structure

```
badsha-portfolio/
├── index.html          ← Main page
├── css/
│   └── style.css       ← All styles (mobile-first, dark/light)
├── js/
│   └── main.js         ← Theme, nav, filters, lightbox, animations
├── images/             ← Project photos & profile
├── videos/             ← 3D model reel
├── icons/              ← (optional)
├── posts/              ← Future daily updates
└── README.md
```

## Features

### Visual & UX
- Refined dark / light theme with system preference + persistence
- Scroll progress bar
- Sticky glass nav with active section highlighting
- Smooth scroll-reveal animations (respects prefers-reduced-motion)
- Animated skill marquee
- Animated stats counters
- Project lightbox (click any card)
- Hover micro-interactions on cards, buttons, services
- Back-to-top button

### Controls
- Project filters (All / Industrial / Multi-storey / Portal)
- Hero video: autoplay when in view + play/pause + mute controls
- Slide-in mobile drawer menu
- Contact form → mailto with pre-filled subject & body

### Performance & Responsive
- Mobile-first CSS, excellent phone & desktop layouts
- Lazy-loaded images, metadata-preload for video
- Lightweight vanilla JS (no frameworks)
- Semantic HTML + ARIA for accessibility
- Ready for Cloudflare Pages (just upload the folder or connect the repo)

## Deploy to Cloudflare Pages (Free)

1. Zip the `badsha-portfolio` folder **or** push to GitHub.
2. In Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages**.
3. Connect repo **or** upload the folder.
4. Build settings:
   - Framework preset: **None**
   - Build command: *(leave empty)*
   - Output directory: `/` (or the folder root if the site is at root)
5. Deploy. Your site is live on `*.pages.dev` (custom domain optional).

No build step required — pure HTML/CSS/JS.

## Local preview

Open `index.html` in a browser, or serve with any static server:

```bash
npx serve .
# or
python -m http.server 8080
```

## Content updates

- **Projects**: edit the cards inside `#projects` in `index.html` (keep `data-category`, `data-title`, `data-desc`, `data-tags`).
- **Images**: replace files in `images/` (same filenames or update paths).
- **Video**: replace `videos/portfolio-reel.mp4`.
- **Contact**: email / phone / LinkedIn are in the Contact section and form handler.
