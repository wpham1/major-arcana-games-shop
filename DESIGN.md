---
# gstack: design-md-format=spec
name: Major Arcana Games
description: A collector's den under a midnight sky. Brand blue and marigold gold, cards framed like tarot, and Japanese set names worn proudly next to the English.
colors:
  night: "#0D1630"           # page ground: brand blue darkened
  night-raised: "#16224A"    # tiles, panels
  night-sunk: "#091024"      # inputs, photo wells
  brand-blue: "#264D97"      # feature bands and fills only, never text on night
  gold: "#F9BB59"            # brand gold: primary action, card frames, focus
  gold-hover: "#FFCB78"
  on-gold: "#222222"         # brand ink, text on gold
  star: "#F6F1E7"            # primary text
  star-muted: "#A9B4CF"      # secondary text
  jade: "#6FCB9A"            # in stock / success
  coral: "#FF8F70"           # low stock / error
  sky: "#9DB8F2"             # pre-order / info
typography:
  display:
    fontFamily: Shippori Mincho B1
    fontWeight: 800
    fontSize: clamp(2rem, 4.5vw, 3.25rem)
    letterSpacing: 0em
  heading:
    fontFamily: Shippori Mincho B1
    fontWeight: 700
    fontSize: 1.75rem
  body:
    fontFamily: Zen Kaku Gothic New
    fontSize: 1rem
    lineHeight: 1.6
  label:
    fontFamily: Zen Kaku Gothic New
    fontWeight: 500
    fontSize: 0.8125rem
    letterSpacing: 0em
  mono:
    fontFamily: JetBrains Mono
    fontWeight: 500
    fontFeature: tnum
rounded:
  sm: 3px
  md: 6px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 80px
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.on-gold}"
    rounded: "{rounded.md}"
  button-primary-hover:
    backgroundColor: "{colors.gold-hover}"
  button-secondary:
    textColor: "{colors.star}"
    borderColor: "rgba(249, 187, 89, 0.3)"
    rounded: "{rounded.md}"
  input:
    backgroundColor: "{colors.night-sunk}"
    borderColor: "rgba(246, 241, 231, 0.12)"
    rounded: "{rounded.sm}"
  card:
    backgroundColor: "{colors.night-raised}"
    borderColor: "rgba(249, 187, 89, 0.3)"
    rounded: "{rounded.md}"
    aspectRatio: 63 / 88
  nav-link:
    textColor: "{colors.star-muted}"
---

# Major Arcana Games

## Overview

**Creative North Star:** a collector's den, not a warehouse. Every box is presented like a drawn card: framed in gold, turned over to reveal what's inside, set against the midnight blue of the logo.
**Product context:** Australian online shop for Japanese trading card games (Pokémon, One Piece): sealed booster boxes, pre-orders and singles. Buyers are collectors and players who know set codes, track release dates, and need proof that a box is genuine Japanese product.
**Mode per surface:**
- Home: Persuade. The three-card release spread sells what's new and what's next.
- Catalogue, cart, checkout: Operate. Fast scanning, stock and price first.
- Product page: Read, then Operate. Specs, trust details, then one action.

