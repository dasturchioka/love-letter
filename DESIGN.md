---
name: "What I want to say…"
description: "A rose-toned photographic print with flowing berry handwriting and readable English prose."
colors:
  room: "#b88185"
  ink: "#482f3a"
  paper: "#f5e7df"
  muted-ink: "#664955"
  room-ink: "#3d2330"
  focus: "#fff7ef"
  display-ink: "#763b54"
  accent: "#975a6e"
  action: "#73394f"
  action-hover: "#562538"
  action-active: "#431b2b"
  rule: "#bd8f9b"
typography:
  display:
    fontFamily: "Allura, cursive"
    fontSize: "clamp(72px, 7.5vw, 96px)"
    fontWeight: 400
    lineHeight: 1.16
    letterSpacing: "-0.015em"
  display-mobile:
    fontFamily: "Allura, cursive"
    fontSize: "clamp(58px, 17.5vw, 82px)"
    fontWeight: 400
    lineHeight: 1.16
  developed-display:
    fontFamily: "Allura, cursive"
    fontSize: "clamp(50px, 13.6vw, 76px)"
    fontWeight: 400
    lineHeight: 1.16
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Alegreya, Georgia, serif"
    fontSize: "20px"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "0.005em"
  body-mobile:
    fontFamily: "Alegreya, Georgia, serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.7
  closing:
    fontFamily: "Alegreya, Georgia, serif"
    fontSize: "22px"
    fontWeight: 400
    lineHeight: 1.6
  signature:
    fontFamily: "Allura, cursive"
    fontSize: "clamp(70px, 14vw, 92px)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.01em"
  label:
    fontFamily: "Figtree, sans-serif"
    fontSize: "16px"
    fontWeight: 600
rounded:
  print: "0px"
  button: "6px"
spacing:
  action-gap: "12px"
  paragraph: "26px"
  paragraph-mobile: "24px"
  footer: "38px"
components:
  opening-title:
    textColor: "{colors.display-ink}"
    typography: "{typography.display}"
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "{colors.focus}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: "17px 25px"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
  button-primary-active:
    backgroundColor: "{colors.action-active}"
  print:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.print}"
    padding: "38px 56px 32px"
  signature:
    textColor: "{colors.accent}"
    typography: "{typography.signature}"
---

# Design System: What I want to say…

## Visual world

A physical letter with photographic fibers, scanned working edges and five real uploaded stickers. The user's colorize revision gives the room a muted rose field, the paper a pale blush base, the display text berry ink and the prose warm plum. Route story and exact copy are owned by PRODUCT.md and the surface brief, not this global record.

## Color roles

The frontmatter matches CSS semantic tokens. `display-ink` carries expressive lettering, `ink` the opening paragraph, `muted-ink` subsequent prose, `action` the single solid reply action and its explicit hover/active states. `accent` is the large sender credit; `rule` is the footer divider. Focus, selection, browser theme, favicon and scrollbar use the same palette.

The source paper tile is blended with `luminosity` over the current paper token, retaining real fibers without stretching them. Its scanned edge remains a separate border-image. No gradient lettering, procedural grain or synthetic torn contour.

## Typography

**Three purposeful roles:** self-hosted Allura400 for expression, Alegreya400 regular/italic for reading, and Figtree400/600 for compact controls/notices. Font synthesis is disabled. The final paragraph is italic and slightly larger; other paragraphs remain regular, left-aligned prose. Whole-word shaping preserves the script's connections throughout the stepped reveal mask.

The print and scene cap at640px. Desktop interior padding is38px56px32px; mobile is30px25px76px, with the bottom space reserved for corner stickers. Paragraph separation is26pxdesktop/24pxmobile. The only visible opening content is the large title, implemented as an accessible, keyboard-activatable button.

## Material and depth

`/media/print-fiber.webp` is a clean, mirrored600px photographic tile displayed at450pxsquare. `/media/print-paper.webp` supplies the3px scanned edge. Both come from Internet Archive Book Images'1902 blank paper scan; adjacentJSON files retain origin and processing. The sole paper shadow is `6px 18px 44px #4a243038`.

Sticker derivatives under `/stickers/` retain the user's bow, sparkles, flower and two heart designs. Their original PNG uploads remain at the root. Decorative images are pointer-transparent and excluded from reading order.

## Motion

- **Text:** stepped word masks and450ms opacity, plus550ms/2px focus for display lettering. Other text caps stagger at1400ms; prose at2400ms. Animation completion removes the active class, preventing replay after mounting or rerendering.
- **Pacing:** the final word's completion begins the next paragraph; the reply footer waits for all three. No arbitrary sequence timers.
- **Continuity:** one `love-letter` view-transition region,600ms geometry,220ms exit,550ms entry after90ms. Unsupported browsers use180ms ink-blur exit; stage content enters over650ms.
- **Paper:** one850ms entrance; no perpetual paper or text displacement.
- **Stickers:** independent four-point translate/rotate paths,6–9seconds, with smaller mobile artwork anchored near the print's corners/top edge. Loops pause when offscreen or the document is hidden.
- **Credit:** fixed in document flow, centered with58px top margin. Its signature gently floats over5.8seconds, and the right-side fingerprint heart over4.8seconds. Heart width is42pxdesktop/36pxmobile.
- **Controls:** solid56px reply action with180–250ms color/icon feedback and a restrained hover/press transform. The title's opening control has no surrounding button chrome.
- **Reduced motion:** completed text, immediate state changes, static decorations and no loops. Accessible strings remain available during visual reveals.

## Current scope

English-only, two-state letter. No yes/no buttons, changing evasive notes, acceptance screen, reread control, wordmark, music control or preview-settings UI. The reply action is an ordinary HTTPS link to the configured Telegram profile. Background audio is gesture-started, fixed at40percent, with no visible controls.

The user supplies manual visual feedback. This record describes the edited source; it does not claim a new test or review verdict.
