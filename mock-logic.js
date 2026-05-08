// ── MOCK LOGIC ──
const MockApp = (() => {

  let state = {
    phase: 'selection',   // selection | intro | reading | reading_done | listening | results
    mockId: null,
    passage: 0,           // 0,1,2
    answers: {},          // { questionId: answer }
    timer: null,
    timeLeft: 0,
    highlighted: {},      // { passageId: [{start,end,color}] }
    fontSize: 16,
    showAnswers: false,
  };

  // ── INIT ──
  function init() {
    renderSelection();
  }

  // ── SELECTION PAGE ──
  function renderSelection() {
    state.phase = 'selection';
    const mocks = Object.keys(MOCK_DATA);
    document.getElementById('mock-main').innerHTML = `
      <div class="mock-selection">
        <div class="mock-sel-header">
          <h2>Mock Tests</h2>
          <p>Full IELTS practice — Reading (60 min) + Listening (30 min)</p>
        </div>
        <div class="mock-cards">
          ${mocks.map((id, i) => `
            <div class="mock-card" onclick="MockApp.selectMock('${id}')">
              <div class="mock-card-num">${i + 1}</div>
              <div class="mock-card-title">${MOCK_DATA[id].title}</div>
              <div class="mock-card-meta">
                <span>📖 Reading · 40 Q</span>
                <span>🎧 Listening · 40 Q</span>
              </div>
              <div class="mock-card-btn">Start →</div>
            </div>
          `).join('')}
        </div>
      </div>`;
  }

  // ── SELECT MOCK ──
  function selectMock(id) {
    state.mockId = id;
    state.answers = {};
    state.passage = 0;
    renderIntro();
  }

  // ── INTRO ──
  function renderIntro() {
    state.phase = 'intro';
    const mock = MOCK_DATA[state.mockId];
    document.getElementById('mock-main').innerHTML = `
      <div class="mock-intro">
        <div class="intro-icon">📋</div>
        <h2>${mock.title}</h2>
        <div class="intro-info">
          <div class="intro-block">
            <div class="intro-label">Reading</div>
            <div class="intro-val">60 minutes · 3 passages · 40 questions</div>
          </div>
          <div class="intro-block">
            <div class="intro-label">Listening</div>
            <div class="intro-val">30 minutes · 4 parts · 40 questions</div>
          </div>
        </div>
        <div class="intro-rules">
          <p>⏱ Timer starts when you press Start and cannot be paused.</p>
          <p>🖊 You can highlight text in the passage using your mouse.</p>
          <p>↔ Drag the divider to resize passage and question panels.</p>
          <p>📝 Navigate between passages using the buttons at the bottom.</p>
        </div>
        <button class="btn-start-mock" onclick="MockApp.startReading()">Start Reading Test →</button>
        <button class="btn-back-sel" onclick="MockApp.init()">← Back to selection</button>
      </div>`;
  }

  // ── START READING ──
  function startReading() {
    state.phase = 'reading';
    state.passage = 0;
    state.timeLeft = MOCK_DATA[state.mockId].reading.timeLimit * 60;
    enterFullscreen();
    renderReading();
    startTimer('reading');
  }

  // ── RENDER READING ──
  function renderReading() {
    const mock = MOCK_DATA[state.mockId];
    const passage = mock.reading.passages[state.passage];
    const totalPassages = mock.reading.passages.length;

    document.getElementById('mock-main').innerHTML = `
      <div class="mock-reading-wrap" id="reading-wrap">
        <!-- TOP BAR -->
        <div class="mock-topbar">
          <div class="mock-topbar-left">
            <span class="mock-title">${mock.title}</span>
            <span class="mock-phase-tag">Reading</span>
          </div>
          <div class="mock-timer" id="mock-timer">60:00</div>
          <div class="mock-topbar-right">
            <div class="highlight-tools">
              <span class="hl-label">Highlight:</span>
              <button class="hl-btn" data-color="#ffd70066" onclick="MockApp.setHighlight(this)" title="Yellow">🟡</button>
              <button class="hl-btn" data-color="#34d39966" onclick="MockApp.setHighlight(this)" title="Green">🟢</button>
              <button class="hl-btn" data-color="#60a5fa66" onclick="MockApp.setHighlight(this)" title="Blue">🔵</button>
              <button class="hl-btn hl-erase" data-color="erase" onclick="MockApp.setHighlight(this)" title="Erase">✕</button>
            </div>
            <button class="btn-fullscreen" onclick="MockApp.toggleFullscreen()" title="Fullscreen">⛶</button>
          </div>
        </div>

        <!-- SPLIT PANEL -->
        <div class="mock-split" id="mock-split">
          <!-- PASSAGE -->
          <div class="mock-passage-panel" id="passage-panel">
            <div class="passage-nav-tabs">
              ${mock.reading.passages.map((p, i) => `
                <button class="ptab ${i === state.passage ? 'active' : ''}" onclick="MockApp.goPassage(${i})">
                  Passage ${i + 1}
                </button>`).join('')}
            </div>
            <div class="passage-content" id="passage-content">
              <h3 class="passage-title">${passage.title}</h3>
              ${passage.subtitle ? `<p class="passage-subtitle">${passage.subtitle}</p>` : ''}
              <div class="passage-text" id="passage-text" onmouseup="MockApp.handleHighlight(event)">${formatPassageText(passage.text)}</div>
            </div>
          </div>

          <!-- DRAG HANDLE -->
          <div class="drag-handle" id="drag-handle" onmousedown="MockApp.startDrag(event)">
            <div class="drag-dots">⋮</div>
          </div>

          <!-- QUESTIONS -->
          <div class="mock-questions-panel" id="questions-panel">
            <div class="questions-scroll">
              ${renderQuestionGroups(passage.questionGroups)}
            </div>
          </div>
        </div>

        <!-- ANSWER BOXES -->
        <div class="mock-answer-boxes">
          ${renderAnswerBoxes()}
        </div>

        <!-- BOTTOM NAV -->
        <div class="mock-bottom-nav">
          ${state.passage > 0 ? `<button class="btn-nav" onclick="MockApp.goPassage(${state.passage - 1})">← Passage ${state.passage}</button>` : '<div></div>'}
          <div class="passage-indicator">Passage ${state.passage + 1} of ${totalPassages}</div>
          ${state.passage < totalPassages - 1
            ? `<button class="btn-nav btn-nav-next" onclick="MockApp.goPassage(${state.passage + 1})">Passage ${state.passage + 2} →</button>`
            : `<button class="btn-nav btn-nav-finish" onclick="MockApp.finishReading()">Finish Reading ✓</button>`
          }
        </div>
      </div>`;

    initDrag();
    updateTimer();
  }

  // ── FORMAT PASSAGE TEXT ──
  function formatPassageText(text) {
    return text
      .split('\n\n')
      .map(p => p.trim())
      .filter(p => p)
      .map(p => `<p>${p.replace(/\n/g, ' ')}</p>`)
      .join('');
  }

  // ── RENDER QUESTION GROUPS ──
  function renderQuestionGroups(groups) {
    return groups.map(group => renderGroup(group)).join('');
  }

  function renderGroup(group) {
    let html = `<div class="q-group">
      <p class="q-instructions">${group.instructions}</p>`;

    if (group.title) html += `<div class="q-group-title">${group.title}</div>`;

    switch (group.type) {
      case 'tfng':
      case 'yng':
        html += group.questions.map(q => `
          <div class="q-item">
            <span class="q-num">${q.id}</span>
            <div class="q-content">
              <p class="q-text">${q.text}</p>
              <div class="q-options-row">
                ${(group.type === 'tfng' ? ['TRUE','FALSE','NOT GIVEN'] : ['YES','NO','NOT GIVEN']).map(opt => `
                  <label class="q-radio-label ${state.answers[q.id] === opt ? 'selected' : ''}">
                    <input type="radio" name="q${q.id}" value="${opt}" ${state.answers[q.id] === opt ? 'checked' : ''} onchange="MockApp.saveAnswer(${q.id}, '${opt}')">
                    ${opt}
                  </label>`).join('')}
              </div>
            </div>
          </div>`).join('');
        break;

      case 'mcq':
        html += group.questions.map(q => `
          <div class="q-item">
            <span class="q-num">${q.id}</span>
            <div class="q-content">
              <p class="q-text">${q.text}</p>
              <div class="q-options">
                ${Object.entries(q.options).map(([k,v]) => `
                  <label class="q-option-label ${state.answers[q.id] === k ? 'selected' : ''}">
                    <input type="radio" name="q${q.id}" value="${k}" ${state.answers[q.id] === k ? 'checked' : ''} onchange="MockApp.saveAnswer(${q.id}, '${k}')">
                    <span class="opt-key">${k}</span> ${v}
                  </label>`).join('')}
              </div>
            </div>
          </div>`).join('');
        break;

      case 'mcq_multi':
        html += group.questions.map(q => `
          <div class="q-item">
            <span class="q-num">${typeof q.id === 'string' ? q.id : q.id}</span>
            <div class="q-content">
              <p class="q-text">${q.text || ''}</p>
              <div class="q-options">
                ${Object.entries(group.options).map(([k,v]) => {
                  const saved = state.answers[q.id] || [];
                  const checked = saved.includes(k);
                  return `<label class="q-option-label ${checked ? 'selected' : ''}">
                    <input type="checkbox" name="q${q.id}" value="${k}" ${checked ? 'checked' : ''} onchange="MockApp.saveMultiAnswer('${q.id}', '${k}', this.checked)">
                    <span class="opt-key">${k}</span> ${v}
                  </label>`;
                }).join('')}
              </div>
            </div>
          </div>`).join('');
        break;

      case 'matching':
        html += group.questions.map(q => `
          <div class="q-item q-item-inline">
            <span class="q-num">${q.id}</span>
            <div class="q-content">
              <p class="q-text">${q.text}</p>
              <select class="q-select" onchange="MockApp.saveAnswer(${q.id}, this.value)">
                <option value="">Select...</option>
                ${Object.entries(group.options).map(([k,v]) => `
                  <option value="${k}" ${state.answers[q.id] === k ? 'selected' : ''}>${k} — ${v}</option>`).join('')}
              </select>
            </div>
          </div>`).join('');
        break;

      case 'notes':
      case 'sentence_completion':
        html += group.questions.map(q => `
          <div class="q-item">
            <span class="q-num">${q.id}</span>
            <div class="q-content">
              <p class="q-text">${q.text.replace('___', `<input type="text" class="q-input" placeholder="..." value="${state.answers[q.id] || ''}" onchange="MockApp.saveAnswer(${q.id}, this.value)" oninput="MockApp.saveAnswer(${q.id}, this.value)">`)}</p>
            </div>
          </div>`).join('');
        break;

      case 'summary_word_list':
        html += `<div class="word-list">
          ${Object.entries(group.wordList).map(([k,v]) => `<span class="word-chip"><strong>${k}</strong> ${v}</span>`).join('')}
        </div>`;
        const summary = group.summaryText.replace(/(\d+) ___/g, (match, num) => {
          const ans = state.answers[parseInt(num)] || '';
          return `${num} <select class="q-select-inline" onchange="MockApp.saveAnswer(${num}, this.value)">
            <option value="">...</option>
            ${Object.keys(group.wordList).map(k => `<option value="${k}" ${ans === k ? 'selected' : ''}>${k}</option>`).join('')}
          </select>`;
        });
        html += `<p class="summary-text">${summary}</p>`;
        break;

      case 'notes_completion':
        group.sections.forEach(section => {
          html += `<div class="notes-section"><h4 class="notes-heading">${section.heading}</h4>`;
          html += section.questions.map(q => `
            <div class="q-item">
              <span class="q-num">${q.id}</span>
              <div class="q-content">
                <p class="q-text">${q.text.replace('___', `<input type="text" class="q-input" placeholder="..." value="${state.answers[q.id] || ''}" onchange="MockApp.saveAnswer(${q.id}, this.value)" oninput="MockApp.saveAnswer(${q.id}, this.value)">`)}</p>
              </div>
            </div>`).join('');
          html += '</div>';
        });
        break;

      case 'form_completion':
        html += group.questions.map(q => `
          <div class="q-item q-item-form">
            <span class="q-num">${q.id}</span>
            <div class="q-content">
              <span class="form-label">${q.label}</span>
              ${q.prefix ? `<span class="form-prefix">${q.prefix}</span>` : ''}
              <input type="text" class="q-input" placeholder="..." value="${state.answers[q.id] || ''}" onchange="MockApp.saveAnswer(${q.id}, this.value)" oninput="MockApp.saveAnswer(${q.id}, this.value)">
              ${q.suffix ? `<span class="form-suffix">${q.suffix}</span>` : ''}
            </div>
          </div>`).join('');
        break;
    }

    html += '</div>';
    return html;
  }

  // ── ANSWER BOXES ──
  function renderAnswerBoxes() {
    const ranges = [[1,13],[14,26],[27,40]];
    const passageNames = ['Passage 1','Passage 2','Passage 3'];
    return ranges.map((range, pi) => `
      <div class="answer-box-group ${pi === state.passage ? 'active-passage' : ''}">
        <div class="answer-box-label">${passageNames[pi]}</div>
        <div class="answer-box-nums">
          ${Array.from({length: range[1] - range[0] + 1}, (_,i) => {
            const num = range[0] + i;
            const answered = state.answers[num] !== undefined && state.answers[num] !== '' &&
              !(Array.isArray(state.answers[num]) && state.answers[num].length === 0);
            return `<div class="answer-box ${answered ? 'answered' : ''}" onclick="MockApp.scrollToQuestion(${num})">${num}</div>`;
          }).join('')}
        </div>
      </div>`).join('');
  }

  // ── GO TO PASSAGE ──
  function goPassage(index) {
    state.passage = index;
    renderReading();
  }

  // ── SAVE ANSWER ──
  function saveAnswer(id, value) {
    state.answers[id] = value;
    updateAnswerBoxes();
  }

  function saveMultiAnswer(id, value, checked) {
    if (!state.answers[id]) state.answers[id] = [];
    if (checked) {
      if (!state.answers[id].includes(value)) state.answers[id].push(value);
    } else {
      state.answers[id] = state.answers[id].filter(v => v !== value);
    }
    updateAnswerBoxes();
  }

  function updateAnswerBoxes() {
    const container = document.querySelector('.mock-answer-boxes');
    if (container) container.innerHTML = renderAnswerBoxes();
  }

  // ── HIGHLIGHT ──
  let activeHighlightColor = '#ffd70066';
  function setHighlight(btn) {
    document.querySelectorAll('.hl-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeHighlightColor = btn.dataset.color;
  }

  function handleHighlight(e) {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    if (!range || range.collapsed) return;
    if (activeHighlightColor === 'erase') {
      // Remove highlights in selection
      document.querySelectorAll('.hl-span').forEach(span => {
        if (selection.containsNode(span, true)) {
          const parent = span.parentNode;
          while (span.firstChild) parent.insertBefore(span.firstChild, span);
          parent.removeChild(span);
        }
      });
    } else {
      try {
        const span = document.createElement('span');
        span.className = 'hl-span';
        span.style.backgroundColor = activeHighlightColor;
        span.style.borderRadius = '2px';
        range.surroundContents(span);
      } catch(err) {
        // Selection spans multiple elements — wrap each text node
        const frag = range.extractContents();
        const span = document.createElement('span');
        span.className = 'hl-span';
        span.style.backgroundColor = activeHighlightColor;
        span.style.borderRadius = '2px';
        span.appendChild(frag);
        range.insertNode(span);
      }
    }
    selection.removeAllRanges();
  }

  // ── DRAG DIVIDER ──
  function initDrag() {
    const handle = document.getElementById('drag-handle');
    const split = document.getElementById('mock-split');
    const passagePanel = document.getElementById('passage-panel');
    const questionsPanel = document.getElementById('questions-panel');
    if (!handle || !split) return;

    let isDragging = false;
    let startX, startPassageWidth;

    handle.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      startPassageWidth = passagePanel.offsetWidth;
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const totalWidth = split.offsetWidth;
      const newPassageWidth = Math.max(300, Math.min(totalWidth - 300, startPassageWidth + dx));
      passagePanel.style.flex = 'none';
      passagePanel.style.width = newPassageWidth + 'px';
      questionsPanel.style.flex = '1';
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    });
  }

  function startDrag(e) { e.preventDefault(); }

  // ── SCROLL TO QUESTION ──
  function scrollToQuestion(num) {
    // Find which passage this question belongs to
    const mock = MOCK_DATA[state.mockId];
    let targetPassage = 0;
    if (num >= 14 && num <= 26) targetPassage = 1;
    else if (num >= 27) targetPassage = 2;

    if (targetPassage !== state.passage) {
      state.passage = targetPassage;
      renderReading();
      setTimeout(() => {
        const el = document.querySelector(`[name="q${num}"], input[onchange*="saveAnswer(${num}"]`);
        if (el) el.closest('.q-item')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    } else {
      const qPanel = document.querySelector('.questions-scroll');
      const qItems = document.querySelectorAll('.q-num');
      qItems.forEach(item => {
        if (item.textContent.trim() === String(num)) {
          item.closest('.q-item')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    }
  }

  // ── TIMER ──
  function startTimer(phase) {
    clearInterval(state.timer);
    state.timer = setInterval(() => {
      state.timeLeft--;
      updateTimer();
      if (state.timeLeft <= 0) {
        clearInterval(state.timer);
        if (phase === 'reading') finishReading();
        else if (phase === 'listening') finishListening();
      }
    }, 1000);
  }

  function updateTimer() {
    const el = document.getElementById('mock-timer');
    if (!el) return;
    const m = Math.floor(state.timeLeft / 60);
    const s = state.timeLeft % 60;
    el.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    el.classList.toggle('timer-warning', state.timeLeft <= 300);
  }

  // ── FINISH READING ──
  function finishReading() {
    clearInterval(state.timer);
    state.phase = 'reading_done';
    exitFullscreen();
    document.getElementById('mock-main').innerHTML = `
      <div class="mock-choice-screen">
        <div class="choice-icon">📖</div>
        <h2>Reading section complete!</h2>
        <p>What would you like to do next?</p>
        <div class="choice-btns">
          <button class="btn-choice btn-show-answers" onclick="MockApp.showReadingAnswers()">
            📊 Show Reading Answers
          </button>
          <button class="btn-choice btn-continue-listening" onclick="MockApp.startListening()">
            🎧 Continue to Listening →
          </button>
        </div>
      </div>`;
  }

  // ── SHOW READING ANSWERS ──
  function showReadingAnswers() {
    state.showAnswers = true;
    const mock = MOCK_DATA[state.mockId];
    let allAnswers = {};
    mock.reading.passages.forEach(p => {
      p.questionGroups.forEach(g => {
        Object.assign(allAnswers, g.answers);
      });
    });

    let score = 0, total = 0;
    Object.entries(allAnswers).forEach(([id, correct]) => {
      total++;
      const userAns = state.answers[id];
      if (Array.isArray(correct)) {
        if (Array.isArray(userAns) && correct.every(v => userAns.includes(v))) score++;
      } else {
        if (userAns && userAns.toString().toLowerCase().trim() === correct.toString().toLowerCase().trim()) score++;
      }
    });

    document.getElementById('mock-main').innerHTML = `
      <div class="mock-results-screen">
        <h2>Reading Results</h2>
        <div class="results-score">
          <div class="score-big">${score}<span>/${total}</span></div>
          <div class="score-band">Est. Band: ${estimateBand(score, 'reading')}</div>
        </div>
        <div class="results-table">
          ${Object.entries(allAnswers).map(([id, correct]) => {
            const user = state.answers[id] || '—';
            const isCorrect = Array.isArray(correct)
              ? (Array.isArray(user) && correct.every(v => user.includes(v)))
              : (user.toString().toLowerCase().trim() === correct.toString().toLowerCase().trim());
            return `<div class="result-row ${isCorrect ? 'correct' : 'wrong'}">
              <span class="result-num">${id}</span>
              <span class="result-user">${Array.isArray(user) ? user.join(', ') : user}</span>
              <span class="result-arrow">${isCorrect ? '✓' : '✗'}</span>
              <span class="result-correct">${Array.isArray(correct) ? correct.join(', ') : correct}</span>
            </div>`;
          }).join('')}
        </div>
        <button class="btn-choice btn-continue-listening" onclick="MockApp.startListening()">🎧 Continue to Listening →</button>
        <button class="btn-choice" onclick="MockApp.init()" style="margin-top:0.5rem">← Back to selection</button>
      </div>`;
  }

  // ── START LISTENING ──
  function startListening() {
    state.phase = 'listening';
    state.timeLeft = MOCK_DATA[state.mockId].listening.timeLimit * 60;
    enterFullscreen();
    renderListening();
    startTimer('listening');
  }

  // ── RENDER LISTENING ──
  function renderListening() {
    const mock = MOCK_DATA[state.mockId];
    const listening = mock.listening;

    document.getElementById('mock-main').innerHTML = `
      <div class="mock-listening-wrap">
        <div class="mock-topbar">
          <div class="mock-topbar-left">
            <span class="mock-title">${mock.title}</span>
            <span class="mock-phase-tag listening-tag">Listening</span>
          </div>
          <div class="mock-timer" id="mock-timer">30:00</div>
          <div class="mock-topbar-right">
            <div class="font-controls">
              <button class="font-btn" onclick="MockApp.changeFontSize(-1)">A−</button>
              <button class="font-btn" onclick="MockApp.changeFontSize(1)">A+</button>
            </div>
            <button class="btn-fullscreen" onclick="MockApp.toggleFullscreen()">⛶</button>
          </div>
        </div>

        <!-- AUDIO PLAYER -->
        <div class="audio-player-bar">
          <audio id="mock-audio" controls style="width:100%; max-width:600px;">
            <source src="${listening.audioUrl}" type="audio/mpeg">
            Your browser does not support audio.
          </audio>
          <div class="audio-note">🎧 Use headphones for best results</div>
        </div>

        <!-- LISTENING QUESTIONS -->
        <div class="listening-questions" id="listening-questions" style="font-size:${state.fontSize}px">
          ${listening.parts.map(part => `
            <div class="listening-part">
              <h3 class="part-title">${part.title}</h3>
              <p class="part-instructions">${part.instructions}</p>
              ${part.formTitle ? `<div class="form-title-box">${part.formTitle}</div>` : ''}
              ${renderListeningGroups(part.questionGroups)}
            </div>`).join('')}
        </div>

        <!-- BOTTOM -->
        <div class="mock-bottom-nav">
          <div></div>
          <div class="passage-indicator">Listening — Answer as you go</div>
          <button class="btn-nav btn-nav-finish" onclick="MockApp.finishListening()">Finish Listening ✓</button>
        </div>
      </div>`;

    updateTimer();
  }

  function renderListeningGroups(groups) {
    return groups.map(g => renderGroup(g)).join('');
  }

  // ── FONT SIZE ──
  function changeFontSize(delta) {
    state.fontSize = Math.max(12, Math.min(22, state.fontSize + delta));
    const el = document.getElementById('listening-questions');
    if (el) el.style.fontSize = state.fontSize + 'px';
  }

  // ── FINISH LISTENING ──
  function finishListening() {
    clearInterval(state.timer);
    exitFullscreen();
    showFinalResults();
  }

  // ── FINAL RESULTS ──
  function showFinalResults() {
    state.phase = 'results';
    const mock = MOCK_DATA[state.mockId];

    // Calculate reading score
    let rScore = 0, rTotal = 0;
    mock.reading.passages.forEach(p => {
      p.questionGroups.forEach(g => {
        Object.entries(g.answers).forEach(([id, correct]) => {
          rTotal++;
          const user = state.answers[id];
          if (Array.isArray(correct)) {
            if (Array.isArray(user) && correct.every(v => user.includes(v))) rScore++;
          } else {
            if (user && user.toString().toLowerCase().trim() === correct.toString().toLowerCase().trim()) rScore++;
          }
        });
      });
    });

    // Calculate listening score
    let lScore = 0, lTotal = 0;
    mock.listening.parts.forEach(p => {
      p.questionGroups.forEach(g => {
        Object.entries(g.answers).forEach(([id, correct]) => {
          lTotal++;
          const user = state.answers[id];
          if (Array.isArray(correct)) {
            if (Array.isArray(user) && correct.every(v => user.includes(v))) lScore++;
          } else {
            if (user && user.toString().toLowerCase().trim() === correct.toString().toLowerCase().trim()) lScore++;
          }
        });
      });
    });

    document.getElementById('mock-main').innerHTML = `
      <div class="mock-results-screen">
        <h2>Test Complete! 🎉</h2>
        <div class="results-cards">
          <div class="result-card">
            <div class="result-card-label">Reading</div>
            <div class="score-big">${rScore}<span>/${rTotal}</span></div>
            <div class="score-band">Band ${estimateBand(rScore, 'reading')}</div>
          </div>
          <div class="result-card">
            <div class="result-card-label">Listening</div>
            <div class="score-big">${lScore}<span>/${lTotal}</span></div>
            <div class="score-band">Band ${estimateBand(lScore, 'listening')}</div>
          </div>
        </div>

        <h3 style="margin:2rem 0 1rem; text-align:center">Reading Answers</h3>
        ${renderAnswerTable(mock.reading.passages.flatMap(p => p.questionGroups))}

        <h3 style="margin:2rem 0 1rem; text-align:center">Listening Answers</h3>
        ${renderAnswerTable(mock.listening.parts.flatMap(p => p.questionGroups))}

        <div style="display:flex; gap:1rem; justify-content:center; margin-top:2rem; flex-wrap:wrap;">
          <button class="btn-choice" onclick="MockApp.selectMock('${state.mockId}')">🔄 Try Again</button>
          <button class="btn-choice btn-continue-listening" onclick="MockApp.init()">← Back to Mocks</button>
        </div>
      </div>`;
  }

  function renderAnswerTable(groups) {
    return `<div class="results-table">
      ${groups.flatMap(g => Object.entries(g.answers).map(([id, correct]) => {
        const user = state.answers[id] || '—';
        const isCorrect = Array.isArray(correct)
          ? (Array.isArray(user) && correct.every(v => user.includes(v)))
          : (user.toString().toLowerCase().trim() === correct.toString().toLowerCase().trim());
        return `<div class="result-row ${isCorrect ? 'correct' : 'wrong'}">
          <span class="result-num">${id}</span>
          <span class="result-user">${Array.isArray(user) ? user.join(', ') : user}</span>
          <span class="result-arrow">${isCorrect ? '✓' : '✗'}</span>
          <span class="result-correct">${Array.isArray(correct) ? correct.join(', ') : correct}</span>
        </div>`;
      })).join('')}
    </div>`;
  }

  // ── BAND ESTIMATE ──
  function estimateBand(score, type) {
    const bands = type === 'reading'
      ? [[39,9],[37,8.5],[35,8],[33,7.5],[30,7],[27,6.5],[23,6],[19,5.5],[15,5],[13,4.5]]
      : [[40,9],[39,8.5],[37,8],[35,7.5],[32,7],[30,6.5],[26,6],[23,5.5],[18,5],[16,4.5]];
    for (const [min, band] of bands) {
      if (score >= min) return band;
    }
    return 4;
  }

  // ── FULLSCREEN ──
  function enterFullscreen() {
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  }

  function exitFullscreen() {
    if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  }

  function toggleFullscreen() {
    if (document.fullscreenElement) exitFullscreen();
    else enterFullscreen();
  }

  return {
    init, selectMock, startReading, goPassage, finishReading,
    showReadingAnswers, startListening, finishListening,
    saveAnswer, saveMultiAnswer, handleHighlight, setHighlight,
    startDrag, toggleFullscreen, scrollToQuestion, changeFontSize
  };
})();
