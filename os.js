/* ValerieOS: the laptop in the story becomes a working computer */
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var EMAIL = '1valeriemwangi@gmail.com';
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function phone() { return innerWidth <= 700; }

  /* ---------- icons ---------- */
  var I = {
    logo: '<svg viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#14182B"/><path d="M14 18l9 28 9-28M36 46V18l7 16 7-16v28" fill="none" stroke="#FFB547" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/></svg>',
    folder: '<svg viewBox="0 0 48 48"><path d="M4 12a3 3 0 0 1 3-3h11l4 4h19a3 3 0 0 1 3 3v22a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z" fill="#F5B43A" stroke="#14182B" stroke-width="2"/><path d="M4 18h40v20a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z" fill="#FFD36B" stroke="#14182B" stroke-width="2"/></svg>',
    doc: '<svg viewBox="0 0 48 48"><path d="M11 4h18l9 9v31H11z" fill="#fff" stroke="#14182B" stroke-width="2"/><path d="M29 4v9h9" fill="#E9E1D2" stroke="#14182B" stroke-width="2"/><path d="M16 22h16M16 28h16M16 34h10" stroke="#F2603F" stroke-width="2.4" stroke-linecap="round"/></svg>',
    term: '<svg viewBox="0 0 48 48"><rect x="4" y="8" width="40" height="32" rx="4" fill="#14182B" stroke="#14182B" stroke-width="2"/><path d="M12 18l6 5-6 5" fill="none" stroke="#7EE7A8" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 30h12" stroke="#FFB547" stroke-width="2.6" stroke-linecap="round"/></svg>',
    git: '<svg viewBox="0 0 48 48"><rect x="4" y="4" width="40" height="40" rx="10" fill="#F2603F" stroke="#14182B" stroke-width="2"/><circle cx="17" cy="14" r="3.5" fill="#fff"/><circle cx="17" cy="34" r="3.5" fill="#fff"/><circle cx="31" cy="21" r="3.5" fill="#fff"/><path d="M17 17.5v13M31 24.5c0 6-14 4-14 6" stroke="#fff" stroke-width="2.4" fill="none"/></svg>',
    mail: '<svg viewBox="0 0 48 48"><rect x="4" y="10" width="40" height="28" rx="4" fill="#fff" stroke="#14182B" stroke-width="2"/><path d="M5 12l19 15 19-15" fill="none" stroke="#F2603F" stroke-width="2.4"/></svg>',
    bin: '<svg viewBox="0 0 48 48"><path d="M12 14h24l-2 28H14z" fill="#DCE6F7" stroke="#14182B" stroke-width="2"/><path d="M9 14h30M19 9h10v5" fill="none" stroke="#14182B" stroke-width="2"/><path d="M20 20v16M28 20v16" stroke="#14182B" stroke-width="1.6"/><path d="M15 24l18 8" stroke="#F2603F" stroke-width="2.2"/></svg>',
    briefcase: '<svg viewBox="0 0 48 48"><rect x="5" y="14" width="38" height="26" rx="4" fill="#8C7CFF" stroke="#14182B" stroke-width="2"/><path d="M17 14v-4h14v4M5 24h38" fill="none" stroke="#14182B" stroke-width="2"/><rect x="21" y="21" width="6" height="6" rx="1" fill="#FFB547" stroke="#14182B" stroke-width="1.6"/></svg>',
    leaf: '<svg viewBox="0 0 48 48"><rect x="4" y="4" width="40" height="40" rx="10" fill="#1E5B47" stroke="#14182B" stroke-width="2"/><path d="M12 36c2-14 12-22 26-22-1 14-10 22-24 22z" fill="#7FD69A"/><path d="M14 34l18-16" stroke="#1E5B47" stroke-width="2"/><circle cx="24" cy="25" r="2" fill="#9A6324"/></svg>',
    dial: '<svg viewBox="0 0 48 48"><rect x="4" y="4" width="40" height="40" rx="10" fill="#F6D78B" stroke="#14182B" stroke-width="2"/><path d="M12 32a12 12 0 0 1 24 0" fill="none" stroke="#14182B" stroke-width="4" stroke-linecap="round"/><path d="M24 32l7-8" stroke="#F2603F" stroke-width="2.6" stroke-linecap="round"/></svg>',
    wave: '<svg viewBox="0 0 48 48"><rect x="4" y="4" width="40" height="40" rx="10" fill="#CBBEF5" stroke="#14182B" stroke-width="2"/><g stroke="#1E1747" stroke-width="3" stroke-linecap="round"><path d="M13 21v6M19 16v16M25 19v10M31 13v22M37 20v8"/></g></svg>',
    globe: '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="19" fill="#9FD8FF" stroke="#14182B" stroke-width="2"/><path d="M5 24h38M24 5c-7 7-7 31 0 38M24 5c7 7 7 31 0 38" fill="none" stroke="#14182B" stroke-width="1.8"/></svg>',
    moon: '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="19" fill="#14182B"/><path d="M30 12a13 13 0 1 0 6 20A11 11 0 0 1 30 12z" fill="#FFF3D1"/></svg>',
    power: '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="19" fill="#F2603F" stroke="#14182B" stroke-width="2"/><path d="M24 13v11M16.5 18a10 10 0 1 0 15 0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg>'
  };

  /* ---------- Nairobi skyline wallpaper (sunrise + night layer) ---------- */
  var WALL = '<svg class="vo-wall" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>' +
    '<linearGradient id="vsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8EC5F0"/><stop offset=".48" stop-color="#FFD9B5"/><stop offset=".78" stop-color="#FF9F72"/><stop offset="1" stop-color="#F2603F"/></linearGradient>' +
    '<linearGradient id="vnight" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0A1230"/><stop offset=".7" stop-color="#1D2B6B"/><stop offset="1" stop-color="#3A3F86"/></linearGradient>' +
    '<radialGradient id="vsun"><stop offset="0" stop-color="#FFF6D8"/><stop offset=".55" stop-color="#FFD46B"/><stop offset="1" stop-color="#FFB547" stop-opacity="0"/></radialGradient></defs>' +
    '<rect width="1600" height="900" fill="url(#vsky)"/>' +
    '<g class="night"><rect width="1600" height="900" fill="url(#vnight)"/><g fill="#fff">' + (function () { var s = '', x = 7; for (var i = 0; i < 70; i++) { x = (x * 9301 + 49297) % 233280; var y = (x * 7) % 520; s += '<circle cx="' + (x % 1600) + '" cy="' + y + '" r="' + (1 + (i % 3) * .5) + '" opacity="' + (.4 + (i % 5) / 10) + '"/>'; } return s; })() + '</g><circle cx="1250" cy="170" r="46" fill="#FFF3D1"/></g>' +
    '<circle cx="1180" cy="560" r="260" fill="url(#vsun)"/><circle cx="1180" cy="560" r="92" fill="#FFE7A0"/>' +
    '<g fill="#F7B48E" opacity=".55"><ellipse cx="300" cy="220" rx="160" ry="26"/><ellipse cx="420" cy="250" rx="110" ry="18"/><ellipse cx="1000" cy="160" rx="130" ry="20"/></g>' +
    '<path d="M0 640 C 160 560 300 600 420 570 C 520 540 600 600 700 580 C 820 555 900 520 1000 560 C 1120 600 1260 540 1400 575 C 1500 600 1560 590 1600 600 V900 H0z" fill="#7B5A86" opacity=".55"/>' +
    '<g fill="#2A2350">' +
      '<rect x="180" y="560" width="70" height="200"/><rect x="262" y="520" width="54" height="240"/><rect x="330" y="590" width="80" height="170"/>' +
      '<rect x="560" y="430" width="64" height="330"/><rect x="636" y="500" width="90" height="260"/><rect x="740" y="470" width="58" height="290"/>' +
      /* KICC: drum tower with fins + saucer */
      '<rect x="850" y="380" width="78" height="380" rx="6"/><g fill="#3A3168"><rect x="858" y="390" width="6" height="370"/><rect x="874" y="390" width="6" height="370"/><rect x="890" y="390" width="6" height="370"/><rect x="906" y="390" width="6" height="370"/></g>' +
      '<ellipse cx="889" cy="378" rx="56" ry="12"/><rect x="884" y="340" width="10" height="38"/><ellipse cx="1010" cy="700" rx="70" ry="22"/><path d="M955 700 q55-70 110 0z"/>' +
      '<rect x="1090" y="450" width="72" height="310"/><path d="M1090 450 l36-40 36 40z"/><rect x="1176" y="520" width="60" height="240"/><rect x="1250" y="560" width="96" height="200"/><rect x="1360" y="500" width="54" height="260"/>' +
      '<rect x="420" y="610" width="120" height="150"/><rect x="0" y="640" width="170" height="120"/><rect x="1430" y="600" width="170" height="160"/>' +
    '</g>' +
    '<g fill="#FFD46B" opacity=".9">' + (function () { var s = '', xs = [190, 205, 270, 290, 575, 600, 650, 690, 750, 1100, 1130, 1190, 1210, 1265, 1300, 1370]; for (var i = 0; i < xs.length; i++) s += '<rect x="' + xs[i] + '" y="' + (600 + (i * 37) % 120) + '" width="8" height="10"/>'; return s; })() + '</g>' +
    /* acacia */
    '<g fill="#14182B"><rect x="1490" y="660" width="10" height="100"/><path d="M1400 668 q100-46 190 0 q-40 -24 -95 -22 q-60 2 -95 22z"/><path d="M1495 680 l-40 -12M1495 690 l38 -16" stroke="#14182B" stroke-width="5"/></g>' +
    '<rect y="760" width="1600" height="140" fill="#14182B"/>' +
    '<path d="M0 760 C 300 740 520 790 800 768 C 1080 748 1300 788 1600 762 V900 H0z" fill="#1E2446"/></svg>';

  /* ---------- content ---------- */
  var PROJECTS = [
    { id: 'agrismart', name: 'AgriSmart Kenya', kind: 'capstone', icon: 'leaf', idx: 0, code: 'https://github.com/Kare100/agrismart-kenya',
      desc: 'Farmers photograph a sick leaf and get a Gemini-powered diagnosis, treatment plan, market prices and weather advice, in English or Kiswahili. Photos are compressed for slow rural networks, AI output is matched to a structured disease table, and CI runs unit and integration tests.',
      tags: ['React Native', 'Expo', 'Supabase', 'PostgreSQL', 'Gemini', 'Jest'] },
    { id: 'pesascore', name: 'PesaScore', kind: 'fintech', icon: 'dial', idx: 1, code: 'https://github.com/Kare100/pesascore',
      desc: 'Reads an M-Pesa statement and returns an explainable credit score (300–850) and a loan limit the person can afford, with the reasons in plain language.', tags: ['Java 21', 'REST API', 'Docker', 'GitHub Actions'] },
    { id: 'fundi', name: 'Fundi Notes', kind: 'AI agent', icon: 'wave', idx: 2, code: 'https://github.com/Kare100/fundi-notes',
      desc: 'Voice notes from field technicians become structured job reports, with missing-info flags and a daily summary for managers.', tags: ['FastAPI', 'React', 'TypeScript', 'LLMs'] },
    { id: 'riela', name: 'RIELA Connect', kind: 'PWA', icon: 'globe', idx: 3, code: 'https://github.com/Kare100/riela-connect', live: 'https://riela-connect-1.vercel.app',
      desc: 'Links farmers in Kenya and Ghana to grain drying, storage, bookings, market prices and weather alerts.', tags: ['Next.js', 'TypeScript', 'Tailwind', 'PWA'] },
    { id: 'sndbx', name: 'SNDBX Experts', kind: 'marketplace', icon: 'briefcase', idx: 4, code: 'https://github.com/Kare100/sndbx-experts',
      desc: 'Matches small businesses with advisors in four cities, with time-zone-aware booking, M-Pesa and 30 tests.', tags: ['Flask', 'Python', 'pytest'] },
    { id: 'shaba', name: 'Shaba Jewellery', kind: 'e-commerce', icon: 'globe', idx: 5, code: 'https://github.com/Kare100/shaba-jewellery', live: 'https://shaba-jewellery.vercel.app',
      desc: 'Editorial store with cart, checkout, a Postgres API and full SEO: canonicals, Open Graph and structured data.', tags: ['Nuxt 3', 'Tailwind', 'Neon'] }
  ];
  var PRS = [
    { r: 'hiero-sdk-js', n: 4790, s: 'in review', t: 'Unit tests for GrpcStatus and nine other enum-style classes' },
    { r: 'hiero-sdk-python', n: 2795, s: 'merged', t: 'Link-check workflow only reports broken links when Lychee finds them' },
    { r: 'hiero-sdk-js', n: 4767, s: 'merged', t: 'Unit tests for BadMnemonicError, which had no coverage' },
    { r: 'hiero-sdk-js', n: 4715, s: 'merged', t: 'Removed four unused internal helpers after maintainer review' }
  ];
  var JOBS = [
    ['Clinq Africa', 'AI Expert', 'Now', 'Automating daily operational tasks with AI; also runs the company\u2019s social channels.'],
    ['RIELA Global', 'Project collaborator', 'Ongoing', 'Building RIELA Connect with a team across Kenya, Ghana and Germany.'],
    ['PhotoMed', 'Software Engineering Intern', 'Internship', 'Built a request-tracking app in React and Vite.'],
    ['Tea\u2019d App', 'Software Developer Intern', 'Internship', 'Shipped features on a live product, plus digital marketing.'],
    ['Calorica', 'Software Developer Intern', 'Internship', 'Production code and lessons about what breaks first.'],
    ['Stadia Capital', 'Investment Research Intern', 'Internship', 'Financial research on real deadlines.']
  ];

  /* ---------- shell ---------- */
  var root, desk, tasks, menu, startBtn, z = 10, wins = {}, booted = false, lastFocus = null, cascade = 0;

  function build() {
    root = el('div', 'vos'); root.id = 'vos'; root.hidden = true;
    root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true'); root.setAttribute('aria-label', 'ValerieOS, an interactive desktop');
    desk = el('div', 'vo-desk', WALL);
    var icons = el('div', 'vo-icons');
    [['welcome', 'Welcome', 'doc'], ['projects', 'Projects', 'folder'], ['about', 'about.txt', 'doc'], ['oss', 'Open source', 'git'],
     ['xp', 'Experience', 'briefcase'], ['terminal', 'Terminal', 'term'], ['mail', 'Mail', 'mail'], ['bin', 'Recycle Bin', 'bin']].forEach(function (d) {
      var b = el('button', 'vo-icon', I[d[2]] + '<span>' + d[1] + '</span>'); b.type = 'button';
      b.addEventListener('click', function () { selectIcon(b); if (phone() || b.dataset.armed) { open(d[0]); b.dataset.armed = ''; } else { b.dataset.armed = '1'; setTimeout(function () { b.dataset.armed = ''; }, 450); } });
      b.addEventListener('dblclick', function () { open(d[0]); });
      b.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); open(d[0]); } });
      icons.appendChild(b);
    });
    desk.appendChild(icons);
    desk.appendChild(el('div', 'vo-hint', 'Double-click an icon to open it.<br>Try the Terminal ✦<br>Drag windows by their title bar.'));
    desk.addEventListener('pointerdown', function (e) { if (e.target === desk || e.target.closest('.vo-wall')) { selectIcon(null); closeMenu(); } });

    var bar = el('div', 'vo-bar');
    startBtn = el('button', 'vo-start', I.logo + '<b>Start</b>'); startBtn.type = 'button'; startBtn.setAttribute('aria-expanded', 'false'); startBtn.setAttribute('aria-label', 'Start menu');
    startBtn.addEventListener('click', function () { menu.hidden ? openMenu() : closeMenu(); });
    tasks = el('div', 'vo-tasks');
    var clock = el('div', 'vo-clock');
    function tick() { try { clock.textContent = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Nairobi' }).format(new Date()) + ' EAT'; } catch (e) {} }
    tick(); setInterval(tick, 20000);
    bar.appendChild(startBtn); bar.appendChild(tasks); bar.appendChild(clock);

    menu = el('div', 'vo-menu'); menu.hidden = true;
    var ul = el('ul');
    [['welcome', 'Welcome', 'doc'], ['projects', 'Projects', 'folder'], ['oss', 'Open source', 'git'], ['xp', 'Experience', 'briefcase'], ['terminal', 'Terminal', 'term'], ['mail', 'Mail', 'mail'], ['-'],
     ['night', 'Switch to night', 'moon'], ['exit', 'Back to the story', 'power']].forEach(function (m) {
      if (m[0] === '-') { ul.appendChild(el('li', '', '<hr>')); return; }
      var li = el('li'), b = el('button', '', I[m[2]] + '<span>' + m[1] + '</span>'); b.type = 'button';
      b.addEventListener('click', function () { closeMenu(); if (m[0] === 'exit') shut(); else if (m[0] === 'night') toggleNight(b); else open(m[0]); });
      li.appendChild(b); ul.appendChild(li);
    });
    menu.appendChild(el('div', 'side', '<span>ValerieOS</span>')); menu.appendChild(ul);

    root.appendChild(desk); root.appendChild(bar); root.appendChild(menu);
    document.body.appendChild(root);
    root.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { if (!menu.hidden) closeMenu(); else { var f = focused(); if (f) close(f.id); else shut(); } e.stopPropagation(); }
    });
  }
  function selectIcon(b) { [].forEach.call(root.querySelectorAll('.vo-icon.sel'), function (x) { x.classList.remove('sel'); }); if (b) b.classList.add('sel'); }
  function openMenu() { menu.hidden = false; startBtn.setAttribute('aria-expanded', 'true'); var f = menu.querySelector('button'); if (f) f.focus(); }
  function closeMenu() { if (!menu) return; menu.hidden = true; startBtn.setAttribute('aria-expanded', 'false'); }
  function toggleNight(b) { var n = root.classList.toggle('night'); b.querySelector('span').textContent = n ? 'Switch to sunrise' : 'Switch to night'; b.innerHTML = (n ? I.power.replace('#F2603F', '#FFB547') : I.moon) + '<span>' + (n ? 'Switch to sunrise' : 'Switch to night') + '</span>'; }

  /* ---------- window manager ---------- */
  function focused() { var best = null; Object.keys(wins).forEach(function (k) { var w = wins[k]; if (!w.el.classList.contains('min') && (!best || +w.el.style.zIndex > +best.el.style.zIndex)) best = w; }); return best; }
  function focus(id) {
    var w = wins[id]; if (!w) return;
    w.el.classList.remove('min'); w.el.style.zIndex = ++z;
    Object.keys(wins).forEach(function (k) { wins[k].el.classList.toggle('focus', k === id); wins[k].task.classList.toggle('on', k === id); });
  }
  function close(id) { var w = wins[id]; if (!w) return; w.el.remove(); w.task.remove(); delete wins[id]; var f = focused(); if (f) focus(f.id); }
  function makeWin(id, title, body, o) {
    if (wins[id]) { focus(id); return wins[id]; }
    o = o || {};
    var W = Math.min(o.w || 560, innerWidth - 30), H = Math.min(o.h || 420, innerHeight - 90);
    var x = o.x != null ? o.x : Math.max(10, (innerWidth - W) / 2 + (cascade % 5) * 26 - 40), y = o.y != null ? o.y : Math.max(10, (innerHeight - 46 - H) / 2 + (cascade % 5) * 22 - 30);
    cascade++;
    var w = el('section', 'vo-win' + (reduce ? '' : ' pop')); w.setAttribute('aria-label', title);
    w.style.cssText = 'left:' + x + 'px;top:' + y + 'px;width:' + W + 'px;height:' + H + 'px';
    var tb = el('div', 'vo-tb', '<button type="button" class="cl" aria-label="Close ' + esc(title) + '">✕</button><span class="t">' + esc(title) + '</span><button type="button" class="mn" aria-label="Minimise">–</button><button type="button" class="mx" aria-label="Maximise">□</button>');
    var bd = el('div', 'vo-body'); if (typeof body === 'string') bd.innerHTML = body; else bd.appendChild(body);
    var rs = el('div', 'vo-rs');
    w.appendChild(tb); w.appendChild(bd); w.appendChild(rs);
    desk.appendChild(w);
    var task = el('button', 'vo-task', esc(title)); task.type = 'button';
    task.addEventListener('click', function () { var f = focused(); if (f && f.id === id && !w.classList.contains('min')) w.classList.add('min'); else focus(id); });
    tasks.appendChild(task);
    var rec = wins[id] = { id: id, el: w, task: task, body: bd };
    w.addEventListener('pointerdown', function () { focus(id); });
    tb.querySelector('.cl').addEventListener('click', function (e) { e.stopPropagation(); close(id); });
    tb.querySelector('.mn').addEventListener('click', function (e) { e.stopPropagation(); w.classList.add('min'); task.classList.remove('on'); });
    tb.querySelector('.mx').addEventListener('click', function (e) { e.stopPropagation(); w.classList.toggle('max'); });
    tb.addEventListener('dblclick', function (e) { if (!e.target.closest('button')) w.classList.toggle('max'); });
    drag(tb, w, function (dx, dy, s) { w.style.left = Math.min(innerWidth - 60, Math.max(-W + 80, s.l + dx)) + 'px'; w.style.top = Math.min(innerHeight - 90, Math.max(0, s.t + dy)) + 'px'; });
    drag(rs, w, function (dx, dy, s) { w.style.width = Math.max(280, s.w + dx) + 'px'; w.style.height = Math.max(180, s.h + dy) + 'px'; });
    focus(id);
    var t = tb.querySelector('.cl'); setTimeout(function () { (bd.querySelector('input,textarea,button,a') || t).focus({ preventScroll: true }); }, 30);
    return rec;
  }
  function drag(handle, w, move) {
    handle.addEventListener('pointerdown', function (e) {
      if (e.target.closest('button') || phone() || w.classList.contains('max')) return;
      e.preventDefault();
      var s = { x: e.clientX, y: e.clientY, l: w.offsetLeft, t: w.offsetTop, w: w.offsetWidth, h: w.offsetHeight };
      handle.setPointerCapture(e.pointerId);
      function mv(ev) { move(ev.clientX - s.x, ev.clientY - s.y, s); }
      function up() { handle.removeEventListener('pointermove', mv); handle.removeEventListener('pointerup', up); }
      handle.addEventListener('pointermove', mv); handle.addEventListener('pointerup', up);
    });
  }

  /* ---------- apps ---------- */
  function nav(items) {
    var n = el('div', 'vo-nav');
    items.forEach(function (it) { var b = el('button', '', it[0]); b.type = 'button'; b.addEventListener('click', function () { open(it[1]); }); n.appendChild(b); });
    return n;
  }
  var apps = {
    welcome: function () {
      var b = el('div', 'vo-welcome', '<h1>Valerie Mwangi</h1><h2>Software Engineer · Nairobi</h2><p>I build AI-powered mobile and web products for farmers, for people with no bank history, and for technicians in the field. Welcome to my laptop. Have a look around.</p>');
      b.appendChild(nav([['About', 'about'], ['Projects', 'projects'], ['Open source', 'oss'], ['Experience', 'xp'], ['Contact', 'mail']]));
      b.appendChild(el('p', 'tip', 'tip: open the Terminal and type <b>help</b>'));
      makeWin('welcome', 'Welcome — Valerie Mwangi', b, { w: 640, h: 470 });
    },
    projects: function () {
      var b = el('div'); b.appendChild(el('div', 'vo-path', 'C:\\Valerie\\Projects <span style="margin-left:auto">6 items</span>'));
      var g = el('div', 'vo-grid');
      PROJECTS.forEach(function (p) {
        var ic = el('button', 'vo-icon', I[p.icon] + '<span>' + esc(p.name) + '</span><small>' + esc(p.kind) + '</small>'); ic.type = 'button';
        ic.addEventListener('click', function () { openProject(p.id); }); g.appendChild(ic);
      });
      b.appendChild(g);
      makeWin('projects', 'Projects', b, { w: 600, h: 380 });
    },
    about: function () {
      makeWin('about', 'about.txt', '<div class="vo-doc mono">Hi, I\'m Valerie.\n\nI started Financial Engineering at Strathmore in 2021: maths, markets, models. A year in, I couldn\'t picture doing it forever.\n\nIn Fall 2023 I changed one word. Financial Engineering became Software Engineering at USIU-Africa, and I haven\'t stopped building since.\n\n— Dean\'s List every semester\n— 7 semesters as Class Rep\n— AI Expert at Clinq Africa\n— 3 merged pull requests to the Hiero SDKs\n\nI like software that works in real conditions: cheap phones, slow networks, Kiswahili as well as English.\n\nOpen to software engineering roles in fintech, AI/ML and product teams, in Nairobi or remote.</div>', { w: 520, h: 460 });
    },
    oss: function () {
      var h = '<div class="vo-git"><div class="d">$ git log --author=Kare100 --org=hiero-ledger</div>';
      PRS.forEach(function (p) { h += '<div class="c"><span class="h">' + p.r + '</span> <a href="https://github.com/hiero-ledger/' + p.r + '/pull/' + p.n + '" target="_blank" rel="noopener">#' + p.n + '</a> <span class="' + (p.s === 'merged' ? 'm' : 'r') + '">[' + p.s + ']</span><br><span class="d">' + esc(p.t) + '</span></div>'; });
      h += '<div class="c m">3 merged · 1 in review · Linux Foundation Decentralized Trust</div></div>';
      makeWin('oss', 'Open source — git log', h, { w: 560, h: 400 });
    },
    xp: function () {
      var h = '<div class="vo-doc"><h3>Experience</h3><p style="color:#6B6F80">BSc Software Engineering, USIU-Africa · Dean\'s List every semester</p><h4>Work</h4>';
      JOBS.forEach(function (j) { h += '<div class="job"><b>' + esc(j[0]) + ' <em>' + esc(j[1]) + '</em></b><span>' + esc(j[2]) + '</span><p>' + esc(j[3]) + '</p></div>'; });
      h += '<h4>Skills</h4><p>React Native · Expo · Flutter · React · TypeScript · Next.js · Nuxt / Vue · Tailwind · Python · FastAPI · Flask · Java · Node.js · PostgreSQL · Supabase · Gemini Vision · LLM APIs · TensorFlow · scikit-learn · Git · GitHub Actions · Docker</p></div>';
      makeWin('xp', 'Experience.doc', h, { w: 580, h: 480 });
    },
    mail: function () {
      var f = el('form', 'vo-mail', '<label>To<span class="to">' + EMAIL + '</span></label><label>Subject<input name="s" value="Hello from your portfolio"></label><textarea name="m" aria-label="Message" placeholder="Hi Valerie, ..."></textarea><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="vo-btn dark" type="submit">Send with my email app ↗</button><button class="vo-btn" type="button" data-copy>Copy address</button></div>');
      f.addEventListener('submit', function (e) { e.preventDefault(); location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(f.s.value) + '&body=' + encodeURIComponent(f.m.value); });
      f.querySelector('[data-copy]').addEventListener('click', function (e) { var b = e.target; if (navigator.clipboard) navigator.clipboard.writeText(EMAIL).then(function () { b.textContent = 'Copied ✓'; }); });
      makeWin('mail', 'New message', f, { w: 520, h: 380 });
    },
    bin: function () {
      var b = el('div', 'vo-bin', '<div class="file">' + I.doc + '<div><b>financial-engineering.degree</b><small>Deleted Fall 2023 · from C:\\Strathmore</small></div></div><div class="msg">Restore this file?</div><div class="acts"><button class="vo-btn" type="button" data-a="1">No thanks</button><button class="vo-btn dark" type="button" data-a="2">Definitely not</button></div>');
      var msg = b.querySelector('.msg');
      [].forEach.call(b.querySelectorAll('[data-a]'), function (x) { x.addEventListener('click', function () { msg.textContent = x.dataset.a === '1' ? 'Good call. Software Engineering suits you better.' : 'Same second word, much better fit. ✦'; }); });
      makeWin('bin', 'Recycle Bin', b, { w: 440, h: 270 });
    },
    terminal: function () { terminal(); }
  };
  function openProject(id) {
    var p = PROJECTS.filter(function (x) { return x.id === id; })[0]; if (!p) return;
    var b = el('div', 'vo-proj');
    var src = document.querySelectorAll('.proj .shot')[p.idx];
    var hero = el('div', 'hero');
    if (src) { hero.className = 'hero ' + [].filter.call(src.classList, function (c) { return c.indexOf('bg-') === 0; }).join(' '); var st = src.querySelector('.pstage'); if (st) hero.appendChild(st.cloneNode(true)); }
    b.appendChild(hero);
    var acts = '<div class="acts">' + (p.live ? '<a class="vo-btn dark" href="' + p.live + '" target="_blank" rel="noopener">Open live ↗</a>' : '') + '<a class="vo-btn' + (p.live ? '' : ' dark') + '" href="' + p.code + '" target="_blank" rel="noopener">View code ↗</a></div>';
    b.appendChild(el('div', 'txt', '<h3>' + esc(p.name) + '<em>' + esc(p.kind) + '</em></h3><p>' + esc(p.desc) + '</p><div class="tags">' + p.tags.map(function (t) { return '<i>' + esc(t) + '</i>'; }).join('') + '</div>' + acts));
    makeWin('p-' + id, p.name, b, { w: 600, h: 540 });
  }
  function open(id) { closeMenu(); if (apps[id]) apps[id](); else if (id.indexOf('p-') === 0) openProject(id.slice(2)); }

  /* ---------- terminal ---------- */
  function terminal() {
    var t = el('div', 'vo-term');
    var out = el('div'), row = el('div', 'row', '<span class="p">valerie@nairobi ~ $</span>'), inp = el('input');
    inp.setAttribute('aria-label', 'Terminal command'); inp.autocomplete = 'off'; inp.spellcheck = false;
    row.appendChild(inp); t.appendChild(out); t.appendChild(row);
    t.addEventListener('click', function () { inp.focus(); });
    var hist = [], hi = 0;
    function print(h, cls) { out.appendChild(el('div', 'ln' + (cls ? ' ' + cls : ''), h)); t.parentNode && (t.parentNode.scrollTop = 1e9); }
    print('ValerieOS terminal · type <b>help</b> to see what I can do', 'dim');
    var cmds = {
      help: function () { print('whoami      who is Valerie\nls          list projects\nopen &lt;name&gt; open a project (e.g. open pesascore)\nprs         open-source pull requests\nexperience  where I\'ve worked\nstack       tools I use\ncontact     how to reach me\nnight       toggle night mode\nclear       clear the screen\nexit        back to the story'); },
      whoami: function () { print('Valerie Mwangi · Software Engineer · Nairobi, Kenya\nBSc Software Engineering, USIU-Africa · Dean\'s List every semester\nCurrently: AI Expert at Clinq Africa', 'ok'); },
      ls: function () { print(PROJECTS.map(function (p) { return p.id.padEnd(11) + ' ' + p.name + ' · ' + p.kind; }).join('\n')); },
      prs: function () { print(PRS.map(function (p) { return (p.s === 'merged' ? '✔ ' : '… ') + p.r + ' #' + p.n + '  ' + p.t; }).join('\n')); },
      experience: function () { print(JOBS.map(function (j) { return j[2].padEnd(11) + j[0] + ', ' + j[1]; }).join('\n')); },
      stack: function () { print('mobile   React Native, Expo, Flutter\nweb      React, TypeScript, Next.js, Nuxt, Tailwind\nbackend  Python, FastAPI, Flask, Java, Node.js, PostgreSQL, Supabase\nai/ml    Gemini Vision, LLM APIs, TensorFlow, scikit-learn'); },
      contact: function () { print('email     <a href="mailto:' + EMAIL + '">' + EMAIL + '</a>\nlinkedin  <a href="https://linkedin.com/in/valeriemwangi" target="_blank" rel="noopener">linkedin.com/in/valeriemwangi</a>\ngithub    <a href="https://github.com/Kare100" target="_blank" rel="noopener">github.com/Kare100</a>'); },
      night: function () { root.classList.toggle('night'); print('wallpaper: ' + (root.classList.contains('night') ? 'night' : 'sunrise'), 'dim'); },
      clear: function () { out.innerHTML = ''; },
      exit: function () { shut(); },
      sudo: function (a) { if (/hire/.test(a)) { print('Permission granted ✦ Opening a message to Valerie…', 'ok'); setTimeout(function () { open('mail'); }, 600); } else print('sudo: try "sudo hire-valerie"', 'er'); },
      coffee: function () { print('☕ brewing… done. Back to building.', 'ok'); }
    };
    inp.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowUp') { e.preventDefault(); if (hi > 0) inp.value = hist[--hi]; return; }
      if (e.key === 'ArrowDown') { e.preventDefault(); if (hi < hist.length) inp.value = hist[++hi] || ''; return; }
      if (e.key === 'Tab') { e.preventDefault(); var v = inp.value.trim(), m = Object.keys(cmds).concat(PROJECTS.map(function (p) { return 'open ' + p.id; })).filter(function (c) { return c.indexOf(v) === 0; }); if (m.length === 1) inp.value = m[0]; return; }
      if (e.key !== 'Enter') return;
      var line = inp.value.trim(); inp.value = ''; print('<span class="p">valerie@nairobi ~ $</span> ' + esc(line));
      if (!line) return; hist.push(line); hi = hist.length;
      var parts = line.split(/\s+/), c = parts[0].toLowerCase(), arg = parts.slice(1).join(' ').toLowerCase();
      if (c === 'open' || c === 'cd') { var p = PROJECTS.filter(function (x) { return x.id.indexOf(arg) === 0 || x.name.toLowerCase().indexOf(arg) === 0; })[0]; if (p) { print('opening ' + p.name + '…', 'ok'); openProject(p.id); } else if (apps[arg]) open(arg); else print('no project called "' + esc(arg) + '". Try ls', 'er'); return; }
      if (cmds[c]) cmds[c](arg); else print('command not found: ' + esc(c) + '. Type help', 'er');
    });
    makeWin('terminal', 'Terminal', t, { w: 600, h: 380 });
  }

  /* ---------- boot / open / shut ---------- */
  function boot(done) {
    var b = el('div', 'vo-boot', '<div class="in"><div class="logo">' + I.logo + 'ValerieOS</div></div>');
    var inEl = b.querySelector('.in');
    var lines = ['Waking up in Nairobi… <b>06:00 EAT</b>', 'Loading memories from Strathmore… <b>done</b>', 'Switching degree: Financial → Software… <b>done</b>', 'Brewing coffee… <b>☕</b>', 'Mounting projects (6)… <b>done</b>'];
    var ps = lines.map(function (l) { var p = el('p', '', l); inEl.appendChild(p); return p; });
    var pb = el('div', 'pb', '<i></i>'); inEl.appendChild(pb); inEl.appendChild(el('small', '', 'click anywhere to skip'));
    root.appendChild(b);
    var i = 0, fin = false;
    function end() { if (fin) return; fin = true; b.remove(); done(); }
    b.addEventListener('click', end);
    if (reduce) { end(); return; }
    (function step() { if (fin) return; if (i < ps.length) { ps[i].classList.add('on'); pb.firstChild.style.width = ((i + 1) / ps.length * 100) + '%'; i++; setTimeout(step, 260); } else setTimeout(end, 380); })();
  }
  function launch() {
    if (!root) build();
    if (!root.hidden) return;
    lastFocus = document.activeElement;
    root.hidden = false; document.documentElement.style.overflow = 'hidden';
    root.classList.remove('closing'); if (!reduce) { root.classList.remove('opening'); void root.offsetWidth; root.classList.add('opening'); }
    var first = !booted; booted = true;
    if (first) boot(function () { apps.welcome(); }); else if (!Object.keys(wins).length) apps.welcome();
    startBtn.focus({ preventScroll: true });
  }
  function shut() {
    if (!root || root.hidden) return;
    closeMenu();
    function hide() { root.hidden = true; root.classList.remove('closing'); document.documentElement.style.overflow = ''; if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true }); }
    if (reduce) hide(); else { root.classList.add('closing'); setTimeout(hide, 380); }
  }

  window.ValerieOS = { open: launch, close: shut };
  [].forEach.call(document.querySelectorAll('[data-vos]'), function (b) { b.addEventListener('click', function (e) { e.preventDefault(); launch(); }); });
  if (location.hash === '#os') launch();
})();
