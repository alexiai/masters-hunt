// ──────────────────────────────────────────────────────────────
// Firebase imports (modular SDK, loaded directly from CDN)
// ──────────────────────────────────────────────────────────────
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import {
    getFirestore, doc, getDoc, setDoc
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";
// data.js is loaded as a classic <script> before this module and sets window.UNIVERSITIES

const UNIVERSITIES = window.UNIVERSITIES;

const MY_DORM_COST = 310;
const TODAY = new Date();
let activeFilters = { status: 'all', deadline: 'all', job: 'all', diff: 'all', maxCost: 600 };
let selectedId = null;
let leafletMarkers = {};
let saveTimer = null;

// ──────────────────────────────────────────────────────────────
// Firebase init
// ──────────────────────────────────────────────────────────────
let db = null;
const DOC_PATH = ['userdata', 'my-notes'];
const syncStatusEl = () => document.getElementById('syncStatus');

function setSyncStatus(state) {
    const el = syncStatusEl();
    if (!el) return;
    el.classList.remove('syncing', 'synced', 'error');
    if (state) el.classList.add(state);
    el.title = {
        syncing: 'Saving to Firebase…',
        synced: 'Synced with Firebase',
        error: 'Could not reach Firebase — check firebase-config.js and your connection'
    }[state] || 'Firebase sync status';
}

try {
    const isConfigured = firebaseConfig.apiKey && !firebaseConfig.apiKey.startsWith('PUNE_AICI');
    if (isConfigured) {
        const app = initializeApp(firebaseConfig);
        db = getFirestore(app);
    } else {
        console.warn('Firebase not configured yet — using localStorage only. Fill in firebase-config.js to enable cross-device sync.');
        setSyncStatus('error');
    }
} catch (e) {
    console.error('Firebase init failed:', e);
    setSyncStatus('error');
}

// ──────────────────────────────────────────────────────────────
// Persistence: localStorage (instant, offline-safe) + Firestore (cross-device)
// ──────────────────────────────────────────────────────────────
function snapshotData() {
    const d = {};
    UNIVERSITIES.forEach(u => {
        d[u.id] = { status: u.status, notes: u.notes, dormCost: u.dormCost };
    });
    return d;
}

function applySnapshot(data) {
    if (!data) return;
    UNIVERSITIES.forEach(u => {
        if (data[u.id]) {
            u.status = data[u.id].status ?? u.status;
            u.notes = data[u.id].notes ?? u.notes;
            u.dormCost = data[u.id].dormCost !== undefined ? data[u.id].dormCost : u.dormCost;
        }
    });
}

function loadFromLocalStorage() {
    try {
        const saved = localStorage.getItem('unimap-v2');
        if (saved) applySnapshot(JSON.parse(saved));
    } catch (e) { /* ignore */ }
}

function saveToLocalStorage() {
    try {
        localStorage.setItem('unimap-v2', JSON.stringify(snapshotData()));
    } catch (e) { /* ignore */ }
}

async function loadFromFirestore() {
    if (!db) return;
    try {
        const ref = doc(db, ...DOC_PATH);
        const snap = await getDoc(ref);
        if (snap.exists()) {
            const remote = snap.data();
            // Firestore is the source of truth once configured — it overwrites local.
            applySnapshot(remote);
            saveToLocalStorage();
            renderMarkers(); renderList(); updateStats();
            if (selectedId) openPanel(selectedId);
        }
        setSyncStatus('synced');
    } catch (e) {
        console.error('Firestore load failed:', e);
        setSyncStatus('error');
    }
}

async function saveToFirestore() {
    if (!db) return;
    setSyncStatus('syncing');
    try {
        const ref = doc(db, ...DOC_PATH);
        await setDoc(ref, snapshotData());
        setSyncStatus('synced');
    } catch (e) {
        console.error('Firestore save failed:', e);
        setSyncStatus('error');
    }
}

// Debounced save: always saves locally instantly, pushes to Firestore after a short pause
// (typing in notes shouldn't fire a network write on every keystroke).
function saveData() {
    saveToLocalStorage();
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveToFirestore, 600);
}

