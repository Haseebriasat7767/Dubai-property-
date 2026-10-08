# VÉLORA DUBAI — Premium Visual Asset Package

> "Where Architecture Meets Exceptional Living."

A complete, cohesive visual identity and asset package for **VÉLORA DUBAI**, a fictional
ultra-luxury Dubai real-estate brand — built for an interactive React / Three.js /
TypeScript WebGL experience.

**Status:** foundation + flagship delivered (this pass). Remaining photographic sets are
tracked in [`ASSET_MANIFEST.md`](ASSET_MANIFEST.md) and continue in subsequent passes
(10 renders per pass, all sharing the same Prompt DNA so the collection stays one brand).

---

## What's inside

| Folder | Contents |
|---|---|
| `brand/` | **BRAND.md** — identity bible: palette, typography, architecture, cinematic grade, and the **Prompt DNA** that keeps every image consistent |
| `logo/` | VÉLORA wordmark + V mark — hand-built vector SVGs (white / black / champagne, transparent) + 2048px PNG renders, incl. on-noir mockups |
| `hero/` | Cinematic hero stills: desktop 16:9 (left negative space) + mobile 9:16 (top negative space) |
| `properties/sky-palace/` | **Flagship** — 10 photoreal renders: front, 3/4, side, rear pool, night, sunset, aerial, detail, entrance, rooftop (`.webp` + source `.jpg`) |
| `3d-models/` | Real-time GLB set of Sky Palace (full / webgl / exterior / shell, ~26–108 KB), `hotspots.json` for "HOVER TO EXPLORE", `MODEL.md` integration notes |
| `demo/` | Live Three.js preview — orbit the model, hover champagne hotspot markers, click to fly to Entrance / Pool / Rooftop / Master Suite / Garage |
| `dubai/` `interiors/` `lifestyle/` `materials/` `architecture/` `map/` `backgrounds/` `social/` | Remaining sets — see manifest |

## Palette
Noir `#0B0B0C` · Deep Noir `#141416` · Warm Ivory `#F4EFE6` · Champagne `#C6A15B` ·
Architectural Gray `#8A8F98` · Bronze `#6B5B45`

## Live preview
`python3 demo/serve.py` → `http://localhost:8080/` (serves the 3D demo at `/demo`).

## Conventions
- Photographic assets: `.webp` (q85) with source `.jpg` beside it.
- Filenames: `velora-{property}-{view}` / `dubai-{location}-{time}` — no text baked into imagery.
- Every prompt is composed from the verbatim DNA blocks in `brand/BRAND.md` §7 — do not
  paraphrase when generating further assets, or the collection will drift.
