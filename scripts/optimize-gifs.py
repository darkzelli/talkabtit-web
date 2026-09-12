#!/usr/bin/env python3
"""Re-encode source GIFs into the demo picker's library at public/gifs.

The shipped picker searches Klipy; /demo is a static export with no network of
its own, so its GIF tab searches these clips instead. Giphy-sized GIFs are far
too heavy to bundle (the current nine came to 13 MB), so each one is fitted to
a 320 px box, capped at 15 fps and written as an animated WebP — about a 91%
saving with no visible loss at the size the picker renders them.

    python3 scripts/optimize-gifs.py out-name=path/to/source.gif ...

e.g. python3 scripts/optimize-gifs.py shocked="../Ads/Shocked Eyes GIF.gif"

Needs Pillow. After adding a clip, give it a label and keyword tags in the
GIFS list in components/DemoStage.tsx — that list is what the search reads.
"""
import os
import sys

from PIL import Image, ImageSequence

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "gifs")
BOX, FPS, QUALITY = 320, 15, 65


def convert(src, dst, box=BOX, fps=FPS, q=QUALITY):
    im = Image.open(src)
    step = 1000.0 / fps
    frames, durs, acc = [], [], 0.0
    for fr in ImageSequence.Iterator(im):
        d = fr.info.get("duration") or im.info.get("duration") or 100
        acc += d
        if frames and acc < step:  # too soon to be worth a frame — fold it into the last
            durs[-1] += d
            continue
        acc = 0.0
        f = fr.convert("RGBA")
        w, h = f.size
        s = min(box / w, box / h, 1.0)  # fit the box, never upscale
        if s < 1.0:
            f = f.resize((max(1, round(w * s)), max(1, round(h * s))), Image.LANCZOS)
        frames.append(f)
        durs.append(d)
    frames[0].save(dst, save_all=True, append_images=frames[1:], duration=durs,
                   loop=0, quality=q, method=6, minimize_size=True)
    return len(frames), frames[0].size, os.path.getsize(dst)


if __name__ == "__main__":
    args = [a.split("=", 1) for a in sys.argv[1:] if "=" in a]
    if not args:
        sys.exit(__doc__)
    os.makedirs(OUT, exist_ok=True)
    before = after = 0
    for name, src in args:
        dst = os.path.join(OUT, name + ".webp")
        n, size, b = convert(src, dst)
        before += os.path.getsize(src)
        after += b
        print(f"{name:<18} {n:>3}f {size[0]:>3}x{size[1]:<3} "
              f"{os.path.getsize(src) / 1024:>7.0f} KB -> {b / 1024:>6.0f} KB")
    if len(args) > 1:
        print(f"{'TOTAL':<18} {before / 1024 / 1024:>18.1f} MB -> {after / 1024:>6.0f} KB "
              f"({100 - after / before * 100:.0f}% smaller)")
