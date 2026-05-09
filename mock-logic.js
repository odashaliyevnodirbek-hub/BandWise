// ── MOCK LOGIC v5 ──
const MockApp = (() => {

  let state = {
    phase: 'selection',
    mockId: null,
    passage: 0,
    listenPart: 0,
    answers: {},
    timer: null,
    timeLeft: 0,
    readFontSize: 15,
    listenFontSize: 16,
    hlColor: '#ffd70066',
  };

  // drag kept outside render loop so listeners survive re-renders
  let drag = { active: false, startX: 0, startW: 0, onMove: null, onUp: null };

  // ════════ SELECTION ════════

  function init() {
    state.phase = 'selection';
    const mocks = Object.keys(MOCK_DATA);
    document.getElementById('mock-main').innerHTML = `
      <div class="mock-selection">
        <div class="sel-top">
          <div class="sel-logo"><span class="logo-band">Band</span><span class="logo-wise">Wise</span></div>
          <button class="btn-theme-sel" id="themeBtn" onclick="MockApp.toggleTheme()">${document.body.classList.contains('light')?'🌙':'☀️'}</button>
        </div>
        <div class="sel-header">
          <h2>Choose your <em>Mock Test</em></h2>
          <p>Full IELTS practice — Reading (60 min) + Listening (30 min)</p>
        </div>
        <div class="mock-cards">
          ${mocks.map((id,i) => `
            <div class="mock-card" onclick="MockApp.selectMock('${id}')">
              <div class="mock-card-num">${i+1}</div>
              <div class="mock-card-title">${MOCK_DATA[id].title}</div>
              <div class="mock-card-meta">
                <span>📖 Reading · 40 Q · 60 min</span>
                <span>🎧 Listening · 40 Q · 30 min</span>
              </div>
              <div class="mock-card-btn">Start →</div>
            </div>`).join('')}
          <div class="mock-card mock-card-soon">
            <div class="mock-card-num">2</div>
            <div class="mock-card-title">Mock Test 2</div>
            <div class="mock-card-meta"><span>📖 Reading · 40 Q · 60 min</span><span>🎧 Listening · 40 Q · 30 min</span></div>
            <div class="mock-card-soon-badge">Coming Soon</div>
          </div>
          <div class="mock-card mock-card-soon">
            <div class="mock-card-num">3</div>
            <div class="mock-card-title">Mock Test 3</div>
            <div class="mock-card-meta"><span>📖 Reading · 40 Q · 60 min</span><span>🎧 Listening · 40 Q · 30 min</span></div>
            <div class="mock-card-soon-badge">Coming Soon</div>
          </div>
        </div>
        <a class="back-link" href="dashboard.html">← Back to Dashboard</a>
      </div>`;
  }

  function toggleTheme() {
    document.body.classList.toggle('light');
    localStorage.setItem('bandwise_theme', document.body.classList.contains('light') ? 'light' : 'dark');
    document.querySelectorAll('#themeBtn').forEach(b => b.textContent = document.body.classList.contains('light') ? '🌙' : '☀️');
  }

  function selectMock(id) {
    state.mockId = id; state.answers = {}; state.passage = 0; state.listenPart = 0;
    renderIntro();
  }

  function renderIntro() {
    state.phase = 'intro';
    const mock = MOCK_DATA[state.mockId];
    document.getElementById('mock-main').innerHTML = `
      <div class="mock-intro">
        <div class="intro-icon">📋</div>
        <h2>${mock.title}</h2>
        <div class="intro-info">
          <div class="intro-block"><div class="intro-label">Reading</div><div class="intro-val">60 min · 3 passages · 40 Q</div></div>
          <div class="intro-block"><div class="intro-label">Listening</div><div class="intro-val">30 min · 4 sections · 40 Q</div></div>
        </div>
        <div class="intro-rules">
          <p>⏱ Timer starts when you press Start and cannot be paused.</p>
          <p>🖊 Highlight passage text using your mouse.</p>
          <p>↔ Drag the centre divider to resize panels.</p>
          <p>📝 Navigate passages/sections using the bottom buttons.</p>
        </div>
        <button class="btn-start-mock" onclick="MockApp.startReading()">Start Reading Test →</button>
        <button class="btn-back-sel" onclick="MockApp.init()">← Back to selection</button>
      </div>`;
  }

  // ════════ READING ════════

  const P_RANGES = [[1,13],[14,26],[27,40]];

  function startReading() {
    state.phase = 'reading';
    state.passage = 0;
    state.timeLeft = MOCK_DATA[state.mockId].reading.timeLimit * 60;
    enterFS();
    renderReading();
    startTimer('reading');
  }

  function goPassage(i) {
    state.passage = i;
    renderReading();
  }

  function renderReading() {
    if (drag.onMove) { document.removeEventListener('mousemove', drag.onMove); drag.onMove = null; }
    if (drag.onUp)   { document.removeEventListener('mouseup',   drag.onUp);   drag.onUp   = null; }
    drag.active = false;

    const mock  = MOCK_DATA[state.mockId];
    const p     = mock.reading.passages[state.passage];
    const total = mock.reading.passages.length;

    document.getElementById('mock-main').innerHTML = `
      <div class="mock-reading-wrap">
        <div class="mock-topbar">
          <div class="mock-topbar-left">
            <span class="mock-title">${mock.title}</span>
            <span class="mock-phase-tag">Reading</span>
          </div>
          <div class="mock-timer" id="mock-timer">--:--</div>
          <div class="mock-topbar-right">
            <div class="highlight-tools">
              <span class="hl-label">Highlight:</span>
              <button class="hl-btn ${state.hlColor==='#ffd70066'?'active':''}" data-color="#ffd70066" onclick="MockApp.setHL(this)">🟡</button>
              <button class="hl-btn ${state.hlColor==='#34d39966'?'active':''}" data-color="#34d39966" onclick="MockApp.setHL(this)">🟢</button>
              <button class="hl-btn ${state.hlColor==='#60a5fa66'?'active':''}" data-color="#60a5fa66" onclick="MockApp.setHL(this)">🔵</button>
              <button class="hl-btn hl-erase ${state.hlColor==='erase'?'active':''}" data-color="erase" onclick="MockApp.setHL(this)">✕</button>
            </div>
            <div class="font-controls">
              <button class="font-btn" onclick="MockApp.changeFont(-2)">A−</button>
              <button class="font-btn" onclick="MockApp.changeFont(2)">A+</button>
            </div>
            <button class="btn-icon" onclick="MockApp.toggleTheme()">${document.body.classList.contains('light')?'🌙':'☀️'}</button>
            <button class="btn-icon" onclick="MockApp.toggleFS()">⛶</button>
          </div>
        </div>
        <div class="mock-split" id="mock-split">
          <div class="mock-passage-panel" id="passage-panel">
            <div class="passage-nav-tabs">
              ${mock.reading.passages.map((_,i) =>
                `<button class="ptab ${i===state.passage?'active':''}" onclick="MockApp.goPassage(${i})">Passage ${i+1}</button>`
              ).join('')}
            </div>
            <div class="passage-content" id="passage-content">
              <h3 class="passage-title">${p.title}</h3>
              ${p.subtitle ? `<p class="passage-subtitle">${p.subtitle}</p>` : ''}
              <div class="passage-text" id="passage-text" onmouseup="MockApp.doHL()">${fmtText(p.text)}</div>
            </div>
          </div>
          <div class="drag-handle" id="drag-handle"><div class="drag-dots">⋮</div></div>
          <div class="mock-questions-panel" id="questions-panel">
            <div class="questions-scroll" id="questions-scroll">${renderGroups(p.questionGroups)}</div>
          </div>
        </div>
        <div class="mock-answer-boxes" id="answer-boxes">${readBoxes()}</div>
        <div class="mock-bottom-nav">
          ${state.passage > 0
            ? `<button class="btn-nav" onclick="MockApp.goPassage(${state.passage-1})">← Passage ${state.passage}</button>`
            : '<div></div>'}
          <span class="passage-indicator">Passage ${state.passage+1} of ${total}</span>
          ${state.passage < total-1
            ? `<button class="btn-nav btn-nav-next" onclick="MockApp.goPassage(${state.passage+1})">Passage ${state.passage+2} →</button>`
            : `<button class="btn-nav btn-nav-finish" onclick="MockApp.finishReading()">Finish Reading ✓</button>`}
        </div>
      </div>`;

    applyReadFont();
    updateTimer();
    initDrag();
  }

  function changeFont(delta) {
    state.readFontSize = Math.max(11, Math.min(28, state.readFontSize + delta));
    applyReadFont();
  }
  function applyReadFont() {
    const fs = state.readFontSize + 'px';
    const pt = document.getElementById('passage-text');
    const qs = document.getElementById('questions-scroll');
    if (pt) { pt.style.fontSize = fs; pt.querySelectorAll('p').forEach(el => el.style.fontSize = fs); }
    if (qs) qs.style.fontSize = fs;
  }

  function readBoxes() {
    const [from, to] = P_RANGES[state.passage];
    let h = `<div class="answer-box-group"><div class="answer-box-label">PASSAGE ${state.passage+1}</div><div class="answer-box-nums">`;
    for (let n = from; n <= to; n++)
      h += `<div class="answer-box ${answered(state.answers[n])?'answered':''}" onclick="MockApp.scrollToQ(${n})">${n}</div>`;
    return h + '</div></div>';
  }

  // ════════ DRAG ════════

  function initDrag() {
    const handle = document.getElementById('drag-handle');
    if (!handle) return;
    handle.addEventListener('mousedown', e => {
      const pp = document.getElementById('passage-panel');
      if (!pp) return;
      drag.active = true;
      drag.startX = e.clientX;
      drag.startW = pp.offsetWidth;
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      e.preventDefault();
    });
    drag.onMove = e => {
      if (!drag.active) return;
      const split = document.getElementById('mock-split');
      const pp    = document.getElementById('passage-panel');
      const qp    = document.getElementById('questions-panel');
      if (!split || !pp || !qp) return;
      const nw = Math.max(180, Math.min(split.offsetWidth - 180, drag.startW + e.clientX - drag.startX));
      pp.style.flex = 'none'; pp.style.width = nw + 'px'; qp.style.flex = '1';
    };
    drag.onUp = () => {
      drag.active = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    document.addEventListener('mousemove', drag.onMove);
    document.addEventListener('mouseup',   drag.onUp);
  }

  // ════════ LISTENING ════════

  const L_RANGES = [[1,10],[11,20],[21,30],[31,40]];

  function startListening() {
    state.phase = 'listening';
    state.listenPart = 0;
    state.timeLeft = MOCK_DATA[state.mockId].listening.timeLimit * 60;
    enterFS();
    renderListening();
    startTimer('listening');
  }

  function goPart(i) { state.listenPart = i; renderListening(); }

  function renderListening() {
    const mock  = MOCK_DATA[state.mockId];
    const part  = mock.listening.parts[state.listenPart];
    const total = mock.listening.parts.length;
    document.getElementById('mock-main').innerHTML = `
      <div class="mock-listening-wrap">
        <div class="mock-topbar">
          <div class="mock-topbar-left">
            <span class="mock-title">${mock.title}</span>
            <span class="mock-phase-tag listening-tag">Listening</span>
          </div>
          <div class="mock-timer" id="mock-timer">--:--</div>
          <div class="mock-topbar-right">
            <div class="highlight-tools">
              <span class="hl-label">Highlight:</span>
              <button class="hl-btn ${state.hlColor==='#ffd70066'?'active':''}" data-color="#ffd70066" onclick="MockApp.setHL(this)">🟡</button>
              <button class="hl-btn ${state.hlColor==='#34d39966'?'active':''}" data-color="#34d39966" onclick="MockApp.setHL(this)">🟢</button>
              <button class="hl-btn ${state.hlColor==='#60a5fa66'?'active':''}" data-color="#60a5fa66" onclick="MockApp.setHL(this)">🔵</button>
              <button class="hl-btn hl-erase ${state.hlColor==='erase'?'active':''}" data-color="erase" onclick="MockApp.setHL(this)">✕</button>
            </div>
            <div class="font-controls">
              <button class="font-btn" onclick="MockApp.changeLFont(-2)">A−</button>
              <button class="font-btn" onclick="MockApp.changeLFont(2)">A+</button>
            </div>
            <button class="btn-icon" onclick="MockApp.toggleTheme()">${document.body.classList.contains('light')?'🌙':'☀️'}</button>
            <button class="btn-icon" onclick="MockApp.toggleFS()">⛶</button>
          </div>
        </div>
        <div class="audio-player-bar">
          <audio id="mock-audio" controls style="width:100%;max-width:600px;">
            <source src="${mock.listening.audioUrl}" type="audio/mpeg">
          </audio>
          <span class="audio-note">🎧 Use headphones · answer as the audio plays</span>
        </div>
        <div class="listening-questions" id="lq" style="font-size:${state.listenFontSize}px" onmouseup="MockApp.doHL()">
          <div class="listening-part">
            <h3 class="part-title">${part.title}</h3>
            <p class="part-instructions">${part.instructions}</p>
            ${part.formTitle ? `<div class="form-title-box">${part.formTitle}</div>` : ''}
            ${renderGroups(part.questionGroups)}
          </div>
        </div>
        <div class="mock-answer-boxes" id="answer-boxes">${listenBoxes()}</div>
        <div class="mock-bottom-nav">
          ${state.listenPart > 0
            ? `<button class="btn-nav" onclick="MockApp.goPart(${state.listenPart-1})">← Section ${state.listenPart}</button>`
            : '<div></div>'}
          <span class="passage-indicator">Section ${state.listenPart+1} of ${total}</span>
          ${state.listenPart < total-1
            ? `<button class="btn-nav btn-nav-next" onclick="MockApp.goPart(${state.listenPart+1})">Section ${state.listenPart+2} →</button>`
            : `<button class="btn-nav btn-nav-finish" onclick="MockApp.finishListening()">Finish Listening ✓</button>`}
        </div>
      </div>`;
    updateTimer();
  }

  function changeLFont(delta) {
    state.listenFontSize = Math.max(11, Math.min(28, state.listenFontSize + delta));
    const el = document.getElementById('lq');
    if (el) el.style.fontSize = state.listenFontSize + 'px';
  }

  function listenBoxes() {
    const [from, to] = L_RANGES[state.listenPart];
    let h = `<div class="answer-box-group"><div class="answer-box-label">SECTION ${state.listenPart+1}</div><div class="answer-box-nums">`;
    for (let n = from; n <= to; n++)
      h += `<div class="answer-box ${answered(state.answers[n])?'answered':''}" onclick="MockApp.scrollToQ(${n})">${n}</div>`;
    return h + '</div></div>';
  }

  // ════════ QUESTIONS ════════

  function renderGroups(groups) { return groups.map(g => renderGroup(g)).join(''); }

  function renderGroup(g) {
    let html = `<div class="q-group"><p class="q-instructions">${g.instructions}</p>`;
    if (g.title) html += `<div class="q-group-title">${g.title}</div>`;
    switch (g.type) {
      case 'tfng': case 'yng': {
        const opts = g.type==='tfng' ? ['TRUE','FALSE','NOT GIVEN'] : ['YES','NO','NOT GIVEN'];
        html += g.questions.map(q => `
          <div class="q-item" id="qi-${q.id}">
            <span class="q-num">${q.id}</span>
            <div class="q-content">
              <p class="q-text">${q.text}</p>
              <div class="q-options-row">
                ${opts.map(opt => `<span class="q-radio-label ${state.answers[q.id]===opt?'selected':''}" onclick="MockApp.pick(${q.id},'${opt}',this)">${opt}</span>`).join('')}
              </div>
            </div>
          </div>`).join('');
        break;
      }
      case 'mcq':
        html += g.questions.map(q => `
          <div class="q-item" id="qi-${q.id}">
            <span class="q-num">${q.id}</span>
            <div class="q-content">
              <p class="q-text">${q.text}</p>
              <div class="q-options">
                ${Object.entries(q.options).map(([k,v]) => `
                  <span class="q-option-label ${state.answers[q.id]===k?'selected':''}" onclick="MockApp.pick(${q.id},'${k}',this)">
                    <span class="opt-key">${k}</span> ${v}
                  </span>`).join('')}
              </div>
            </div>
          </div>`).join('');
        break;
      case 'mcq_multi':
        html += g.questions.map(q => `
          <div class="q-item" id="qi-${q.id}">
            <span class="q-num">${q.id}</span>
            <div class="q-content">
              <p class="q-text">${q.text||''}</p>
              <div class="q-options">
                ${Object.entries(g.options).map(([k,v]) => {
                  const saved = state.answers[q.id]||[];
                  return `<span class="q-option-label ${saved.includes(k)?'selected':''}" onclick="MockApp.pickMulti('${q.id}','${k}',this)">
                    <span class="opt-key">${k}</span> ${v}
                  </span>`;
                }).join('')}
              </div>
            </div>
          </div>`).join('');
        break;
      case 'matching':
        html += g.questions.map(q => `
          <div class="q-item q-item-inline" id="qi-${q.id}">
            <span class="q-num">${q.id}</span>
            <div class="q-content">
              <p class="q-text">${q.text}</p>
              <select class="q-select" onchange="MockApp.save(${q.id},this.value)">
                <option value="">Select...</option>
                ${Object.entries(g.options).map(([k,v]) => `<option value="${k}" ${state.answers[q.id]===k?'selected':''}>${k} — ${v}</option>`).join('')}
              </select>
            </div>
          </div>`).join('');
        break;
      case 'notes': case 'sentence_completion':
        html += g.questions.map(q => `
          <div class="q-item" id="qi-${q.id}">
            <span class="q-num">${q.id}</span>
            <div class="q-content">
              <p class="q-text">${q.text.replace('___', `<input type="text" class="q-input" placeholder="..." value="${state.answers[q.id]||''}" oninput="MockApp.save(${q.id},this.value)">`)}</p>
            </div>
          </div>`).join('');
        break;
      case 'summary_word_list': {
        html += `<div class="word-list">${Object.entries(g.wordList).map(([k,v]) => `<span class="word-chip"><strong>${k}</strong> ${v}</span>`).join('')}</div>`;
        const sum = g.summaryText.replace(/(\d+) ___/g, (m,num) => {
          const a = state.answers[parseInt(num)] || '';
          return `${num} <select class="q-select-inline" onchange="MockApp.save(${num},this.value)"><option value="">...</option>${Object.keys(g.wordList).map(k => `<option value="${k}" ${a===k?'selected':''}>${k}</option>`).join('')}</select>`;
        });
        html += `<p class="summary-text">${sum}</p>`;
        break;
      }
      case 'notes_completion':
        g.sections.forEach(sec => {
          html += `<div class="notes-section"><h4 class="notes-heading">${sec.heading}</h4>`;
          html += sec.questions.map(q => `
            <div class="q-item" id="qi-${q.id}">
              <span class="q-num">${q.id}</span>
              <div class="q-content">
                <p class="q-text">${q.text.replace('___', `<input type="text" class="q-input" placeholder="..." value="${state.answers[q.id]||''}" oninput="MockApp.save(${q.id},this.value)">`)}</p>
              </div>
            </div>`).join('');
          html += '</div>';
        });
        break;
      case 'form_completion':
        html += g.questions.map(q => `
          <div class="q-item q-item-form" id="qi-${q.id}">
            <span class="q-num">${q.id}</span>
            <div class="q-content" style="display:flex;align-items:center;gap:0.4rem;flex-wrap:wrap;">
              <span class="form-label">${q.label}</span>
              ${q.prefix ? `<span class="form-prefix">${q.prefix}</span>` : ''}
              <input type="text" class="q-input" placeholder="..." value="${state.answers[q.id]||''}" oninput="MockApp.save(${q.id},this.value)">
              ${q.suffix ? `<span class="form-suffix">${q.suffix}</span>` : ''}
            </div>
          </div>`).join('');
        break;
    }
    return html + '</div>';
  }

  // ════════ ANSWERS ════════

  function pick(id, value, el) {
    state.answers[id] = value;
    el.closest('.q-options-row,.q-options').querySelectorAll('.q-radio-label,.q-option-label').forEach(s => s.classList.remove('selected'));
    el.classList.add('selected');
    updateBoxes();
  }
  function pickMulti(id, value, el) {
    if (!state.answers[id]) state.answers[id] = [];
    if (el.classList.contains('selected')) { el.classList.remove('selected'); state.answers[id] = state.answers[id].filter(v => v !== value); }
    else { el.classList.add('selected'); state.answers[id].push(value); }
    updateBoxes();
  }
  function save(id, value) { state.answers[id] = value; updateBoxes(); }
  function updateBoxes() {
    const el = document.getElementById('answer-boxes');
    if (el) el.innerHTML = state.phase === 'listening' ? listenBoxes() : readBoxes();
  }
  function scrollToQ(num) {
    const el = document.getElementById(`qi-${num}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // ════════ HIGHLIGHT ════════

  function setHL(btn) {
    document.querySelectorAll('.hl-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.hlColor = btn.dataset.color;
  }
  function doHL() {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return;
    const range = sel.getRangeAt(0);
    if (state.hlColor === 'erase') {
      document.querySelectorAll('.hl-span').forEach(s => {
        if (sel.containsNode(s, true)) { const p = s.parentNode; while (s.firstChild) p.insertBefore(s.firstChild, s); p.removeChild(s); }
      });
    } else {
      try {
        const span = document.createElement('span');
        span.className = 'hl-span'; span.style.backgroundColor = state.hlColor; span.style.borderRadius = '2px';
        range.surroundContents(span);
      } catch(e) {
        const frag = range.extractContents();
        const span = document.createElement('span');
        span.className = 'hl-span'; span.style.backgroundColor = state.hlColor; span.style.borderRadius = '2px';
        span.appendChild(frag); range.insertNode(span);
      }
    }
    sel.removeAllRanges();
  }

  // ════════ TIMER ════════

  function startTimer(phase) {
    clearInterval(state.timer);
    state.timer = setInterval(() => {
      state.timeLeft--;
      updateTimer();
      if (state.timeLeft <= 0) { clearInterval(state.timer); phase === 'reading' ? finishReading() : finishListening(); }
    }, 1000);
  }
  function updateTimer() {
    const el = document.getElementById('mock-timer');
    if (!el) return;
    const m = Math.floor(state.timeLeft / 60), s = state.timeLeft % 60;
    el.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    el.classList.toggle('timer-warning', state.timeLeft <= 300);
  }

  // ════════ FINISH / RESULTS ════════

  function finishReading() {
    clearInterval(state.timer);
    if (drag.onMove) { document.removeEventListener('mousemove', drag.onMove); drag.onMove = null; }
    if (drag.onUp)   { document.removeEventListener('mouseup',   drag.onUp);   drag.onUp   = null; }
    exitFS();
    state.phase = 'reading_done';
    document.getElementById('mock-main').innerHTML = `
      <div class="mock-choice-screen">
        <div class="choice-icon">📖</div>
        <h2>Reading complete!</h2>
        <p>What would you like to do next?</p>
        <div class="choice-btns">
          <button class="btn-choice" onclick="MockApp.showReadingAnswers()">📊 Show Reading Answers</button>
          <button class="btn-choice btn-continue-listening" onclick="MockApp.startListening()">🎧 Continue to Listening →</button>
        </div>
      </div>`;
  }

  function showReadingAnswers() {
    const mock = MOCK_DATA[state.mockId]; let allA = {}, score = 0, total = 0;
    mock.reading.passages.forEach(p => p.questionGroups.forEach(g => Object.assign(allA, g.answers)));
    Object.entries(allA).forEach(([id,c]) => { total++; if (chk(state.answers[id], c)) score++; });
    document.getElementById('mock-main').innerHTML = `
      <div class="mock-results-screen">
        <h2>Reading Results</h2>
        <div class="results-cards">
          <div class="result-card"><div class="result-card-label">Score</div><div class="score-big">${score}<span>/${total}</span></div></div>
          <div class="result-card"><div class="result-card-label">Est. Band</div><div class="score-big">${band(score,'reading')}</div></div>
        </div>
        ${ansTable(allA)}
        <div style="display:flex;gap:1rem;justify-content:center;margin-top:2rem;flex-wrap:wrap;">
          <button class="btn-choice btn-continue-listening" onclick="MockApp.startListening()">🎧 Continue to Listening →</button>
          <button class="btn-choice" onclick="MockApp.init()">← Back</button>
        </div>
      </div>`;
  }

  function finishListening() { clearInterval(state.timer); exitFS(); showResults(); }

  function showResults() {
    state.phase = 'results';
    const mock = MOCK_DATA[state.mockId];
    let rA = {}, lA = {}, rS = 0, rT = 0, lS = 0, lT = 0;
    mock.reading.passages.forEach(p => p.questionGroups.forEach(g => Object.assign(rA, g.answers)));
    mock.listening.parts.forEach(p => p.questionGroups.forEach(g => Object.assign(lA, g.answers)));
    Object.entries(rA).forEach(([id,c]) => { rT++; if (chk(state.answers[id], c)) rS++; });
    Object.entries(lA).forEach(([id,c]) => { lT++; if (chk(state.answers[id], c)) lS++; });
    document.getElementById('mock-main').innerHTML = `
      <div class="mock-results-screen">
        <h2>Test Complete! 🎉</h2>
        <div class="results-cards">
          <div class="result-card"><div class="result-card-label">Reading</div><div class="score-big">${rS}<span>/${rT}</span></div><div class="score-band">Band ${band(rS,'reading')}</div></div>
          <div class="result-card"><div class="result-card-label">Listening</div><div class="score-big">${lS}<span>/${lT}</span></div><div class="score-band">Band ${band(lS,'listening')}</div></div>
        </div>
        <h3 style="margin:2rem 0 1rem;text-align:center;font-family:'Playfair Display',serif">Reading Answers</h3>${ansTable(rA)}
        <h3 style="margin:2rem 0 1rem;text-align:center;font-family:'Playfair Display',serif">Listening Answers</h3>${ansTable(lA)}
        <div style="display:flex;gap:1rem;justify-content:center;margin-top:2rem;flex-wrap:wrap;">
          <button class="btn-choice" onclick="MockApp.selectMock('${state.mockId}')">🔄 Try Again</button>
          <button class="btn-choice btn-continue-listening" onclick="MockApp.init()">← Back to Mocks</button>
        </div>
      </div>`;
  }

  // ════════ HELPERS ════════

  function fmtText(text) {
    return text.split('\n\n').map(p => p.trim()).filter(Boolean).map(p => `<p>${p.replace(/\n/g,' ')}</p>`).join('');
  }
  function answered(v) { return v !== undefined && v !== '' && !(Array.isArray(v) && v.length === 0); }
  function chk(user, correct) {
    if (!user) return false;
    if (Array.isArray(correct)) return Array.isArray(user) && correct.every(v => user.includes(v));
    return user.toString().toLowerCase().trim() === correct.toString().toLowerCase().trim();
  }
  function ansTable(answers) {
    return `<div class="results-table">${Object.entries(answers).map(([id, correct]) => {
      const user = state.answers[id] || '—'; const ok = chk(user, correct);
      return `<div class="result-row ${ok?'correct':'wrong'}">
        <span class="result-num">${id}</span>
        <span class="result-user">${Array.isArray(user)?user.join(', '):user}</span>
        <span class="result-arrow">${ok?'✓':'✗'}</span>
        <span class="result-correct">${Array.isArray(correct)?correct.join(', '):correct}</span>
      </div>`;
    }).join('')}</div>`;
  }
  function band(score, type) {
    const r = [[39,9],[37,8.5],[35,8],[33,7.5],[30,7],[27,6.5],[23,6],[19,5.5],[15,5],[13,4.5]];
    const l = [[40,9],[39,8.5],[37,8],[35,7.5],[32,7],[30,6.5],[26,6],[23,5.5],[18,5],[16,4.5]];
    for (const [min,b] of (type==='reading'?r:l)) if (score >= min) return b;
    return 4;
  }
  function enterFS() { try { (document.documentElement.requestFullscreen||document.documentElement.webkitRequestFullscreen).call(document.documentElement); } catch(e) {} }
  function exitFS()  { try { if (document.fullscreenElement||document.webkitFullscreenElement) (document.exitFullscreen||document.webkitExitFullscreen).call(document); } catch(e) {} }
  function toggleFS() { document.fullscreenElement ? exitFS() : enterFS(); }

  return {
    init, selectMock, startReading, goPassage, finishReading,
    showReadingAnswers, startListening, goPart, finishListening,
    save, pick, pickMulti, doHL, setHL, toggleFS, toggleTheme,
    scrollToQ, changeFont, changeLFont
  };
})();
