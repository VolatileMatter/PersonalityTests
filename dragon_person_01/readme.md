# dragon_person_01 — What Dragon Are You?

A modular personality quiz that procedurally generates a unique dragon image based on the user's answers. Each answer contributes to a different visual layer, a description line, and/or a seed value for the procgen system.

---

## File Structure

```
dragon_person_01/
├── index.html          # Quiz orchestrator — loads questions, drives flow
├── result.html         # Compositing pipeline — renders the final dragon
├── README.md           # This file
├── questions/
│   ├── q1_location.js  # Where would you live? → sets dragon file
│   ├── q2_color.js     # What color? → sets base color hex
│   ├── q3_eye.js       # Personality → sets eye style
│   ├── q4_activity.js  # Activity → sets body pattern type
│   └── q5_personality.js # Which is you? → sets pattern seed modifier
└── base/
    ├── lines/          # Lineart PNGs (one per dragon species)
    ├── clipping/       # Clipping/base PNGs (one per dragon species, same filenames)
    └── extra/
        └── EYEBALL.png # The eye overlay — must be same dimensions as dragon PNGs,
                        # positioned at canvas origin (top-left), alpha defines eye shape
```

The quiz also depends on `../shared.css` (one folder up, in the repo root).

---

## How the Compositing Pipeline Works

`result.html` builds the final dragon image in strict layer order:

```
1. BASE     clipping/<dragon>.png  flat-recolored to chosen hex
2. PATTERN  black procgen shapes,  masked to clipping alpha
3. EYE      EYEBALL.png art,       masked to EYEBALL.png alpha   ← ALWAYS LAST before lineart
4. LINEART  lines/<dragon>.png,    recolored per-pixel by sampling layers 1–3 beneath
```

**Lineart recolor logic:** For each visible lineart pixel, the code reads whatever color is beneath it (from layers 1–3 combined). It then takes that color's HSV, boosts Saturation by +0.4 and crushes Value by −0.55, producing a darker and more saturated version of the underlying color. If there is nothing beneath a lineart pixel, it becomes pure black.

**The eye is always the last layer added before lineart.** Any new question layers you add must go between `PATTERN` and `EYE` in `result.html`.

---

## How Seeds Work

Each visual layer uses its own independent seed, derived from specific answer keys. Same answers in the same order always produce the same dragon.

| Layer      | Seed inputs                        | What it controls                  |
|------------|------------------------------------|-----------------------------------|
| Eye art    | `dragon` + `eyeStyle`              | Eye pattern shape and variation   |
| Body pattern | `dragon` + `color` + `seedMod`  | Body pattern position and layout  |

Seeds are computed using `mulberry32`, a fast deterministic PRNG. The hash function `strHash` converts string answers to numbers. The seeds are XORed together so each combination of answers produces a unique value.

---

## Adding a New Question

### Step 1 — Create the question file

Create `questions/q6_yourquestion.js`. The file must export two things:

```js
export const meta = {
  id:     'yourquestion',   // unique string, used as cookie key namespace
  prompt: 'Your question text here?',
};

export function render(container, onAnswer) {
  // Build whatever UI you want and append it to `container`.
  // When the user picks an answer, call onAnswer(payload).
  // payload must be a plain object. Include a `description` key
  // for the result page text. Include any other keys your result
  // page logic needs.
}
```

### Step 2 — Define your payload shape

`onAnswer(payload)` merges everything in `payload` into the shared answers cookie. The only reserved key is `description` — it gets pulled out and added to the description list on the result page. Everything else is stored as-is.

```js
onAnswer({
  myKey:       'someValue',   // accessible as answers.myKey in result.html
  description: 'You are a dragon who...',  // shown on result page
});
```

### Step 3 — Register the question in index.html

Open `index.html` and find the `QUESTION_MODULES` array near the top of the `<script type="module">` block:

```js
const QUESTION_MODULES = [
  './questions/q1_location.js',
  './questions/q2_color.js',
  './questions/q3_eye.js',
  './questions/q4_activity.js',
  './questions/q5_personality.js',
  './questions/q6_yourquestion.js',  // ← add here
];
```

The questions run in array order. Progress bar and question numbering update automatically.

### Step 4 — Use the answer in result.html (if needed for visuals)

If your question affects the rendered dragon (adds a new layer, changes a seed, etc.), open `result.html` and:

1. Read your answer from the `answers` object: `const myVal = answers.myKey;`
2. Add your rendering code **after the PATTERN layer and before the EYE layer** in the compositing pipeline.

The pipeline section is clearly commented in `result.html`:

