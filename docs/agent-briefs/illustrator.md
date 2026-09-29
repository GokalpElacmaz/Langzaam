# Illustration brief — Langzaam (illustrated Dutch course)

Project: /Users/gokalpelacmaz/Downloads/langzaam. Existing illustrations live in `public/images/*.svg`
(house, tree, bench, man, woman, man-walking, woman-sitting, neighbourhood). The learner loves this style;
new pictures must be indistinguishable in style from them.

## Read these first
Read ALL of public/images/man.svg, woman.svg, man-walking.svg, woman-sitting.svg, house.svg, tree.svg, bench.svg
before drawing. Reuse their path data wherever you can (copy the head/hair/torso paths of the man and woman and
re-pose limbs) so the recurring characters stay recognisably the same people:
- **Bram** = the man in man.svg (brown short hair, tan/khaki jacket #c6aa70 with collar, green trousers #526653, dark shoes).
- **Lotte** = the woman in woman.svg (brown hair with bun #77533e, green top #7c947e, rust skirt #c28260).

## Hard style rules
- `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">`, hand-written flat vector.
- Copy the `<defs>` block (the `grain` filter; bricks/roof patterns only if needed) verbatim from an existing file,
  full-canvas pastel background rect (one of #efeedd, #f4ecdd, #eef0e4, #f1ede4, #ede8e1), then everything inside
  `<g filter="url(#grain)">`.
- Soft ground shadow ellipse like the others (`fill="#dce0ca" opacity=".66"`, around cy 258).
- Outlines: stroke `#405a4b`, `stroke-linecap="round" stroke-linejoin="round"`, stroke-width 2–2.5 (1.2–1.5 for details).
- Muted palette only: greens #526653 #768e79 #7c947e #5f7d5f, tans #c6aa70 #bf935b #c5a06c, brick #b8664a #98573f,
  skin #dba57c #dfa98b #cf9671, browns #695b43 #77533e #534d3e, cream #f5f1e7 #fffef9, greys #9a9d92 #c9c9bd.
  No pure black, no saturated colours, no gradients, no text/letters in the picture (except "z" sleep marks where asked).
- Subject centred, fills roughly the middle 60% of the canvas; readable at 220×165 px. One clear meaning per picture:
  the learner must be able to infer the Dutch word or sentence from the picture alone, and it must be easy to tell apart
  from the other pictures in the same set (e.g. old-man vs man, dog-big vs dog-small).
- Keep each file under ~12 KB. Valid XML (it is loaded via <img>).

## Check your work
Render each file and look at it:
`qlmanage -t -s 800 -o <a scratch folder> public/images/<name>.svg` then Read the PNG. Fix anything ugly, off-model,
cropped, or ambiguous. Iterate until each picture looks like it belongs to the same book. Do not modify existing files.
When done, reply with the list of files written and one line per file describing what it shows.
