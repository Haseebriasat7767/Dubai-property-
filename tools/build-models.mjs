/**
 * VÉLORA SKY PALACE — procedural architectural model generator.
 * Builds a clean, real-time-friendly GLB set (full / webgl / exterior / shell)
 * with named components so the web app can raycast and highlight areas.
 * Units: meters. Up axis: Y. Origin: center of the plot.
 */
// Node polyfill for GLTFExporter's binary path (browser API)
if (typeof globalThis.FileReader === 'undefined') {
  globalThis.FileReader = class {
    readAsArrayBuffer(blob) {
      blob.arrayBuffer().then((buf) => {
        this.result = buf;
        if (this.onloadend) this.onloadend();
      });
    }
  };
}

import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, '3d-models');

const cache = new Map();
const mat = (key, overrides = {}) => {
  const k = key + JSON.stringify(overrides);
  if (cache.has(k)) return cache.get(k);
  let m;
  switch (key) {
    case 'travertine': m = new THREE.MeshStandardMaterial({ color: 0xE3D9C6, roughness: 0.85 }); break;
    case 'travertineLight': m = new THREE.MeshStandardMaterial({ color: 0xEDE4D3, roughness: 0.85 }); break;
    case 'bronze': m = new THREE.MeshStandardMaterial({ color: 0x4A3B2A, roughness: 0.35, metalness: 0.85 }); break;
    case 'glass': m = new THREE.MeshStandardMaterial({ color: 0x9FB4C4, roughness: 0.08, metalness: 0.2, transparent: true, opacity: 0.28 }); break;
    case 'darkStone': m = new THREE.MeshStandardMaterial({ color: 0x232019, roughness: 0.95 }); break;
    case 'water': m = new THREE.MeshStandardMaterial({ color: 0x10262E, roughness: 0.06, metalness: 0.55 }); break;
    case 'trunk': m = new THREE.MeshStandardMaterial({ color: 0x6B5B45, roughness: 1 }); break;
    case 'leaf': m = new THREE.MeshStandardMaterial({ color: 0x42503B, roughness: 1, side: THREE.DoubleSide }); break;
    case 'clay': m = new THREE.MeshStandardMaterial({ color: 0xCFC9BF, roughness: 0.95 }); break;
    default: m = new THREE.MeshStandardMaterial();
  }
  Object.assign(m, overrides);
  cache.set(k, m);
  return m;
};

function box(w, h, d, material, x, y, z, name) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  m.position.set(x, y, z);
  if (name) m.name = name;
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

function palm(x, z, h, frondCount) {
  const g = new THREE.Group();
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.22, h, 6), mat('trunk'));
  trunk.position.y = h / 2;
  g.add(trunk);
  const crown = new THREE.Group();
  crown.position.y = h - 0.15;
  for (let i = 0; i < frondCount; i++) {
    const a = (i / frondCount) * Math.PI * 2;
    const arm = new THREE.Group();
    arm.rotation.y = a;
    const f = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 0.55), mat('leaf'));
    f.position.set(1.45, 0, 0);
    f.rotation.z = -0.72;
    arm.add(f);
    crown.add(arm);
  }
  g.add(crown);
  g.position.set(x, 0.4, z);
  return g;
}

/**
 * @param {object} o
 * @param {boolean} o.shell     architectural-shell (clay) version
 * @param {boolean} o.furniture loungers & rooftop furniture
 * @param {boolean} o.palms     landscaping palms
 * @param {number}  o.fronds    fronds per palm (lod)
 */
