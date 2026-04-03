# The Personality Hoard

A modular personality quiz hub, hosted on GitHub Pages.

## Structure

```
index.html                    ← Hub / landing page
dragon_person_01/
  index.html                  ← Dragon quiz (questions)
  result.html                 ← Dragon result with HSV color blend
  dragon.png                  ← YOUR dragon template image (add this!)
```

## Adding Your Dragon Image

Drop `dragon.png` into the `dragon_person_01/` folder.

**Requirements for best results:**
- PNG with transparency (alpha channel)
- Ideally a grayscale or neutral-colored dragon so the HSV hue shift reads cleanly
- Any size works — the canvas will match the image dimensions

The color engine will:
1. Find all pixels with alpha > 50 (out of 255)
2. Convert each pixel to HSV
3. Replace the Hue and Saturation with the chosen color's H+S
4. Keep the original Value (brightness/darkness), preserving shadows and highlights
5. Convert back to RGB

This means the dragon's shading, depth, and detail all survive — only the color changes.

## Adding More Quiz Questions

In `dragon_person_01/index.html`, add entries to the `QUESTIONS` array:

```js
const QUESTIONS = [
  {
    key: 'color',
    text: 'What color calls to you?',
    options: [ ... ]
  },
  {
    key: 'habitat',
    text: 'Where does your dragon dwell?',
    options: [ ... ]
  }
];
```

All answers are stored in a single cookie as JSON.

## Adding More Quizzes to the Hub

In `index.html`, add entries to the `quizzes` array:

```js
const quizzes = [
  {
    id: 'dragon_person_01',
    title: 'What Dragon Are You?',
    desc: 'Let your scales be revealed.',
    icon: '🐉',
    folder: 'dragon_person_01'
  },
  // add more here
];
```

Each quiz folder should follow the same `index.html` / `result.html` pattern
and set its own `quiz_<id>_done` and `quiz_<id>_answers` cookies.