// ──────────────────────────────────────────────────────────────
// Map
// ──────────────────────────────────────────────────────────────
const map = L.map('map', { zoomControl: false }).setView([51.2, 10.4], 6);
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap © CARTO', subdomains: 'abcd', maxZoom: 19
}).addTo(map);
L.control.zoom({ position: 'bottomleft' }).addTo(map);

const STATUS_C = {
    'not-researched': '#6b7280',
    'considering':    '#f5a623',
    'applied':        '#2dd4bf',
    'rejected':       '#ff6b6b'
};

function makeIcon(status, count, isSelected) {
    const c = STATUS_C[status] || STATUS_C['not-researched'];
    const size = isSelected ? 32 : 26;
    const dot = isSelected ? 11 : 9;
    const glow = isSelected ? `box-shadow:0 0 0 3px rgba(255,255,255,0.18);` : '';
    const badge = count > 1
        ? `<div style="position:absolute;top:-4px;right:-4px;background:#12161f;border:1px solid rgba(255,255,255,0.12);color:#7a8099;font-size:9px;font-weight:600;width:14px;height:14px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:Inter,sans-serif;">${count}</div>`
        : '';
    const html = `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${c}28;border:2px solid ${c}99;display:flex;align-items:center;justify-content:center;${glow}position:relative;">
    <div style="width:${dot}px;height:${dot}px;border-radius:50%;background:${c};"></div>
    ${badge}
  </div>`;
    return L.divIcon({ html, className: '', iconSize: [size, size], iconAnchor: [size/2, size/2] });
}

function passesFilters(u) {
    const { status, deadline, job, diff, maxCost } = activeFilters;
    if (status !== 'all' && u.status !== status) return false;
    if (deadline === 'july' && !u.deadlineDate.includes('-07-')) return false;
    if (deadline === 'aug' && !u.deadlineDate.includes('-08-')) return false;
    if (deadline === 'sept' && !u.deadlineDate.match(/-(09|10)-/)) return false;
    if (job !== 'all' && u.jobMarket !== job) return false;
    if (diff !== 'all' && u.difficulty !== diff) return false;
    if (maxCost < 600 && u.dormCost && u.dormCost > maxCost) return false;
    return true;
}

function groupByCoord() {
    const groups = {};
    UNIVERSITIES.forEach(u => {
        const key = `${u.lat.toFixed(3)},${u.lng.toFixed(3)}`;
        if (!groups[key]) groups[key] = { lat: u.lat, lng: u.lng, unis: [] };
        groups[key].unis.push(u);
    });
    return groups;
}

function renderMarkers() {
    Object.values(leafletMarkers).forEach(m => map.removeLayer(m));
    leafletMarkers = {};
    const groups = groupByCoord();
    Object.entries(groups).forEach(([key, group]) => {
        const visible = group.unis.filter(passesFilters);
        if (!visible.length) return;
        const primary = visible.find(u => u.status !== 'not-researched') || visible[0];
        const isSel = visible.some(u => u.id === selectedId);
        const marker = L.marker([group.lat, group.lng], {
            icon: makeIcon(primary.status, visible.length, isSel),
            zIndexOffset: isSel ? 1000 : 0
        }).addTo(map);
        marker.on('click', () => openPanel(visible[0].id));
        group.unis.forEach(u => { leafletMarkers[u.id] = marker; });
    });
}

function deadlineInfo(dateStr) {
    const d = new Date(dateStr);
    const days = Math.ceil((d - TODAY) / 86400000);
    if (days < 0) return { label: 'Passed', color: '#4a5068' };
    if (days <= 14) return { label: `${days}d — urgent!`, color: '#ff6b6b' };
    if (days <= 30) return { label: `${days}d left`, color: '#f5a623' };
    return { label: `${days}d left`, color: '#4ade80' };
}

