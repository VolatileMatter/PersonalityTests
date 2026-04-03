// questions/q1_location.js
// Self-contained question module.
// Contract: export { meta, render }
//   meta.id        — unique string key for this question
//   meta.prompt    — question text shown to user
//   render(el, cb) — builds UI into el, calls cb(payload) on answer
//   payload        — plain object saved to answers cookie
//     Required keys: description (string, second person)
//     Plus any question-specific keys the result page needs

export const meta = {
  id:     'location',
  prompt: 'Where would you most want to live?',
};

const OPTIONS = [
  { file: 'skywing',   emoji: '🏔️',  label: 'Mountain Peak',              sub: 'Wind-scraped stone, thin cold air',           description: 'You are a dragon of the high peaks, where the air is thin and the view is endless.' },
  { file: 'icewing',   emoji: '🧊',  label: 'Arctic Tundra',               sub: 'Silence and permafrost and pale sky',          description: 'You are a creature of ice and silence, most alive where others would freeze.' },
  { file: 'seawing',   emoji: '🌊',  label: 'Open Ocean',                  sub: 'Horizon in every direction',                   description: 'You belong to the open ocean, where the horizon is everything and the depths are yours.' },
  { file: 'seawingb',  emoji: '🦀',  label: 'Coastal Tide Pools',          sub: 'The place where sea meets stone',              description: 'You haunt the liminal edges, where the sea meets stone and strange things cling to rocks.' },
  { file: 'rainwing',  emoji: '☁️',  label: 'Cloud Canopy',                sub: 'Above the trees, below the stars',             description: 'You drift above it all, in the soft country between the treetops and the stars.' },
  { file: 'leafwing',  emoji: '🌿',  label: 'Ancient Rainforest',          sub: 'Dark, wet, alive with sound',                  description: 'You are woven into the ancient forest, dark and wet and loud with life.' },
  { file: 'mudwing',   emoji: '🌾',  label: 'River Delta',                 sub: 'Slow water, reed beds, damp earth',            description: 'You are at home in the slow delta, where the river gives itself to the sea.' },
  { file: 'sandwing',  emoji: '🏜️',  label: 'Desert Wastes',               sub: 'Heat shimmer and endless dunes',               description: 'You were made for the desert — patient, warm, and harder than you look.' },
  { file: 'hivewing',  emoji: '🏙️',  label: 'Neon City',                   sub: 'Towers of glass and humming cables',           description: 'You thrive in the city\'s hum, among towers of glass and ten thousand strangers.' },
  { file: 'nightwing', emoji: '🌃',  label: 'City at 3am',                 sub: 'Empty streets, orange lamplight',              description: 'You belong to the city after midnight, when the streets are yours and everything feels possible.' },
  { file: 'silkwing',  emoji: '🌸',  label: 'Botanical Garden',            sub: 'Humid glass house, ordered wildness',          description: 'You flourish in curated wildness — beauty that has been tended and chosen.' },
  { file: 'b',         emoji: '🅿️',  label: 'A Parking Lot',               sub: 'Fluorescent lights. Faded lines.',             description: 'You call a parking lot home. It is what it is. The fluorescent lights have a certain honesty.' },
  { file: 'base',      emoji: '🏘️',  label: 'The Suburbs',                 sub: 'Sprinklers at 6am. Someone mowing.',           description: 'You are a suburban dragon. You know your neighbors\' schedules. You have opinions about lawn care.' },
  { file: 'beta',      emoji: '🦷',  label: "Dentist's Waiting Room",      sub: 'Old magazines. Soft jazz.',                    description: 'You dwell in liminal waiting. Something will happen soon. Probably.' },
  { file: 'betab',     emoji: '⛽',  label: 'Highway Rest Stop',           sub: 'Vending machine hum. Broken soap dispenser.',  description: 'You are a dragon of the in-between — always somewhere between where you were and where you\'re going.' },
  { file: 'c',         emoji: '📊',  label: 'Conference Room B',           sub: 'Wrong aspect ratio. Lukewarm coffee.',         description: 'Conference Room B is your domain. The projector is your hoard. Nobody truly understands you.' },
];

export function render(container, onAnswer) {
  const style = document.createElement('style');
  style.textContent = `
    .loc-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 0.65rem;
    }
    .loc-card {
      padding: 1rem 1.1rem;
      display: flex; flex-direction: column;
      align-items: flex-start; gap: 0.2rem;
      text-align: left;
    }
    .loc-emoji { font-size: 1.7rem; margin-bottom: 0.2rem; line-height: 1; }
    .loc-name  {
      font-family: 'Cinzel Decorative', serif;
      font-size: 0.6rem; color: var(--gold-dim);
      letter-spacing: 0.06em; line-height: 1.4;
    }
    .loc-sub   { font-size: 0.78rem; color: var(--text-dim); font-style: italic; }
    .loc-card.selected .loc-name { color: var(--gold); }
  `;
  container.appendChild(style);

  const grid = document.createElement('div');
  grid.className = 'loc-grid';

  OPTIONS.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'choice-card loc-card';
    btn.innerHTML = `
      <div class="loc-emoji">${opt.emoji}</div>
      <div class="loc-name">${opt.label}</div>
      <div class="loc-sub">${opt.sub}</div>
    `;
    btn.addEventListener('click', () => {
      grid.querySelectorAll('.loc-card').forEach(c => c.classList.remove('selected'));
      btn.classList.add('selected');
      setTimeout(() => onAnswer({
        dragon:      opt.file,
        description: opt.description,
      }), 160);
    });
    grid.appendChild(btn);
  });

  container.appendChild(grid);
}
