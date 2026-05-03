// ── VOCAB LOGIC ──
const VocabApp = (() => {

  // State
  let state = {
    mode: 'flashcard',       // 'flashcard' | 'quiz'
    filterTopic: 'all',
    filterBand: 'all',
    deck: [],                // current filtered word list
    index: 0,               // current card index
    flipped: false,
    known: new Set(),
    learning: new Set(),
    // quiz
    quizScore: 0,
    quizTotal: 0,
    answered: false,
  };

  // ── FILTER & BUILD DECK ──
  function buildDeck() {
    let words = [];
    VOCAB_DATA.forEach(topic => {
      const topicMatch = state.filterTopic === 'all' || topic.id === state.filterTopic;
      const bandMatch  = state.filterBand  === 'all' || topic.band === parseInt(state.filterBand);
      if (topicMatch && bandMatch) {
        topic.words.forEach(w => words.push({ ...w, topicLabel: topic.topic, topicId: topic.id, band: topic.band }));
      }
    });
    // Shuffle
    for (let i = words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [words[i], words[j]] = [words[j], words[i]];
    }
    state.deck = words;
    state.index = 0;
    state.flipped = false;
    state.quizScore = 0;
    state.quizTotal = 0;
    state.answered = false;
  }

  // ── RENDER CARD ──
  function renderCard() {
    if (!state.deck.length) {
      document.getElementById('vocab-area').innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">📭</div>
          <p>No words match your filters.</p>
        </div>`;
      return;
    }

    if (state.index >= state.deck.length) {
      renderComplete();
      return;
    }

    if (state.mode === 'flashcard') renderFlashcard();
    else renderQuiz();

    updateProgress();
  }

  // ── FLASHCARD ──
  function renderFlashcard() {
    const w = state.deck[state.index];
    const isKnown    = state.known.has(w.word);
    const isLearning = state.learning.has(w.word);

    document.getElementById('vocab-area').innerHTML = `
      <div class="card-wrap">
        <div class="topic-tag">${w.topicLabel} · Band ${w.band}</div>
        <div class="flashcard ${state.flipped ? 'flipped' : ''}" id="flashcard" onclick="VocabApp.flip()">
          <div class="flashcard-inner">
            <div class="flashcard-front">
              <div class="card-hint">tap to reveal</div>
              <div class="card-word">${w.word}</div>
            </div>
            <div class="flashcard-back">
              <div class="card-definition">${w.definition}</div>
              <div class="card-example">"${w.example}"</div>
            </div>
          </div>
        </div>
        <div class="card-actions ${state.flipped ? 'visible' : ''}">
          <button class="btn-action btn-learning ${isLearning ? 'active' : ''}" onclick="VocabApp.markLearning()">
            Still learning
          </button>
          <button class="btn-action btn-next" onclick="VocabApp.next()">
            Skip →
          </button>
          <button class="btn-action btn-known ${isKnown ? 'active' : ''}" onclick="VocabApp.markKnown()">
            Know it ✓
          </button>
        </div>
      </div>`;
  }

  // ── QUIZ ──
  function renderQuiz() {
    const w = state.deck[state.index];
    const options = buildOptions(w);

    document.getElementById('vocab-area').innerHTML = `
      <div class="card-wrap">
        <div class="topic-tag">${w.topicLabel} · Band ${w.band}</div>
        <div class="quiz-card">
          <div class="quiz-score-display">Score: ${state.quizScore} / ${state.quizTotal}</div>
          <div class="quiz-word">${w.word}</div>
          <div class="quiz-prompt">Which definition is correct?</div>
          <div class="quiz-options" id="quiz-options">
            ${options.map((opt, i) => `
              <button class="quiz-opt" data-index="${i}" data-correct="${opt.correct}" onclick="VocabApp.answerQuiz(this)">
                ${opt.definition}
              </button>`).join('')}
          </div>
          <div class="quiz-example hidden" id="quiz-example">"${w.example}"</div>
          <button class="btn-next-quiz hidden" id="quiz-next" onclick="VocabApp.next()">Next word →</button>
        </div>
      </div>`;
  }

  function buildOptions(correct) {
    // Get 3 random wrong definitions from other words
    const pool = state.deck.filter(w => w.word !== correct.word);
    const shuffled = pool.sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [
      { definition: correct.definition, correct: true },
      ...shuffled.map(w => ({ definition: w.definition, correct: false }))
    ].sort(() => Math.random() - 0.5);
    return options;
  }

  function answerQuiz(btn) {
    if (state.answered) return;
    state.answered = true;
    state.quizTotal++;

    const correct = btn.dataset.correct === 'true';
    if (correct) {
      state.quizScore++;
      btn.classList.add('correct');
    } else {
      btn.classList.add('wrong');
      // highlight correct
      document.querySelectorAll('.quiz-opt').forEach(b => {
        if (b.dataset.correct === 'true') b.classList.add('correct');
      });
    }

    // Disable all options
    document.querySelectorAll('.quiz-opt').forEach(b => b.disabled = true);

    // Show example and next button
    document.getElementById('quiz-example').classList.remove('hidden');
    document.getElementById('quiz-next').classList.remove('hidden');
  }

  // ── COMPLETE SCREEN ──
  function renderComplete() {
    const total = state.deck.length;
    const known = state.known.size;
    const pct   = state.mode === 'quiz' ? Math.round((state.quizScore / state.quizTotal) * 100) : Math.round((known / total) * 100);

    document.getElementById('vocab-area').innerHTML = `
      <div class="complete-screen">
        <div class="complete-icon">${pct >= 70 ? '🎉' : '💪'}</div>
        <h2 class="complete-title">${pct >= 70 ? 'Great work!' : 'Keep practising!'}</h2>
        ${state.mode === 'quiz'
          ? `<p class="complete-stat">You scored <strong>${state.quizScore} / ${state.quizTotal}</strong> (${pct}%)</p>`
          : `<p class="complete-stat">You marked <strong>${known}</strong> of ${total} words as known</p>`}
        <div class="complete-actions">
          <button class="btn-restart" onclick="VocabApp.restart()">Restart deck</button>
          <button class="btn-switch" onclick="VocabApp.switchMode()">Try ${state.mode === 'flashcard' ? 'Quiz' : 'Flashcard'} mode</button>
        </div>
      </div>`;
  }

  // ── PROGRESS BAR ──
  function updateProgress() {
    const total = state.deck.length;
    const pct   = total ? Math.round((state.index / total) * 100) : 0;
    const el    = document.getElementById('progress-bar');
    const lbl   = document.getElementById('progress-label');
    if (el)  el.style.width = pct + '%';
    if (lbl) lbl.textContent = `${state.index} / ${total}`;
  }

  // ── UPDATE FILTER COUNTS ──
  function updateCounts() {
    VOCAB_DATA.forEach(t => {
      const el = document.getElementById('count-' + t.id);
      if (el) el.textContent = t.words.length;
    });
  }

  // ── PUBLIC API ──
  function init() {
    buildDeck();
    renderCard();
    updateCounts();
    renderStats();
  }

  function setMode(m) {
    state.mode = m;
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.toggle('active', b.dataset.mode === m));
    buildDeck();
    renderCard();
  }

  function setFilterTopic(id) {
    state.filterTopic = id;
    document.querySelectorAll('.topic-filter-btn').forEach(b => b.classList.toggle('active', b.dataset.id === id));
    buildDeck();
    renderCard();
  }

  function setFilterBand(band) {
    state.filterBand = band;
    document.querySelectorAll('.band-filter-btn').forEach(b => b.classList.toggle('active', b.dataset.band === band));
    buildDeck();
    renderCard();
  }

  function flip() {
    state.flipped = !state.flipped;
    const card = document.getElementById('flashcard');
    if (card) card.classList.toggle('flipped', state.flipped);
    const actions = document.querySelector('.card-actions');
    if (actions) actions.classList.toggle('visible', state.flipped);
  }

  function markKnown() {
    const w = state.deck[state.index];
    if (!w) return;
    state.known.add(w.word);
    state.learning.delete(w.word);
    renderStats();
    next();
  }

  function markLearning() {
    const w = state.deck[state.index];
    if (!w) return;
    state.learning.add(w.word);
    state.known.delete(w.word);
    renderStats();
    next();
  }

  function next() {
    state.index++;
    state.flipped = false;
    state.answered = false;
    renderCard();
  }

  function restart() {
    state.known.clear();
    state.learning.clear();
    buildDeck();
    renderCard();
    renderStats();
  }

  function switchMode() {
    setMode(state.mode === 'flashcard' ? 'quiz' : 'flashcard');
  }

  function renderStats() {
    const el = document.getElementById('stats-known');
    const el2 = document.getElementById('stats-learning');
    if (el)  el.textContent  = state.known.size;
    if (el2) el2.textContent = state.learning.size;
  }

  return { init, setMode, setFilterTopic, setFilterBand, flip, markKnown, markLearning, next, restart, switchMode, answerQuiz };
})();
