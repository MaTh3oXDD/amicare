# Hero 3D Blob — Design

## Goal

Replace the static hero background image (`centrum-020.webp`) on the home landing page with an animated 3D blob: continuously rotating, and reacting to page scroll (extra rotation, parallax translate, fade/scale out as the hero leaves the viewport).

## Context

- Home page: `src/app/pages/home/home.html` / `home.ts`. Hero is a `<section class="hero">` with a full-bleed `<img class="hero__bg">` and text/CTA on top.
- Angular 20, standalone components, no SSR (client-side only — no platform guards needed).
- Existing `ScrollReveal` service (`src/app/services/scroll-reveal.ts`) already establishes the pattern for this app: `NgZone.runOutsideAngular` for perf-sensitive work, and a `prefers-reduced-motion` check that disables animation entirely.
- No 3D library currently in `package.json`. Three.js will be a new dependency.

## Approach

**Library**: Three.js, added as a dependency, dynamically `import()`ed inside the new component so it's code-split out of the main bundle and only loaded on the home page.

**Component**: New standalone `HeroBlob` component at `src/app/components/hero-blob/`, rendering a `<canvas>` that fills the hero section (`position: absolute; inset: 0`), replacing the `<img class="hero__bg">`. Imported into `Home`'s component `imports` array and placed in `home.html` in place of the current `hero__bg` img.

**Geometry/material**: `IcosahedronGeometry` with a moderately high subdivision level, vertices displaced by simplex noise for an organic, non-uniform blob shape (computed once at init, or animated slowly over time for subtle surface wobble). `MeshPhysicalMaterial` using the site's brand color with some sheen/transmission for a soft, clean medical look. One directional key light + ambient fill light. Camera: perspective, fixed distance, framing the blob within the hero bounds.

**Animation loop**: Driven by `requestAnimationFrame`, started inside `NgZone.runOutsideAngular` (matching `ScrollReveal`'s pattern) so Angular change detection isn't triggered every frame.

- **Idle**: slow continuous rotation on independent X/Y axes, plus the subtle noise-driven surface wobble.
- **Scroll-linked**: a passive `scroll` listener reads `window.scrollY` (or hero's bounding rect) and stores a normalized "how far has the hero scrolled past" value; the rAF loop reads that value each frame to add: extra rotation delta, a vertical parallax translate of the blob mesh, and a fade (opacity via a fullscreen fade overlay or material opacity) + slight scale-down as the hero exits the viewport. No heavy work happens inside the scroll listener itself — it only updates a stored number.

**Sizing**: `ResizeObserver` on the hero container updates renderer size and camera aspect ratio on resize.

**Fallbacks / guards**:

- `prefers-reduced-motion: reduce` (same media query used by `ScrollReveal`): render the blob in a static pose (no rotation, no scroll parallax, no wobble). Do not skip rendering entirely — just freeze all animation, consistent with how `ScrollReveal` treats reduced motion (content still appears, just without the animated transition).
- No WebGL support, or Three.js init throws: catch the error and fall back to rendering the original static `centrum-020.webp` `<img>` background instead (keep the image asset in place as a fallback path, not deleted).
- Mobile / smaller viewports: reduce icosahedron subdivision level and cap `renderer.setPixelRatio` (e.g. max 2) to control GPU/battery cost.

**Cleanup**: `ngOnDestroy` cancels the rAF loop, disposes geometry/material/renderer, disconnects the `ResizeObserver`, and removes the scroll listener.

## Non-goals

- No interactivity beyond scroll (no mouse-follow, no click/drag).
- No CMS/config for blob color or shape — brand color is hardcoded to match existing design tokens.
- No SSR/prerendering concerns (app has none).

## Testing / verification

No automated visual test. Verify manually via `ng serve`:

1. Hero renders the rotating blob in place of the old background image.
2. Scrolling the home page visibly drives extra rotation/parallax/fade on the blob.
3. Emulating `prefers-reduced-motion: reduce` in devtools freezes the blob (no rotation, no scroll reaction) without breaking layout.
4. Throttled/mobile viewport in devtools: check frame rate is acceptable and the fallback image path still exists in code (can be forced by breaking WebGL detection temporarily) as a manual smoke check, not required to demo live.
5. `npm run build` succeeds and Three.js appears in its own lazy chunk, not the main bundle.