**Reference sites:** [PokéBox AU](https://www.pokebox.com.au/), [GD Games](https://www.gdgames.com.au/collections/japanese-pokemon-tcg), [TCGroup AU](https://www.tcgroupau.com.au/), [Samurai Sword Tokyo](https://samuraiswordtokyo.com/pages/about). Research was search-only; no screenshots were taken. The category competes on trust (factory sealed, authentic, reliable pre-orders), not on visual identity, which leaves room to stand out.
**Key characteristics:**
- Product tiles in true trading-card proportion (63 × 88 mm) with a thin gold frame.
- Japanese set name above the English one, as proof of the real Japanese product.
- One gold action per screen; everything else recedes.
- Stock state on every tile: in stock, low, pre-order, sold out.

**Preview:** `design/preview.html`, live at https://claude.ai/artifact/GTM94a8iQ4khYhHozf5B1d

## Colors

**Strategy:** Committed. The brand blue owns the page: darkened to `night` for the ground, full strength for feature bands such as the home hero. Brand gold is the only action colour.
**Light or dark:** Dark. Collectors browse release news and pre-orders in the evening, mostly on phones, and box art reads strongest against a recessive ground. The white-text logo lockup (`branding/ma-full-lock-white-text.svg`) is drawn for this. A light theme is deliberately not offered: a warm paper ground with a serif and orange accent drifts into a generic look and away from the brand.

- `gold` signals "you can act here" (primary buttons, focus rings, the active nav underline) and frames cards at 30% opacity. Don't use it for body text or decoration elsewhere.
- `brand-blue` is a surface colour. It fails contrast as text on `night` (2.2:1). Text on a blue band uses `star`, never `star-muted` (3.9:1).
- Status colours are separate from the brand: `jade` in stock, `coral` low stock and errors, `sky` pre-order and info. Each status carries a shape as well as a colour (filled dot, hollow dot for sold out, diamond for pre-order) so it survives colour blindness.
- Contrast checked: `star` on `night` 15.9:1, `star-muted` on `night-raised` 7.4:1, `gold` on `night` 10.5:1, `on-gold` on `gold` 9.3:1.

## Typography

- **Shippori Mincho B1** (display, headings; 500/700/800). A Japanese Mincho with solid Latin, so `熱風のアリーナ` and "Heat Wave Arena" share one voice. It's calm next to the swash-heavy logo wordmark, which keeps the logo the most ornate thing on the page.
- **Zen Kaku Gothic New** (body, UI, labels; 400/500/700). A Japanese gothic for everything you read and operate: filters, cart, checkout, specs.
- **JetBrains Mono** (prices, set codes, quantities, dates; 400/500, `tabular-nums`). Set codes like `SV9a` and `OP-09` are how collectors search; prices line up in columns.

All three are OFL and served by Google Fonts. In Next.js, load them with `next/font/google` (the Japanese faces subset automatically). Scale: 13 / 16 / 20 / 28 / clamp(32–52) px. Headings use `text-wrap: balance`. Display type never exceeds 3.25rem.

## Layout

- Max content width 1200px, side gutter at least 16px (respecting safe-area insets).
- Catalogue: `repeat(auto-fill, minmax(220px, 1fr))`, two columns at ≤520px.
- Home hero: a brand-blue band holding a three-card spread (Just landed / Releasing next / Pre-orders open), read left to right in date order. On phones it becomes a horizontally swipeable row with scroll snap.
- Product page: card-framed photo left, info right; stacks at ≤760px.
- Section rhythm: 80px between major bands, 32px between a heading and its content.

## Elevation & Depth

Tiles sit on `night-raised` with a soft offset shadow (`0 10px 24px -14px rgba(0,0,0,.8)`) and a 1px inner highlight. Depth comes from offset and tint. No zero-offset glows, no frosted glass.

## Shapes

- Cards: outer radius `md` (6px) with an inner gold rule inset 5px at `sm` (3px), so the inner radius follows outer minus gap.
- Buttons `md`, inputs and chips `sm`. Status dots are the only circles.
- The logo's four-point sparkle (✦) is the one ornament: list bullets on trust copy, the info/pre-order notice glyph.

## Components

- **Product tile:** photo well (`night-sunk`; shows the set code in display type while a photo is missing), Japanese title, English title, price, stock state. Hover or keyboard focus turns the card over to the back: set code, box contents, language, stock or ship date, and the action. Touch devices don't flip; the code, contents and action sit on the front. With `prefers-reduced-motion`, the back cross-fades instead of rotating. Sold-out tiles dim the photo and title and swap the action for "Notify me". A missing Japanese title shows "Japanese title to come" rather than an empty line.
- **Buttons:** primary (gold), secondary (gold-faint outline), ghost (muted text), disabled (raised fill, muted text). The active state nudges down 1px. Labels name the outcome: "Add to cart · A$99.95", "Pre-order", "Notify me".
- **Inputs:** `night-sunk` fill. Focus shows a gold border plus a 3px gold-faint ring. Errors show a coral border plus a coral message that says how to fix it.
- **Notices:** a tinted background with a glyph (✓ jade, ✦ sky, ! gold, × coral). No coloured side borders.
- **Filters:** square-cornered chips; selected = gold border plus gold-faint fill, with `aria-pressed`.

## Do's and Don'ts

- Do show stock state and AUD price (incl. GST) on every product tile.
- Do show the Japanese product name when we have it, above the English.
- Do keep one gold primary action per view.
- Do give every tile, button and chip a visible `:focus-visible` gold outline.
- Do design the empty, sold-out, low-stock and missing-photo states.
- Don't put text in `brand-blue` on dark surfaces, or `star-muted` text on a blue band.
- Don't use rainbow holo or foil gradients, neon glows, or anime-style decoration. The box art supplies the colour.
- Don't add a coloured left border to cards or notices; signal state with tint, glyph and label.
- Don't use emoji as icons, or generic hype copy ("Unleash your collection").
- Don't use square Shopify-style tiles; products are cards.

## Motion

- **Approach:** intentional
- **Easing:** enter `cubic-bezier(.2,.7,.2,1)`, exit ease-in, move ease-in-out
- **Duration:** micro 100ms (button press), short 150ms (hover colour, cross-fade), long 520ms (card flip)
- **The one authored moment:** the product tile turning over like a drawn card. Nothing else animates on scroll.

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-10-17 | Initial design system created | Created by /design-consultation (gstack workflow, run by hand) from product context, search-based research and the brand files in `branding/` |
| 2026-10-17 | Palette rebuilt on brand colours | Logo files supplied `#264D97`, `#F9BB59`, `#222222`; replaced the first-draft lacquer/vermilion palette |
| 2026-10-17 | Dark only, no light theme | Use scene (evening, phone) and the white-text logo lockup; a light variant drifts toward a generic cream/serif look |
| 2026-10-17 | Card-proportion tiles with flip | Echoes the fanned-card logo; turns the catalogue into a spread; flip shows box contents without a page load |
| 2026-10-17 | Tokens wired into the Next.js app | Tailwind v4 `@theme` in `app/globals.css`, fonts via `next/font/google`, card flip as plain CSS; products gained `name_ja`, `set_code` and `releases_on` |
