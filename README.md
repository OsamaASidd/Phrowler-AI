# Phrowler — Marketing Site

A static, no-build single-page site for Phrowler, an Enterprise GPT trained
exclusively on a company's own data.

## Structure

```
├── index.html        one HTML document, all sections as <section id="...">
├── css/style.css      single stylesheet, custom properties for palette/type
├── js/script.js       nav toggle, smooth-scroll, scroll-reveal, stat counters, token-usage bar
├── assets/            phrowler-letters.png (wordmark used inside the logo badge)
└── README.md
```

No framework, no bundler, no package.json. Fonts (Fraunces + Inter) load from
Google Fonts; everything else is self-contained.

## Run locally

Open `index.html` directly in a browser, or serve the folder:

```
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy

Any static host works as-is: GitHub Pages, Netlify, Vercel, or S3 + CloudFront.
