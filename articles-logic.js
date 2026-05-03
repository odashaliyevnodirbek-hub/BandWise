// ============================================================
//  BandWise — Articles Logic
//  Depends on: articles-data.js (ARTICLES array)
// ============================================================

let currentArticle = null;
let currentColor   = 'yellow';
let fontSize       = 17;

const colorMap = { yellow:'hl-y', green:'hl-g', blue:'hl-b', pink:'hl-p' };

const TOPIC_ICONS = {
  history:'🏛', literature:'📚', science:'🔬',
  environment:'🌍', business:'💼', psychology:'🧠',
  culture:'🎭', health:'🏥'
};

const LEVEL_CLASS = {
  'Intermediate':'level-inter',
  'Upper-Intermediate':'level-upper',
  'Advanced':'level-adv'
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
        <span class="ac-meta">⏱ ${a.readTime} min read · ${a.vocabWords ? a.vocabWords.length : 0} key words</span>
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

  // Render paragraphs with vocab words wrapped in spans
  const paras = document.getElementById('artParagraphs');
  const rawHTML = a.paragraphs.map(p => `<p>${p}</p>`).join('');
  paras.innerHTML = wrapVocabWords(rawHTML, a.vocabWords || []);
  paras.style.fontSize = fontSize + 'px';

  // Attach click handlers to vocab spans
  paras.querySelectorAll('.vocab-word').forEach(span => {
    span.onclick = (e) => {
      e.stopPropagation();
      showVocabPopup(span.dataset.word, span.dataset.definition, span);
    };
  });

  // Reset scroll + progress
  const wrap = document.getElementById('artBodyWrap');
  if (wrap) wrap.scrollTop = 0;
  updateProgress(0);

  // Show fullscreen
  document.getElementById('selectorView').style.display = 'none';
  const av = document.getElementById('articleView');
  av.style.display = 'flex';

  const isLight = document.body.classList.contains('light');
  const tb = document.getElementById('themeToggle');
  if (tb) tb.textContent = isLight ? '☀️' : '🌙';

  window.scrollTo(0, 0);
}

// ── WRAP VOCAB WORDS ─────────────────────────────────────────
function wrapVocabWords(html, vocabWords) {
  if (!vocabWords || vocabWords.length === 0) return html;

  // Sort by length descending to avoid partial matches
  const sorted = [...vocabWords].sort((a, b) => b.word.length - a.word.length);

  sorted.forEach(v => {
    const escaped = v.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const def     = v.definition.replace(/"/g, '&quot;');
    const regex   = new RegExp(`\\b(${escaped})\\b`, 'gi');
    html = html.replace(regex, (match) =>
      `<span class="vocab-word" data-word="${match}" data-definition="${def}">${match}</span>`
    );
  });

  return html;
}

// ── VOCAB POPUP ───────────────────────────────────────────────
function showVocabPopup(word, definition, anchorEl) {
  // Remove any existing popup
  hideVocabPopup();

  const popup = document.createElement('div');
  popup.id = 'vocabPopup';
  popup.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.4rem">
      <span style="font-family:'Playfair Display',serif;font-size:1rem;font-weight:700;color:var(--gold)">${word}</span>
      <button onclick="hideVocabPopup()" style="background:transparent;border:none;color:var(--muted2);cursor:pointer;font-size:1rem;line-height:1;padding:0">✕</button>
    </div>
    <div style="font-size:0.82rem;color:var(--muted2);line-height:1.55">${definition}</div>`;

  popup.style.cssText = `
    position:fixed;
    background:var(--surface);
    border:1px solid var(--gold);
    border-radius:10px;
    padding:0.9rem 1rem;
    max-width:280px;
    min-width:200px;
    box-shadow:0 8px 32px rgba(0,0,0,0.4);
    z-index:1000;
    animation:popIn 0.15s ease;
  `;

  document.body.appendChild(popup);

  // Position popup near the clicked word
  const rect = anchorEl.getBoundingClientRect();
  let top  = rect.bottom + 8;
  let left = rect.left;

  // Keep within viewport
  if (left + 280 > window.innerWidth) left = window.innerWidth - 290;
  if (top + 150 > window.innerHeight) top = rect.top - 160;

  popup.style.top  = top + 'px';
  popup.style.left = left + 'px';
}

function hideVocabPopup() {
  const p = document.getElementById('vocabPopup');
  if (p) p.remove();
}

// Close popup when clicking outside
document.addEventListener('click', (e) => {
  const popup = document.getElementById('vocabPopup');
  if (popup && !popup.contains(e.target) && !e.target.classList.contains('vocab-word')) {
    hideVocabPopup();
  }
});

// ── CLOSE ARTICLE ─────────────────────────────────────────────
function closeArticle() {
  hideVocabPopup();
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

document.addEventListener('mouseup', function(e) {
  if (e.target.classList.contains('vocab-word')) return;
  const paras = document.getElementById('artParagraphs');
  if (!paras) return;
  const sel = window.getSelection();
  if (!sel || sel.isCollapsed || !sel.toString().trim()) return;
  const range = sel.getRangeAt(0);
  if (!paras.contains(range.commonAncestorContainer)) return;
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
    } catch(e2) {}
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
