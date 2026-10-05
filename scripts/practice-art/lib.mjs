/**
 * Small helpers for the hand-written vocabulary sheets of the later A2 practice lessons.
 * Each sheet is 4 × 5 cells of 400 × 300 in the flat, muted, grainy style of public/images/*.svg.
 * Bram and Lotte reuse the path data of man.svg and woman.svg, so the recurring characters stay on model.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

export const C = {
  line: '#405a4b', green: '#526653', green2: '#768e79', green3: '#7c947e', green4: '#5f7d5f', leaf: '#8ea17f',
  tan: '#c6aa70', tan2: '#bf935b', tan3: '#c5a06c', sand: '#ded0a5', brick: '#b8664a', brick2: '#98573f', rust: '#c28260',
  skin: '#dba57c', skin2: '#dfa98b', skin3: '#cf9671', brown: '#695b43', brown2: '#77533e', brown3: '#534d3e',
  cream: '#f5f1e7', white: '#fffef9', grey: '#9a9d92', grey2: '#c9c9bd', grey3: '#b4b3a8', dark: '#3f4a44',
  water: '#a9c1bf', water2: '#8fadab', sky: '#d8e0d6', yellow: '#dcbc5e', yellow2: '#e8d184', orange: '#cf8a52',
  pink: '#dfa89a', pink2: '#c98d80', blue: '#7f98a3', blue2: '#5f7884', purple: '#8d7a99', glow: '#efd98f',
};
export const backgrounds = ['#efeedd', '#f4ecdd', '#eef0e4', '#f1ede4', '#ede8e1'];

const attrs = (o) => Object.entries(o).filter(([, v]) => v !== undefined && v !== null).map(([k, v]) => `${k.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())}="${v}"`).join(' ');
/** A path with the house outline colour unless told otherwise. */
export const p = (d, fill = 'none', sw = 2, extra = {}) => `<path d="${d}" ${attrs({ fill, strokeWidth: sw, ...extra })}/>`;
export const c = (cx, cy, r, fill = 'none', sw = 2, extra = {}) => `<circle ${attrs({ cx, cy, r, fill, strokeWidth: sw, ...extra })}/>`;
export const e = (cx, cy, rx, ry, fill = 'none', sw = 2, extra = {}) => `<ellipse ${attrs({ cx, cy, rx, ry, fill, strokeWidth: sw, ...extra })}/>`;
export const r = (x, y, width, height, fill = 'none', sw = 2, extra = {}) => `<rect ${attrs({ x, y, width, height, fill, strokeWidth: sw, ...extra })}/>`;
export const g = (transform, ...children) => `<g transform="${transform}">${children.join('')}</g>`;
export const at = (x, y, s = 1, ...children) => g(`translate(${x} ${y}) scale(${s})`, ...children);
export const flip = (...children) => g('scale(-1 1)', ...children);
/** Soft ground shadow used by every picture in the book. */
export const shadow = (cx = 200, cy = 258, rx = 122, ry = 10) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#dce0ca" opacity=".66" stroke="none"/>`;
/** A highlight band drawn behind the part a picture is about. */
export const glow = (d, width = 18) => `<path d="${d}" fill="none" stroke="${C.glow}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" opacity=".85"/>`;
export const tuft = (x, y, s = 1) => at(x, y, s, p('M-6 0Q-9 -12 -3 -16Q-2 -8 0 -4Q2 -18 9 -21Q6 -9 6 0', C.green2, 1.5));
export const ground = (y = 250, fill = '#dfe3cc') => p(`M0 ${y}Q100 ${y - 8} 200 ${y}T400 ${y}V300H0Z`, fill, 0, { stroke: 'none' });
export const sun = (x, y, rad = 22) => g('', c(x, y, rad, C.yellow2, 2), ...Array.from({ length: 8 }, (_, i) => {
  const a = (i * Math.PI) / 4; const x1 = x + Math.cos(a) * (rad + 6); const y1 = y + Math.sin(a) * (rad + 6);
  const x2 = x + Math.cos(a) * (rad + 15); const y2 = y + Math.sin(a) * (rad + 15);
  return p(`M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`, 'none', 2.2, { stroke: C.tan2 });
}));
export const cloud = (x, y, s = 1, fill = C.cream) => at(x, y, s, p('M-40 10Q-52 10 -50 -2Q-48 -14 -32 -12Q-28 -30 -8 -28Q8 -40 24 -26Q42 -30 44 -12Q58 -8 52 6Q48 12 38 10Z', fill, 2));
export const tree = (x, y, s = 1, leaf = C.green3) => at(x, y, s,
  p('M-7 0L-5 -50Q-18 -58 -22 -66M5 -50L7 0', C.brown, 2.2, { fill: '#8a7552' }), p('M-6 0V-52H6V0Z', '#8a7552', 2),
  p('M0 -118Q-34 -118 -38 -90Q-56 -82 -46 -62Q-38 -46 -14 -52Q0 -42 16 -52Q42 -44 48 -66Q56 -84 38 -94Q34 -120 0 -118Z', leaf, 2.2));
