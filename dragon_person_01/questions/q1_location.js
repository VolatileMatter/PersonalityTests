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
  prompt: 'You are given one free afternoon with nowhere to be. Where do you end up?',
};

const OPTIONS = [
  { file: 'skywing',   emoji: '🏔️',  label: 'Climbing something unnecessarily tall', sub: 'The view from the top is not the point. The climb is.',        description: 'You are a dragon of the high peaks, where the air is thin and the view is endless.' },
  { file: 'icewing',   emoji: '🧊',  label: 'Walking alone until you can\'t hear anything', sub: 'The silence is the destination.',                          description: 'You are a creature of ice and silence, most alive where others would freeze.' },
  { file: 'seawing',   emoji: '🌊',  label: 'Floating somewhere with no bottom in sight', sub: 'Depth is comforting, actually.',                            description: 'You belong to the open ocean, where the horizon is everything and the depths are yours.' },
  { file: 'seawingb',  emoji: '🦀',  label: 'Picking through rocks at low tide',         sub: 'There is always something strange if you look closely enough.',  description: 'You haunt the liminal edges, where the sea meets stone and strange things cling to rocks.' },
  { file: 'rainwing',  emoji: '☁️',  label: 'Lying on something high and watching clouds', sub: 'Not thinking. Just watching.',                              description: 'You drift above it all, in the soft country between the treetops and the stars.' },
  { file: 'leafwing',  emoji: '🌿',  label: 'Deep in a forest with bad cell service',    sub: 'The further in, the better.',                                 description: 'You are woven into the ancient forest, dark and wet and loud with life.' },
  { file: 'mudwing',   emoji: '🌾',  label: 'Sitting beside moving water, doing nothing', sub: 'Watching it go is the whole activity.',                      description: 'You are at home in the slow delta, where the river gives itself to the sea.' },
  { file: 'sandwing',  emoji: '🏜️',  label: 'Somewhere so hot everyone else has left',   sub: 'You like it when it thins out.',                              description: 'You were made for the desert — patient, warm, and harder than you look.' },
  { file: 'hivewing',  emoji: '🏙️',  label: 'In the loudest part of a city you don\'t know', sub: 'Strangers are interesting. You like the density.',        description: 'You thrive in the city\'s hum, among towers of glass and ten thousand strangers.' },
  { file: 'nightwing', emoji: '🌃',  label: 'Wandering alone after midnight',            sub: 'Cities are different when nobody\'s performing.',              description: 'You belong to the city after midnight, when the streets are yours and everything feels possible.' },
  { file: 'silkwing',  emoji: '🌸',  label: 'Somewhere meticulously beautiful',          sub: 'You like beauty that has been chosen and arranged.',           description: 'You flourish in curated wildness — beauty that has been tended and chosen.' },
  { file: 'b',         emoji: '🅿️',  label: 'Sitting in a parking lot for unclear reasons', sub: 'It is what it is. The lights are consistent.',             description: 'You call a parking lot home. It is what it is. The fluorescent lights have a certain honesty.' },
  { file: 'base',      emoji: '🏘️',  label: 'Home. Genuinely, completely, just home.',   sub: 'You like knowing your neighbors. You have opinions about bins.', description: 'You are a suburban dragon. You know your neighbors\' schedules. You have opinions about lawn care.' },
  { file: 'beta',      emoji: '🦷',  label: 'A waiting room. Inexplicably content.',     sub: 'Something will happen soon. You are fine with that.',          description: 'You dwell in liminal waiting. Something will happen soon. Probably.' },
  { file: 'betab',     emoji: '⛽',  label: 'A highway rest stop, three hours from anywhere', sub: 'Between places. That counts as a place.',                 description: 'You are a dragon of the in-between — always somewhere between where you were and where you\'re going.' },
  { file: 'c',         emoji: '📊',  label: 'In a conference room, alone, with the projector on', sub: 'The hum is calming. The coffee is wrong but fine.',   description: 'Conference Room B is your domain. The projector is your hoard. Nobody truly understands you.' },
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

  OPTIONS.forEach((opt, i) => {
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
      
      // Extensive console logging
      console.log(`📍 [q1_location.js] Answer selected:`);
      console.log(`   └─ Option index: ${i}`);
      console.log(`   └─ File: ${opt.file}`);
      console.log(`   └─ Label: "${opt.label}"`);
      console.log(`   └─ Sub: "${opt.sub}"`);
      console.log(`   └─ Emoji: ${opt.emoji}`);
      console.log(`   └─ Description: "${opt.description}"`);
      console.log(`📤 [q1_location.js] Payload being saved:`, {
        dragon: opt.file,
        description: opt.description,
      });
      
      setTimeout(() => onAnswer({
        dragon:      opt.file,
        description: opt.description,
      }), 160);
      
      console.log(`✅ [q1_location.js] Answer saved for question: location`);
    });
    grid.appendChild(btn);
  });

  container.appendChild(grid);
  console.log(`📍 [q1_location.js] Rendered ${OPTIONS.length} location options`);
}