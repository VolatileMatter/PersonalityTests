// questions/q6_pattern_color.js

export const meta = {
  id:     'patternColor',
  prompt: 'You find a door you have never noticed before. What color is it?',
};

// patternColorHex is used in result.html to tint the body pattern layer
const OPTIONS = [
  // Original colors
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
  
  // NEW COLORS (+10)
  { value: 'blood',   hex: '#8b0000', label: 'Dried blood',          sub: 'Old. Dark. It has a story it will not tell.',           description: 'Your patterns are the deep red of dried blood — ancient, powerful, and utterly without apology.' },
  { value: 'ember',   hex: '#ff4500', label: 'Live ember',           sub: 'Still glowing. Still dangerous.',                       description: 'Your markings glow like embers — not quite flame, but still hot enough to burn.' },
  { value: 'honey',   hex: '#daa520', label: 'Wild honey',           sub: 'Golden and slow. Worth the sting.',                     description: 'Your patterns shimmer like honey — sweet, golden, and guarded by something fierce.' },
  { value: 'fern',    hex: '#4f7942', label: 'Deep fern',            sub: 'The color of things that grow in shadow.',              description: 'Your markings are fern-green — the color of undergrowth where secrets hide and thrive.' },
  { value: 'indigo',  hex: '#4b0082', label: 'Midnight indigo',      sub: 'The hour when anything is possible.',                   description: 'Your patterns are indigo — the color between day and dream, where rules bend.' },
  { value: 'plum',    hex: '#8e4585', label: 'Bruised plum',         sub: 'Sweetness hiding damage. You understand.',              description: 'Your markings are plum-purple — soft on the outside, with something darker at the core.' },
  { value: 'blush',   hex: '#ff6b6b', label: 'Embarrassed blush',    sub: 'You are seen. You are not hiding.',                     description: 'Your patterns blush pink — the color of someone who feels things openly and without shame.' },
  { value: 'charcoal',hex: '#36454f', label: 'Warm charcoal',        sub: 'Dark, but not cold. There is heat here.',               description: 'Your markings are charcoal — dark and understated, with hidden warmth.' },
  { value: 'bone',    hex: '#e3dac9', label: 'Old bone',             sub: 'Pale. Patient. Waiting for the right moment.',          description: 'Your patterns are bone-white — patient, ancient, and full of stories.' },
  { value: 'aqua',    hex: '#00ffff', label: 'Electric aqua',        sub: 'Too bright to ignore. Too strange to forget.',          description: 'Your markings blaze aqua — the color of tropical shallows and impossible futures.' },
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
      
      // Extensive console logging
      console.log(`🚪 [q6_pattern_color.js] Answer selected:`);
      console.log(`   └─ Option index: ${i}`);
      console.log(`   └─ Value: ${opt.value}`);
      console.log(`   └─ Label: "${opt.label}"`);
      console.log(`   └─ Sub: "${opt.sub}"`);
      console.log(`   └─ Hex: ${opt.hex}`);
      console.log(`   └─ Description: "${opt.description}"`);
      console.log(`📤 [q6_pattern_color.js] Payload being saved:`, {
        patternColorValue: opt.value,
        patternColorHex: opt.hex,
        description: opt.description,
      });
      
      setTimeout(() => onAnswer({
        patternColorValue: opt.value,
        patternColorHex:   opt.hex,
        description:       opt.description,
      }), 160);
      
      console.log(`✅ [q6_pattern_color.js] Answer saved for question: patternColor`);
    });
    list.appendChild(btn);
  });

  container.appendChild(list);
  console.log(`🚪 [q6_pattern_color.js] Rendered ${OPTIONS.length} pattern color options`);
}