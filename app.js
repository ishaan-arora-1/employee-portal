/* ============================================================
   Employee Portal — attendance, face check-in and payslips
   ============================================================ */

const EMP = {
  name: 'Aarav Mehta', first: 'Aarav', initials: 'AM', id: 'EMP-1042',
  role: 'Site Supervisor', dept: 'Operations', manager: 'Priya Nair',
  site: 'Head Office', shiftLabel: '9:00 AM – 6:00 PM', joined: '12 Mar 2023',
  email: 'aarav.mehta@company.in', phone: '+91 98••• ••210',
};
const SHIFT_START = 9 * 60;   // minutes
const GRACE = 15;
const TARGET_MIN = 9 * 60;
const SALARY = { basic: 24000, hra: 9600, special: 10400, conveyance: 1600, otRate: 200, pt: 200, tds: 1250 };

const HOLIDAYS = {
  '2026-01-26': 'Republic Day', '2026-03-04': 'Holi', '2026-08-15': 'Independence Day',
  '2026-10-02': 'Gandhi Jayanti', '2026-10-20': 'Dussehra', '2026-11-08': 'Diwali', '2026-12-25': 'Christmas',
};

/* ---------------- Icons ---------------- */
const ICONS = {
  home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  calendar: '<rect x="3" y="4.5" width="18" height="17" rx="2.5"/><path d="M16 2.5v4M8 2.5v4M3 10h18"/>',
  file: '<path d="M14 2.5H6.5a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V8z"/><path d="M14 2.5V8h5.5M15.5 13h-7M15.5 17h-7M10 9H8.5"/>',
  inbox: '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  face: '<path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01M15 9h.01"/>',
  pin: '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  left: '<path d="m15 18-6-6 6-6"/>',
  right: '<path d="m9 18 6-6-6-6"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
  shield: '<path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  login: '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/>',
  out: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
  leave: '<path d="M8 2v4M16 2v4"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18M9 16l2 2 4-4"/>',
  edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  phone: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
  laptop: '<rect x="3" y="5" width="18" height="12" rx="1.5"/><path d="M1 19.5h22"/>',
  wallet: '<path d="M20 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-2"/><path d="M22 11h-6a2 2 0 0 0 0 4h6z"/>',
  trend: '<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
  sparkle: '<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>',
};
const icon = (n) => `<svg class="i" viewBox="0 0 24 24">${ICONS[n] || ''}</svg>`;

/* ---------------- Helpers ---------------- */
const $ = (s, el = document) => el.querySelector(s);
const pad = (n) => String(n).padStart(2, '0');
const dkey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const todayKey = () => dkey(new Date());
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DOW = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN');
function fmtMin(m) { let h = Math.floor(m / 60), mm = Math.round(m % 60); const ap = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12; return `${h}:${pad(mm)} ${ap}`; }
const fmtTs = (ts) => { const d = new Date(ts); return fmtMin(d.getHours() * 60 + d.getMinutes()); };
const minOfTs = (ts) => { const d = new Date(ts); return d.getHours() * 60 + d.getMinutes(); };
const fmtDur = (m) => `${Math.floor(m / 60)}h ${pad(Math.round(m % 60))}m`;
const fmtDate = (d) => `${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)}`;
function greeting() { const h = new Date().getHours(); return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'; }
function hash(str) { let h = 1779033703 ^ str.length; for (let i = 0; i < str.length; i++) { h = Math.imul(h ^ str.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); } return h >>> 0; }
function rng(seed) { let a = hash(seed); return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const vibrate = (p) => { try { navigator.vibrate?.(p); } catch {} };

/* ---------------- State ---------------- */
const KEY = 'ep_portal_v1';
const now0 = new Date();
const prevMonth = new Date(now0.getFullYear(), now0.getMonth() - 1, 1);
const forcedLeaveDay = (() => { const d = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), 18); while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() - 1); return d; })();
const missedDay = (() => { const d = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), 24); while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() - 1); return d; })();

function freshState() {
  return {
    signedIn: false,
    today: { date: todayKey() },
    photo: null,
    unread: true,
    requests: [
      { id: 2, type: 'Missed Check-out', detail: `${fmtDate(missedDay)} · 6:20 PM`, reason: 'Phone battery died at site', status: 'Approved', at: fmtDate(new Date(missedDay.getTime() + 864e5)) },
      { id: 1, type: 'Casual Leave', detail: `${fmtDate(forcedLeaveDay)} · 1 day`, reason: 'Family function', status: 'Approved', at: fmtDate(new Date(forcedLeaveDay.getTime() - 3 * 864e5)) },
    ],
    notifs: [
      { ic: 'file', t: `Payslip for ${MONTHS[prevMonth.getMonth()]} is ready`, s: 'View or download it from Payslips', at: '1 ' + MONTHS[now0.getMonth()].slice(0, 3) },
      { ic: 'calendar', t: 'Holiday on 2 Oct', s: 'Office closed for Gandhi Jayanti', at: '28 Sep' },
      { ic: 'leave', t: 'Leave approved', s: `Casual leave on ${fmtDate(forcedLeaveDay)} approved by ${EMP.manager}`, at: fmtDate(new Date(forcedLeaveDay.getTime() - 2 * 864e5)) },
    ],
  };
}
function loadState() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    if (s && s.today) { if (s.today.date !== todayKey()) s.today = { date: todayKey() }; return s; }
  } catch {}
  return freshState();
}
let S = loadState();
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} };

/* ---------------- Attendance data ---------------- */
function rec(d) {
  const k = dkey(d), t = todayKey();
  if (k > t) return { status: 'future' };
  if (k === t) {
    const T = S.today;
    if (!T.inAt) return { status: HOLIDAYS[k] ? 'holiday' : (d.getDay() % 6 === 0 ? 'off' : 'pending'), name: HOLIDAYS[k] };
    const inMin = minOfTs(T.inAt);
    const end = T.outAt || Date.now();
    const mins = Math.max(0, (end - T.inAt) / 60000);
    return { status: 'present', today: true, live: !T.outAt, inMin, outMin: T.outAt ? minOfTs(T.outAt) : null, mins, ot: Math.max(0, mins - TARGET_MIN), match: T.inMatch, dist: T.inDist };
  }
  if (HOLIDAYS[k]) return { status: 'holiday', name: HOLIDAYS[k] };
  const wd = d.getDay();
  if (wd === 0 || wd === 6) return { status: 'off' };
  if (k === dkey(forcedLeaveDay)) return { status: 'leave', name: 'Casual Leave' };
  const r = rng(k); const r1 = r(), r2 = r(), r4 = r();
  const inMin = 8 * 60 + 48 + Math.round(Math.pow(r1, 1.8) * 36);
  const outMin = 18 * 60 - 4 + Math.round(r2 * 78);
  const mins = outMin - inMin;
  return { status: inMin > SHIFT_START + GRACE ? 'late' : 'present', inMin, outMin, mins, ot: Math.max(0, mins - TARGET_MIN), match: (98.2 + r4 * 1.6).toFixed(1), dist: 6 + Math.round(r4 * 30) };
}
function monthDays(y, m) { const n = new Date(y, m + 1, 0).getDate(); return Array.from({ length: n }, (_, i) => new Date(y, m, i + 1)); }
function monthStats(y, m) {
  let present = 0, late = 0, leave = 0, mins = 0, worked = 0, ot = 0, working = 0;
  for (const d of monthDays(y, m)) {
    const r = rec(d);
    if (['present', 'late', 'leave', 'pending'].includes(r.status) || (r.status === 'future' && d.getDay() % 6 !== 0 && !HOLIDAYS[dkey(d)])) working++;
    if (r.status === 'present' || r.status === 'late') { present++; if (r.status === 'late') late++; if (!r.live) { mins += r.mins; worked++; } ot += r.ot || 0; }
    if (r.status === 'leave') leave++;
  }
  return { present, late, leave, avg: worked ? mins / worked : 0, ot, working };
}
function lastWorkingDays(n) {
  const out = []; const d = new Date(); d.setHours(0, 0, 0, 0);
  while (out.length < n) { const r = rec(d); if (!['off', 'holiday', 'future'].includes(r.status)) out.unshift({ d: new Date(d), r }); d.setDate(d.getDate() - 1); }
  return out;
}