const JOB_META = {
    low:    { label: 'Low',    color: '#ff6b6b', bg: 'rgba(255,107,107,0.12)' },
    medium: { label: 'Medium', color: '#f5a623', bg: 'rgba(245,166,35,0.12)' },
    good:   { label: 'Good',   color: '#4ade80', bg: 'rgba(74,222,128,0.12)' },
    high:   { label: 'High',   color: '#2dd4bf', bg: 'rgba(45,212,191,0.12)' }
};
const DIFF_META = {
    relaxed:     { label: 'Relaxed',   color: '#4ade80', bg: 'rgba(74,222,128,0.12)' },
    medium:      { label: 'Medium',    color: '#f5a623', bg: 'rgba(245,166,35,0.12)' },
    hard:        { label: 'Hard',      color: '#ff6b6b', bg: 'rgba(255,107,107,0.12)' },
    'very-hard': { label: 'Very Hard', color: '#ff3d3d', bg: 'rgba(255,61,61,0.12)' }
};

function badge(meta) {
    return `<span style="display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:500;padding:3px 8px;border-radius:20px;background:${meta.bg};border:1px solid ${meta.color}33;color:${meta.color};">${meta.label}</span>`;
}

// ──────────────────────────────────────────────────────────────
// Detail panel
// ──────────────────────────────────────────────────────────────
function openPanel(id) {
    selectedId = id;
    const u = UNIVERSITIES.find(x => x.id === id);
    if (!u) return;

    document.getElementById('panelCity').textContent = u.city.toUpperCase();
    document.getElementById('panelName').textContent = u.university;

    const dl = deadlineInfo(u.deadlineDate);
    const job = JOB_META[u.jobMarket] || JOB_META.medium;
    const diff = DIFF_META[u.difficulty] || DIFF_META.medium;
    const costDiff = u.dormCost !== null ? u.dormCost - MY_DORM_COST : null;
    const diffHtml = costDiff !== null
        ? `<div class="cost-compare">vs Rostock €${MY_DORM_COST} → <span class="${costDiff > 0 ? 'diff-negative' : 'diff-positive'}">${costDiff > 0 ? '+' : ''}€${costDiff}/mo</span></div>`
        : `<div class="cost-compare">Add cost to compare with Rostock</div>`;
    const nearHtml = (u.nearCities || []).length
        ? u.nearCities.map(c => `<span class="near-tag">${c}</span>`).join('')
        : '<span style="font-size:11px;color:var(--text-dim)">—</span>';

    document.getElementById('panelBody').innerHTML = `
    <div class="status-row">
      ${['not-researched','considering','applied','rejected'].map(s =>
        `<button class="status-btn ${u.status===s?'active':''}" data-s="${s}" data-id="${id}">${
            {'not-researched':'Unseen','considering':'Considering','applied':'Applied','rejected':'Rejected'}[s]
        }</button>`
    ).join('')}
    </div>

    <div class="panel-section">
      <div class="panel-section-label">Deadline</div>
      <div class="deadline-badge">
        <div class="urgency-dot" style="background:${dl.color}"></div>
        <span style="color:var(--text)">${u.deadline}</span>
        <span style="color:${dl.color};font-size:11px">${dl.label}</span>
      </div>
    </div>

    <div class="panel-section">
      <div class="panel-section-label">Programs (${u.programs.length})</div>
      <div class="programs-list">
        ${u.programs.map(p => `<a class="program-link" href="${p.link}" target="_blank" rel="noopener">${p.name}</a>`).join('')}
      </div>
    </div>

    <div class="panel-section">
      <div class="meta-grid">
        <div class="meta-item">
          <div class="meta-key">Job market (EN)</div>
          <div class="meta-val" style="margin-top:3px">${badge(job)}</div>
        </div>
        <div class="meta-item">
          <div class="meta-key">Difficulty</div>
          <div class="meta-val" style="margin-top:3px">${badge(diff)}</div>
        </div>
        <div class="meta-item">
          <div class="meta-key">Avg CS salary</div>
          <div class="meta-val">${u.avgSalaryCS ? `€${u.avgSalaryCS.toLocaleString()}/mo` : '—'}</div>
        </div>
        <div class="meta-item">
          <div class="meta-key">Dorm cost</div>
          <div class="meta-val">
            <input type="number" class="cost-input" placeholder="€/mo" id="costInput"
              value="${u.dormCost !== null ? u.dormCost : ''}">
          </div>
        </div>
      </div>
      <div id="costDiff" style="margin-top:6px">${diffHtml}</div>
    </div>

    <div class="panel-section">
      <div class="panel-section-label">Near</div>
      <div class="near-tags">${nearHtml}</div>
    </div>

    <div class="panel-section">
      <div class="panel-section-label">Notes</div>
      <textarea class="notes-area" id="notesArea" placeholder="Your research notes…">${u.notes || ''}</textarea>
    </div>
  `;

    document.getElementById('costInput').addEventListener('input', (e) => updateCost(id, e.target.value));
    document.getElementById('notesArea').addEventListener('input', (e) => updateNotes(id, e.target.value));
    document.querySelectorAll('.status-btn').forEach(btn => {
        btn.addEventListener('click', () => setStatus(btn.dataset.id, btn.dataset.s, btn));
    });

    document.getElementById('detailPanel').classList.add('open');
    map.panTo([u.lat, u.lng], { animate: true, duration: 0.4 });
    renderMarkers();
    renderList();
}