function buildScene(o) {
  const shell = !!o.shell;
  const g = new THREE.Group();
  g.name = 'VeloraSkyPalace';
  const m = (k) => (shell ? mat('clay') : mat(k));

  // Site
  g.add(box(70, 0.4, 50, m('darkStone'), 0, 0.2, 0, 'Site'));

  // Stacked floating volumes
  g.add(box(26, 6.5, 18, m('travertine'), 0, 3.65, -2, 'Volume-01'));
  g.add(box(20, 5.5, 14, m('travertine'), -4, 10.0, -4, 'Volume-02'));
  g.add(box(15, 5.0, 12, m('travertine'), 3, 15.8, -6, 'Volume-03'));

  // Cantilevered terraces
  g.add(box(30, 0.35, 10.5, m('travertineLight'), 0, 7.1, 4.25, 'Terrace-01'));
  g.add(box(24, 0.35, 9, m('travertineLight'), -4, 13.1, 3, 'Terrace-02'));

  // Glass curtain walls
  if (!shell) {
    g.add(box(25, 5.4, 0.12, mat('glass'), 0, 3.6, 7.02, 'Glass-Front-01'));
    g.add(box(19, 4.4, 0.12, mat('glass'), -4, 10.0, 3.02, 'Glass-Front-02'));
    g.add(box(14, 4.0, 0.12, mat('glass'), 3, 15.8, 0.02, 'Glass-Front-03'));
    g.add(box(0.12, 5.4, 17, mat('glass'), 13.02, 3.6, -2, 'Glass-Side-01'));
  }

  // Main entrance
  g.add(box(10, 0.35, 5, m('bronze'), -8, 5.2, 9.5, 'Entrance-Canopy'));
  g.add(box(0.25, 5.0, 0.25, m('bronze'), -12.2, 2.5, 11.5, 'Entrance-Column-01'));
  g.add(box(0.25, 5.0, 0.25, m('bronze'), -3.8, 2.5, 11.5, 'Entrance-Column-02'));
  g.add(box(4.5, 3.6, 0.25, m('bronze'), -8, 2.2, 7.1, 'Entrance-Door'));

  // Private garage (recessed)
  g.add(box(9, 4.6, 7, m('darkStone'), -18.5, 2.7, -6, 'Garage'));

  // Pool + deck
  g.add(box(34, 0.3, 13, m('travertineLight'), 0, 0.42, 16, 'Pool-Deck'));
  g.add(box(30, 0.5, 9.5, m('travertine'), 0, 0.75, 16, 'Pool-Rim'));
  if (!shell) g.add(box(28.4, 0.18, 7.9, mat('water'), 0, 0.72, 16, 'Pool'));

  // Rooftop
  g.add(box(17, 0.3, 14, m('travertineLight'), 3, 18.45, -6, 'Rooftop-Deck'));
  if (!shell) {
    g.add(box(17, 1.1, 0.06, mat('glass'), 3, 19.15, 1, 'Rooftop-Railing-Front'));
    g.add(box(17, 1.1, 0.06, mat('glass'), 3, 19.15, -13, 'Rooftop-Railing-Rear'));
    g.add(box(0.06, 1.1, 14, mat('glass'), -5, 19.15, -6, 'Rooftop-Railing-Left'));
    g.add(box(0.06, 1.1, 14, mat('glass'), 11, 19.15, -6, 'Rooftop-Railing-Right'));
    g.add(box(8, 0.25, 4, mat('water'), 6, 18.72, -4, 'Rooftop-Pool'));
  }

  // Driveway
  g.add(box(10, 0.18, 30, m('darkStone'), -17, 0.24, 14, 'Driveway'));

  // Landscaping
  if (o.palms !== false) {
    const fronds = o.fronds ?? 6;
    for (let i = 0; i < 6; i++) {
      const p = palm(8 + i * 4, 10.5, 7 + i * 0.15, fronds);
      p.name = `Palm-0${i + 1}`;
      g.add(p);
    }
  }

  // Furniture (presentation build only)
  if (o.furniture && !shell) {
    const spots = [[-14, 13], [-10.5, 13.6], [-14, 17.2]];
    spots.forEach(([x, z], i) => {
      const l = box(0.7, 0.45, 1.9, m('travertineLight'), x, 0.79, z, `Lounge-Chair-0${i + 1}`);
      g.add(l);
    });
  }

  const scene = new THREE.Scene();
  scene.add(g);
  return scene;
}

const exporter = new GLTFExporter();
function exportScene(scene, file) {
  return new Promise((resolve, reject) => {
    exporter.parse(
      scene,
      (glb) => {
        writeFileSync(join(out, file), Buffer.from(glb));
        console.log('wrote', file, (glb.byteLength / 1024).toFixed(1) + ' KB');
        resolve();
      },
      (e) => reject(e),
      { binary: true }
    );
  });
}

const t0 = Date.now();
await exportScene(buildScene({ furniture: true, fronds: 6 }), 'velora-sky-palace-full.glb');
await exportScene(buildScene({ furniture: false, fronds: 4 }), 'velora-sky-palace-webgl.glb');
await exportScene(buildScene({ furniture: false, fronds: 6 }), 'velora-sky-palace-exterior.glb');
await exportScene(buildScene({ shell: true, palms: false }), 'velora-sky-palace-shell.glb');
console.log('done in', ((Date.now() - t0) / 1000).toFixed(1) + 's');
