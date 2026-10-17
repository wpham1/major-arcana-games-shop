---
# gstack: design-md-format=spec
name: Major Arcana Games
description: A friendly, light card shop that leads with local artists and a promise you can check. Brand blue for words and actions, brand gold for the small moments of delight.
colors:
  paper: "#F5F7FC"           # page ground: cool off-white, not cream
  card: "#FFFFFF"            # product cards, panels
  image-well: "#EEF1F8"      # behind product photos
  ink: "#1B2440"             # primary text
  ink-muted: "#566079"       # secondary text
  blue: "#264D97"            # brand blue: primary action, links, promise band
  blue-deep: "#1D3C78"       # primary hover
  on-blue: "#FFFFFF"
  gold: "#F9BB59"            # brand gold: sparkle, badges, highlights. Fill only, never text on paper
  gold-tint: "#FEF1D9"       # artist call-outs
  brand-ink: "#222222"       # text on gold
  green: "#1E7A4C"           # in stock
  rust: "#B23F1C"            # low stock, errors
  footer: "#1B2440"
typography:
  display:
    fontFamily: Young Serif
    fontWeight: 400
    fontSize: clamp(2.25rem, 5vw, 3.5rem)
    letterSpacing: 0em
  heading:
    fontFamily: Young Serif
    fontWeight: 400
    fontSize: clamp(1.5rem, 3vw, 2rem)
  body:
    fontFamily: Zen Kaku Gothic New
    fontSize: 1rem
    lineHeight: 1.6
  label:
    fontFamily: Zen Kaku Gothic New
    fontWeight: 700
    fontSize: 0.8125rem
    letterSpacing: 0em
  mono:
    fontFamily: JetBrains Mono
    fontWeight: 500
    fontFeature: tnum
rounded:
  sm: 6px
  md: 10px
  lg: 14px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 56px
  3xl: 72px
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.on-blue}"
    rounded: "{rounded.sm}"
  button-primary-hover:
    backgroundColor: "{colors.blue-deep}"
  button-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.brand-ink}"
    rounded: "{rounded.sm}"
  product-card:
    backgroundColor: "{colors.card}"
    borderColor: "rgba(27, 36, 64, 0.12)"
    rounded: "{rounded.md}"
  art-card:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.lg}"
    aspectRatio: 4 / 5
  nav-link:
    textColor: "{colors.ink}"
---

# Major Arcana Games

## Overview

**Creative North Star:** a small, friendly card shop you can trust, where every parcel carries a little art from a local artist. The art supplies the expression; the interface stays clear and calm so buying feels safe.
**Product context:** Australian online shop for Japanese trading card games (Pokémon, One Piece): booster boxes, pre-orders and singles. Buyers are casual and competitive players, collectors, kids and the parents buying for them. They care about condition, fair prices, real cards, fast delivery and nice packaging. Source: the shop's Brand Identity page in Notion.
**Personality:** friendly, reliable, trustworthy, passionate, thoughtful, inclusive, community-minded. Not a faceless flipper, not a premium reseller.
**Mode per surface:**
- Home: Persuade. The featured artist, new arrivals, the parcel, the promise, the people.
- Catalogue, cart, checkout: Operate. Everything visible at a glance; nothing behind hover.
- Product, condition guide, about, artist pages: Read.