export const bush = (x, y, s = 1, fill = C.green2) => at(x, y, s, p('M-40 0Q-48 -20 -30 -26Q-26 -44 -6 -40Q8 -52 24 -38Q44 -38 42 -18Q52 -8 42 0Z', fill, 2));
export const fence = (x1, x2, y, h = 40) => {
  const posts = [];
  for (let x = x1; x <= x2; x += 26) posts.push(p(`M${x - 4} ${y}V${y - h + 6}L${x} ${y - h}L${x + 4} ${y - h + 6}V${y}Z`, C.cream, 1.6));
  return g('', p(`M${x1 - 8} ${y - h * 0.35}H${x2 + 8}M${x1 - 8} ${y - h * 0.75}H${x2 + 8}`, 'none', 5, { stroke: C.line }), p(`M${x1 - 8} ${y - h * 0.35}H${x2 + 8}M${x1 - 8} ${y - h * 0.75}H${x2 + 8}`, 'none', 2.5, { stroke: C.cream }), ...posts);
};
/** Little sparkle and movement marks. */
export const marks = (d, color = C.line, sw = 1.6) => p(d, 'none', sw, { stroke: color });

const figure = (file) => {
  const svg = readFileSync(join(root, 'public', 'images', file), 'utf8');
  return svg.match(/<g transform="translate\([^)]*\) scale\([^)]*\)">([\s\S]*)<\/g>\s*<\/g>\s*<\/svg>\s*$/u)[1];
};
export const figureOf = figure;
const manBody = figure('man.svg');
const womanBody = figure('woman.svg');
const recolour = (markup, map) => Object.entries(map).reduce((text, [from, to]) => (to ? text.split(`fill="${from}"`).join(`fill="${to}"`) : text), markup);

/**
 * A standing man in man.svg's own coordinates (about x 85–180, y 25–285, feet at 280).
 * Options recolour the jacket, trousers, hair and skin so the same drawing can be another person.
 */
export const man = ({ jacket, sleeve, trousers, hair, skin, shoes } = {}) => recolour(manBody, {
  '#c6aa70': jacket, '#c2a66e': sleeve || jacket, '#526653': trousers, '#695b43': hair, '#dba57c': skin, '#cf9671': skin, '#534d3e': shoes,
});
/** A standing woman in woman.svg's own coordinates (feet at about 280). */
export const woman = ({ top, skirt, hair, skin, shoes, legs } = {}) => recolour(womanBody, {
  '#7c947e': top, '#b97656': skirt, '#77533e': hair, '#dfa98b': skin, '#3f584a': shoes,
}).replace(/(<path d="M115 214L115 268H131L137 215M143 214L147 268H163L161 213" fill=")[^"]+/u, `$1${legs || skin || '#dfa98b'}`);
/** Place a figure so that its feet stand at (x, y). */
export const stand = (x, y, s, body) => g(`translate(${x - 130 * s} ${y - 280 * s}) scale(${s})`, body);
export const bram = (x, y, s = 1) => stand(x, y, s, man());
export const lotte = (x, y, s = 1) => stand(x, y, s, woman());

