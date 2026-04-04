// questions/q2_color.js

export const meta = {
  id:     'color',
  prompt: 'Someone describes you to a stranger. Which word do they reach for first?',
};

const OPTIONS = [
  { value: 'crimson',  label: 'Intense',    sub: 'People feel it before they can explain it',   hex: '#cc2200', description: 'Your scales burn crimson — you are felt before you are seen.' },
  { value: 'gold',     label: 'Warm',       sub: 'Not in a soft way. In a way that lasts.',      hex: '#c9a84c', description: 'You wear the color of old treasure — warm, unhurried, and worth finding.' },
  { value: 'cobalt',   label: 'Deep',       sub: 'They mean it as a compliment. Mostly.',        hex: '#1a4fa0', description: 'Cobalt runs through you — deep water, ink, the hour before dawn.' },
  { value: 'emerald',  label: 'Wild',       sub: 'Not reckless. Something older than that.',     hex: '#1a7a45', description: 'You are the green of old growth — a color that takes centuries to earn.' },
  { value: 'amethyst', label: 'Strange',    sub: 'They say it with admiration, if you\'re lucky.', hex: '#6b3fa0', description: 'You shimmer with amethyst — there is always something you know that you aren\'t saying.' },
  { value: 'ivory',    label: 'Quiet',      sub: 'Doesn\'t mean calm. Means deliberate.',        hex: '#e8dcc8', description: 'Ivory and bone — clean as a fresh start, quiet as snow.' },
  { value: 'copper',   label: 'Honest',     sub: 'Worn down to the true thing.',                 hex: '#b87333', description: 'You carry copper\'s warmth — old, honest, and more valuable than people remember.' },
  { value: 'rose',     label: 'Gentle',     sub: 'They underestimate you. You allow it.',        hex: '#c05080', description: 'Rose-scaled and deceptively soft — people forget that thorns come with flowers.' },
  { value: 'teal',     label: 'Difficult to place', sub: 'Neither one thing nor the other. Both.',  hex: '#2a9d8f', description: 'You are teal — the color of shallow tropical water, neither fully green nor fully blue.' },
  { value: 'silver',   label: 'Precise',    sub: 'Somewhat uncomfortable to look at directly.',  hex: '#9ab0c0', description: 'Silver-scaled: precise, reflective, and difficult to look at directly in strong light.' },
  { value: 'ochre',    label: 'Ancient',    sub: 'Something about you predates the conversation.', hex: '#c8860a', description: 'Ochre is the oldest color humans ever painted with. You are that kind of ancient.' },
];

export function render(container, onAnswer) {
  const style = document.createElement('style');
  style.textContent = `
    .color-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(148px, 1fr));
      gap: 0.65rem;
    }
    .color-card {
      padding: 0.85rem 1rem;
      display: flex; align-items: center; gap: 0.7rem;
    }
    .color-swatch {
      width: 24px; height: 24px; border-radius: 50%; flex-shrink: 0;
      border: 2px solid rgba(255,255,255,0.1);
    }
    .color-label { font-size: 0.95rem; line-height: 1.2; }
    .color-sub   { font-size: 0.72rem; color: var(--text-dim); font-style: italic; }
  `;
  container.appendChild(style);

  const grid = document.createElement('div');
  grid.className = 'color-grid';

  OPTIONS.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'choice-card color-card';
    btn.innerHTML = `
      <span class="color-swatch" style="background:${opt.hex}"></span>
      <span>
        <div class="color-label">${opt.label}</div>
        <div class="color-sub">${opt.sub}</div>
      </span>
    `;
    btn.addEventListener('click', () => {
      grid.querySelectorAll('.color-card').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      setTimeout(() => onAnswer({
        color:       opt.value,
        colorHex:    opt.hex,
        description: opt.description,
      }), 160);
    });
    grid.appendChild(btn);
  });

  container.appendChild(grid);
}
