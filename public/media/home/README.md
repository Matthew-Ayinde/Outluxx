# Outluxx Homepage Media

The homepage immersive carousel supports both image and video slides.

## Naming convention
For each slide, use the same base name:
- `slide-1.svg` (or `.jpg/.png`) as image fallback/poster
- `slide-1.mp4` as autoplay background video

Current carousel expects:
- `slide-1.mp4`
- `slide-2.mp4`
- `slide-3.mp4`

If an `.mp4` file is missing, the browser will still show the poster image when available.
