# VÉLORA SKY PALACE — 3D Model Package

Real-time WebGL models of the flagship residence. Built procedurally with Three.js and
exported as binary glTF. No external dependencies, no baked textures — fully material-driven
so the web app can restyle (clay, bronze, night mode) at runtime.

## Files
| File | Size | Contents |
|---|---|---|
| `velora-sky-palace-full.glb` | ~108 KB | Everything: architecture, glass, pool, palms, rooftop, furniture |
| `velora-sky-palace-webgl.glb` | ~87 KB | Real-time build: reduced palm LOD (4 fronds), no furniture — use this in the app |
| `velora-sky-palace-exterior.glb` | ~102 KB | Exterior only (no presentation furniture) |
| `velora-sky-palace-shell.glb` | ~26 KB | Architectural shell: single clay material, no glass/palms — massing & clay renders |
| `hotspots.json` | — | Interactive "HOVER TO EXPLORE" anchor points + suggested camera moves |

## Specs
- Units: **meters**, up axis **Y**, origin at plot center.
- Plot: 70 × 50 m. Building height ~19 m, three stacked volumes (26×6.5×18 / 20×5.5×14 / 15×5×12).
- Geometry: ~4–6k triangles total — far below real-time budgets. `three` GLTFLoader ready.
- All major components are **named** for raycasting / highlighting:
  `Volume-01..03`, `Terrace-01..02`, `Glass-Front-01..03`, `Glass-Side-01`, `Pool`,
  `Pool-Rim`, `Pool-Deck`, `Rooftop-Deck`, `Rooftop-Pool`, `Rooftop-Railing-*`,
  `Entrance-Canopy`, `Entrance-Door`, `Entrance-Column-01/02`, `Garage`,
  `Driveway`, `Palm-01..06`, `Lounge-Chair-01..03`, `Site`.

## Interactive model concept (hotspots.json)
Seven conceptual areas with marker `position` + suggested `camera` fly-to:
Main Entrance · Living Room · Master Suite · Infinity Pool · Cantilevered Terrace · Rooftop · Private Garage.

Quick Three.js wiring:
```ts
const hotspots = await (await fetch('hotspots.json')).json();
// create one THREE.Sprite per hotspot at h.position, then:
//  - pointermove: raycaster.intersectObjects(sprites) → show label/cta
//  - click: tween camera.position → h.camera.position, controls.target → h.camera.target
```
A working demo (OrbitControls, ACES tone mapping, warm key light, hotspot fly-tos) lives in `/demo`
— open the live preview or run `python3 demo/serve.py` and visit `/demo`.

## Rebuilding
`cd tools && node build-models.mjs` regenerates all four GLBs (edits to materials, proportions
or named components go in `tools/build-models.mjs`).
