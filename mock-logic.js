// ── MOCK LOGIC (fixed) ──
const MockApp = (() => {

  let state = {
    phase: 'selection',
    mockId: null,
    passage: 0,
    answers: {},
    timer: null,
    timeLeft: 0,
    fontSize: 16,
    dragListeners: null,
  };

  // ── INIT ──
  function init() {
    state.phase = 'selection';
    const mocks = Object.keys(MOCK_DATA);
    document.getElementById('mock-main').innerHTML = `
      <div class="mock-selection">
        <div class="sel-top">
          <div class="sel-logo"><span class="logo-band">Band</span><span class="logo-wise">Wise</span></div>
          <button class="btn-theme-sel" onclick="MockApp.toggleTheme()" id="themeBtn">${document.body.classList.contains('light') ? '🌙' : '☀️'}</button>
        </div>
        <div class="sel-header">
          <h2>Choose your <em>Mock Test</em></h2>
          <p>Full IELTS practice — Reading (60 min) + Listening (30 min)</p>
        </div>
        <div class="mock-cards">
          ${mocks.map((id, i) => `
            <div class="mock-card" onclick="MockApp.selectMock('${id}')">
              <div class="mock-card-num">${i + 1}</div>
              <div class="mock-card-title">${MOCK_DATA[id].title}</div>
              <div class="mock-card-meta">
                <span>📖 Reading · 40 Q · 60 min</span>
                <span>🎧 Listening · 40 Q · 30 min</span>
              </div>
              <div class="mock-card-btn">Start →</div>
            </div>
          `).join('')}
        </div>
        <a class="back-link" href="dashboard.html">← Back to Dashboard</a>
      </div>`;
  }

  function toggleTheme() {
    document.body.classList.toggle('light');
    localStorage.setItem('bandwise_theme', document.body.classList.contains('light') ? 'light' : 'dark');
    const btn = document.getElementById('themeBtn');
    if (btn) btn.textContent = document.body.classList.contains('light') ? '🌙' : '☀️';
  }

  function selectMock(id) {
    state.mockId = id;
    state.answers = {};
    state.passage = 0;
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
          <div class="intro-block"><div class="intro-label">Reading</div><div class="intro-val">60 minutes · 3 passages · 40 questions</div></div>
          <div class="intro-block"><div class="intro-label">Listening</div><div class="intro-val">30 minutes · 4 parts · 40 questions</div></div>
        </div>
        <div class="intro-rules">
          <p>⏱ Timer starts when you press Start and cannot be paused.</p>
          <p>🖊 Highlight text in the passage using your mouse.</p>
          <p>↔ Drag the divider to resize passage and question panels.</p>
          <p>📝 Navigate between passages using the buttons at the bottom.</p>
        </div>
        <button class="btn-start-mock" onclick="MockApp.startReading()">Start Reading Test →</button>
        <button class="btn-back-sel" onclick="MockApp.init()">← Back to selection</button>
      </div>`;
  }

  function startReading() {
    state.phase = 'reading';
    state.passage = 0;
    state.timeLeft = MOCK_DATA[state.mockId].reading.timeLimit * 60;
    enterFullscreen();
    renderReading();
    startTimer('reading');
  }

  // ── ANSWER BOX RANGES PER PASSAGE ──
  const PASSAGE_RANGES = [[1,13],[14,26],[27,40]];

  function renderReading() {
    const mock = MOCK_DATA[state.mockId];
    const passage = mock.reading.passages[state.passage];
    const total = mock.reading.passages.length;
    removeDragListeners();

    document.getElementById('mock-main').innerHTML = `
      <div class="mock-reading-wrap">
        <div class="mock-topbar">
          <div class="mock-topbar-left">
            <span class="mock-title">${mock.title}</span>
            <span class="mock-phase-tag">Reading</span>
          </div>
          <div class="mock-timer" id="mock-timer">60:00</div>
          <div class="mock-topbar-right">
            <div class="highlight-tools">
              <span class="hl-label">Highlight:</span>
              <button class="hl-btn active" data-color="#ffd70066" onclick="MockApp.setHL(this)">🟡</button>
              <button class="hl-btn" data-color="#34d39966" onclick="MockApp.setHL(this)">🟢</button>
              <button class="hl-btn" data-color="#60a5fa66" onclick="MockApp.setHL(this)">🔵</button>
              <button class="hl-btn hl-erase" data-color="erase" onclick="MockApp.setHL(this)">✕</button>
            </div>
            <button class="btn-icon" onclick="MockApp.toggleTheme()" title="Toggle theme">${document.body.classList.contains('light') ? '🌙' : '☀️'}</button>
            <button class="btn-icon" onclick="MockApp.toggleFS()">⛶</button>
          </div>
        </div>
        <div class="mock-split" id="mock-split">
          <div class="mock-passage-panel" id="passage-panel">
            <div class="passage-nav-tabs">
              ${mock.reading.passages.map((p,i) => `<button class="ptab ${i===state.passage?'active':''}" onclick="MockApp.goPassage(${i})">Passage ${i+1}</button>`).join('')}
            </div>
            <div class="passage-content">
              <h3 class="passage-title">${passage.title}</h3>
              ${passage.subtitle ? `<p class="passage-subtitle">${passage.subtitle}</p>` : ''}
              <div class="passage-text" id="passage-text" onmouseup="MockApp.doHL(event)">${fmtText(passage.text)}</div>
            </div>
          </div>
          <div class="drag-handle" id="drag-handle"><div class="drag-dots">⋮</div></div>
          <div class="mock-questions-panel" id="questions-panel">
            <div class="questions-scroll">${renderGroups(passage.questionGroups)}</div>
          </div>
        </div>
        <div class="mock-answer-boxes">${renderBoxes()}</div>
        <div class="mock-bottom-nav">
          ${state.passage > 0 ? `<button class="btn-nav" onclick="MockApp.goPassage(${state.passage-1})">← Passage ${state.passage}</button>` : '<div></div>'}
          <span class="passage-indicator">Passage ${state.passage+1} of ${total}</span>
          ${state.passage < total-1
            ? `<button class="btn-nav btn-nav-next" onclick="MockApp.goPassage(${state.passage+1})">Passage ${state.passage+2} →</button>`
            : `<button class="btn-nav btn-nav-finish" onclick="MockApp.finishReading()">Finish Reading ✓</button>`}
        </div>
      </div>`;

    updateTimer();
    initDrag();
  }

  function fmtText(text) {
    return text.split('\n\n').map(p => p.trim()).filter(Boolean)
      .map(p => `<p>${p.replace(/\n/g,' ')}</p>`).join('');
  }

  // ── RENDER ANSWER BOXES — only current passage range ──
  function renderBoxes() {
    const range = PASSAGE_RANGES[state.passage];
    const label = `Passage ${state.passage + 1}`;
    let html = `<div class="answer-box-group"><div class="answer-box-label">${label}</div><div class="answer-box-nums">`;
    for (let n = range[0]; n <= range[1]; n++) {
      const ans = state.answers[n];
      const done = ans !== undefined && ans !== '' && !(Array.isArray(ans) && ans.length === 0);
      html += `<div class="answer-box ${done?'answered':''}" onclick="MockApp.scrollToQ(${n})">${n}</div>`;
    }
    html += `</div></div>`;
    return html;
  }

  function renderGroups(groups) { return groups.map(g => renderGroup(g)).join(''); }

  function renderGroup(group) {
    let html = `<div class="q-group"><p class="q-instructions">${group.instructions}</p>`;
    if (group.title) html += `<div class="q-group-title">${group.title}</div>`;

    switch(group.type) {
      case 'tfng':
      case 'yng': {
        const opts = group.type === 'tfng' ? ['TRUE','FALSE','NOT GIVEN'] : ['YES','NO','NOT GIVEN'];
        html += group.questions.map(q => `
          <div class="q-item" id="qi-${q.id}">
            <span class="q-num">${q.id}</span>
            <div class="q-content">
              <p class="q-text">${q.text}</p>
              <div class="q-options-row">
                ${opts.map(opt => `
                  <span class="q-radio-label ${state.answers[q.id]===opt?'selected':''}"
                    onclick="MockApp.pick(${q.id},'${opt}',this)">${opt}</span>
                `).join('')}
              </div>
            </div>
          </div>`).join('');
        break;
      }
      case 'mcq':
        html += group.questions.map(q => `
          <div class="q-item" id="qi-${q.id}">
            <span class="q-num">${q.id}</span>
            <div class="q-content">
              <p class="q-text">${q.text}</p>
              <div class="q-options">
                ${Object.entries(q.options).map(([k,v]) => `
                  <span class="q-option-label ${state.answers[q.id]===k?'selected':''}"
                    onclick="MockApp.pick(${q.id},'${k}',this.closest('.q-options').querySelectorAll('.q-option-label'))">
                    <span class="opt-key">${k}</span> ${v}
                  </span>`).join('')}
              </div>
            </div>
          </div>`).join('');
        break;
      case 'mcq_multi':
        html += group.questions.map(q => `
          <div class="q-item" id="qi-${q.id}">
            <span class="q-num">${typeof q.id==='string'?q.id:q.id}</span>
            <div class="q-content">
              <p class="q-text">${q.text||''}</p>
              <div class="q-options">
                ${Object.entries(group.options).map(([k,v]) => {
                  const saved = state.answers[q.id]||[];
                  return `<span class="q-option-label ${saved.includes(k)?'selected':''}"
                    onclick="MockApp.pickMulti('${q.id}','${k}',this)">
                    <span class="opt-key">${k}</span> ${v}
                  </span>`;
                }).join('')}
              </div>
            </div>
          </div>`).join('');
        break;
      case 'matching':
        html += group.questions.map(q => `
          <div class="q-item q-item-inline" id="qi-${q.id}">
            <span class="q-num">${q.id}</span>
            <div class="q-content">
              <p class="q-text">${q.text}</p>
              <select class="q-select" onchange="MockApp.save(${q.id},this.value)">
                <option value="">Select...</option>
                ${Object.entries(group.options).map(([k,v]) =>
                  `<option value="${k}" ${state.answers[q.id]===k?'selected':''}>${k} — ${v}</option>`).join('')}
              </select>
            </div>
          </div>`).join('');
        break;
      case 'notes':
      case 'sentence_completion':
        html += group.questions.map(q => `
          <div class="q-item" id="qi-${q.id}">
            <span class="q-num">${q.id}</span>
            <div class="q-content">
              <p class="q-text">${q.text.replace('___',`<input type="text" class="q-input" placeholder="..." value="${state.answers[q.id]||''}" oninput="MockApp.save(${q.id},this.value)">`)}</p>
            </div>
          </div>`).join('');
        break;
      case 'summary_word_list': {
        html += `<div class="word-list">${Object.entries(group.wordList).map(([k,v])=>`<span class="word-chip"><strong>${k}</strong> ${v}</span>`).join('')}</div>`;
        const summary = group.summaryText.replace(/(\d+) ___/g,(m,num)=>{
          const a=state.answers[parseInt(num)]||'';
          return `${num} <select class="q-select-inline" onchange="MockApp.save(${num},this.value)"><option value="">...</option>${Object.keys(group.wordList).map(k=>`<option value="${k}" ${a===k?'selected':''}>${k}</option>`).join('')}</select>`;
        });
        html += `<p class="summary-text">${summary}</p>`;
        break;
      }
      case 'notes_completion':
        group.sections.forEach(sec => {
          html += `<div class="notes-section"><h4 class="notes-heading">${sec.heading}</h4>`;
          html += sec.questions.map(q => `
            <div class="q-item" id="qi-${q.id}">
              <span class="q-num">${q.id}</span>
              <div class="q-content">
                <p class="q-text">${q.text.replace('___',`<input type="text" class="q-input" placeholder="..." value="${state.answers[q.id]||''}" oninput="MockApp.save(${q.id},this.value)">`)}</p>
              </div>
            </div>`).join('');
          html += '</div>';
        });
        break;
      case 'form_completion':
        html += group.questions.map(q => `
          <div class="q-item q-item-form" id="qi-${q.id}">
            <span class="q-num">${q.id}</span>
            <div class="q-content" style="display:flex;align-items:center;gap:0.4rem;flex-wrap:wrap;">
              <span class="form-label">${q.label}</span>
              ${q.prefix?`<span class="form-prefix">${q.prefix}</span>`:''}
              <input type="text" class="q-input" placeholder="..." value="${state.answers[q.id]||''}" oninput="MockApp.save(${q.id},this.value)">
              ${q.suffix?`<span class="form-suffix">${q.suffix}</span>`:''}
            </div>
          </div>`).join('');
        break;
    }
    return html + '</div>';
  }

  // ── PICK (radio-style) — fixes selection bug ──
  function pick(id, value, el) {
    state.answers[id] = value;
    // find all sibling labels and toggle selected
    let siblings;
    if (el instanceof NodeList || Array.isArray(el)) {
      siblings = el;
    } else {
      siblings = el.parentElement.querySelectorAll('.q-radio-label, .q-option-label');
    }
    siblings.forEach(s => s.classList.remove('selected'));
    if (el instanceof NodeList || Array.isArray(el)) {
      // mcq — find the one matching value
      el.forEach(s => { if(s.textContent.trim().startsWith(value)) s.classList.add('selected'); });
    } else {
      el.classList.add('selected');
    }
    updateBoxes();
  }

  function pickMulti(id, value, el) {
    if (!state.answers[id]) state.answers[id] = [];
    if (el.classList.contains('selected')) {
      el.classList.remove('selected');
      state.answers[id] = state.answers[id].filter(v => v !== value);
    } else {
      el.classList.add('selected');
      state.answers[id].push(value);
    }
    updateBoxes();
  }

  function save(id, value) {
    state.answers[id] = value;
    updateBoxes();
  }

  function updateBoxes() {
    const el = document.querySelector('.mock-answer-boxes');
    if (el) el.innerHTML = renderBoxes();
  }

  function goPassage(i) {
    state.passage = i;
    renderReading();
  }

  function scrollToQ(num) {
    const el = document.getElementById(`qi-${num}`);
    if (el) el.scrollIntoView({behavior:'smooth',block:'center'});
  }

  // ── HIGHLIGHT ──
  let hlColor = '#ffd70066';
  function setHL(btn) {
    document.querySelectorAll('.hl-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    hlColor = btn.dataset.color;
  }
  function doHL() {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount===0 || sel.isCollapsed) return;
    const range = sel.getRangeAt(0);
    if (hlColor === 'erase') {
      document.querySelectorAll('.hl-span').forEach(s => {
        if (sel.containsNode(s,true)) {
          const p = s.parentNode;
          while(s.firstChild) p.insertBefore(s.firstChild,s);
          p.removeChild(s);
        }
      });
    } else {
      try {
        const span = document.createElement('span');
        span.className='hl-span'; span.style.backgroundColor=hlColor; span.style.borderRadius='2px';
        range.surroundContents(span);
      } catch(e) {
        const frag=range.extractContents();
        const span=document.createElement('span');
        span.className='hl-span'; span.style.backgroundColor=hlColor; span.style.borderRadius='2px';
        span.appendChild(frag); range.insertNode(span);
      }
    }
    sel.removeAllRanges();
  }

  // ── DRAG ──
  function removeDragListeners() {
    if (state.dragListeners) {
      document.removeEventListener('mousemove', state.dragListeners.move);
      document.removeEventListener('mouseup', state.dragListeners.up);
      state.dragListeners = null;
    }
  }
  function initDrag() {
    const handle = document.getElementById('drag-handle');
    const split = document.getElementById('mock-split');
    const pp = document.getElementById('passage-panel');
    const qp = document.getElementById('questions-panel');
    if (!handle) return;
    let dragging=false, startX=0, startW=0;
    const onMove = e => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      const total = split.offsetWidth;
      const nw = Math.max(180, Math.min(total-180, startW+dx));
      pp.style.flex='none'; pp.style.width=nw+'px'; qp.style.flex='1';
    };
    const onUp = () => { dragging=false; document.body.style.cursor=''; document.body.style.userSelect=''; };
    handle.addEventListener('mousedown', e => {
      dragging=true; startX=e.clientX; startW=pp.offsetWidth;
      document.body.style.cursor='col-resize'; document.body.style.userSelect='none';
    });
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    state.dragListeners = {move:onMove, up:onUp};
  }

  // ── TIMER ──
  function startTimer(phase) {
    clearInterval(state.timer);
    state.timer = setInterval(() => {
      state.timeLeft--;
      updateTimer();
      if (state.timeLeft <= 0) {
        clearInterval(state.timer);
        if (phase==='reading') finishReading();
        else finishListening();
      }
    }, 1000);
  }
  function updateTimer() {
    const el = document.getElementById('mock-timer');
    if (!el) return;
    const m=Math.floor(state.timeLeft/60), s=state.timeLeft%60;
    el.textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    el.classList.toggle('timer-warning', state.timeLeft<=300);
  }

  // ── FINISH READING ──
  function finishReading() {
    clearInterval(state.timer);
    removeDragListeners();
    exitFS();
    state.phase='reading_done';
    document.getElementById('mock-main').innerHTML=`
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

  // ── SHOW READING ANSWERS ──
  function showReadingAnswers() {
    const mock = MOCK_DATA[state.mockId];
    let allA={}, score=0, total=0;
    mock.reading.passages.forEach(p=>p.questionGroups.forEach(g=>Object.assign(allA,g.answers)));
    Object.entries(allA).forEach(([id,correct])=>{
      total++;
      const user=state.answers[id];
      const ok=Array.isArray(correct)?(Array.isArray(user)&&correct.every(v=>user.includes(v))):(user&&user.toString().toLowerCase().trim()===correct.toString().toLowerCase().trim());
      if(ok) score++;
    });
    document.getElementById('mock-main').innerHTML=`
      <div class="mock-results-screen">
        <h2>Reading Results</h2>
        <div class="results-cards">
          <div class="result-card">
            <div class="result-card-label">Score</div>
            <div class="score-big">${score}<span>/${total}</span></div>
          </div>
          <div class="result-card">
            <div class="result-card-label">Est. Band</div>
            <div class="score-big">${estimateBand(score,'reading')}</div>
          </div>
        </div>
        ${answerTable(allA)}
        <div style="display:flex;gap:1rem;justify-content:center;margin-top:2rem;flex-wrap:wrap;">
          <button class="btn-choice btn-continue-listening" onclick="MockApp.startListening()">🎧 Continue to Listening →</button>
          <button class="btn-choice" onclick="MockApp.init()">← Back to selection</button>
        </div>
      </div>`;
  }

  // ── START LISTENING ──
  function startListening() {
    state.phase='listening';
    state.timeLeft=MOCK_DATA[state.mockId].listening.timeLimit*60;
    enterFullscreen();
    renderListening();
    startTimer('listening');
  }

  function renderListening() {
    const mock=MOCK_DATA[state.mockId];
    const sizes=['font-size-sm','font-size-md','font-size-lg','font-size-xl'];
    const sizeIdx=Math.floor((state.fontSize-12)/4);
    document.getElementById('mock-main').innerHTML=`
      <div class="mock-listening-wrap">
        <div class="mock-topbar">
          <div class="mock-topbar-left">
            <span class="mock-title">${mock.title}</span>
            <span class="mock-phase-tag listening-tag">Listening</span>
          </div>
          <div class="mock-timer" id="mock-timer">30:00</div>
          <div class="mock-topbar-right">
            <div class="font-controls">
              <span style="font-size:0.75rem;color:var(--muted2);margin-right:4px">Text:</span>
              <button class="font-btn font-size-sm" onclick="MockApp.setFont(12)">A</button>
              <button class="font-btn font-size-md" onclick="MockApp.setFont(16)">A</button>
              <button class="font-btn font-size-lg" onclick="MockApp.setFont(20)">A</button>
              <button class="font-btn font-size-xl" onclick="MockApp.setFont(24)">A</button>
            </div>
            <button class="btn-icon" onclick="MockApp.toggleTheme()">${document.body.classList.contains('light')?'🌙':'☀️'}</button>
            <button class="btn-icon" onclick="MockApp.toggleFS()">⛶</button>
          </div>
        </div>
        <div class="audio-player-bar">
          <audio id="mock-audio" controls style="width:100%;max-width:600px;">
            <source src="${mock.listening.audioUrl}" type="audio/mpeg">
          </audio>
          <span class="audio-note">🎧 Use headphones for best results</span>
        </div>
        <div class="listening-questions" id="lq" style="font-size:${state.fontSize}px">
          ${mock.listening.parts.map(part=>`
            <div class="listening-part">
              <h3 class="part-title">${part.title}</h3>
              <p class="part-instructions">${part.instructions}</p>
              ${part.formTitle?`<div class="form-title-box">${part.formTitle}</div>`:''}
              ${renderGroups(part.questionGroups)}
            </div>`).join('')}
        </div>
        <div class="mock-bottom-nav">
          <div></div>
          <span class="passage-indicator">Listening — answer as the audio plays</span>
          <button class="btn-nav btn-nav-finish" onclick="MockApp.finishListening()">Finish Listening ✓</button>
        </div>
      </div>`;
    updateTimer();
  }

  function setFont(size) {
    state.fontSize=size;
    const el=document.getElementById('lq');
    if(el) el.style.fontSize=size+'px';
  }

  function finishListening() {
    clearInterval(state.timer);
    exitFS();
    showFinalResults();
  }

  function showFinalResults() {
    state.phase='results';
    const mock=MOCK_DATA[state.mockId];
    let rScore=0,rTotal=0,lScore=0,lTotal=0;
    let rAnswers={}, lAnswers={};
    mock.reading.passages.forEach(p=>p.questionGroups.forEach(g=>{Object.assign(rAnswers,g.answers);}));
    mock.listening.parts.forEach(p=>p.questionGroups.forEach(g=>{Object.assign(lAnswers,g.answers);}));
    Object.entries(rAnswers).forEach(([id,c])=>{rTotal++;const u=state.answers[id];if(chk(u,c))rScore++;});
    Object.entries(lAnswers).forEach(([id,c])=>{lTotal++;const u=state.answers[id];if(chk(u,c))lScore++;});

    document.getElementById('mock-main').innerHTML=`
      <div class="mock-results-screen">
        <h2>Test Complete! 🎉</h2>
        <div class="results-cards">
          <div class="result-card">
            <div class="result-card-label">Reading</div>
            <div class="score-big">${rScore}<span>/${rTotal}</span></div>
            <div class="score-band">Band ${estimateBand(rScore,'reading')}</div>
          </div>
          <div class="result-card">
            <div class="result-card-label">Listening</div>
            <div class="score-big">${lScore}<span>/${lTotal}</span></div>
            <div class="score-band">Band ${estimateBand(lScore,'listening')}</div>
          </div>
        </div>
        <h3 style="margin:2rem 0 1rem;text-align:center;font-family:'Playfair Display',serif;">Reading Answers</h3>
        ${answerTable(rAnswers)}
        <h3 style="margin:2rem 0 1rem;text-align:center;font-family:'Playfair Display',serif;">Listening Answers</h3>
        ${answerTable(lAnswers)}
        <div style="display:flex;gap:1rem;justify-content:center;margin-top:2rem;flex-wrap:wrap;">
          <button class="btn-choice" onclick="MockApp.selectMock('${state.mockId}')">🔄 Try Again</button>
          <button class="btn-choice btn-continue-listening" onclick="MockApp.init()">← Back to Mocks</button>
        </div>
      </div>`;
  }

  function chk(user, correct) {
    if (Array.isArray(correct)) return Array.isArray(user) && correct.every(v=>user.includes(v));
    return user && user.toString().toLowerCase().trim() === correct.toString().toLowerCase().trim();
  }

  function answerTable(answers) {
    return `<div class="results-table">${Object.entries(answers).map(([id,correct])=>{
      const user=state.answers[id]||'—';
      const ok=chk(user,correct);
      return `<div class="result-row ${ok?'correct':'wrong'}">
        <span class="result-num">${id}</span>
        <span class="result-user">${Array.isArray(user)?user.join(', '):user}</span>
        <span class="result-arrow">${ok?'✓':'✗'}</span>
        <span class="result-correct">${Array.isArray(correct)?correct.join(', '):correct}</span>
      </div>`;
    }).join('')}</div>`;
  }

  function estimateBand(score,type) {
    const r=[[39,9],[37,8.5],[35,8],[33,7.5],[30,7],[27,6.5],[23,6],[19,5.5],[15,5],[13,4.5]];
    const l=[[40,9],[39,8.5],[37,8],[35,7.5],[32,7],[30,6.5],[26,6],[23,5.5],[18,5],[16,4.5]];
    const bands=type==='reading'?r:l;
    for(const [min,band] of bands) if(score>=min) return band;
    return 4;
  }

  function enterFullscreen() {
    const el=document.documentElement;
    if(el.requestFullscreen) el.requestFullscreen().catch(()=>{});
    else if(el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  }
  function exitFS() {
    if(document.fullscreenElement) document.exitFullscreen().catch(()=>{});
    else if(document.webkitFullscreenElement) document.webkitExitFullscreen();
  }
  function toggleFS() {
    document.fullscreenElement ? exitFS() : enterFullscreen();
  }

  return {
    init, selectMock, startReading, goPassage, finishReading,
    showReadingAnswers, startListening, finishListening,
    save, pick, pickMulti, doHL, setHL, toggleFS, toggleTheme,
    scrollToQ, setFont
  };
})();