```
// ── A: Base ──
// ── B: Body pattern ──
// ←── INSERT NEW LAYERS HERE ──
// ── C: (eye comes after this comment) ──
// ── D: Eye layer — LAST thing before lineart ──
// ── E: Lineart ──
// ── FINAL composite ──
```

---

## Question Module Template

Copy this as a starting point:

```js
// questions/q6_example.js

export const meta = {
  id:     'example',
  prompt: 'Which of these is you?',
};

const OPTIONS = [
  {
    value:       'option_a',
    label:       'Option A',
    sub:         'A brief description',
    myLayerKey:  'value_that_result_uses',
    description: 'You are a dragon who chose A.',
  },
  // ... more options
];

export function render(container, onAnswer) {
  // Optional: inject scoped styles
  const style = document.createElement('style');
  style.textContent = `
    .ex-list { display: flex; flex-direction: column; gap: 0.5rem; }
    .ex-card  { padding: 0.85rem 1.2rem; display: flex; align-items: flex-start; gap: 0.9rem; }
    .ex-key   { font-family: 'Cinzel Decorative', serif; font-size: 0.58rem;
                color: var(--gold-dim); width: 1.4rem; text-align: right;
                padding-top: 0.2rem; transition: color 0.2s; }
    .ex-card.selected .ex-key { color: var(--gold); }
    .ex-label { font-size: 1rem; line-height: 1.35; }
    .ex-sub   { font-size: 0.76rem; color: var(--text-dim); font-style: italic; margin-top: 0.12rem; }
  `;
  container.appendChild(style);

  const list = document.createElement('div');
  list.className = 'ex-list';

  OPTIONS.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'choice-card ex-card';
    btn.innerHTML = `
      <span class="ex-key">${String.fromCharCode(65 + i)}</span>
      <span>
        <div class="ex-label">${opt.label}</div>
        <div class="ex-sub">${opt.sub}</div>
      </span>
    `;
    btn.addEventListener('click', () => {
      list.querySelectorAll('.ex-card').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      setTimeout(() => onAnswer({
        myLayerKey:  opt.myLayerKey,
        description: opt.description,
      }), 160);
    });
    list.appendChild(btn);
  });

  container.appendChild(list);
}
```

---

## shared.css Classes You Can Use

These are defined in `../shared.css` and available in all question files:

| Class          | Use                                      |
|----------------|------------------------------------------|
| `.choice-card` | Base card button style (hover, selected) |
| `.q-number`    | Small gold label above question text     |
| `.q-text`      | Large question heading                   |
| `.btn`         | Base button                              |
| `.btn--gold`   | Gold bordered button                     |
| `.btn--ghost`  | Muted ghost button                       |
| `.btn--teal`   | Teal bordered button                     |
| `.spinner`     | Animated loading spinner                 |

CSS variables available:

| Variable           | Value                        |
|--------------------|------------------------------|
| `--bg`             | `#000000`                    |
| `--surface`        | Dark card background         |
| `--border`         | Subtle border color          |
| `--border-bright`  | Slightly brighter border     |
| `--gold`           | `#c9a84c`                    |
| `--gold-dim`       | Muted gold                   |
| `--text`           | `#e8dcc8`                    |
| `--text-dim`       | Muted warm text              |
| `--teal`           | `#2a9d8f`                    |

---

## Hosting

The quiz uses `<script type="module">` for the question imports, which requires HTTP (not `file://`). For local testing:

```bash
# From the repo root:
python -m http.server 8000
# Then open http://localhost:8000/dragon_person_01/
```

For production, push to GitHub Pages normally. Module imports work fine over HTTPS.

The download button uses `canvas.toDataURL()`, which also requires HTTP (CORS restriction). It will silently fail on `file://` but work correctly once deployed.

---

## Dragon Files

Each dragon species needs two files with matching names:

- `base/clipping/<name>.png` — the filled silhouette, used as the base color layer and as the mask for the body pattern
- `base/lines/<name>.png` — the lineart, drawn on top of everything else

Both should be the same dimensions. Transparent pixels (alpha ≤ 50) are ignored by all recolor operations.

Currently registered species: `skywing`, `icewing`, `seawing`, `seawingb`, `rainwing`, `leafwing`, `mudwing`, `sandwing`, `hivewing`, `nightwing`, `silkwing`, `b`, `base`, `beta`, `betab`, `c`

To add a new species: drop the two PNGs into the right folders and add an entry to the `LOCATIONS` array in `q1_location.js` and the `DRAGON_INFO` object in `result.html`.

generate a dragon and then download it based on your personality. base from here:
https://www.deviantart.com/stash/212k9c6l1ltb
