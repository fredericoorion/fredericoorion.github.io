# Frederico Orion — Portfolio

Personal portfolio website built with pure HTML, CSS, and vanilla JavaScript. No frameworks, no build tools, no dependencies.

**Live site:** [fredericoorion.github.io](https://fredericoorion.github.io)

---

## Built with

- HTML5 — semantic markup
- CSS3 — custom properties, CSS Grid, Flexbox, scroll animations
- Vanilla JavaScript — no libraries
- [Devicons](https://devicons.github.io/devicon/) — tech stack icons via CDN
- [Google Fonts](https://fonts.google.com/) — Syne + Outfit

## Features

- Typewriter hero with cycling roles
- Scroll-triggered fade-in animations with staggered children
- Fixed nav with blur-on-scroll and active section tracking
- Responsive — mobile-first, hamburger nav on small screens
- Project cards with clickable preview images
- Client-side validated contact form
- Accessible — semantic HTML, ARIA labels, `prefers-reduced-motion` support
- No build step — works on GitHub Pages out of the box

## Structure

```
/
├── index.html      — single-page layout, all sections
├── styles.css      — all styles, CSS variables, responsive breakpoints
├── script.js       — initNav, initTypewriter, initScrollAnimations, initContactForm
└── assets/
    ├── profile.png
    ├── preview-cafe-api.jpg
    ├── preview-email.jpg
    └── preview-portfolio.jpg
```

## Running locally

Open `index.html` directly in a browser — no server needed.

Or serve it locally to avoid any browser path restrictions:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Contact

[linkedin.com/in/fredericoorion](https://www.linkedin.com/in/fredericoorion/) · [github.com/fredericoorion](https://github.com/fredericoorion)
