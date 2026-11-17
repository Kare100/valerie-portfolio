/* Valerie's desk in 3D: click the monitor to zoom into ValerieOS */
import * as THREE from 'three';
import { RoundedBoxGeometry } from './vendor/RoundedBoxGeometry.js';
import { RoomEnvironment } from './vendor/RoomEnvironment.js';

const section = document.getElementById('room');
const canvas = document.getElementById('roomCanvas');
const hint = document.getElementById('roomHint');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const coarse = matchMedia('(pointer: coarse)').matches;

function fallback() {
  window.ValerieRoom = { enter: () => window.ValerieOS && window.ValerieOS.open() };
  if (section) section.classList.add('no-webgl');
}

let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
} catch (e) { fallback(); }

if (renderer && section) {
  renderer.setPixelRatio(Math.min(devicePixelRatio, coarse ? 1.5 : 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.92;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#E9D9C4');
  scene.fog = new THREE.Fog('#E9D9C4', 6, 12);
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture;
  scene.environmentIntensity = 0.35;

  const camera = new THREE.PerspectiveCamera(34, 1, 0.05, 50);

  /* ---------- helpers ---------- */
  const mat = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.7, metalness: 0, ...o });
  function box(w, h, d, m, r = 0.01, seg = 3) { const g = r > 0 ? new RoundedBoxGeometry(w, h, d, seg, r) : new THREE.BoxGeometry(w, h, d); const me = new THREE.Mesh(g, m); me.castShadow = true; me.receiveShadow = true; return me; }
  function cyl(rt, rb, h, m, s = 32) { const me = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, s), m); me.castShadow = true; me.receiveShadow = true; return me; }
  function canvasTex(w, h, draw) { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; }
  const at = (o, x, y, z) => { o.position.set(x, y, z); return o; };
  const add = (o, x = 0, y = 0, z = 0) => { o.position.set(x, y, z); scene.add(o); return o; };

  /* ---------- room ---------- */
  const floorTex = canvasTex(1024, 1024, (g, w, h) => {
    for (let i = 0; i < 8; i++) { g.fillStyle = ['#A9744C', '#B17C52', '#A26E46', '#B88458'][i % 4]; g.fillRect(0, i * h / 8, w, h / 8); g.fillStyle = 'rgba(60,30,10,.25)'; g.fillRect(0, i * h / 8, w, 3); g.fillRect(((i * 397) % w), i * h / 8, 3, h / 8); }
    for (let k = 0; k < 1400; k++) { g.fillStyle = `rgba(70,35,10,${Math.random() * .06})`; g.fillRect(Math.random() * w, Math.random() * h, 40 + Math.random() * 120, 1); }
  });
  floorTex.wrapS = floorTex.wrapT = THREE.RepeatWrapping; floorTex.repeat.set(3, 3);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(14, 14), mat('#ffffff', { map: floorTex, roughness: 0.55 }));
  floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
  const rug = new THREE.Mesh(new THREE.CircleGeometry(1.25, 64), mat('#2B3A6B', { roughness: 0.95 })); rug.rotation.x = -Math.PI / 2; rug.position.set(0.1, 0.004, 0.7); rug.receiveShadow = true; scene.add(rug);
  const rug2 = new THREE.Mesh(new THREE.RingGeometry(1.05, 1.15, 64), mat('#FFB547', { roughness: 0.95 })); rug2.rotation.x = -Math.PI / 2; rug2.position.set(0.1, 0.006, 0.7); scene.add(rug2);

  const wallM = mat('#E8D8C2', { roughness: 0.95 });
  const back = new THREE.Mesh(new THREE.PlaneGeometry(14, 6), wallM); back.position.set(0, 3, -0.75); back.receiveShadow = true; scene.add(back);
  const skirting = box(14, 0.12, 0.03, mat('#E2D3BE'), 0); skirting.position.set(0, 0.06, -0.735); scene.add(skirting);

  // window with the Nairobi skyline at sunrise
  const skyTex = canvasTex(1024, 768, (g, w, h) => {
    const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, '#8EC5F0'); gr.addColorStop(.5, '#FFD9B5'); gr.addColorStop(.8, '#FF9F72'); gr.addColorStop(1, '#F2603F'); g.fillStyle = gr; g.fillRect(0, 0, w, h);
    const sg = g.createRadialGradient(700, 520, 10, 700, 520, 260); sg.addColorStop(0, '#FFF6D8'); sg.addColorStop(.35, '#FFD46B'); sg.addColorStop(1, 'rgba(255,181,71,0)'); g.fillStyle = sg; g.fillRect(0, 0, w, h);
    g.fillStyle = 'rgba(123,90,134,.6)'; g.beginPath(); g.moveTo(0, 560); g.bezierCurveTo(200, 480, 380, 540, 520, 500); g.bezierCurveTo(700, 450, 860, 520, 1024, 490); g.lineTo(1024, h); g.lineTo(0, h); g.fill();
    g.fillStyle = '#2A2350';
    [[40, 520, 70, 248], [120, 470, 56, 298], [190, 540, 90, 228], [330, 420, 64, 348], [400, 470, 92, 298], [610, 450, 70, 318], [690, 500, 60, 268], [760, 540, 100, 228], [880, 480, 60, 288], [950, 560, 74, 208]].forEach(([x, y, bw, bh]) => g.fillRect(x, y, bw, bh));
    g.fillRect(500, 360, 60, 408); g.beginPath(); g.ellipse(530, 360, 46, 10, 0, 0, Math.PI * 2); g.fill(); g.fillRect(526, 322, 8, 40); // KICC
    g.fillStyle = '#FFD46B'; for (let i = 0; i < 40; i++) g.fillRect((i * 97) % 1000 + 10, 500 + (i * 53) % 220, 7, 9);
  });
  const winGroup = new THREE.Group();
  const glass = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 1.35), new THREE.MeshBasicMaterial({ map: skyTex, toneMapped: false }));
  winGroup.add(glass);
  const frameM = mat('#FFFFFF', { roughness: 0.5 });
  [[0, 0.7, 1.9, 0.06], [0, -0.7, 1.9, 0.06], [-0.93, 0, 0.06, 1.46], [0.93, 0, 0.06, 1.46], [0, 0, 0.04, 1.4], [0, 0, 1.86, 0.04]].forEach(([x, y, w, h]) => { const f = box(w, h, 0.06, frameM, 0.005); f.position.set(x, y, 0.02); winGroup.add(f); });
  const sill = box(2.0, 0.04, 0.2, frameM, 0.01); sill.position.set(0, -0.72, 0.09); winGroup.add(sill);
  winGroup.position.set(1.75, 1.75, -0.745); scene.add(winGroup);

  // framed certificate
  const certTex = canvasTex(600, 440, (g, w, h) => {
    g.fillStyle = '#FFFDF6'; g.fillRect(0, 0, w, h); g.strokeStyle = '#C9A24B'; g.lineWidth = 10; g.strokeRect(24, 24, w - 48, h - 48);
    g.fillStyle = '#14182B'; g.textAlign = 'center'; g.font = 'bold 34px Georgia, serif'; g.fillText("Dean's List", w / 2, 150);
    g.font = '22px Georgia, serif'; g.fillText('USIU-Africa', w / 2, 196); g.font = 'italic 24px Georgia, serif'; g.fillText('Valerie Mwangi', w / 2, 262);
    g.font = '16px Georgia, serif'; g.fillStyle = '#6B6F80'; g.fillText('BSc Software Engineering', w / 2, 300); g.fillStyle = '#C9A24B'; g.beginPath(); g.arc(w / 2, 360, 26, 0, Math.PI * 2); g.fill();
  });
  const cert = new THREE.Group();
  cert.add(box(0.62, 0.48, 0.03, mat('#2A2016', { roughness: 0.4 }), 0.006));
  const certP = new THREE.Mesh(new THREE.PlaneGeometry(0.54, 0.4), mat('#fff', { map: certTex, roughness: 0.6 })); certP.position.z = 0.017; cert.add(certP);
  cert.position.set(-0.45, 1.72, -0.73); cert.scale.setScalar(0.8); scene.add(cert);

  /* ---------- desk ---------- */
  const woodTex = canvasTex(1024, 256, (g, w, h) => { g.fillStyle = '#7A4E30'; g.fillRect(0, 0, w, h); for (let i = 0; i < 260; i++) { g.strokeStyle = `rgba(${40 + Math.random() * 30},${20 + Math.random() * 15},8,${.12 + Math.random() * .15})`; g.lineWidth = 1 + Math.random() * 2; g.beginPath(); const y = Math.random() * h; g.moveTo(0, y); g.bezierCurveTo(w * .3, y + Math.random() * 20 - 10, w * .6, y + Math.random() * 20 - 10, w, y); g.stroke(); } });
  const deskTop = box(1.8, 0.05, 0.82, mat('#ffffff', { map: woodTex, roughness: 0.45 }), 0.012); add(deskTop, 0, 0.75, -0.18);
  const legM = mat('#1E2238', { roughness: 0.4, metalness: 0.6 });
  [[-0.85, -0.52], [0.85, -0.52], [-0.85, 0.16], [0.85, 0.16]].forEach(([x, z]) => add(box(0.05, 0.73, 0.05, legM, 0.01), x, 0.365, z));
  const drawer = box(0.42, 0.5, 0.7, mat('#6A4129', { map: woodTex }), 0.01); add(drawer, 0.62, 0.47, -0.2);
  add(box(0.3, 0.012, 0.01, mat('#C9A24B', { metalness: 0.8, roughness: 0.3 }), 0.004), 0.62, 0.6, 0.155);
  add(box(0.3, 0.012, 0.01, mat('#C9A24B', { metalness: 0.8, roughness: 0.3 }), 0.004), 0.62, 0.42, 0.155);

  /* ---------- the retro computer ---------- */
  const beige = mat('#E4DCC8', { roughness: 0.55 });
  const beigeD = mat('#CFC6AF', { roughness: 0.6 });
  const pc = new THREE.Group();
  // base unit under monitor
  const tower = box(0.56, 0.12, 0.46, beige, 0.012); tower.position.set(0, 0.06, 0); pc.add(tower);
  pc.add(at(box(0.12, 0.02, 0.005, mat('#333'), 0.003), -0.15, 0.07, 0.232));
  const led = new THREE.Mesh(new THREE.SphereGeometry(0.006, 12, 12), new THREE.MeshBasicMaterial({ color: '#55FF55' })); led.position.set(0.22, 0.06, 0.232); pc.add(led);
  // monitor body
  const mon = new THREE.Group(); mon.position.set(0, 0.36, 0.0); pc.add(mon);
  const shell = box(0.5, 0.42, 0.24, beige, 0.03, 4); shell.position.z = 0.06; mon.add(shell);
  const backHump = box(0.38, 0.32, 0.24, beigeD, 0.06, 4); backHump.position.z = -0.14; mon.add(backHump);
  const neck = box(0.14, 0.06, 0.12, beigeD, 0.01); neck.position.set(0, -0.23, -0.02); mon.add(neck);
  const bezel = box(0.42, 0.33, 0.01, mat('#D6CDB6', { roughness: 0.6 }), 0.008); bezel.position.set(0, 0.015, 0.182); mon.add(bezel);
  const badge = box(0.06, 0.012, 0.004, mat('#9A916F'), 0.002); badge.position.set(-0.17, -0.18, 0.183); mon.add(badge);
  const power = cyl(0.008, 0.008, 0.01, mat('#9A916F'), 16); power.rotation.x = Math.PI / 2; power.position.set(0.2, -0.18, 0.186); mon.add(power);
  // the screen (canvas drawn ValerieOS desktop)
  const SW = 0.36, SH = 0.27;
  const scr = document.createElement('canvas'); scr.width = 1024; scr.height = 768;
  const screenTex = new THREE.CanvasTexture(scr); screenTex.colorSpace = THREE.SRGBColorSpace; screenTex.anisotropy = 8;
  const screenMat = new THREE.MeshBasicMaterial({ map: screenTex, toneMapped: false });
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(SW, SH), screenMat); screen.position.set(0, 0.015, 0.188); mon.add(screen);
  const glassM = new THREE.MeshPhysicalMaterial({ color: '#ffffff', transparent: true, opacity: 0.08, roughness: 0.05, metalness: 0, clearcoat: 1 });
  const screenGlass = new THREE.Mesh(new THREE.PlaneGeometry(SW, SH), glassM); screenGlass.position.set(0, 0.015, 0.1895); mon.add(screenGlass);
  // sticky note
  const noteTex = canvasTex(256, 256, (g, w, h) => { g.fillStyle = '#FFF07A'; g.fillRect(0, 0, w, h); g.fillStyle = '#2B2420'; g.font = 'bold 40px "Comic Sans MS", cursive'; g.fillText('click', 34, 100); g.fillText('me ☺', 50, 160); });
  const note = new THREE.Mesh(new THREE.PlaneGeometry(0.075, 0.075), mat('#fff', { map: noteTex, roughness: 0.9, side: THREE.DoubleSide })); note.position.set(0.255, 0.14, 0.17); note.rotation.set(0, 0.25, -0.12); mon.add(note);
  pc.position.set(-0.05, 0.775, -0.3); scene.add(pc);

  // keyboard
  const kb = new THREE.Group();
  kb.add(box(0.46, 0.028, 0.16, beige, 0.008));
  const keyG = new RoundedBoxGeometry(0.022, 0.012, 0.022, 2, 0.003), keyM = mat('#F2EDE0', { roughness: 0.5 });
  const keys = new THREE.InstancedMesh(keyG, keyM, 15 * 5); let ki = 0; const dm = new THREE.Object3D();
  for (let r = 0; r < 5; r++) for (let c = 0; c < 15; c++) { dm.position.set(-0.196 + c * 0.028, 0.019, -0.058 + r * 0.029); dm.updateMatrix(); keys.setMatrixAt(ki++, dm.matrix); }
  keys.castShadow = true; kb.add(keys);
  kb.position.set(-0.05, 0.79, 0.08); kb.rotation.y = 0.03; scene.add(kb);
  // mouse + pad
  const pad = box(0.22, 0.004, 0.18, mat('#14182B', { roughness: 0.9 }), 0.003); add(pad, 0.36, 0.777, 0.08);
  const mouse = box(0.06, 0.03, 0.095, beige, 0.014, 4); add(mouse, 0.36, 0.795, 0.08);

  // coffee mug
  const mugTex = canvasTex(512, 160, (g, w, h) => { g.fillStyle = '#FFFFFF'; g.fillRect(0, 0, w, h); g.fillStyle = '#0A1230'; g.font = 'bold 54px "JetBrains Mono", "Courier New", monospace'; g.textAlign = 'center'; g.fillText('COFFEE', w * .75, 100); });
  const mug = new THREE.Group();
  const body = cyl(0.045, 0.042, 0.1, mat('#fff', { map: mugTex, roughness: 0.35 })); mug.add(body);
  const coffee = new THREE.Mesh(new THREE.CircleGeometry(0.04, 32), mat('#3B2010', { roughness: 0.2 })); coffee.rotation.x = -Math.PI / 2; coffee.position.y = 0.043; mug.add(coffee);
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.026, 0.008, 12, 24), mat('#fff', { roughness: 0.35 })); handle.position.set(0.05, 0, 0); handle.castShadow = true; mug.add(handle);
  mug.position.set(-0.55, 0.825, 0.05); mug.rotation.y = -0.5; scene.add(mug);

  // plant
  const plant = new THREE.Group();
  plant.add(at(cyl(0.08, 0.06, 0.14, mat('#C8643B', { roughness: 0.8 })), 0, 0.07, 0));
  const leafM = mat('#3E8E4E', { roughness: 0.6, side: THREE.DoubleSide });
  for (let i = 0; i < 9; i++) {
    const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 12), i % 2 ? leafM : mat('#58A85E', { roughness: 0.6 }));
    leaf.scale.set(0.45, 1.9, 0.18); const a = i / 9 * Math.PI * 2;
    leaf.position.set(Math.cos(a) * 0.04, 0.22 + (i % 3) * 0.02, Math.sin(a) * 0.04); leaf.rotation.set(Math.sin(a) * 0.55, -a, Math.cos(a) * 0.55); leaf.castShadow = true; plant.add(leaf);
  }
  plant.position.set(0.72, 0.775, -0.42); scene.add(plant);

  // books
  [['#2B3A6B', 0.26, 0.04], ['#F2603F', 0.24, 0.035], ['#FFB547', 0.25, 0.03]].reduce((y, [c, w, h], i) => { add(box(w, h, 0.18, mat(c, { roughness: 0.8 }), 0.004), 0.45, y + h / 2, -0.12).rotation.y = (i - 1) * 0.12; return y + h; }, 0.775);

  // desk lamp
  const lamp = new THREE.Group(); const lampM = mat('#14182B', { roughness: 0.35, metalness: 0.5 });
  lamp.add(at(cyl(0.07, 0.08, 0.025, lampM), 0, 0.012, 0));
  lamp.add(at(cyl(0.009, 0.009, 0.44, lampM), 0, 0.245, 0));
  const armH = cyl(0.008, 0.008, 0.26, lampM); armH.rotation.z = Math.PI / 2; lamp.add(at(armH, 0.13, 0.46, 0));
  const shade = new THREE.Mesh(new THREE.ConeGeometry(0.075, 0.11, 32, 1, true), mat('#FFB547', { roughness: 0.4, side: THREE.DoubleSide })); shade.castShadow = true; lamp.add(at(shade, 0.26, 0.42, 0));
  lamp.add(at(new THREE.Mesh(new THREE.SphereGeometry(0.024, 16, 16), new THREE.MeshBasicMaterial({ color: '#FFF3D1' })), 0.26, 0.38, 0));
  lamp.position.set(-0.8, 0.775, -0.42); scene.add(lamp);

  // chair
  const chair = new THREE.Group(); const fab = mat('#2B3A6B', { roughness: 0.9 }), blk = mat('#14182B', { roughness: 0.5, metalness: 0.4 });
  chair.add(at(box(0.5, 0.08, 0.48, fab, 0.03, 4), 0, 0.48, 0));
  const cb = box(0.48, 0.55, 0.07, fab, 0.03, 4); cb.position.set(0, 0.82, 0.24); cb.rotation.x = -0.12; chair.add(cb);
  chair.add(at(cyl(0.025, 0.025, 0.36, blk), 0, 0.27, 0));
  for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2; const l = box(0.3, 0.03, 0.04, blk, 0.01); l.position.set(Math.cos(a) * 0.15, 0.06, Math.sin(a) * 0.15); l.rotation.y = -a; chair.add(l); }
  chair.position.set(-0.35, 0, 0.78); chair.rotation.y = 0.6; scene.add(chair);

  /* ---------- lights ---------- */
  scene.add(new THREE.HemisphereLight('#FFE9D2', '#6B4F3A', 0.75));
  const sun = new THREE.DirectionalLight('#FFC994', 2.4); sun.position.set(3.4, 3.4, 1.6); sun.target.position.set(0, 0.8, -0.2);
  sun.castShadow = true; sun.shadow.mapSize.set(coarse ? 1024 : 2048, coarse ? 1024 : 2048); sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.02; sun.shadow.radius = 4;
  Object.assign(sun.shadow.camera, { left: -2.2, right: 2.2, top: 2.2, bottom: -1.2, near: 0.5, far: 9 }); sun.shadow.camera.updateProjectionMatrix();
  scene.add(sun, sun.target);
  const lampLight = new THREE.SpotLight('#FFB870', 6, 2.2, 0.7, 0.6, 1.5); lampLight.position.set(-0.54, 1.16, -0.42); lampLight.target.position.set(-0.5, 0.75, -0.1); scene.add(lampLight, lampLight.target);
  const screenLight = new THREE.PointLight('#7FD4D4', 0.6, 1.2, 2); screenLight.position.set(-0.05, 1.15, 0.0); scene.add(screenLight);
  const fill = new THREE.DirectionalLight('#C9D8FF', 0.45); fill.position.set(-3, 2, 3); scene.add(fill);

  /* ---------- screen drawing ---------- */
  function drawScreen(hover) {
    const g = scr.getContext('2d'), w = scr.width, h = scr.height, F = '"Pixelated MS Sans Serif", Tahoma, Arial, sans-serif';
    g.fillStyle = '#008080'; g.fillRect(0, 0, w, h);
    const icons = ['My Home Page', 'My Projects', 'about.txt', 'Open source', 'Experience', 'MS-DOS Prompt', 'Mail', 'Recycle Bin'];
    const cols = ['#9FD8FF', '#FFD36B', '#FFFFFF', '#F2603F', '#8C7CFF', '#14182B', '#FFFFFF', '#DCE6F7'];
    icons.forEach((t, i) => { const x = 22, y = 22 + i * 82; g.fillStyle = cols[i]; g.fillRect(x + 22, y, 44, 40); g.strokeStyle = '#000'; g.lineWidth = 2; g.strokeRect(x + 22, y, 44, 40); g.fillStyle = '#fff'; g.font = `20px ${F}`; g.textAlign = 'center'; g.fillText(t, x + 44, y + 62); });
    // window
    const wx = 190, wy = 70, ww = 720, wh = 520;
    g.fillStyle = '#C0C0C0'; g.fillRect(wx, wy, ww, wh); g.fillStyle = '#fff'; g.fillRect(wx, wy, ww, 3); g.fillRect(wx, wy, 3, wh); g.fillStyle = '#404040'; g.fillRect(wx, wy + wh - 3, ww, 3); g.fillRect(wx + ww - 3, wy, 3, wh);
    const tg = g.createLinearGradient(wx, 0, wx + ww, 0); tg.addColorStop(0, '#000080'); tg.addColorStop(1, '#1084D0'); g.fillStyle = tg; g.fillRect(wx + 6, wy + 6, ww - 12, 34);
    g.fillStyle = '#fff'; g.font = `bold 20px ${F}`; g.textAlign = 'left'; g.fillText('Valerie Mwangi - Home', wx + 16, wy + 30);
    for (let b = 0; b < 3; b++) { g.fillStyle = '#C0C0C0'; g.fillRect(wx + ww - 40 - b * 30, wy + 11, 26, 24); }
    g.fillStyle = '#fff'; g.fillRect(wx + 10, wy + 46, ww - 20, wh - 56);
    g.fillStyle = '#000'; g.textAlign = 'center'; g.font = 'bold 66px "Times New Roman", Times, serif'; g.fillText('Valerie Mwangi', wx + ww / 2, wy + 170);
    g.font = '32px "Times New Roman", Times, serif'; g.fillText('Software Engineer', wx + ww / 2, wy + 222);
    g.font = '22px "Times New Roman", Times, serif'; g.fillStyle = '#333';
    g.fillText('I build AI-powered mobile and web products', wx + ww / 2, wy + 290); g.fillText('for farmers, credit and field work.', wx + ww / 2, wy + 320);
    g.fillStyle = '#0000EE'; g.font = '24px "Times New Roman", Times, serif';
    const links = ['About', 'Projects', 'Open source', 'Experience', 'Contact']; let lx = wx + 90;
    links.forEach(l => { const tw = g.measureText(l).width; g.textAlign = 'left'; g.fillText(l, lx, wy + 400); g.fillRect(lx, wy + 404, tw, 2); lx += tw + 34; });
    // taskbar
    g.fillStyle = '#C0C0C0'; g.fillRect(0, h - 44, w, 44); g.fillStyle = '#fff'; g.fillRect(0, h - 44, w, 2);
    g.fillStyle = '#C0C0C0'; g.fillRect(6, h - 38, 110, 32); g.strokeStyle = '#000'; g.strokeRect(6, h - 38, 110, 32); g.fillStyle = '#000'; g.font = `bold 20px ${F}`; g.textAlign = 'left'; g.fillText('Start', 52, h - 15);
    g.fillStyle = '#FFB547'; g.fillRect(14, h - 32, 28, 22);
    g.fillStyle = '#000'; g.font = `20px ${F}`; g.textAlign = 'right';
    try { g.fillText(new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Nairobi' }).format(new Date()) + ' EAT', w - 14, h - 15); } catch (e) {}
    // CRT scanlines + glow
    g.fillStyle = 'rgba(0,0,0,.08)'; for (let y = 0; y < h; y += 3) g.fillRect(0, y, w, 1);
    const vg = g.createRadialGradient(w / 2, h / 2, h * .35, w / 2, h / 2, h * .8); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.35)'); g.fillStyle = vg; g.fillRect(0, 0, w, h);
    if (hover) { g.fillStyle = 'rgba(255,255,255,.06)'; g.fillRect(0, 0, w, h); }
    screenTex.needsUpdate = true;
  }
  drawScreen(false);
  (document.fonts ? document.fonts.load('20px "Pixelated MS Sans Serif"') : Promise.resolve()).then(() => drawScreen(false), () => {});

  /* ---------- camera rig ---------- */
  const home = { pos: new THREE.Vector3(0.95, 1.62, 2.55), look: new THREE.Vector3(0.12, 0.98, -0.3) };
  const cam = { pos: home.pos.clone(), look: home.look.clone() };
  let mx = 0, my = 0, tween = null, zoomed = false, active = false, hovering = false;
  function screenPose() {
    const p = new THREE.Vector3(); screen.getWorldPosition(p);
    const half = THREE.MathUtils.degToRad(camera.fov / 2);
    const dH = (SH / 2) / Math.tan(half), dW = (SW / 2) / (Math.tan(half) * camera.aspect);
    const d = Math.min(dH, dW) * 0.96;
    return { pos: new THREE.Vector3(p.x, p.y, p.z + d), look: p.clone() };
  }
  const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  function fly(to, ms, done) {
    const from = { pos: cam.pos.clone(), look: cam.look.clone() }, t0 = performance.now();
    tween = (now) => { const k = reduce ? 1 : Math.min(1, (now - t0) / ms), e = ease(k); cam.pos.lerpVectors(from.pos, to.pos, e); cam.look.lerpVectors(from.look, to.look, e); if (k >= 1) { tween = null; done && done(); } };
  }

  function resize() {
    const r = section.getBoundingClientRect(), w = Math.max(1, r.width), h = Math.max(1, r.height);
    renderer.setSize(w, h, false); camera.aspect = w / h;
    camera.fov = camera.aspect < 0.8 ? 58 : 34;
    home.look.x = camera.aspect < 0.8 ? -0.05 : 0.12;
    if (typeof cert !== 'undefined') cert.visible = camera.aspect >= 0.8;
    camera.updateProjectionMatrix();
  }
  resize(); addEventListener('resize', resize);

  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  const monitorParts = [];
  mon.traverse(o => { if (o.isMesh) monitorParts.push(o); });
  function pick(e) { const r = canvas.getBoundingClientRect(); ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1); ray.setFromCamera(ndc, camera); return ray.intersectObjects(monitorParts, false).length > 0; }
  canvas.addEventListener('pointermove', e => {
    const r = canvas.getBoundingClientRect(); mx = ((e.clientX - r.left) / r.width) * 2 - 1; my = ((e.clientY - r.top) / r.height) * 2 - 1;
    const h = !zoomed && !tween && pick(e); if (h !== hovering) { hovering = h; canvas.style.cursor = h ? 'pointer' : ''; drawScreen(h); section.classList.toggle('hot', h); }
  });
  canvas.addEventListener('pointerleave', () => { mx = my = 0; if (hovering) { hovering = false; drawScreen(false); section.classList.remove('hot'); } });
  canvas.addEventListener('click', e => { if (!zoomed && !tween && pick(e)) zoomIn(); });

  function zoomIn() {
    if (zoomed || tween) return;
    zoomed = true; section.classList.add('zooming'); if (hint) hint.hidden = true;
    fly(screenPose(), 1500, () => { window.ValerieOS && window.ValerieOS.open(); });
  }
  function zoomOut() { if (!zoomed) return; section.classList.remove('zooming'); fly(home, 1200, () => { zoomed = false; }); }
  if (window.ValerieOS) window.ValerieOS.onClose = zoomOut;
  else addEventListener('load', () => { if (window.ValerieOS) window.ValerieOS.onClose = zoomOut; });

  window.ValerieRoom = {
    enter() {
      const r = section.getBoundingClientRect();
      if (Math.abs(r.top) > 4) { scrollTo({ top: r.top + scrollY, behavior: reduce ? 'auto' : 'smooth' }); setTimeout(zoomIn, reduce ? 50 : 900); }
      else zoomIn();
    }
  };

  /* ---------- loop (only while visible) ---------- */
  let raf = null, last = 0;
  function frame(now) {
    raf = requestAnimationFrame(frame);
    if (tween) tween(now);
    else if (!zoomed) {
      const tx = home.pos.x + mx * 0.35, ty = home.pos.y - my * 0.16;
      cam.pos.x += (tx - cam.pos.x) * 0.05; cam.pos.y += (ty - cam.pos.y) * 0.05; cam.pos.z += (home.pos.z - cam.pos.z) * 0.05;
      cam.look.lerp(home.look, 0.05);
    }
    camera.position.copy(cam.pos); camera.lookAt(cam.look);
    if (now - last > 30000) { last = now; drawScreen(hovering); }
    renderer.render(scene, camera);
  }
  new IntersectionObserver(es => { active = es[0].isIntersecting; if (active && !raf) raf = requestAnimationFrame(frame); else if (!active && raf) { cancelAnimationFrame(raf); raf = null; } }).observe(section);
  camera.position.copy(cam.pos); camera.lookAt(cam.look); renderer.render(scene, camera);
  section.classList.add('ready');
  if (location.hash === '#os') setTimeout(() => window.ValerieRoom.enter(), 400);
}
