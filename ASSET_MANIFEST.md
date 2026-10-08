# VÉLORA DUBAI — Asset Manifest

Status: ⬜ pending · 🟨 in progress · ✅ delivered
Photographic assets are generated as `.jpg` then converted to `.webp` (q85).
All prompts are composed verbatim from the DNA blocks in `brand/BRAND.md` §7.

## 2 · Sky Palace — flagship (properties/sky-palace/) ✅ PASS 1
| # | Asset | File | Status |
|---|---|---|---|
| A | Front exterior hero | velora-sky-palace-front | ✅ |
| B | Three-quarter exterior | velora-sky-palace-three-quarter | ✅ |
| C | Side architectural view | velora-sky-palace-side | ✅ |
| D | Rear pool view | velora-sky-palace-rear-pool | ✅ |
| E | Night exterior | velora-sky-palace-night | ✅ |
| F | Sunset exterior | velora-sky-palace-sunset | ✅ |
| G | Aerial property view | velora-sky-palace-aerial | ✅ |
| H | Close architectural detail | velora-sky-palace-detail | ✅ |
| I | Entrance / driveway | velora-sky-palace-entrance | ✅ |
| J | Rooftop view | velora-sky-palace-rooftop | ✅ |

## 3 · Hero (hero/)
| Asset | File | Status |
|---|---|---|
| Desktop 16:9 | velora-hero-desktop | ⬜ (next pass) |
| Mobile 9:16 | velora-hero-mobile | ⬜ (next pass) |

## 4 · Dubai (dubai/) ⬜ (next pass)
dubai-downtown-skyline · dubai-burj-khalifa · dubai-marina-skyline · dubai-palm-jumeirah-aerial ·
dubai-waterfront · dubai-downtown-sunset · dubai-downtown-blue-hour · dubai-skyline-night ·
dubai-palm-jumeirah-sunset · dubai-marina-night

## 5 · Penthouse (properties/penthouse/) ⬜
velora-penthouse-living · -dining · -kitchen · -bedroom · -bathroom · -wardrobe ·
-office · -terrace · -pool · -night-skyline

## 6 · Palm Villa (properties/palm-villa/) ⬜
velora-palm-villa-exterior-front · -exterior-rear · -pool · -garden · -entrance · -living ·
-dining · -kitchen · -bedroom · -bathroom · -wardrobe · -cinema · -gym · -rooftop · -waterfront

## 7 · Marine Residence (properties/marine-residence/) ⬜
velora-marine-exterior-ocean · -private-beach · -infinity-pool · -waterfront-terrace ·
-living · -bedroom · -bathroom · -outdoor-lounge · -sunset · -night

## 8 · Materials (materials/) ⬜
white-travertine · beige-limestone · dark-marble · champagne-metal · dark-walnut ·
smoked-glass · brushed-metal · premium-stone · architectural-concrete · water-surface · luxury-fabric

## 9 · Architectural Details (architecture/) ⬜
door-handles · marble-surface · staircase · glass-wall · architectural-lighting ·
pool-edge · water-reflections · ceiling-detail · luxury-furniture · stone-wall · metallic-detail

## 10 · 3D Models (3d-models/) ✅ PASS 1
velora-sky-palace-full.glb · velora-sky-palace-webgl.glb · velora-sky-palace-exterior.glb ·
velora-sky-palace-shell.glb · (26–108 KB, named components, see MODEL.md)

## 11 · Interactive Model ✅ PASS 1
3d-models/hotspots.json (7 areas + camera moves) · demo/ live Three.js preview (orbit,
hover markers, click fly-to)

## 12 · Property Cards 16:9 (properties/) ⬜
velora-card-sky-palace · velora-card-palm-villa · velora-card-marine-residence · velora-card-penthouse

## 13 · Detail Galleries (8 per property) ⬜
Mapped from existing shots once properties are delivered (no duplicate generation where a
shot already covers the slot). Sky Palace gallery can be assembled now from its 10 renders:
front / detail / rear-pool / rooftop / night + cross-refs to penthouse interiors for rooms.

## 14 · Map (map/) ⬜
dubai-map-luxury (stylized dark 3D map, champagne markers)

## 15 · Lifestyle (lifestyle/) ⬜
car-arrival · couple-entrance · executive-skyline · rooftop-evening · terrace-dinner ·
poolside-evening · private-lounge · yacht-waterfront

## 16 · Backgrounds (backgrounds/) ⬜
dark-shadows · skyline-blur · marble-close · glass-reflections · water-reflections ·
golden-hour · night-bokeh · abstract-geometry

## 17 · Social (social/) ⬜
velora-social-square (1:1) · velora-social-story (9:16, also mobile) · velora-social-wide (16:9) ·
velora-social-linkedin (1.91:1, cropped from wide)

## 18 · Logo (logo/) ✅ PASS 1
velora-wordmark.svg (currentColor) · -white · -black · -champagne · velora-mark.svg ·
9 PNG renders (2048px, transparent + on-noir mockups)

## Pass log
- **PASS 1** — Brand bible, logo system, Sky Palace 10/10, 3D model set + interactive demo.
- **PASS 2 (next)** — Hero desktop/mobile (2) + Dubai skyline 1–8.
- **PASS 3** — Dubai 9–10 + Penthouse interiors 1–8.
- **PASS 4** — Penthouse 9–10 + Palm Villa 1–8.
- **PASS 5** — Palm Villa 9–15 + Marine 1–3.
- **PASS 6** — Marine 4–10 + Materials 1–3.
- **PASS 7** — Materials 4–10 + Details 1–3.
- **PASS 8** — Details 4–10 + Lifestyle 1–3.
- **PASS 9** — Lifestyle 4–8 + Backgrounds 1–5.
- **PASS 10** — Backgrounds 6–8 + Map + Social 3 + Cards 2.
- **PASS 11** — Cards 2 + any gallery gap shots, then final QA + full webp pass.
