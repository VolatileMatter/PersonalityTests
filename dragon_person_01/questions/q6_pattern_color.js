// questions/q6_pattern_color.js

export const meta = {
  id:     'patternColor',
  prompt: 'You find a door you have never noticed before. What color is it?',
};

// patternColorHex is used in result.html to tint the body pattern layer
const OPTIONS = [
  { value: 'red',     hex: '#cc2020', label: 'Arterial red',        sub: 'It pulses faintly. You are unsurprised.',               description: 'Your markings carry the red of something vital — urgent and unmistakable.' },
  { value: 'orange',  hex: '#e06010', label: 'Rusted orange',        sub: 'Flaking paint. Something old lives here.',              description: 'Your patterns burn orange — the color of embers that outlast the fire.' },
  { value: 'yellow',  hex: '#d4b800', label: 'Caution yellow',       sub: 'Bright. Unavoidable. Unapologetic.',                    description: 'Your markings are the yellow of warning signs — bright enough to be impossible to ignore.' },
  { value: 'green',   hex: '#2a8a3a', label: 'Overgrown green',      sub: 'Moss has claimed the hinges.',                          description: 'Your patterns are the deep green of things that grow without being tended.' },
  { value: 'blue',    hex: '#1a4fa0', label: 'Deep-water blue',      sub: 'Heavy. Cold. Older than memory.',                       description: 'Your markings run the blue of fathomless water — calm above, crushing below.' },
  { value: 'purple',  hex: '#6b3fa0', label: 'Bruised purple',       sub: 'You cannot tell if it is open or closed.',              description: 'Your patterns are purple — the color of secrets kept not out of malice, but patience.' },
  { value: 'pink',    hex: '#d04080', label: 'Embarrassingly pink',  sub: 'Loud. Cheerful. Zero shame about it.',                  description: 'Your markings are an unapologetic pink — soft in appearance, stubborn in practice.' },
  { value: 'black',   hex: '#111111', label: 'Absolute black',       sub: 'No handle visible. Yet somehow you know it opens.',     description: 'Your patterns are the black of space between stars — not absence, but depth.' },
  { value: 'white',   hex: '#e8e4dc', label: 'Hospital white',       sub: 'Clean. Too clean. Someone scrubbed it recently.',       description: 'Your markings are white — not blank, but deliberate, like a page that chose to stay empty.' },
  { value: 'cyan',    hex: '#00b4c8', label: 'Screaming cyan',       sub: 'It is definitely a door from the future.',              description: 'Your patterns flash cyan — electric, forward-thinking, and slightly unsettling to look at directly.' },
  { value: 'magenta', hex: '#b8008a', label: 'Inexplicable magenta', sub: 'No reason for it. It simply is.',                       description: 'Your markings are magenta — a color that should not exist and yet insists on it.' },
  { value: 'grey',    hex: '#788080', label: 'Weathered grey',       sub: 'It has seen things. It is not telling.',                description: 'Your patterns are grey — the color of things that have watched everything and kept their own counsel.' },
  { value: 'gold',    hex: '#c9a84c', label: 'Tarnished gold',       sub: 'Worth more than it looks. You can tell.',               description: 'Your markings carry old gold — not flashy, but the kind that survives centuries.' },
];

export function render(container, onAnswer) {
  const style = document.createElement('style');
  style.textContent = `
    .pcolor-list { display: flex; flex-direction: column; gap: 0.5rem; }
    .pcolor-card {
      padding: 0.85rem 1.2rem;
      display: flex; align-items: center; gap: 1rem;
    }
    .pcolor-swatch {
      width: 28px; height: 28px; border-radius: 3px; flex-shrink: 0;
      border: 1px solid rgba(255,255,255,0.12);
      box-shadow: 0 0 8px rgba(0,0,0,0.5);
    }
    .pcolor-key {
      font-family: 'Cinzel Decorative', serif; font-size: 0.58rem;
      color: var(--gold-dim); letter-spacing: 0.1em; flex-shrink: 0;
      width: 1.4rem; text-align: right; padding-top: 0.2rem;
      transition: color 0.2s;
    }
    .pcolor-card.selected .pcolor-key { color: var(--gold); }
    .pcolor-label { font-size: 1rem; line-height: 1.35; }
    .pcolor-sub   { font-size: 0.76rem; color: var(--text-dim); font-style: italic; margin-top: 0.12rem; }
  `;
  container.appendChild(style);

  const list = document.createElement('div');
  list.className = 'pcolor-list';

  OPTIONS.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'choice-card pcolor-card';
    btn.innerHTML = `
      <span class="pcolor-key">${String.fromCharCode(65 + i)}</span>
      <span class="pcolor-swatch" style="background:${opt.hex}"></span>
      <span>
        <div class="pcolor-label">${opt.label}</div>
        <div class="pcolor-sub">${opt.sub}</div>
      </span>
    `;
    btn.addEventListener('click', () => {
      list.querySelectorAll('.pcolor-card').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      setTimeout(() => onAnswer({
        patternColorValue: opt.value,
        patternColorHex:   opt.hex,
        description:       opt.description,
      }), 160);
    });
    list.appendChild(btn);
  });

  container.appendChild(list);
}
