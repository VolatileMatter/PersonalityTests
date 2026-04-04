// questions/q2_color.js

export const meta = {
  id:     'color',
  prompt: 'Someone describes you to a stranger. Which word do they reach for first?',
};

const OPTIONS = [
  // Original colors
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
  
  // NEW COLORS (+10)
  { value: 'scarlet',  label: 'Fierce',     sub: 'A fire that refuses to be tamed.',              hex: '#ff2400', description: 'Scarlet runs through your veins — bright, unapologetic, and impossible to ignore.' },
  { value: 'mahogany', label: 'Grounded',   sub: 'Solid. Dependable. Carved from something real.', hex: '#6b3a2a', description: 'Your scales are mahogany — dark, rich, and built to last through centuries.' },
  { value: 'jade',     label: 'Lucky',      sub: 'Not by accident. You make your own fortune.',    hex: '#00a86b', description: 'Jade-green and smooth — you carry luck with you, though you\'d never admit it.' },
  { value: 'sapphire', label: 'Loyal',      sub: 'A rare kind of blue. The staying kind.',         hex: '#0f52ba', description: 'Sapphire scales gleam on you — loyal, true, and utterly dependable.' },
  { value: 'lavender', label: 'Unusual',    sub: 'Soft, but not weak. There is strength here.',    hex: '#b57edc', description: 'Lavender marks you as different — gentle in appearance, fierce in conviction.' },
  { value: 'obsidian', label: 'Sharp',      sub: 'Cutting. Direct. No wasted motion.',             hex: '#141418', description: 'Obsidian-black and volcanic — you have a sharp edge that people learn to respect.' },
  { value: 'pearl',    label: 'Rare',       sub: 'Something that took time to form.',              hex: '#f0ebe5', description: 'Pearl-white and luminous — you are the result of patience and pressure.' },
  { value: 'brass',    label: 'Bold',       sub: 'Loud, confident, and exactly where you belong.', hex: '#b5a642', description: 'Your scales shine like brass — bold, brassy, and utterly confident.' },
  { value: 'rust',     label: 'Survivor',   sub: 'You have been through things. You are still here.', hex: '#9b3719', description: 'Rust-colored and weathered — you carry the marks of survival with pride.' },
  { value: 'glacier',  label: 'Cold',       sub: 'Not cruel. Just focused. There is a difference.', hex: '#64b4c8', description: 'Glacier-blue and ancient — you move slowly, deliberately, and nothing stops you.' },
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

  OPTIONS.forEach((opt, idx) => {
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
      
      // Extensive console logging
      console.log(`🎨 [q2_color.js] Answer selected:`);
      console.log(`   └─ Option index: ${idx}`);
      console.log(`   └─ Value: ${opt.value}`);
      console.log(`   └─ Label: "${opt.label}"`);
      console.log(`   └─ Sub: "${opt.sub}"`);
      console.log(`   └─ Hex: ${opt.hex}`);
      console.log(`   └─ Description: "${opt.description}"`);
      console.log(`📤 [q2_color.js] Payload being saved:`, {
        color: opt.value,
        colorHex: opt.hex,
        description: opt.description,
      });
      
      setTimeout(() => onAnswer({
        color:       opt.value,
        colorHex:    opt.hex,
        description: opt.description,
      }), 160);
      
      console.log(`✅ [q2_color.js] Answer saved for question: color`);
    });
    grid.appendChild(btn);
  });

  container.appendChild(grid);
  console.log(`🎨 [q2_color.js] Rendered ${OPTIONS.length} color options`);
}