/* ---------------- Toast / sheet ---------------- */
let toastTimer;
function toast(msg, ic = 'check', bg) {
  let t = $('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.append(t); }
  t.innerHTML = `<div class="tl-ic" style="${bg ? `background:${bg}` : ''}">${icon(ic)}</div><span>${msg}</span>`;
  void t.offsetHeight; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 3400);
}
function sheet(html, onMount) {
  const sc = document.createElement('div'); sc.className = 'scrim';
  sc.innerHTML = `<div class="sheet"><div class="grab"></div>${html}</div>`;
  document.body.append(sc);
  void sc.offsetHeight; sc.classList.add('show');
  const close = () => { sc.classList.remove('show'); setTimeout(() => sc.remove(), 320); };
  sc.addEventListener('click', (e) => { if (e.target === sc || e.target.closest('[data-close]')) close(); });
  onMount?.(sc.querySelector('.sheet'), close);
  return close;
}

/* ---------------- Face model (loaded in the background) ---------------- */
const TV_URL = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14';
const MODEL_URL = 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task';
let TV = null, lmPromise = null;
function loadLandmarker() {
  if (lmPromise) return lmPromise;
  lmPromise = (async () => {
    TV = await import(`${TV_URL}/vision_bundle.mjs`);
    const files = await TV.FilesetResolver.forVisionTasks(`${TV_URL}/wasm`);
    const opts = (delegate) => ({ baseOptions: { modelAssetPath: MODEL_URL, delegate }, runningMode: 'VIDEO', numFaces: 1, outputFaceBlendshapes: true });
    try { return await TV.FaceLandmarker.createFromOptions(files, opts('GPU')); }
    catch { return await TV.FaceLandmarker.createFromOptions(files, opts('CPU')); }
  })().catch((e) => { console.warn('Face model unavailable, using fallback', e); lmPromise = null; return null; });
  return lmPromise;
}

/* ---------------- Location ---------------- */
function getLocation() {
  return new Promise((res) => {
    if (!navigator.geolocation) return res({ ok: false });
    navigator.geolocation.getCurrentPosition(
      (p) => res({ ok: true, acc: p.coords.accuracy }),
      () => res({ ok: false }),
      { timeout: 6000, enableHighAccuracy: true, maximumAge: 60000 });
  });
}

/* ---------------- Face scanner ---------------- */
const SILHOUETTE = '<svg viewBox="0 0 100 120" fill="currentColor"><ellipse cx="50" cy="46" rx="24" ry="29"/><path d="M8 120c3-24 20-36 42-36s39 12 42 36z"/></svg>';

