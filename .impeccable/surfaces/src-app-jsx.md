---
version: 1
slug: "src-app-jsx"
primary_target: "src/App.jsx"
related_targets: ["src/styles.css"]
---

# What I want to say…

Mode: Experience. Mobile-first personal English letter for Shahlo, opened from a QR link. Exact user copy lives in src/content.js.

## Direction contract

THESIS: One physical print carries a sincere letter. The first screen contains only its large, clickable title; the next contains the three paragraphs and an optional Telegram reply.

OWN-WORLD: Muted rose surroundings, pale photographic paper, berry display ink and warm plum prose. Allura is the flowing display/credit face; Alegreya is the reading face; Figtree labels the reply action. Real supplied stickers float beside the paper.

STORY: Tap “What I want to say…” to open. Each paragraph finishes before the next begins. After the final paragraph, “Write your answer...” opens https://t.me/xusainov055. There is no affirmative/negative choice, evasive note or acceptance state.

FIRST VIEWPORT: A single centered paper, five edge stickers and one large title. The title is itself the accessible opening button. No descriptive copy, footnote, wordmark or separate intro CTA. The print grows into the letter using shared-element continuity.

FORM: The original print-development world came from seed5772d3d5, challenger signals-instruments-darkroom-safelight-bay. Subsequent explicit user revisions added flowing fonts, supplied stickers, stronger drift, a rose/berry palette and the two-state English letter. Preserve those revisions over the earlier amber/Uzbek versions.

FINISH: Current edits are handed over for the user's manual visual feedback; the user explicitly requested no automated tests or reviews. Asset provenance is retained with the existing material/sticker derivatives.

## Motion and reading

- Word masks preserve natural script shaping. Reveals start on first render and permanently shed their animation class when complete; no post-mount replay or paper-breathing loop.
- Paragraphs have up to2400ms of stagger; other text has up to1400ms. Actual final-word animation completion advances the sequence, rather than an approximate timeout.
- The footer appears only after the final paragraph. Its centered “From Terrorist” credit keeps its large user-selected size, right-side fingerprint heart and anchored transform-only float.
- Stickers travel on independent four-point paths,6–9seconds, paused offscreen or while the page is hidden. Mobile positions sit at the paper corners/top edge with reserved bottom room.
- View Transitions morph the shared letter scene; older browsers use a short ink-blur crossfade. Reduced motion completes the reading sequence immediately and stops loops.

Open decisions: final song, optional personal image/GIF, public hosting URL and printed QR. Audio starts with the opening gesture at40percent, loops, and has no in-page controls.
