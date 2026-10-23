# Mallory Chipman — Website

Clean, responsive static site. Plain **HTML + CSS + JS** — no build step, no framework.

https://anatoliikovalenkopro.github.io/mallory/

## Files

```
site/
├── index.html      home
├── bio.html        biography + awards
├── music.html      releases + Spotify embed + platform links
├── tour.html       tour dates + contact form
├── epk.html        electronic press kit
├── styles.css      all styles
└── main.js         shared nav + footer + forms + scroll reveals
```

The nav, footer, and contact form are injected by `main.js` (see the `data-nav`,
`data-footer`, `data-contact-form` attributes), so there's one copy of each to edit.