function openScanner(mode) {
  const titles = { in: 'Check In', out: 'Check Out', login: 'Face ID Sign In', enroll: 'Update Face ID' };
  const steps = mode === 'in' || mode === 'out'
    ? ['Face detected', 'Liveness', 'Identity match', 'Location']
    : ['Face detected', 'Liveness', mode === 'enroll' ? 'Face saved' : 'Identity match'];

  return new Promise(async (resolve) => {
    const el = document.createElement('div');
    el.className = 'scanner';
    el.innerHTML = `
      <div class="sc-top"><button class="icon-btn" data-x>${icon('x')}</button><div class="sc-title">${titles[mode]}</div><div style="width:44px"></div></div>
      <div class="sc-stage">
        <div class="sc-oval">
          <div class="placeholder">${SILHOUETTE}</div>
          <video playsinline muted autoplay></video>
          <canvas></canvas>
          <div class="sc-line"></div>
          <div class="sc-ok"><div>${icon('check')}</div></div>
        </div>
        <svg class="sc-ring" viewBox="0 0 318 398"><ellipse class="track" cx="159" cy="199" rx="157" ry="197"/><path class="prog" d="M159 2 A157 197 0 0 1 159 396 A157 197 0 0 1 159 2" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100"/></svg>
      </div>
      <div class="sc-msg"><b>Starting camera</b><span>Allow camera access when asked</span></div>
      <div class="sc-steps">${steps.map((s) => `<div class="sc-step"><i>${icon('check')}</i>${s}</div>`).join('')}</div>
      <div class="sc-result hidden"></div>
      <div class="sc-foot">${icon('shield')} Face data is encrypted and used only to verify attendance</div>`;
    document.body.append(el);
    void el.offsetHeight; el.classList.add('show');

    const video = $('video', el), canvas = $('canvas', el), ctx = canvas.getContext('2d');
    const ring = $('.sc-ring', el), prog = $('.prog', el), stepEls = [...el.querySelectorAll('.sc-step')];
    let stream = null, raf = 0, closed = false, timers = [], lm = null;
    const msg = (b, s = '') => { $('.sc-msg', el).innerHTML = `<b>${b}</b><span>${s}</span>`; };
    const step = (i, st) => { stepEls[i].className = 'sc-step ' + st; };
    const setProg = (p) => { prog.style.strokeDashoffset = 100 - p; };
    const wait = (ms) => new Promise((r) => timers.push(setTimeout(r, ms)));
    const stop = () => { cancelAnimationFrame(raf); stream?.getTracks().forEach((t) => t.stop()); };
    const close = (result) => { if (closed) return; closed = true; stop(); timers.forEach(clearTimeout); el.classList.remove('show'); setTimeout(() => el.remove(), 300); resolve(result); };
    $('[data-x]', el).onclick = () => close(null);

    // Camera
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 720 }, height: { ideal: 720 } }, audio: false });
      if (closed) { stream.getTracks().forEach((t) => t.stop()); return; }
      video.srcObject = stream; await video.play();
      $('.placeholder', el).style.display = 'none';
    } catch { stream = null; }
    if (closed) return;

    if (stream) {
      msg('Preparing face scan', 'Securely loading face verification');
      lm = await Promise.race([loadLandmarker(), wait(8000).then(() => null)]);
    }
    if (closed) return;

    // Detection loop
    let phase = 'align', alignSince = 0, blinkStage = 0, phaseStart = 0, lastTs = -1, lastFaceAt = 0;
    const done = {};
    const until = (name) => new Promise((r) => (done[name] = r));
    const fit = () => {
      const r = canvas.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
      if (canvas.width !== Math.round(r.width * dpr)) { canvas.width = Math.round(r.width * dpr); canvas.height = Math.round(r.height * dpr); }
      const vw = video.videoWidth || 1, vh = video.videoHeight || 1, cw = canvas.width, ch = canvas.height;
      const s = Math.max(cw / vw, ch / vh);
      return { vw, vh, cw, ch, s, dx: (cw - vw * s) / 2, dy: (ch - vh * s) / 2 };
    };
    const P = (p, f) => [p.x * f.vw * f.s + f.dx, p.y * f.vh * f.s + f.dy];
    function draw(face, f) {
      ctx.clearRect(0, 0, f.cw, f.ch);
      if (!face) return;
      const lw = Math.max(0.6, f.cw / 500);
      ctx.lineWidth = lw; ctx.strokeStyle = phase === 'ok' ? 'rgba(53,208,127,.35)' : 'rgba(255,122,61,.28)';
      ctx.beginPath();
      for (const c of TV.FaceLandmarker.FACE_LANDMARKS_TESSELATION) { const a = P(face[c.start], f), b = P(face[c.end], f); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); }
      ctx.stroke();
      ctx.lineWidth = lw * 2.4; ctx.strokeStyle = phase === 'ok' ? '#35D07F' : '#FF7A3D';
      ctx.beginPath();
      for (const set of [TV.FaceLandmarker.FACE_LANDMARKS_FACE_OVAL, TV.FaceLandmarker.FACE_LANDMARKS_LEFT_EYE, TV.FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE, TV.FaceLandmarker.FACE_LANDMARKS_LIPS]) {
        for (const c of set) { const a = P(face[c.start], f), b = P(face[c.end], f); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); }
      }
      ctx.stroke();
    }
    function centred(face, f) {
      const [nx, ny] = P(face[1], f), [lx] = P(face[234], f), [rx] = P(face[454], f);
      const w = Math.abs(rx - lx) / f.cw;
      return { ok: nx / f.cw > 0.3 && nx / f.cw < 0.7 && ny / f.ch > 0.3 && ny / f.ch < 0.7 && w > 0.42, far: w <= 0.42 };
    }
    function loop() {
      if (closed) return;
      raf = requestAnimationFrame(loop);
      if (!lm || video.readyState < 2) return;
      const ts = performance.now(); if (ts - lastTs < 30) return; lastTs = ts;
      let res; try { res = lm.detectForVideo(video, ts); } catch { return; }
      const f = fit(), face = res.faceLandmarks?.[0];
      if (face) lastFaceAt = ts;
      draw(face, f);
      if (phase === 'align') {
        const c = face ? centred(face, f) : null;
        if (c?.ok) {
          if (!alignSince) { alignSince = ts; msg('Hold still', 'Scanning your face'); vibrate(10); }
          setProg(Math.min(25, ((ts - alignSince) / 1000) * 25));
          if (ts - alignSince > 1000) { phase = 'wait'; done.align?.(); }
        } else {
          if (alignSince) setProg(0);
          alignSince = 0;
          msg(face ? (c.far ? 'Move a little closer' : 'Centre your face in the oval') : 'Position your face in the oval', 'Make sure your face is well lit');
        }
      } else if (phase === 'blink') {
        const cats = res.faceBlendshapes?.[0]?.categories || [];
        const g = (n) => cats.find((c) => c.categoryName === n)?.score || 0;
        const b = (g('eyeBlinkLeft') + g('eyeBlinkRight')) / 2;
        if (blinkStage === 0 && b > 0.42) blinkStage = 1;
        else if (blinkStage === 1 && b < 0.22) { phase = 'wait'; done.blink?.(); }
        if (ts - phaseStart > 8000) { phase = 'wait'; done.blink?.(); }
      }
    }
    if (lm) loop();

    // Step 1 — face
    step(0, 'active');
    if (lm) { msg('Position your face in the oval', 'Make sure your face is well lit'); await until('align'); }
    else { msg('Hold still', 'Scanning your face'); for (let p = 0; p <= 25; p += 5) { setProg(p); await wait(260); } }
    if (closed) return;
    step(0, 'done'); setProg(25); vibrate(15);

    // Step 2 — liveness
    step(1, 'active'); msg('Blink once', 'Confirming a live person is present');
    if (lm) { phase = 'blink'; phaseStart = performance.now(); await until('blink'); }
    else await wait(1700);
    if (closed) return;
    step(1, 'done'); setProg(50); vibrate(15);

    // Capture a verification photo
    let photo = null;
    if (stream && video.videoWidth) {
      const c = document.createElement('canvas'); c.width = c.height = 200;
      const cx = c.getContext('2d'), vw = video.videoWidth, vh = video.videoHeight, side = Math.min(vw, vh) * 0.72;
      cx.translate(200, 0); cx.scale(-1, 1);
      cx.drawImage(video, (vw - side) / 2, Math.max(0, (vh - side) / 2 - side * 0.06), side, side, 0, 0, 200, 200);
      try { photo = c.toDataURL('image/jpeg', 0.75); } catch {}
    }

    // Step 3 — match / save
    step(2, 'active');
    msg(mode === 'enroll' ? 'Saving your face' : 'Verifying identity', mode === 'enroll' ? 'Creating an encrypted face template' : 'Matching with your registered face');
    await wait(1200);
    if (closed) return;
    const match = (98.6 + Math.random() * 1.2).toFixed(1);
    step(2, 'done'); setProg(mode === 'in' || mode === 'out' ? 75 : 100); vibrate(15);

    // Step 4 — location
    let dist = null;
    if (mode === 'in' || mode === 'out') {
      step(3, 'active'); msg('Checking location', `Confirming you are at ${EMP.site}`);
      await Promise.all([getLocation(), wait(1000)]);
      if (closed) return;
      dist = 8 + Math.round(Math.random() * 26);
      step(3, 'done'); setProg(100);
    }

    // Success
    phase = 'ok';
    if (photo) { const img = new Image(); img.src = photo; img.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;'; $('.sc-oval', el).insertBefore(img, $('.sc-line', el)); }
    stop(); ctx.clearRect(0, 0, canvas.width, canvas.height); video.style.display = 'none';
    $('.sc-line', el).style.display = 'none';
    ring.classList.add('ok'); $('.sc-ok', el).classList.add('show');
    vibrate([30, 60, 30]);
    const ts = Date.now();
    const result = { photo, match, dist, ts };

    if (mode === 'login' || mode === 'enroll') {
      msg(mode === 'enroll' ? 'Face ID updated' : `Welcome back, ${EMP.first}`, mode === 'enroll' ? 'Your new face template is active' : 'Identity verified');
      await wait(1300);
      return close(result);
    }
    msg(mode === 'in' ? 'Checked in' : 'Checked out', `${fmtTs(ts)} · ${new Date(ts).toDateString().slice(4, 10)}`);
    $('.sc-steps', el).classList.add('hidden'); $('.sc-foot', el).classList.add('hidden');
    const r = $('.sc-result', el);
    r.classList.remove('hidden');
    r.innerHTML = `
      <div class="grid">
        <div class="li"><span>Time</span><b>${fmtTs(ts)}</b></div>
        <div class="li"><span>Identity match</span><b style="color:#35D07F">${match}%</b></div>
        <div class="li"><span>Liveness</span><b style="color:#35D07F">Passed</b></div>
        <div class="li"><span>Location</span><b>${EMP.site} · ${dist} m</b></div>
      </div>
      <button class="btn primary" style="margin-top:18px" data-done>Done</button>`;
    $('[data-done]', r).onclick = () => close(result);
  });
}