**Reference sites:** [PokéBox AU](https://www.pokebox.com.au/), [GD Games](https://www.gdgames.com.au/collections/japanese-pokemon-tcg), [TCGroup AU](https://www.tcgroupau.com.au/), [Samurai Sword Tokyo](https://samuraiswordtokyo.com/pages/about). Every one leads with stock. This shop leads with people and art, and keeps stock fast and reliable underneath.
**Key characteristics:**
- A featured local artist's work is the biggest image on the home page.
- Trust is shown, not claimed: real photos, a named promise (Near Mint or we tell you), plain facts.
- Light, bright and warm; the logo's blue and gold, never a dark luxury costume.
- Japanese product names shown with the English, as proof of the real product.

**Previews:** `design/preview-v2.html` (current direction, https://claude.ai/artifact/DozVuQAqXEexGgvqmPLq62). `design/preview.html` is the superseded v1.

## Colors

**Strategy:** Restrained. Neutral paper and white carry the page; brand blue is the voice (links, buttons, the promise band); brand gold appears only in small moments (the sparkle, artist call-outs, badges). Artist artwork and product photos supply the rest of the colour.
**Light or dark:** Light. The brand is friendly and lighthearted, kids and parents shop here, and illustrations read truest on a light ground. The black logo lockup (`branding/black-full-lock.svg`) is the default. No dark theme for now.

- Gold fails contrast as text on paper. It is a fill (with `brand-ink` text) or an ornament, never words on light backgrounds.
- Stock states: `green` in stock, `rust` low stock, `blue` pre-order, `ink-muted` sold out. Each also has a shape (filled dot, diamond, hollow dot).
- Contrast checked: `ink` on `paper` 14.3:1, `ink-muted` on `paper` 5.9:1, `blue` on `paper` 7.6:1, white on `blue` 8.1:1, `brand-ink` on `gold` 9.3:1, `green` and `rust` on `card` 5.3:1 and 5.8:1.

## Typography

- **Young Serif** (display and section headings; 400 only, which is already heavy). A warm, chunky old-style serif with rounded details. It's friendly next to the logo's swash without competing with it. Latin only.
- **Zen Kaku Gothic New** (body, UI, product names, Japanese titles; 400/500/700). Product names in cards are set in this bold, not the display face, so the catalogue stays easy to scan.
- **JetBrains Mono** (set codes only, e.g. `SV9a`, `OP-09`; 500). Prices use the body face with `tabular-nums`.

All OFL, served by Google Fonts through `next/font/google`. Display never exceeds 3.5rem.

## Layout

- Max content width 1160px; side gutter at least 16px.
- Home: featured-artist hero (art left, slightly tilted like a card set down on a table; words right), new arrivals, "what arrives in your letterbox", the Near Mint promise band, the people.
- Catalogue: `repeat(auto-fill, minmax(230px, 1fr))`, two columns on phones.
- Sections separate with 72px of space and a hairline; the promise band is the one full-bleed colour block.

## Elevation & Depth

Product cards: white with a hairline border; on hover the border tints blue and a soft offset shadow appears. The hero art card has a deeper offset shadow, as an object on a table. No glows, no glass.

## Shapes

- Buttons `sm` (6px), cards `md` (10px), art cards `lg` (14px). Status dots are the only circles.
- The logo's four-point sparkle (✦) is the one ornament: list bullets in the parcel section and the artist-collab badge.

## Components

- **Product card:** photo well (`image-well`; `image_url`, or the set code when there is no photo), Japanese title (left out when missing), English name, set code, price, stock state. Everything is visible at rest; no flip.
- **Featured-artist hero:** the artist's art card at 4:5, credit line linking to their page. With no featured artist yet, the brand card (blue, with the logo icon) stands in.
- **Art pull (planned, needs checkout):** on order confirmation, a face-down brand card that the customer taps to turn over and see which artist's art card is in their parcel. The one authored motion moment; `prefers-reduced-motion` swaps instantly.
- **Promise band:** "Near Mint, or we tell you." Brand blue, full bleed.
- **Buttons:** primary (blue), gold (for artist and community actions), text links with an arrow. Labels name the outcome.
- **Shop facts:** dispatch time, ABN, packing photo and reviews link live in `lib/site.ts`. Each renders only once it has a real value.

## Do's and Don'ts

- Do show stock state and AUD price (GST included) on every product card.
- Do credit artists by name on every piece of their work, and link to them.
- Do show real photos: the actual product, the actual parcel, the actual people.
- Do state the condition policy where people decide to buy.
- Do design the empty states: no featured artist, no products, no photo.
- Don't write policy or quality claims the shop hasn't confirmed. Add the fact to `lib/site.ts` or cut the line.
- Don't use generated doodles, stock illustrations or CSS-drawn stand-ins for art. Real artwork or none.
- Don't hide product information behind hover.
- Don't use dark luxury styling (black grounds, gold hairlines, glows); it contradicts the brand.
- Don't put a small label above a heading, or show customers placeholder or developer text.

## Motion

- **Approach:** minimal-functional, with one authored moment
- **Easing:** enter `cubic-bezier(.2,.7,.2,1)`, exit ease-in
- **Duration:** micro 100ms (button press), short 150ms (hover), long 650ms (art pull)
- **The one authored moment:** the art pull on order confirmation.

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-10-17 | Initial design system created | /design-consultation (gstack workflow, run by hand) from product context, search-based research and `branding/` |
| 2026-10-17 | Palette rebuilt on brand colours | Logo files supplied `#264D97`, `#F9BB59`, `#222222` |
| 2026-10-17 | Slop pass: cut unconfirmed claims, hero kicker and placeholder copy; added product images | Copy promised policies the shop never set; box photos are the product |
| 2026-10-17 | Condition policy shown on home and product pages | Confirmed by the shop: nothing below Near Mint is sold unless the listing says so explicitly (none so far) |
| 2026-10-17 | v2: light, friendly, community-led direction replaces the dark "collector's den" | The Brand Identity page describes a friendly, warm, inclusive shop for players, collectors and kids that supports local artists. The dark luxury look contradicted it |
| 2026-10-17 | v2: Young Serif replaces Shippori Mincho B1 for display | Friendlier and closer to the logo; Japanese text moves to Zen Kaku Gothic New |
| 2026-10-17 | v2: card flip moves from catalogue tiles to the planned art pull | Hiding product info behind hover cost usability; the flip means something when it reveals an artist |
