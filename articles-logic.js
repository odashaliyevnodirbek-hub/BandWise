// ============================================================
//  BandWise — Articles Logic
//  Depends on: articles-data.js (ARTICLES array)
// ============================================================

// ── STATE ────────────────────────────────────────────────────
let currentArticle = null;
let currentColor   = 'yellow';
let fontSize       = 17;

const colorMap = { yellow:'hl-y', green:'hl-g', blue:'hl-b', pink:'hl-p' };

const TOPIC_ICONS = {
  history:     '🏛',
  literature:  '📚',
  science:     '🔬',
  environment: '🌍',
  business:    '💼',
  psychology:  '🧠',
  culture:     '🎭',
  health:      '🏥'
};

const LEVEL_CLASS = {
  'Intermediate':       'level-inter',
  'Upper-Intermediate': 'level-upper',
  'Advanced':           'level-adv'
};

// ── BUILD SELECTOR ────────────────────────────────────────────
function buildSelector() {
  const grid = document.getElementById('articlesGrid');
  if (!grid) return;
  grid.innerHTML = '';

  ARTICLES.forEach(a => {
    const icon      = TOPIC_ICONS[a.topic] || '📰';
    const lvlClass  = LEVEL_CLASS[a.level] || 'level-upper';
    const topicLabel = a.topic.charAt(0).toUpperCase() + a.topic.slice(1);

    const card = document.createElement('div');
    card.className = 'article-card';
    card.dataset.topic = a.topic;
    card.onclick = () => openArticle(a.id);

    card.innerHTML = `
      <div class="ac-topic">${icon} ${topicLabel}</div>
      <div class="ac-title">${a.title}</div>
      <div class="ac-desc">${a.description}</div>
      <div class="ac-footer">
        <span class="ac-meta">⏱ ${a.readTime} min read</span>
        <div style="display:flex;align-items:center;gap:0.5rem">
          <span class="ac-level ${lvlClass}">${a.level}</span>
          <button class="btn-read" onclick="event.stopPropagation();openArticle(${a.id})">Read →</button>
        </div>
      </div>`;
    grid.appendChild(card);
  });

  // "More coming soon" card
  const more = document.createElement('div');
  more.className = 'article-card';
  more.style.cssText = 'border-style:dashed;cursor:default;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:0.5rem;opacity:0.5;min-height:180px;';
  more.innerHTML = `<div style="font-size:2rem">➕</div><div style="font-weight:600;font-size:0.88rem">More articles coming soon</div><div style="font-size:0.75rem;color:var(--muted2)">New topics added regularly</div>`;
  grid.appendChild(more);
}

// ── TOPIC FILTER ──────────────────────────────────────────────
function filterTopic(topic, btn) {
  document.querySelectorAll('.topic-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.article-card').forEach(card => {
    if (card.style.borderStyle === 'dashed') return;
    card.style.display = (topic === 'all' || card.dataset.topic === topic) ? 'block' : 'none';
  });
}

// ── OPEN ARTICLE ──────────────────────────────────────────────
function openArticle(id) {
  currentArticle = ARTICLES.find(a => a.id === id);
  if (!currentArticle) return;
  const a = currentArticle;

  const icon       = TOPIC_ICONS[a.topic] || '📰';
  const topicLabel = a.topic.charAt(0).toUpperCase() + a.topic.slice(1);

  document.getElementById('artTitleBar').textContent    = a.title;
  document.getElementById('artEyebrow').textContent     = `${icon} ${topicLabel} · ${a.level}`;
  document.getElementById('artHeading').textContent     = a.title;
  document.getElementById('artDescription').textContent = a.description;
  document.getElementById('readTimeBadge').textContent  = `📖 ${a.readTime} min read`;

  const paras = document.getElementById('artParagraphs');
  paras.innerHTML = a.paragraphs.map(p => `<p>${p}</p>`).join('');
  paras.style.fontSize = fontSize + 'px';

  // Reset scroll + progress
  const wrap = document.getElementById('artBodyWrap');
  if (wrap) wrap.scrollTop = 0;
  updateProgress(0);

  // Show fullscreen article view
  document.getElementById('selectorView').style.display = 'none';
  const av = document.getElementById('articleView');
  av.style.display = 'flex';

  // Update theme button
  const isLight = document.body.classList.contains('light');
  const tb = document.getElementById('themeToggle');
  if (tb) tb.textContent = isLight ? '☀️' : '🌙';

  window.scrollTo(0, 0);
}

// ── CLOSE ARTICLE ─────────────────────────────────────────────
function closeArticle() {
  document.getElementById('articleView').style.display = 'none';
  document.getElementById('selectorView').style.display = 'flex';
  document.getElementById('selectorView').style.flexDirection = 'column';
  currentArticle = null;
  updateProgress(0);
}

// ── READ PROGRESS ─────────────────────────────────────────────
function updateProgress(pct) {
  const bar = document.getElementById('readProgress');
  if (bar) bar.style.width = pct + '%';
}

document.addEventListener('DOMContentLoaded', () => {
  const wrap = document.getElementById('artBodyWrap');
  if (wrap) {
    wrap.addEventListener('scroll', () => {
      const { scrollTop, scrollHeight, clientHeight } = wrap;
      const pct = scrollHeight > clientHeight
        ? Math.min(100, (scrollTop / (scrollHeight - clientHeight)) * 100)
        : 100;
      updateProgress(pct);
    });
  }
});

// ── HIGHLIGHT ─────────────────────────────────────────────────
function setColor(color) {
  currentColor = color;
  document.querySelectorAll('.hl-btn').forEach(b => b.classList.remove('selected'));
  const btn = document.getElementById('hl-' + color[0]);
  if (btn) btn.classList.add('selected');
}

document.addEventListener('mouseup', function() {
  const paras = document.getElementById('artParagraphs');
  if (!paras) return;
  const sel = window.getSelection();
  if (!sel || sel.isCollapsed || !sel.toString().trim()) return;
  const range = sel.getRangeAt(0);
  const anchor = range.commonAncestorContainer;
  if (!paras.contains(anchor) && !paras.contains(range.startContainer)) return;
  applyHighlight(range);
  sel.removeAllRanges();
});

function applyHighlight(range) {
  const cls = colorMap[currentColor];
  try {
    const frag = range.extractContents();
    const span = document.createElement('span');
    span.className = cls;
    span.dataset.highlight = 'true';
    span.appendChild(frag);
    range.insertNode(span);
  } catch(e) {
    try {
      const span = document.createElement('span');
      span.className = cls;
      span.dataset.highlight = 'true';
      range.surroundContents(span);
    } catch(e2) { /* complex selection */ }
  }
}

function clearHighlights() {
  const paras = document.getElementById('artParagraphs');
  if (!paras) return;
  paras.querySelectorAll('[data-highlight]').forEach(span => {
    const p = span.parentNode;
    while (span.firstChild) p.insertBefore(span.firstChild, span);
    p.removeChild(span);
  });
}

// ── FONT SIZE ─────────────────────────────────────────────────
function changeFontSize(delta) {
  fontSize = Math.min(24, Math.max(13, fontSize + delta));
  const paras = document.getElementById('artParagraphs');
  if (paras) paras.style.fontSize = fontSize + 'px';
}

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildSelector();
});
