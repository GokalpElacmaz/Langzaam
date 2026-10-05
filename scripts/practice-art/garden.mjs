import { readFileSync } from 'node:fs';
import { C, p, c, e, r, g, at, shadow, glow, marks, tuft, tree, bush, man, stand, hand } from './lib.mjs';
import { bird } from './animals.mjs';
import { openHand } from './care.mjs';

const soil = (y = 250) => p(`M0 ${y}Q100 ${y - 6} 200 ${y}T400 ${y}V300H0Z`, '#cbb48b', 0, { stroke: 'none' });
const lawn = (y = 236) => p(`M0 ${y}Q100 ${y - 6} 200 ${y}T400 ${y}V300H0Z`, '#a8bd84', 0, { stroke: 'none' });
const stem = (d, w = 4) => p(d, 'none', w, { stroke: C.green4 });
const leaf = (x, y, rot = 0, s = 1, fill = C.green3) => g(`translate(${x} ${y}) rotate(${rot}) scale(${s})`, p('M0 0Q20 -24 48 -18Q30 6 0 0Z', fill, 2), p('M2 -1Q24 -10 44 -16', 'none', 1.2));
const tulip = (x, y, s = 1, fill = C.yellow) => at(x, y, s, stem('M0 0V-120'), leaf(0, -30, -60, 1.1), leaf(0, -50, -130, 0.9),
  p('M-26 -150Q-30 -118 -18 -112H18Q30 -118 26 -150L14 -134 0 -156 -14 -134Z', fill, 2.2), p('M0 -156Q-8 -130 0 -112Q8 -130 0 -156Z', 'none', 1.4));
const rose = (x, y, s = 1) => at(x, y, s, stem('M0 0Q-6 -60 0 -120'), leaf(-2, -50, -150, 1), leaf(0, -80, -30, 0.9),
  p('M-28 -136Q-34 -168 -8 -176Q10 -184 26 -170Q38 -156 28 -134Q16 -116 0 -118Q-20 -118 -28 -136Z', C.brick, 2.2),
  p('M-10 -160Q4 -170 14 -158Q20 -146 8 -140Q-6 -138 -8 -150Q0 -156 6 -150', 'none', 1.8), p('M-26 -140Q-12 -128 0 -132M28 -140Q16 -126 4 -128', 'none', 1.6), p('M-14 -118L0 -112 14 -118', C.green3, 1.6));
const sunflower = (x, y, s = 1) => at(x, y, s, stem('M0 0V-190', 6), leaf(0, -60, -40, 1.4), leaf(0, -100, -140, 1.3),
  ...Array.from({ length: 14 }, (_, i) => g(`translate(0 -210) rotate(${i * (360 / 14)})`, p('M0 -24Q-9 -46 0 -60Q9 -46 0 -24Z', C.yellow, 1.6))),
  c(0, -210, 26, '#7a5038', 2.2), ...Array.from({ length: 6 }, (_, i) => c(-10 + (i % 3) * 10, -216 + Math.floor(i / 3) * 12, 2, '#3f2d22', 0, { stroke: 'none' })));
const appleTree = (x, y, s = 1) => at(x, y, s, p('M-10 0L-8 -80Q-30 -96 -40 -110M8 -80L10 0Z', '#8a7552', 2.2), p('M-10 0V-90H10V0Z', '#8a7552', 2),
  p('M0 -210Q-60 -210 -70 -160Q-100 -146 -86 -110Q-74 -80 -36 -88Q-8 -70 22 -86Q70 -74 84 -112Q100 -148 66 -164Q60 -210 0 -210Z', C.green3, 2.4),
  ...[[-40, -150], [10, -170], [44, -130], [-56, -110], [0, -120], [36, -184], [-24, -186]].map(([a, b]) => c(a, b, 9, C.brick, 1.8)));
const flowerpot = (x, y, s = 1) => at(x, y, s, p('M-40 0L-50 -70H50L40 0Z', '#c4734f', 2.4), r(-56, -84, 112, 16, '#c4734f', 2.2),
  stem('M0 -84V-140', 3.4), leaf(0, -100, -150, 0.8), leaf(0, -114, -30, 0.8), ...[0, 1, 2, 3, 4].map((i) => { const a = i * 1.256; return c(Math.cos(a) * 12, -150 + Math.sin(a) * 12, 9, C.pink, 1.6); }), c(0, -150, 7, C.yellow, 1.4));
const mower = (x, y, s = 1, handle = true) => at(x, y, s, p('M-70 -20Q-70 -60 -30 -62H40Q70 -60 70 -20Z', C.brick, 2.4), r(-74, -26, 148, 12, C.dark, 2), c(-48, -6, 14, C.dark, 2.2), c(48, -6, 14, C.dark, 2.2), c(-48, -6, 5, C.grey3, 1.4), c(48, -6, 5, C.grey3, 1.4),
  r(-20, -78, 34, 18, C.grey, 2), handle ? p('M-40 -60L-100 -150', 'none', 6) + p('M-112 -154L-90 -142', 'none', 7, { stroke: C.dark }) : '');