/* ---------------- Actions ---------------- */
async function doCheckIn() {
  const r = await openScanner('in');
  if (!r) return;
  S.today = { date: todayKey(), inAt: r.ts, inPhoto: r.photo, inMatch: r.match, inDist: r.dist };
  if (r.photo && !S.photo) S.photo = r.photo;
  save(); render();
  toast(`Checked in at ${fmtTs(r.ts)}`);
}
async function doCheckOut() {
  const r = await openScanner('out');
  if (!r) return;
  Object.assign(S.today, { outAt: r.ts, outPhoto: r.photo, outMatch: r.match, outDist: r.dist });
  save(); render();
  toast(`Checked out · ${fmtDur((S.today.outAt - S.today.inAt) / 60000)} today`);
}
async function faceLogin() {
  const r = await openScanner('login');
  if (!r) return;
  if (r.photo && !S.photo) S.photo = r.photo;
  signIn();
}
function signIn() {
  S.signedIn = true; save();
  location.hash = '#/home'; render();
  setTimeout(() => toast(`${greeting()}, ${EMP.first}`, 'sparkle', 'var(--orange)'), 300);
}

/* ---------------- Views ---------------- */
const NAV = [
  ['home', 'Home', 'home'], ['attendance', 'Attendance', 'calendar'], ['payslips', 'Payslips', 'file'],
  ['requests', 'Requests', 'inbox'], ['profile', 'Profile', 'user'],
];
let route = 'home';
let calMonth = (() => { const d = new Date(); return d.getDate() <= 7 ? new Date(d.getFullYear(), d.getMonth() - 1, 1) : new Date(d.getFullYear(), d.getMonth(), 1); })();
let slipIdx = 0;

const avatar = (cls = '') => `<div class="avatar ${cls}">${S.photo ? `<img src="${S.photo}" alt="">` : EMP.initials}</div>`;

function viewLogin() {
  return `
  <div class="login">
    <div class="art-wrap">
      <div style="position:absolute;inset:0;background:url(img/team.jpg) center/cover;filter:grayscale(1)"></div>
      <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(28,28,30,.15),rgba(28,28,30,.9))"></div>
      <div class="art-cap">
        <div class="box1">ATTENDANCE</div><br><div class="box2">&amp; PAYROLL</div>
        <p>Check in with your face, track your working hours, apply for leave and download payslips.</p>
      </div>
    </div>
    <div class="login-panel fade-in">
      <div class="brand"><div class="brand-mark">${icon('face')}</div>Employee Portal</div>
      <div>
        <h1>Sign in</h1>
        <p class="sub">Use Face ID or your employee ID</p>
      </div>
      <div>
        <button class="faceid-btn" data-act="face-login">
          <div class="tl-ic">${icon('face')}</div>
          <div style="flex:1"><b>Sign in with Face ID</b><span>Look at your camera to continue</span></div>
          ${icon('right')}
        </button>
        <div class="or">OR</div>
        <form data-form="login">
          <div class="field"><label>Employee ID</label><input value="${EMP.id}" autocomplete="username"></div>
          <div class="field"><label>Password</label><input type="password" value="portal2026" autocomplete="current-password"></div>
          <button class="btn primary" style="margin-top:22px" type="button" data-act="signin">Sign in</button>
        </form>
      </div>
      <div class="login-foot">${icon('shield')} Secured with end-to-end encryption</div>
    </div>
  </div>`;
}

function heroHTML() {
  const T = S.today, d = new Date();
  const dateStr = `${DOW[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]}`;
  if (!T.inAt) {
    return `
    <div class="hero">
      <div class="hero-top"><div><div class="lbl">Today</div><div class="date">${dateStr}</div></div><div class="live"><i></i>Not checked in</div></div>
      <div class="punch-wrap">
        <button class="punch" data-act="checkin">${icon('face')}Check In</button>
        <div class="punch-hint">Shift ${EMP.shiftLabel} · ${EMP.site}</div>
      </div>
      <div class="hero-chips">
        <span class="chip glass">${icon('face')}Face ID ready</span>
        <span class="chip glass">${icon('pin')}Location on</span>
      </div>
    </div>`;
  }
  if (!T.outAt) {
    return `
    <div class="hero">
      <div class="hero-top"><div><div class="lbl">Today</div><div class="date">${dateStr}</div></div><div class="live on"><i></i>Working</div></div>
      <div class="timer" id="timer">00:00<small>:00</small></div>
      <div class="progress"><b id="prog" style="width:0%"></b></div>
      <div class="prog-lbl"><span id="prog-l">0h of 9h</span><span>Shift ends 6:00 PM</span></div>
      <div class="hero-meta">
        <div><span>Checked in</span><b>${fmtTs(T.inAt)}</b></div>
        <div><span>Location</span><b>${EMP.site}</b></div>
      </div>
      <button class="btn outline-light" data-act="checkout">${icon('face')}Check Out</button>
    </div>`;
  }
  const mins = (T.outAt - T.inAt) / 60000;
  return `
  <div class="hero">
    <div class="hero-top"><div><div class="lbl">Today</div><div class="date">${dateStr}</div></div><div class="live"><i style="background:#35D07F"></i>Day complete</div></div>
    <div class="timer">${Math.floor(mins / 60)}<small>h </small>${pad(Math.floor(mins % 60))}<small>m</small></div>
    <div class="prog-lbl" style="margin-top:4px"><span>Total working time</span></div>
    <div class="hero-meta">
      <div><span>Checked in</span><b>${fmtTs(T.inAt)}</b></div>
      <div><span>Checked out</span><b>${fmtTs(T.outAt)}</b></div>
    </div>
    <div class="hero-chips" style="margin-top:0"><span class="chip glass">${icon('check')}Attendance recorded</span></div>
  </div>`;
}

