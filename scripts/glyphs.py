"""Outlines of the wordmark's letters from the vendored Work Sans variable font, as SVG path data.
Called by build-assets.mjs:  uv run --with fonttools scripts/glyphs.py 500:STRATOS 300:EDGE
Prints JSON {"unitsPerEm", "capHeight", "glyphs": {"500": {"S": {"d": "...", "adv": 622}, ...}, ...}}.
Paths are in font units with y pointing down (SVG), origin at the glyph's baseline-left."""
import json, sys, os
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

FONT = os.path.join(os.path.dirname(__file__), "fonts", "WorkSans-VariableFont_wght.ttf")
out = {"glyphs": {}}
for arg in sys.argv[1:]:
    wght, text = arg.split(":")
    font = instantiateVariableFont(TTFont(FONT), {"wght": int(wght)}, inplace=False)
    out["unitsPerEm"] = font["head"].unitsPerEm
    out["capHeight"] = font["OS/2"].sCapHeight
    gs, cmap, hmtx = font.getGlyphSet(), font.getBestCmap(), font["hmtx"]
    out["glyphs"][wght] = {}
    for ch in dict.fromkeys(text):
        name = cmap[ord(ch)]
        pen = SVGPathPen(gs, ntos=lambda v: f"{v:.1f}".rstrip("0").rstrip("."))
        gs[name].draw(TransformPen(pen, (1, 0, 0, -1, 0, 0)))  # flip y for SVG
        out["glyphs"][wght][ch] = {"d": pen.getCommands(), "adv": hmtx[name][0]}
json.dump(out, sys.stdout)