const can = (x, y, s = 1) => at(x, y, s, p('M-50 0V-80Q-50 -90 -40 -90H40Q50 -90 50 -80V0Z', C.green3, 2.4), p('M50 -60L110 -110', 'none', 12, { stroke: C.line }), p('M50 -60L110 -110', 'none', 8, { stroke: C.green3 }),
  p('M104 -118L124 -126 126 -104 112 -100Z', C.green4, 2), p('M-50 -60Q-90 -60 -90 -30Q-90 -6 -50 -10', 'none', 6), p('M-40 -90Q0 -130 40 -90', 'none', 6));
const child = (() => {
  const svg = readFileSync(new URL('../../public/images/child.svg', import.meta.url), 'utf8');
  return svg.match(/<g stroke="#405a4b"[\s\S]*<\/g>(?=<\/g><\/svg>)/u)[0]
    .replace('M175 150L165 176 168 180 178 181 181 164M225 150L235 176 232 180 222 181 219 164', 'M175 150L165 176 168 180 178 181 181 164')
    .replace('M167 178L163 203Q162 212 170 212Q176 211 175 204L178 181M233 178L237 203Q238 212 230 212Q224 211 225 204L222 181', 'M167 178L163 203Q162 212 170 212Q176 211 175 204L178 181');
})();
const raisedArm = g('', p('M220 150L248 92 260 98 232 158', '#f5f1e7', 2.3), p('M248 92Q244 74 254 72Q264 72 262 92Z', C.skin2, 2.1));