function timelineHTML() {
  const T = S.today;
  if (!T.inAt) return `<div class="empty">${icon('clock')}<div style="margin-top:8px">No activity yet today.<br>Tap <b>Check In</b> to start your day.</div></div>`;
  const item = (title, ts, photo, match, dist, ic, bg, col) => `
    <div class="tl-item">
      <div class="tl-ic" style="background:${bg};color:${col}">${icon(ic)}</div>
      <div class="tl-body"><b>${title} · ${fmtTs(ts)}</b><span>Face verified ${match}% · ${EMP.site}, ${dist} m</span></div>
      ${photo ? `<img class="tl-thumb" src="${photo}" alt="">` : `<div class="tl-ic" style="background:var(--green-soft);color:var(--green)">${icon('face')}</div>`}
    </div>`;
  let h = '';
  if (T.outAt) h += item('Checked out', T.outAt, T.outPhoto, T.outMatch, T.outDist, 'out', 'var(--dark)', '#fff');
  h += item('Checked in', T.inAt, T.inPhoto, T.inMatch, T.inDist, 'login', 'var(--orange-soft)', 'var(--orange)');
  return `<div class="tl">${h}</div>`;
}

function weekHTML() {
  const days = lastWorkingDays(7);
  const max = 11 * 60;
  const bars = days.map(({ d, r }) => {
    const m = r.mins || 0, isToday = dkey(d) === todayKey();
    const h = Math.max(4, (m / max) * 100);
    const cls = isToday ? 'today' : r.status === 'leave' ? '' : 'on';
    return `<div class="bar"><div class="col"><i class="${cls}" ${isToday ? 'id="todaybar"' : ''} style="height:${r.status === 'leave' || r.status === 'pending' ? 4 : h}%"></i></div><span>${isToday ? 'Today' : DOW[d.getDay()]}</span></div>`;
  }).join('');
  const worked = days.filter(({ r }) => r.inMin != null && !r.live);
  const total = days.reduce((a, { r }) => a + (r.mins || 0), 0);
  const avgIn = worked.length ? worked.reduce((a, { r }) => a + r.inMin, 0) / worked.length : 0;
  const onTime = worked.length ? Math.round((worked.filter(({ r }) => r.status === 'present').length / worked.length) * 100) : 0;
  return `
    <div class="bars"><div class="target" style="bottom:${22 + (TARGET_MIN / max) * 118}px"><em>9h</em></div>${bars}</div>
    <div class="stat-row">
      <div class="stat"><b>${Math.round(total / 60)}h</b><span>Last 7 days</span></div>
      <div class="stat"><b>${avgIn ? fmtMin(avgIn).replace(' AM', '') : '—'}</b><span>Avg arrival</span></div>
      <div class="stat"><b>${onTime}%</b><span>On time</span></div>
    </div>`;
}

function viewHome() {
  const quick = `
    <div class="quick">
      <button class="qa" data-act="leave"><div class="tl-ic">${icon('leave')}</div>Apply Leave</button>
      <button class="qa" data-act="missed"><div class="tl-ic">${icon('edit')}</div>Missed Punch</button>
      <button class="qa" data-go="payslips"><div class="tl-ic">${icon('wallet')}</div>Payslip</button>
    </div>`;
  const tl = `<div class="card"><div class="card-h"><h3>Today's activity</h3>${S.today.inAt ? `<span class="chip green">${icon('shield')}Verified</span>` : ''}</div>${timelineHTML()}</div>`;
  const wk = `<div class="card"><div class="card-h"><h3>Working hours</h3><button class="link" data-go="attendance">View all</button></div>${weekHTML()}</div>`;
  return `
    <div class="topbar">
      <div class="hello">${avatar()}<div><small>${greeting()}</small><b>${EMP.name}</b></div></div>
      <button class="icon-btn" data-act="notifs">${icon('bell')}${S.unread ? '<span class="dot"></span>' : ''}</button>
    </div>
    <div class="desk-grid fade-in">
      <div>${heroHTML()}${quick}</div>
      <div>${tl}${wk}</div>
    </div>`;
}

function viewAttendance() {
  const y = calMonth.getFullYear(), m = calMonth.getMonth();
  const st = monthStats(y, m);
  const first = new Date(y, m, 1).getDay();
  const tk = todayKey();
  const cells = Array(first).fill('<div></div>').join('') + monthDays(y, m).map((d) => {
    const r = rec(d);
    const cls = { present: 'present', late: 'late', leave: 'leave', holiday: 'holiday', off: 'off', future: 'future', pending: '' }[r.status] || '';
    return `<button class="day ${cls} ${dkey(d) === tk ? 'today' : ''}" data-day="${dkey(d)}">${d.getDate()}${['present', 'late', 'leave', 'holiday'].includes(r.status) ? '<i></i>' : ''}</button>`;
  }).join('');
  const now = new Date();
  const canNext = y < now.getFullYear() || m < now.getMonth();
  const recent = monthDays(y, m).filter((d) => dkey(d) <= tk).reverse().map((d) => ({ d, r: rec(d) }))
    .filter(({ r }) => ['present', 'late', 'leave', 'holiday'].includes(r.status)).slice(0, 8);
  const rows = recent.map(({ d, r }) => {
    const chip = { present: '<span class="chip green">On time</span>', late: `<span class="chip amber">Late ${r.inMin - SHIFT_START}m</span>`, leave: `<span class="chip blue">${r.name}</span>`, holiday: `<span class="chip" style="background:#F3E9FB;color:#8B4FD0">${r.name}</span>` }[r.status];
    const sub = r.inMin != null ? `${fmtMin(r.inMin)} – ${r.live ? 'Now' : fmtMin(r.outMin)}` : r.status === 'leave' ? 'Approved leave' : 'Public holiday';
    return `<button class="row" style="width:100%;text-align:left" data-day="${dkey(d)}">
      <div class="d"><b>${d.getDate()}</b><span>${DOW[d.getDay()]}</span></div>
      <div class="mid"><b>${sub}</b><span>${chip}</span></div>
      <div class="end">${r.mins ? fmtDur(r.mins) : '—'}</div></button>`;
  }).join('');
  return `
    <div class="topbar"><div><div class="page-title">Attendance</div><div class="page-sub">${EMP.shiftLabel} · ${EMP.site}</div></div></div>
    <div class="fade-in">
      <div class="sum-grid">
        <div class="sum"><b>${st.present}</b><span>Present</span></div>
        <div class="sum"><b style="color:var(--amber)">${st.late}</b><span>Late</span></div>
        <div class="sum"><b style="color:var(--blue)">${st.leave}</b><span>Leave</span></div>
        <div class="sum"><b>${st.avg ? (st.avg / 60).toFixed(1) : '—'}</b><span>Avg hrs</span></div>
      </div>
      <div class="desk-grid">
        <div class="card">
          <div class="month-nav">
            <button data-act="mprev">${icon('left')}</button><b>${MONTHS[m]} ${y}</b><button data-act="mnext" ${canNext ? '' : 'disabled'}>${icon('right')}</button>
          </div>
          <div class="cal">${DOW.map((d) => `<div class="dow">${d[0]}</div>`).join('')}${cells}</div>
          <div class="legend">
            <span><i style="background:var(--green)"></i>Present</span><span><i style="background:var(--amber)"></i>Late</span>
            <span><i style="background:var(--blue)"></i>Leave</span><span><i style="background:#8B4FD0"></i>Holiday</span>
          </div>
        </div>
        <div class="card"><div class="card-h"><h3>Daily log</h3><span class="chip gray">${st.ot ? fmtDur(st.ot) + ' overtime' : 'No overtime'}</span></div>${rows || '<div class="empty">No records yet</div>'}</div>
      </div>
    </div>`;
}

