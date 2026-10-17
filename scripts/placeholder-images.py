"""Writes stand-in box images to public/products/ for the seed catalogue.

Each is a plain booster-box drawing in one colour with the set code and a
visible "Placeholder image" label, so it can't be mistaken for a real photo.
Replace them by setting products.image_url to the real box photo.

Usage: python3 scripts/placeholder-images.py
"""

import colorsys
from pathlib import Path
from xml.sax.saxutils import escape

OUT = Path(__file__).resolve().parent.parent / "public" / "products"

# slug, set code, name, hue (0-360)
PRODUCTS = [
    ("mega-symphonia-booster-box", "M1S", "Mega Symphonia", 190),
    ("mega-brave-booster-box", "M1L", "Mega Brave", 8),
    ("mega-30th-celebration-booster-box", "M6a", "MEGA 30th Celebration", 42),
    ("heat-wave-arena-booster-box", "SV9a", "Heat Wave Arena", 22),
    ("terastal-festival-ex-booster-box", "SV8a", "Terastal Festival ex", 280),
    ("emperors-in-the-new-world-booster-box", "OP-09", "Emperors in the New World", 350),
]


def hsl(h, s, l):
    r, g, b = colorsys.hls_to_rgb(h / 360, l, s)
    return "#{:02x}{:02x}{:02x}".format(round(r * 255), round(g * 255), round(b * 255))


def box_svg(code, name, hue):
    front, top, side = hsl(hue, 0.55, 0.42), hsl(hue, 0.55, 0.58), hsl(hue, 0.5, 0.3)
    # Front face 120..600 x 210..520; top and right faces in oblique projection.
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 640" role="img" aria-label="Placeholder image for {escape(name)}">
  <polygon points="120,210 220,120 700,120 600,210" fill="{top}"/>
  <polygon points="600,210 700,120 700,430 600,520" fill="{side}"/>
  <rect x="120" y="210" width="480" height="310" fill="{front}"/>
  <rect x="140" y="230" width="440" height="270" fill="none" stroke="#ffffff" stroke-opacity="0.35" stroke-width="2"/>
  <text x="360" y="370" text-anchor="middle" font-family="Georgia, serif" font-weight="700" font-size="92" fill="#ffffff">{escape(code)}</text>
  <text x="360" y="430" text-anchor="middle" font-family="Georgia, serif" font-size="30" fill="#ffffff" fill-opacity="0.9">{escape(name)}</text>
  <text x="400" y="600" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="24" letter-spacing="3" fill="#a9b4cf">PLACEHOLDER IMAGE</text>
</svg>
"""


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    for slug, code, name, hue in PRODUCTS:
        (OUT / f"{slug}.svg").write_text(box_svg(code, name, hue))
        print(f"Wrote public/products/{slug}.svg")