function closePanel() {
    selectedId = null;
    document.getElementById('detailPanel').classList.remove('open');
    renderMarkers();
    renderList();
}

function setStatus(id, status, btn) {
    const u = UNIVERSITIES.find(x => x.id === id);
    if (!u) return;
    u.status = status;
    btn.closest('.status-row').querySelectorAll('.status-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    saveData(); updateStats(); renderMarkers(); renderList();
}

function updateCost(id, val) {
    const u = UNIVERSITIES.find(x => x.id === id);
    if (!u) return;
    u.dormCost = val ? parseInt(val, 10) : null;
    saveData();
    const diff = u.dormCost !== null ? u.dormCost - MY_DORM_COST : null;
    const el = document.getElementById('costDiff');
    if (el) el.innerHTML = diff !== null
        ? `<div class="cost-compare">vs Rostock €${MY_DORM_COST} → <span class="${diff>0?'diff-negative':'diff-positive'}">${diff>0?'+':''}€${diff}/mo</span></div>`
        : `<div class="cost-compare">Add cost to compare with Rostock</div>`;
}

function updateNotes(id, val) {
    const u = UNIVERSITIES.find(x => x.id === id);
    if (!u) return;
    u.notes = val;
    saveData();
}

// ──────────────────────────────────────────────────────────────
// Filters
// ──────────────────────────────────────────────────────────────
function setFilter(type, val, btn) {
    activeFilters[type] = val;
    document.querySelectorAll(`.chip[data-filter="${type}"]`).forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    renderMarkers(); renderList();
}

function updateCostFilter(val) {
    activeFilters.maxCost = parseInt(val, 10);
    document.getElementById('costLabel').textContent = val >= 600 ? 'Any' : `≤€${val}`;
    renderMarkers(); renderList();
}

function resetFilters() {
    activeFilters = { status: 'all', deadline: 'all', job: 'all', diff: 'all', maxCost: 600 };
    document.querySelectorAll('.chip').forEach(c => {
        c.classList.toggle('active', c.dataset.val === 'all');
    });
    document.getElementById('costSlider').value = 600;
    document.getElementById('costLabel').textContent = 'Any';
    renderMarkers(); renderList();
}

// ──────────────────────────────────────────────────────────────
// List sidebar / sheet
// ──────────────────────────────────────────────────────────────
function renderList() {
    const query = (document.getElementById('listSearch').value || '').toLowerCase();
    const scroll = document.getElementById('uniListScroll');

    const sorted = [...UNIVERSITIES]
        .filter(u => passesFilters(u))
        .filter(u => !query || u.city.toLowerCase().includes(query) || u.university.toLowerCase().includes(query))
        .sort((a, b) => a.city.localeCompare(b.city) || a.university.localeCompare(b.university));

    document.getElementById('list-count').textContent = `(${sorted.length})`;

    if (!sorted.length) {
        scroll.innerHTML = `<div style="padding:16px 14px;font-size:12px;color:var(--text-dim);">No results</div>`;
        return;
    }

    const byCity = {};
    sorted.forEach(u => {
        if (!byCity[u.city]) byCity[u.city] = [];
        byCity[u.city].push(u);
    });

    scroll.innerHTML = Object.entries(byCity).map(([city, unis]) => `
    <div class="uni-list-city-group">
      <div class="uni-list-city-label">${city}</div>
      ${unis.map(u => `
        <div class="uni-list-item ${u.id === selectedId ? 'active' : ''}" data-id="${u.id}">
          <div class="uni-list-dot" style="background:${STATUS_C[u.status]||'#6b7280'}"></div>
          <div class="uni-list-name">${u.university.replace('University of Applied Sciences','UAS').replace('University of Technology','UT').replace('University','Uni')}</div>
          <div class="uni-list-count">${u.programs.length}p</div>
        </div>
      `).join('')}
    </div>
  `).join('');

    scroll.querySelectorAll('.uni-list-item').forEach(el => {
        el.addEventListener('click', () => selectFromList(el.dataset.id));
    });
}

function selectFromList(id) {
    openPanel(id);
    if (window.innerWidth <= 480) closeMobileSheets();
    setTimeout(() => {
        const el = document.querySelector(`.uni-list-item.active`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

// ──────────────────────────────────────────────────────────────
// Stats
// ──────────────────────────────────────────────────────────────
function updateStats() {
    document.getElementById('count-total').textContent = UNIVERSITIES.length;
    document.getElementById('count-considering').textContent = UNIVERSITIES.filter(u => u.status === 'considering').length;
    document.getElementById('count-applied').textContent = UNIVERSITIES.filter(u => u.status === 'applied').length;
    const urgent = UNIVERSITIES.filter(u => {
        const days = Math.ceil((new Date(u.deadlineDate) - TODAY) / 86400000);
        return days >= 0 && days <= 21;
    });
    document.getElementById('deadline-warn').textContent = urgent.length
        ? `⚠ ${urgent.length} deadline${urgent.length > 1 ? 's' : ''} in <3 weeks` : '';
}

// ──────────────────────────────────────────────────────────────
// Export
// ──────────────────────────────────────────────────────────────
function exportData() {
    const data = UNIVERSITIES.map(u => ({
        university: u.university, city: u.city, status: u.status,
        deadline: u.deadline, dormCost: u.dormCost, jobMarket: u.jobMarket,
        difficulty: u.difficulty, notes: u.notes,
        programs: u.programs.map(p => p.name)
    }));
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'masters-hunt.json';
    a.click();
}

// ──────────────────────────────────────────────────────────────
// Mobile sheet controls
// ──────────────────────────────────────────────────────────────
function openFilterSheet() {
    document.getElementById('filterPanel').classList.add('open');
}
function closeFilterSheet() {
    document.getElementById('filterPanel').classList.remove('open');
}
function openListSheet() {
    document.getElementById('uniList').classList.add('open');
}
function closeListSheet() {
    document.getElementById('uniList').classList.remove('open');
}
function closeMobileSheets() {
    closeFilterSheet();
    closeListSheet();
}

// ──────────────────────────────────────────────────────────────
// Event wiring
// ──────────────────────────────────────────────────────────────
document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => setFilter(chip.dataset.filter, chip.dataset.val, chip));
});
document.getElementById('costSlider').addEventListener('input', (e) => updateCostFilter(e.target.value));
document.getElementById('filterResetBtn').addEventListener('click', resetFilters);
document.getElementById('panelCloseBtn').addEventListener('click', closePanel);
document.getElementById('listSearch').addEventListener('input', renderList);
document.getElementById('exportBtn').addEventListener('click', exportData);

document.getElementById('mobileFilterBtn').addEventListener('click', openFilterSheet);
document.getElementById('filterCloseBtn').addEventListener('click', closeFilterSheet);
document.getElementById('mobileListBtn').addEventListener('click', openListSheet);
document.getElementById('listCloseBtn').addEventListener('click', closeListSheet);
document.getElementById('filterBackdrop').addEventListener('click', closeMobileSheets);

// ──────────────────────────────────────────────────────────────
// Init
// ──────────────────────────────────────────────────────────────
loadFromLocalStorage();
renderMarkers();
renderList();
updateStats();
loadFromFirestore(); // overwrites with remote data if Firebase is configured and reachable