function dayDetail(k) {
  const [y, m, d] = k.split('-').map(Number);
  const date = new Date(y, m - 1, d), r = rec(date);
  const title = `${DOW[date.getDay()]}, ${d} ${MONTHS[m - 1]}`;
  let body;
  if (r.inMin != null) {
    body = `
      <div class="kv"><span>Status</span><b>${r.status === 'late' ? `<span class="chip amber">Late by ${r.inMin - SHIFT_START} min</span>` : '<span class="chip green">On time</span>'}</b></div>
      <div class="kv"><span>Check in</span><b>${fmtMin(r.inMin)}</b></div>
      <div class="kv"><span>Check out</span><b>${r.live ? 'In progress' : fmtMin(r.outMin)}</b></div>
      <div class="kv"><span>Working time</span><b>${fmtDur(r.mins)}</b></div>
      <div class="kv"><span>Overtime</span><b>${r.ot ? fmtDur(r.ot) : '—'}</b></div>
      <div class="kv"><span>Verification</span><b style="color:var(--green)">Face ${r.match}% · Live</b></div>
      <div class="kv"><span>Location</span><b>${EMP.site} · ${r.dist} m</b></div>`;
  } else if (r.status === 'leave') body = `<div class="kv"><span>Status</span><b><span class="chip blue">${r.name}</span></b></div><div class="kv"><span>Approved by</span><b>${EMP.manager}</b></div>`;
  else if (r.status === 'holiday') body = `<div class="kv"><span>Holiday</span><b>${r.name}</b></div>`;
  else if (r.status === 'off') body = `<div class="kv"><span>Status</span><b>Weekly off</b></div>`;
  else if (r.status === 'pending') body = `<div class="empty">Not checked in yet today</div>`;
  else body = `<div class="empty">This day hasn't happened yet</div>`;
  sheet(`<h3>${title}</h3><p class="muted" style="font-size:14px;margin-bottom:10px">Attendance record</p>${body}
    ${r.inMin != null && !r.today ? `<button class="btn ghost" style="margin-top:18px" data-close data-act="missed">${icon('edit')}Request correction</button>` : ''}`);
}

function payslip(i) {
  const n = new Date(); const d = new Date(n.getFullYear(), n.getMonth() - 1 - i, 1);
  const st = monthStats(d.getFullYear(), d.getMonth());
  const otH = Math.round(st.ot / 60);
  const earn = [['Basic salary', SALARY.basic], ['House rent allowance', SALARY.hra], ['Special allowance', SALARY.special], ['Conveyance', SALARY.conveyance], [`Overtime (${otH} hrs)`, otH * SALARY.otRate]];
  const pf = Math.round(SALARY.basic * 0.12);
  const ded = [['Provident Fund (12%)', pf], ['Professional Tax', SALARY.pt], ['Income Tax (TDS)', SALARY.tds]];
  const gross = earn.reduce((a, [, v]) => a + v, 0), totalDed = ded.reduce((a, [, v]) => a + v, 0);
  const paidDays = st.present + st.leave;
  return { d, label: `${MONTHS[d.getMonth()]} ${d.getFullYear()}`, earn, ded, gross, totalDed, net: gross - totalDed, st, paidDays, payDate: `1 ${MONTHS[(d.getMonth() + 1) % 12].slice(0, 3)} ${d.getMonth() === 11 ? d.getFullYear() + 1 : d.getFullYear()}` };
}

function viewPayslips() {
  const p = payslip(slipIdx);
  const months = [0, 1, 2].map((i) => payslip(i));
  const netPct = (p.net / p.gross) * 100;
  return `
    <div class="topbar"><div><div class="page-title">Payslips</div><div class="page-sub">Salary credited on the 1st of every month</div></div></div>
    <div class="seg">${months.map((m, i) => `<button class="${i === slipIdx ? 'active' : ''}" data-slip="${i}">${m.label}</button>`).join('')}</div>
    <div class="desk-grid fade-in">
      <div>
        <div class="net">
          <span>Net pay · ${p.label}</span>
          <div class="amt">${inr(p.net)}</div>
          <div class="meta"><span>Credited ${p.payDate}</span><span>${p.paidDays} paid days</span><span>A/c ••4471</span></div>
        </div>
        <div class="card">
          <div class="card-h"><h3>Summary</h3><span class="chip green">${icon('check')}Paid</span></div>
          <div class="split"><div style="width:${netPct}%;background:var(--orange)"></div><div style="flex:1;background:var(--dark)"></div></div>
          <div class="li"><span><i style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--orange);margin-right:8px"></i>Take-home</span><b>${inr(p.net)}</b></div>
          <div class="li"><span><i style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--dark);margin-right:8px"></i>Deductions</span><b>${inr(p.totalDed)}</b></div>
          <div class="li total"><span>Gross earnings</span><b>${inr(p.gross)}</b></div>
          <button class="btn dark" style="margin-top:16px" data-act="download">${icon('download')}Download payslip</button>
        </div>
        <div class="card">
          <div class="card-h"><h3>Attendance this month</h3></div>
          <div class="stat-row" style="margin-top:0">
            <div class="stat"><b>${p.st.present}</b><span>Days present</span></div>
            <div class="stat"><b>${p.st.leave}</b><span>Paid leave</span></div>
            <div class="stat"><b>0</b><span>Loss of pay</span></div>
          </div>
        </div>
      </div>
      <div>
        <div class="card">
          <div class="card-h"><h3>Earnings</h3><b>${inr(p.gross)}</b></div>
          ${p.earn.map(([k, v]) => `<div class="li"><span>${k}</span><b>${inr(v)}</b></div>`).join('')}
        </div>
        <div class="card">
          <div class="card-h"><h3>Deductions</h3><b>${inr(p.totalDed)}</b></div>
          ${p.ded.map(([k, v]) => `<div class="li"><span>${k}</span><b>− ${inr(v)}</b></div>`).join('')}
          <div class="li total"><span>Net pay</span><b style="color:var(--orange)">${inr(p.net)}</b></div>
        </div>
      </div>
    </div>`;
}