export default [
  { word: 'blad', alt: 'a single green leaf with its veins', art: g('', shadow(200, 252, 110),
    p('M80 220Q100 110 230 80Q330 60 340 70Q330 150 260 200Q190 246 80 220Z', C.green3, 2.6), p('M80 220Q200 150 336 72', 'none', 2.6), marks('M150 172L140 126M190 146L184 104M230 122L230 90M170 162L216 190M214 136L262 160M256 110L298 126', C.green, 1.8), p('M80 220L56 246', 'none', 4, { stroke: C.green4 })) },
  { word: 'tak', alt: 'a bird sitting on a branch, the branch highlighted', art: g('', glow('M50 230Q150 250 280 226Q340 214 380 220', 22), at(200, 270, 1.3, bird())) },
  { word: 'struik', alt: 'a round green bush', art: g('', lawn(), shadow(200, 256, 140), bush(200, 256, 3.4, C.green3), ...[[160, 180], [220, 160], [250, 210], [140, 220]].map(([x, y]) => marks(`M${x} ${y}q8 -8 16 0`, C.green, 1.8))) },
  { word: 'heg', alt: 'a tall neatly trimmed green hedge', art: g('', lawn(), shadow(200, 256, 190),
    p('M20 256V90Q20 70 40 70H360Q380 70 380 90V256Z', C.green4, 2.6), ...Array.from({ length: 12 }, (_, i) => marks(`M${40 + (i % 6) * 56} ${110 + Math.floor(i / 6) * 70}q10 -10 20 0`, C.green3, 2.2))) },
  { word: 'zaad', alt: 'a few small seeds on an open hand next to a seed packet', art: g('',
    at(170, 290, 1.1, openHand()), ...[[150, 214], [174, 206], [196, 216], [160, 236], [186, 232], [208, 236]].map(([x, y]) => e(x, y, 6, 4, '#7a5038', 1.4)),
    r(290, 60, 80, 110, C.cream, 2.2), tulip(330, 150, 0.45, C.brick), p('M290 80H370', 'none', 2)) },
  { word: 'onkruid', alt: 'weeds and dandelions growing between garden tiles', art: g('', r(0, 150, 400, 150, C.grey2, 0, { stroke: 'none' }),
    ...Array.from({ length: 8 }, (_, i) => r(10 + (i % 4) * 98, 160 + Math.floor(i / 4) * 66, 88, 56, '#d9d5c6', 2)),
    ...[[104, 216], [202, 160], [300, 222], [56, 160], [350, 160]].map(([x, y], i) => at(x, y, 1, tuft(0, 0, 1.6), tuft(10, 2, 1.1), i % 2 ? '' : g('', stem('M0 0V-40', 2.4), c(0, -46, 9, C.yellow, 1.6))))) },
  { word: 'roos', alt: 'one red rose with leaves on its stem', art: g('', shadow(200, 262, 80), rose(200, 262, 1.25)) },
  { word: 'tulp', alt: 'one yellow tulip', art: g('', shadow(200, 262, 80), tulip(200, 262, 1.35)) },
  { word: 'zonnebloem', alt: 'a tall yellow sunflower', art: g('', shadow(200, 268, 80), sunflower(200, 274, 0.95)) },
  { word: 'appelboom', alt: 'an apple tree with red apples behind a house', art: g('', lawn(), shadow(250, 256, 120),
    r(10, 110, 120, 146, C.brick, 2.4), p('M0 116L70 60 140 116Z', C.green, 2.4), r(40, 150, 30, 30, C.water, 2), appleTree(260, 256, 1.05)) },
  { word: 'gazon', alt: 'a green lawn with mown stripes in front of a low fence', art: g('',
    p('M0 120H400V300H0Z', '#a8bd84', 0, { stroke: 'none' }), ...Array.from({ length: 5 }, (_, i) => p(`M${i * 80} 120H${i * 80 + 40}L${i * 80 + 20 + 40} 300H${i * 80 + 20}Z`, '#bccd9a', 0, { stroke: 'none' })),
    p('M0 120H400', 'none', 2.4), bush(60, 122, 0.9), bush(330, 122, 1)) },
  { word: 'grasmaaier', alt: 'a red push lawnmower on the grass', art: g('', lawn(244), shadow(210, 262, 120), mower(230, 262, 1.2)) },
  { word: 'hark', alt: 'a garden rake with a long wooden handle', art: g('', shadow(200, 262, 120),
    p('M100 250L300 60', 'none', 9, { stroke: C.line }), p('M100 250L300 60', 'none', 5, { stroke: '#b5865a' }),
    p('M250 40L350 140', 'none', 9, { stroke: C.line }), p('M250 40L350 140', 'none', 5, { stroke: C.grey }), ...Array.from({ length: 9 }, (_, i) => p(`M${256 + i * 11} ${46 + i * 11}l18 -18`, 'none', 3.4))) },
  { word: 'gieter', alt: 'a green watering can full of water', art: g('', shadow(190, 262, 100), can(180, 262, 1.25), marks('M330 140q4 10 0 16M344 132q6 12 0 20M318 150q2 8 -2 12', C.water2, 2.2)) },
  { word: 'schep', alt: 'a spade stuck into a heap of soil', art: g('', soil(244), shadow(200, 262, 120),
    p('M120 262Q200 200 290 262Z', '#a8875c', 2.2), p('M200 40V170', 'none', 10, { stroke: C.line }), p('M200 40V170', 'none', 6, { stroke: '#b5865a' }), p('M178 40H222', 'none', 9),
    p('M170 166H230V226Q200 246 170 226Z', C.grey, 2.4)) },
  { word: 'tuinslang', alt: 'a coiled green garden hose spraying water', art: g('', lawn(244), shadow(170, 262, 120),
    ...[0, 1, 2].map((i) => e(160, 228 - i * 6, 90 - i * 14, 26 - i * 4, 'none', 9, { stroke: C.line })), ...[0, 1, 2].map((i) => e(160, 228 - i * 6, 90 - i * 14, 26 - i * 4, 'none', 5, { stroke: C.green3 })),
    p('M240 214Q280 190 300 160', 'none', 9), p('M240 214Q280 190 300 160', 'none', 5, { stroke: C.green3 }), r(292, 140, 16, 24, C.yellow, 2),
    marks('M306 136Q320 100 350 90M300 134Q300 100 316 76M312 140Q340 120 370 120', C.water2, 2.6)) },
  { word: 'bloempot', alt: 'a terracotta flowerpot with pink flowers on a balcony railing', art: g('',
    r(0, 210, 400, 14, C.grey2, 2.2), ...Array.from({ length: 9 }, (_, i) => p(`M${20 + i * 45} 224V300`, 'none', 5)), flowerpot(200, 210, 1.15)) },
  { word: 'maaien', alt: 'Bram pushing a lawnmower across the lawn', art: g('', lawn(240), shadow(200, 266, 160), mower(300, 262, 1, false), p('M260 202L194 190', 'none', 6), stand(160, 270, 0.82, man())) },
  { word: 'plukken', alt: 'Noor reaching up to pick a red apple from a branch', art: g('', lawn(244), shadow(190, 262, 120),
    p('M180 30Q280 50 400 40', 'none', 10, { stroke: '#8a7552' }), leaf(300, 44, 20, 1.2), leaf(360, 40, -10, 1.1), leaf(230, 40, 150, 1),
    at(190 - 200 * 0.95, 264 - 265 * 0.95, 0.95, child + raisedArm), c(242, 58, 12, C.brick, 2), p('M242 46L244 36', 'none', 3, { stroke: C.brown })) },
  { word: 'groeien', alt: 'three tulips in a row, each one taller, with an arrow showing them growing', art: g('', soil(250),
    at(90, 250, 1, stem('M0 0V-30'), leaf(0, -10, -60, 0.6), leaf(0, -16, -130, 0.5)), tulip(200, 250, 0.7, C.yellow), tulip(310, 250, 1.1, C.yellow),
    p('M60 60Q180 20 330 40', 'none', 3, { stroke: C.tan2 }), p('M318 28L334 40 316 50', 'none', 3, { stroke: C.tan2 })) },
];
