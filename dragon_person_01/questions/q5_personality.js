// questions/q5_personality.js

export const meta = {
  id:     'personality',
  prompt: 'Which of these is you?',
};

const OPTIONS = [
  { value: 'locked_in',    seedMod: 0, label: 'Locked in',                             sub: null,                                                  description: 'You are locked in. Whatever that means for you, it is absolute.' },
  { value: 'born_to_shit', seedMod: 1, label: 'Born to shit, forced to wipe',          sub: null,                                                  description: 'You did not ask for any of this. You are handling it anyway. That counts.' },
  { value: 'jester',       seedMod: 2, label: "The world's a stage and I'm the jester", sub: null,                                                 description: 'You have chosen the most honest role: the one who tells the truth through laughter.' },
  { value: 'lone_wolf',    seedMod: 3, label: 'Lone wolf',                              sub: 'Black fur. Bright red eyes. Silver claws. Super big fangs.', description: 'You walk alone. Very dramatically. With excellent claws.' },
  { value: 'captain',      seedMod: 4, label: 'Captain of this sinking ship',          sub: null,                                                  description: 'You did not cause the sinking. You are going down with it anyway, because that\'s who you are.' },
  { value: 'director',     seedMod: 5, label: 'Director of the shitshow',              sub: null,                                                  description: 'You are not responsible for the chaos. You are, however, the one making sure it runs on schedule.' },
];

export function render(container, onAnswer) {
  const style = document.createElement('style');
  style.textContent = `
    .personality-list { display: flex; flex-direction: column; gap: 0.5rem; }
    .personality-card {
      padding: 0.85rem 1.2rem;
      display: flex; align-items: flex-start; gap: 0.9rem;
    }
    .pers-key {
      font-family: 'Cinzel Decorative', serif; font-size: 0.58rem;
      color: var(--gold-dim); letter-spacing: 0.1em; flex-shrink: 0;
      width: 1.4rem; text-align: right; padding-top: 0.2rem;
      transition: color 0.2s;
    }
    .personality-card.selected .pers-key { color: var(--gold); }
    .pers-label { font-size: 1rem; line-height: 1.35; }
    .pers-sub   { font-size: 0.76rem; color: var(--text-dim); font-style: italic; margin-top: 0.12rem; }
  `;
  container.appendChild(style);

  const list = document.createElement('div');
  list.className = 'personality-list';

  OPTIONS.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'choice-card personality-card';
    btn.innerHTML = `
      <span class="pers-key">${String.fromCharCode(65 + i)}</span>
      <span>
        <div class="pers-label">${opt.label}</div>
        ${opt.sub ? `<div class="pers-sub">${opt.sub}</div>` : ''}
      </span>
    `;
    btn.addEventListener('click', () => {
      list.querySelectorAll('.personality-card').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      setTimeout(() => onAnswer({
        personality: opt.value,
        seedMod:     opt.seedMod,
        description: opt.description,
      }), 160);
    });
    list.appendChild(btn);
  });

  container.appendChild(list);
}