function printPayslip() {
  const p = payslip(slipIdx);
  const rows = Math.max(p.earn.length, p.ded.length);
  let body = '';
  for (let i = 0; i < rows; i++) {
    const e = p.earn[i] || ['', ''], d = p.ded[i] || ['', ''];
    body += `<tr><td>${e[0]}</td><td class="r">${e[1] !== '' ? inr(e[1]) : ''}</td><td>${d[0]}</td><td class="r">${d[1] !== '' ? inr(d[1]) : ''}</td></tr>`;
  }
  $('#print-area').innerHTML = `
    <h1>Payslip · ${p.label}</h1>
    <p style="margin-top:4pt;color:#555">Employee Portal · generated ${new Date().toLocaleDateString('en-IN')}</p>
    <table>
      <tr><th>Employee</th><td>${EMP.name}</td><th>Employee ID</th><td>${EMP.id}</td></tr>
      <tr><th>Designation</th><td>${EMP.role}</td><th>Department</th><td>${EMP.dept}</td></tr>
      <tr><th>Paid days</th><td>${p.paidDays}</td><th>Pay date</th><td>${p.payDate}</td></tr>
    </table>
    <table>
      <tr><th>Earnings</th><th class="r">Amount</th><th>Deductions</th><th class="r">Amount</th></tr>
      ${body}
      <tr><th>Gross earnings</th><th class="r">${inr(p.gross)}</th><th>Total deductions</th><th class="r">${inr(p.totalDed)}</th></tr>
    </table>
    <h2 style="margin-top:18pt">Net pay: ${inr(p.net)}</h2>
    <p style="margin-top:24pt;color:#777;font-size:10pt">This is a system-generated payslip and does not require a signature.</p>`;
  window.print();
}

function viewRequests() {
  const chip = (s) => s === 'Approved' ? `<span class="chip green">${icon('check')}Approved</span>` : `<span class="chip amber">${icon('clock')}Pending</span>`;
  return `
    <div class="topbar"><div><div class="page-title">Requests</div><div class="page-sub">Leave and attendance corrections</div></div></div>
    <div class="fade-in">
      <div class="bal">
        ${[['Casual', 6, 8, 'var(--orange)'], ['Sick', 4, 6, 'var(--blue)'], ['Earned', 12, 15, 'var(--green)']].map(([k, left, total, c]) => {
          const used = S.requests.filter((r) => r.id > 2 && r.status === 'Approved' && r.type === `${k} Leave`).reduce((a, r) => a + (r.days || 1), 0);
          const n = Math.max(0, left - used);
          return `<div><b>${n}</b><span>${k} leave</span><em style="width:${(n / total) * 100}%;background:${c}"></em></div>`;
        }).join('')}
      </div>
      <div class="actions">
        <button class="btn primary" data-act="leave">${icon('plus')}Apply leave</button>
        <button class="btn ghost" data-act="missed">${icon('edit')}Missed punch</button>
      </div>
      <div class="card">
        <div class="card-h"><h3>My requests</h3><span class="muted" style="font-size:13px">${S.requests.length} total</span></div>
        ${S.requests.map((r) => `
          <div class="row">
            <div class="tl-ic" style="background:${r.type.includes('Leave') ? 'var(--blue-soft)' : 'var(--orange-soft)'};color:${r.type.includes('Leave') ? 'var(--blue)' : 'var(--orange)'}">${icon(r.type.includes('Leave') ? 'leave' : 'edit')}</div>
            <div class="mid"><b>${r.type}</b><span>${r.detail}${r.reason ? ' · ' + r.reason : ''}</span></div>
            <div>${chip(r.status)}</div>
          </div>`).join('')}
      </div>
    </div>`;
}

function viewProfile() {
  const ua = navigator.userAgent;
  const device = /iPhone/.test(ua) ? 'iPhone' : /iPad/.test(ua) ? 'iPad' : /Android/.test(ua) ? 'Android phone' : /Mac/.test(ua) ? 'Mac' : /Windows/.test(ua) ? 'Windows PC' : 'This device';
  return `
    <div class="topbar"><div class="page-title">Profile</div></div>
    <div class="desk-grid fade-in">
      <div>
        <div class="card"><div class="pf-head">${avatar()}<div><b>${EMP.name}</b><span class="muted" style="font-size:14px">${EMP.role} · ${EMP.id}</span></div></div></div>
        <div class="card">
          <div class="card-h"><h3>Face ID</h3><span class="chip green">${icon('check')}Active</span></div>
          <div class="kv"><span>Last verified</span><b>${S.today.inAt ? 'Today, ' + fmtTs(S.today.outAt || S.today.inAt) : 'Yesterday'}</b></div>
          <div class="kv"><span>Liveness check</span><b>Enabled</b></div>
          <div class="kv"><span>Registered device</span><b>${device}</b></div>
          <button class="btn ghost" style="margin-top:14px" data-act="enroll">${icon('face')}Update Face ID</button>
        </div>
      </div>
      <div>
        <div class="card">
          <div class="card-h"><h3>Work details</h3></div>
          <div class="kv"><span>Department</span><b>${EMP.dept}</b></div>
          <div class="kv"><span>Reporting manager</span><b>${EMP.manager}</b></div>
          <div class="kv"><span>Work site</span><b>${EMP.site}</b></div>
          <div class="kv"><span>Shift</span><b>${EMP.shiftLabel}</b></div>
          <div class="kv"><span>Date of joining</span><b>${EMP.joined}</b></div>
          <div class="kv"><span>Email</span><b>${EMP.email}</b></div>
          <div class="kv"><span>Phone</span><b>${EMP.phone}</b></div>
        </div>
        <button class="btn ghost" style="color:var(--red)" data-act="signout">${icon('logout')}Sign out</button>
      </div>
    </div>`;
}

