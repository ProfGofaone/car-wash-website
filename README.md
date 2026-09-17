# The Boys Mobile Car Wash Website

A responsive, production-style single-page website for **The Boys Mobile Car Wash**.

## Run locally

No build tools are required.

- Option 1: open `/home/runner/work/car-wash-website/car-wash-website/index.html` directly in your browser.
- Option 2 (recommended): serve locally from the repository root:

```bash
cd /home/runner/work/car-wash-website/car-wash-website
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Files

- `index.html` — full page structure and content
- `styles.css` — branding, layout, responsive design, accessibility/focus/reduced motion styles
- `script.js` — mobile menu, gallery filters, booking form validation, subtle section reveals

## Replacing placeholders

### Images

All images are remote URLs in `index.html`. Replace any `<img src="...">` value with your approved business photos.

Recommended replacements:
- Hero: real cleaned vehicle photo
- Services: real service action photos
- Before/After: actual customer result pairs
- Gallery: your own vehicles, team, car wash, facility photos
- Merchandise: your own branded product photos

### Business details still marked as placeholders

Currently marked as "to be confirmed" where data was not provided:
- Email address
- Physical address
- Operating hours
- Final service/package pricing

Update these directly in `index.html` once confirmed.

## Booking form note

The booking form is frontend-only and intentionally submits a **request** message (not a completed booking) until backend integration is added.
