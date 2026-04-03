// questions/q4_activity.js

export const meta = {
  id:     'activity',
  prompt: 'Which of these do you enjoy most?',
};

const OPTIONS = [
  { value: 'running',  patternType: 'stripes',  label: 'Running',           sub: 'The open road, the wind at your heels', description: 'You are built for motion — your markings streak like velocity itself.' },
  { value: 'climbing', patternType: 'dots',     label: 'Climbing',          sub: 'Rock and reach, summit in sight',       description: 'Your scales are speckled like lichen on stone, worn smooth by handholds.' },
  { value: 'basking',  patternType: 'blobs',    label: 'Basking in the sun', sub: 'Still, warm, gloriously unhurried',    description: 'Your markings spread like afternoon light — warm, unhurried, without edges.' },
  { value: 'dancing',  patternType: 'sharp',    label: 'Dancing',           sub: 'Sharp edges, sudden turns',             description: 'Your patterns cut like choreography — all angles and sudden redirections.' },
  { value: 'singing',  patternType: 'twisting', label: 'Singing',           sub: 'A long note unfurling in the air',      description: 'Your markings twist like sound made visible, rising and curling.' },
  { value: 'surfing',  patternType: 'waves',    label: 'Surfing / Skating', sub: 'Ride the rhythm of the world',          description: 'You carry the rhythm on your scales — wave after wave, going somewhere.' },
  { value: 'sleeping', patternType: 'softblur', label: 'Sleeping',          sub: 'Soft, deep, blissfully formless',       description: 'Your markings blur at the edges like something half-remembered from a dream.' },
];

export function render(container, onAnswer) {
  const style = document.createElement('style');
  style.textContent = `
    .activity-list { display: flex; flex-direction: column; gap: 0.5rem; }
    .activity-card {
      padding: 0.85rem 1.2rem;
      display: flex; align-items: flex-start; gap: 0.9rem;
    }
    .act-key {
      font-family: 'Cinzel Decorative', serif; font-size: 0.58rem;
      color: var(--gold-dim); letter-spacing: 0.1em; flex-shrink: 0;
      width: 1.4rem; text-align: right; padding-top: 0.2rem;
      transition: color 0.2s;
    }
    .activity-card.selected .act-key { color: var(--gold); }
    .act-label { font-size: 1rem; line-height: 1.35; }
    .act-sub   { font-size: 0.76rem; color: var(--text-dim); font-style: italic; margin-top: 0.12rem; }
  `;
  container.appendChild(style);

  const list = document.createElement('div');
  list.className = 'activity-list';

  OPTIONS.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'choice-card activity-card';
    btn.innerHTML = `
      <span class="act-key">${String.fromCharCode(65 + i)}</span>
      <span>
        <div class="act-label">${opt.label}</div>
        <div class="act-sub">${opt.sub}</div>
      </span>
    `;
    btn.addEventListener('click', () => {
      list.querySelectorAll('.activity-card').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      setTimeout(() => onAnswer({
        activity:    opt.value,
        patternType: opt.patternType,
        description: opt.description,
      }), 160);
    });
    list.appendChild(btn);
  });

  container.appendChild(list);
}