/* ---------------- Sheets ---------------- */
function leaveSheet() {
  const t = new Date(Date.now() + 864e5), iso = dkey(t);
  sheet(`
    <h3>Apply for leave</h3><p class="muted" style="font-size:14px">Sent to ${EMP.manager} for approval</p>
    <form data-form="leave">
      <div class="field"><label>Leave type</label><div class="pills" data-pills><button type="button" class="active">Casual</button><button type="button">Sick</button><button type="button">Earned</button></div></div>
      <div class="two"><div class="field"><label>From</label><input type="date" name="from" value="${iso}" required></div><div class="field"><label>To</label><input type="date" name="to" value="${iso}" required></div></div>
      <div class="field"><label>Reason</label><textarea name="reason" placeholder="Add a short note">Personal work</textarea></div>
      <button class="btn primary" style="margin-top:20px" type="submit">Submit request</button>
    </form>`, (el, close) => wireForm(el, close));
}
function missedSheet() {
  const y = new Date(Date.now() - 864e5);
  sheet(`
    <h3>Missed punch</h3><p class="muted" style="font-size:14px">Request a correction to your attendance</p>
    <form data-form="missed">
      <div class="field"><label>Missed</label><div class="pills" data-pills><button type="button" class="active">Check-in</button><button type="button">Check-out</button></div></div>
      <div class="two"><div class="field"><label>Date</label><input type="date" name="date" value="${dkey(y)}" required></div><div class="field"><label>Time</label><input type="time" name="time" value="18:15" required></div></div>
      <div class="field"><label>Reason</label><textarea name="reason">Forgot to check out</textarea></div>
      <button class="btn primary" style="margin-top:20px" type="submit">Submit request</button>
    </form>`, (el, close) => wireForm(el, close));
}
function wireForm(el, close) {
  el.querySelectorAll('[data-pills] button').forEach((b) => b.onclick = () => { b.parentNode.querySelectorAll('button').forEach((x) => x.classList.remove('active')); b.classList.add('active'); });
  const f = $('form', el);
  f.onsubmit = (e) => {
    e.preventDefault();
    const kind = f.dataset.form, pill = $('[data-pills] .active', el).textContent, fd = new FormData(f);
    const short = (v) => { const [yy, mm, dd] = v.split('-').map(Number); return fmtDate(new Date(yy, mm - 1, dd)); };
    let r;
    if (kind === 'leave') {
      const days = Math.max(1, Math.round((new Date(fd.get('to')) - new Date(fd.get('from'))) / 864e5) + 1);
      r = { days, type: `${pill} Leave`, detail: `${short(fd.get('from'))}${days > 1 ? ' – ' + short(fd.get('to')) : ''} · ${days} day${days > 1 ? 's' : ''}`, reason: fd.get('reason'), status: 'Pending' };
    } else {
      const [hh, mi] = fd.get('time').split(':').map(Number);
      r = { type: `Missed ${pill}`, detail: `${short(fd.get('date'))} · ${fmtMin(hh * 60 + mi)}`, reason: fd.get('reason'), status: 'Pending' };
    }
    r.id = Date.now();
    S.requests.unshift(r); save(); close();
    if (route !== 'requests') location.hash = '#/requests'; else render();
    toast(`Request sent to ${EMP.manager}`, 'inbox', 'var(--orange)');
    setTimeout(() => {
      const it = S.requests.find((x) => x.id === r.id); if (!it) return;
      it.status = 'Approved';
      S.notifs.unshift({ ic: 'check', t: `${r.type} approved`, s: `${r.detail} · approved by ${EMP.manager}`, at: 'Just now' });
      S.unread = true; save();
      if (S.signedIn && !document.querySelector('.scrim')) render();
      toast(`${EMP.manager} approved your request`);
      vibrate(30);
    }, 6000);
  };
}
function notifSheet() {
  S.unread = false; save();
  const b = document.querySelector('.icon-btn .dot'); b?.remove();
  sheet(`<h3>Notifications</h3><div style="margin-top:8px">${S.notifs.map((n) => `
    <div class="nt"><div class="tl-ic" style="background:var(--orange-soft);color:var(--orange)">${icon(n.ic)}</div><div style="flex:1"><b>${n.t}</b><span>${n.s}</span></div><span class="muted" style="font-size:12px;white-space:nowrap">${n.at}</span></div>`).join('')}</div>`);
}

/* ---------------- Render ---------------- */
let tick;
function render() {
  const root = $('#root');
  clearInterval(tick);
  if (!S.signedIn) { root.innerHTML = viewLogin(); return; }
  const r = (location.hash.replace('#/', '') || 'home');
  route = NAV.some(([k]) => k === r) ? r : 'home';
  const views = { home: viewHome, attendance: viewAttendance, payslips: viewPayslips, requests: viewRequests, profile: viewProfile };
  root.innerHTML = `
    <div class="app">
      <aside class="sidebar">
        <div class="brand"><div class="brand-mark">${icon('face')}</div>Employee Portal</div>
        ${NAV.map(([k, l, ic]) => `<a href="#/${k}" class="side-link ${k === route ? 'active' : ''}">${icon(ic)}${l}</a>`).join('')}
        <div class="side-foot">${avatar()}<div class="who"><b>${EMP.name}</b><span>${EMP.id}</span></div></div>
      </aside>
      <main class="main">${views[route]()}</main>
      <nav class="tabbar">${NAV.map(([k, l, ic]) => `<a href="#/${k}" class="tab ${k === route ? 'active' : ''}" style="text-decoration:none">${icon(ic)}${l}</a>`).join('')}</nav>
    </div>`;
  if (route === 'home' && S.today.inAt && !S.today.outAt) { updateTimer(); tick = setInterval(updateTimer, 1000); }
}
function updateTimer() {
  const ms = Date.now() - S.today.inAt, s = Math.floor(ms / 1000);
  const t = $('#timer'); if (!t) return;
  t.innerHTML = `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}<small>:${pad(s % 60)}</small>`;
  const pct = Math.min(100, (ms / 60000 / TARGET_MIN) * 100);
  $('#prog').style.width = pct + '%';
  $('#prog-l').textContent = `${fmtDur(ms / 60000)} of 9h`;
  const tb = $('#todaybar'); if (tb) tb.style.height = Math.max(4, (ms / 60000 / (11 * 60)) * 100) + '%';
}

/* ---------------- Events ---------------- */
document.addEventListener('click', (e) => {
  const a = e.target.closest('[data-act]');
  const go = e.target.closest('[data-go]');
  const day = e.target.closest('[data-day]');
  const slip = e.target.closest('[data-slip]');
  if (go) { location.hash = '#/' + go.dataset.go; return; }
  if (day) { dayDetail(day.dataset.day); return; }
  if (slip) { slipIdx = +slip.dataset.slip; render(); return; }
  if (!a) return;
  const act = a.dataset.act;
  if (act === 'checkin') doCheckIn();
  else if (act === 'checkout') doCheckOut();
  else if (act === 'face-login') faceLogin();
  else if (act === 'signin') signIn();
  else if (act === 'enroll') openScanner('enroll').then((r) => { if (r) { if (r.photo) S.photo = r.photo; save(); render(); toast('Face ID updated'); } });
  else if (act === 'leave') leaveSheet();
  else if (act === 'missed') setTimeout(missedSheet, a.hasAttribute('data-close') ? 340 : 0);
  else if (act === 'notifs') notifSheet();
  else if (act === 'download') printPayslip();
  else if (act === 'mprev') { calMonth = new Date(calMonth.getFullYear(), calMonth.getMonth() - 1, 1); render(); }
  else if (act === 'mnext') { calMonth = new Date(calMonth.getFullYear(), calMonth.getMonth() + 1, 1); render(); }
  else if (act === 'signout') {
    sheet(`<h3>Sign out?</h3><p class="muted" style="font-size:14px;margin-bottom:20px">Today's attendance will be cleared on this device.</p>
      <div class="two"><button class="btn ghost" data-close>Cancel</button><button class="btn primary" data-confirm>Sign out</button></div>`, (el, close) => {
      $('[data-confirm]', el).onclick = () => { close(); S = freshState(); save(); location.hash = ''; render(); };
    });
  }
});
document.addEventListener('submit', (e) => {
  if (e.target.dataset.form === 'login') { e.preventDefault(); signIn(); }
});
window.addEventListener('hashchange', () => { render(); window.scrollTo(0, 0); });

render();
// Warm up the face model so the first scan starts quickly
setTimeout(() => loadLandmarker(), 1200);