/** Compose a sheet of 4 × 5 cells; each cell is { bg, art, alt }. */
export function sheet(cells) {
  if (cells.length !== 20) throw new Error('A sheet needs twenty cells, found ' + cells.length);
  const defs = '<defs><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.58" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="0.08"/></feComponentTransfer><feBlend mode="multiply" in2="SourceGraphic"/></filter></defs>';
  const body = cells.map((cell, i) => {
    const x = (i % 4) * 400; const y = Math.floor(i / 4) * 300;
    return `<svg x="${x}" y="${y}" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="${cell.bg || backgrounds[i % backgrounds.length]}"/><g filter="url(#grain)"><rect width="400" height="300" fill="none"/><g stroke="${C.line}" stroke-linecap="round" stroke-linejoin="round">${cell.art}</g></g></svg>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1500" viewBox="0 0 1600 1500">${defs}${body}</svg>`;
}
/** One cell as its own 400 × 300 picture, for reviewing a drawing at full and thumbnail size. */
export function single(cell) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><defs><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.58" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="0.08"/></feComponentTransfer><feBlend mode="multiply" in2="SourceGraphic"/></filter></defs><rect width="400" height="300" fill="${cell.bg || backgrounds[0]}"/><g filter="url(#grain)"><rect width="400" height="300" fill="none"/><g stroke="${C.line}" stroke-linecap="round" stroke-linejoin="round">${cell.art}</g></g></svg>`;
}

/**
 * A front-facing head and shoulders for showing feelings, in local coordinates with the
 * bottom of the shoulders at (0, 0) and the face centred near (0, -120).
 */
export function bust({ skin = C.skin2, hair = C.brown2, style = 'short', shirt = C.green3, mouth = 'smile', brows = 'normal', eyes = 'open', blush = false, tear = false, sweat = false, glasses = false } = {}) {
  const dot = (x, y, rad = 3.4) => c(x, y, rad, C.line, 0, { stroke: 'none' });
  const eyeShapes = {
    open: dot(-16, -122) + dot(16, -122),
    happy: p('M-24 -120Q-16 -130 -8 -120M8 -120Q16 -130 24 -120', 'none', 2.6),
    closed: p('M-24 -122Q-16 -115 -8 -122M8 -122Q16 -115 24 -122', 'none', 2.4),
    wide: c(-16, -122, 7, C.white, 1.8) + c(16, -122, 7, C.white, 1.8) + dot(-16, -122, 3) + dot(16, -122, 3),
    down: dot(-16, -117, 3) + dot(16, -117, 3) + p('M-23 -121H-9M9 -121H23', 'none', 2),
    side: dot(-11, -122) + dot(21, -122),
    half: p('M-24 -122H-8M8 -122H24', 'none', 2.2) + dot(-16, -119, 2.8) + dot(16, -119, 2.8),
    wink: p('M-24 -122Q-16 -128 -8 -122', 'none', 2.4) + dot(16, -122),
  };
  const browShapes = {
    normal: 'M-26 -136Q-17 -141 -8 -137M8 -137Q17 -141 26 -136',
    raised: 'M-26 -146Q-17 -153 -8 -147M8 -147Q17 -153 26 -146',
    sad: 'M-26 -132L-8 -140M8 -140L26 -132',
    stern: 'M-26 -141L-8 -133M8 -133L26 -141',
    soft: 'M-25 -138Q-17 -142 -9 -139M9 -139Q17 -142 25 -138',
  };
  const mouths = {
    smile: p('M-15 -98Q0 -86 15 -98', 'none', 2.4),
    grin: p('M-18 -100Q0 -100 18 -100Q14 -80 0 -80Q-14 -80 -18 -100Z', C.white, 2) + p('M-12 -86Q0 -82 12 -86', 'none', 0) ,
    laugh: p('M-20 -102Q0 -102 20 -102Q16 -76 0 -76Q-16 -76 -20 -102Z', C.brick2, 2) + p('M-14 -101H14V-96Q0 -93 -14 -96Z', C.white, 1.2),
    frown: p('M-13 -88Q0 -99 13 -88', 'none', 2.4),
    flat: p('M-11 -93H11', 'none', 2.4),
    o: e(0, -91, 7, 9, C.brick2, 2),
    small: p('M-6 -94Q0 -90 6 -94', 'none', 2.2),
    tongue: p('M-16 -98Q0 -90 16 -98', 'none', 2.4) + p('M-6 -95Q-6 -82 2 -82Q8 -84 8 -94', C.pink, 1.8),
    wobbly: p('M-14 -91Q-7 -96 0 -91Q7 -86 14 -91', 'none', 2.2),
  };
  const hairs = {
    short: [p('M-46 -124Q-52 -176 0 -178Q52 -176 46 -124Q40 -146 24 -152Q8 -140 -20 -148Q-34 -146 -46 -124Z', hair, 2.4), ''],
    bun: [p('M-47 -118Q-56 -176 0 -176Q56 -176 47 -118Q44 -150 22 -156Q-2 -146 -28 -154Q-44 -146 -47 -118Z', hair, 2.4), c(0, -184, 18, hair, 2.4)],
    child: [p('M-48 -104Q-58 -178 0 -178Q58 -178 48 -104Q44 -128 40 -140Q20 -138 2 -148Q-14 -136 -40 -140Q-44 -128 -48 -104Z', hair, 2.4), ''],
    grey: [p('M-46 -122Q-48 -150 -36 -160Q-20 -150 -6 -158Q-16 -168 4 -170Q34 -170 44 -150Q50 -136 46 -122Q42 -142 28 -146Z', C.grey2, 2.2), ''],
    greyBun: [p('M-47 -118Q-56 -174 0 -174Q56 -174 47 -118Q44 -150 22 -154Q0 -146 -26 -152Q-44 -146 -47 -118Z', C.grey2, 2.4), c(0, -182, 16, C.grey2, 2.2)],
    baby: [p('M-6 -168Q-2 -182 10 -178Q4 -172 8 -164', 'none', 2.4) + p('M-30 -158Q-20 -168 -10 -164M14 -166Q26 -168 32 -158', 'none', 2, { stroke: C.tan2 }), ''],
    long: [p('M-48 -110Q-58 -178 0 -178Q58 -178 48 -110L54 -56Q34 -50 34 -64Q44 -120 30 -146Q4 -136 -30 -146Q-44 -120 -34 -64Q-34 -50 -54 -56Z', hair, 2.4), ''],
  };
  const [hairTop, hairBack] = hairs[style];
  return g('',
    hairBack,
    p('M-80 0Q-84 -46 -46 -58Q-22 -66 0 -66Q22 -66 46 -58Q84 -46 80 0Z', shirt, 2.4),
    p('M-14 -78V-58Q0 -50 14 -58V-78', skin, 2),
    p('M-20 -62L0 -44 20 -62', 'none', 2),
    e(-44, -114, 7, 11, skin, 2), e(44, -114, 7, 11, skin, 2),
    e(0, -118, 44, 52, skin, 2.4),
    hairTop,
    p(browShapes[brows], 'none', 2.6),
    eyeShapes[eyes],
    p('M0 -114Q-4 -104 2 -103', 'none', 1.8),
    mouths[mouth],
    blush ? e(-27, -102, 8, 5, C.pink2, 0, { stroke: 'none', opacity: '.6' }) + e(27, -102, 8, 5, C.pink2, 0, { stroke: 'none', opacity: '.6' }) : '',
    tear ? p('M-22 -112Q-28 -100 -24 -96Q-18 -96 -20 -104Z', C.water, 1.4) : '',
    sweat ? p('M40 -150Q34 -138 38 -134Q44 -134 42 -142Z', C.water, 1.4) : '',
    glasses ? c(-16, -122, 11, C.white, 1.8, { fillOpacity: '.25' }) + c(16, -122, 11, C.white, 1.8, { fillOpacity: '.25' }) + p('M-5 -123H5M-27 -124L-42 -126M27 -124L42 -126', 'none', 1.8) : '');
}
/** A hand as a simple mitten, pointing up unless rotated. */
export const hand = (x, y, rot = 0, fill = C.skin2) => g(`translate(${x} ${y}) rotate(${rot})`, p('M-11 10Q-14 -8 -8 -14Q0 -18 8 -14Q14 -8 11 10Z', fill, 2), p('M-8 -4Q-16 -6 -16 2', 'none', 1.8));

/** A thick outlined stroke, for arms and legs in action poses. */
export const limb = (d, width, fill) => p(d, 'none', width + 4.5, { stroke: C.line }) + p(d, 'none', width, { stroke: fill });
/** A running person facing right, feet on y = 0, about 240 tall. */
export function runner({ top = C.green3, shorts = C.dark, skin = C.skin2, hair = C.brown2, bun = false, shoes = C.white } = {}) {
  return g('',
    limb('M-6 -112L-34 -64L-74 -54', 17, skin), p('M-86 -60L-70 -50 -64 -60 -80 -68Z', shoes, 2),
    limb('M-10 -176L-30 -146L-50 -128', 13, skin),
    p('M-24 -122L-4 -96 28 -106 22 -128Z', shorts, 2.2),
    limb('M10 -108L42 -66L30 -10', 17, skin), p('M22 -14H52Q58 -4 50 0H20Z', shoes, 2),
    p('M-24 -124Q-30 -168 -4 -196Q14 -204 30 -192Q38 -160 26 -124Z', top, 2.4),
    limb('M18 -184L44 -150L66 -170', 13, skin),
    p('M6 -200L10 -186 22 -188 20 -202', skin, 2),
    c(22, -224, 24, skin, 2.4), p('M0 -232Q2 -258 26 -256Q46 -254 48 -236Q34 -244 22 -238Q12 -232 0 -232Z', hair, 2.2),
    bun ? c(-6, -244, 11, hair, 2) : '', c(34, -226, 2.2, C.line, 0, { stroke: 'none' }), p('M36 -212Q42 -212 44 -216', 'none', 1.6));
}
