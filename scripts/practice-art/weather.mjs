import { C, p, c, e, r, g, at, shadow, glow, marks, sun, cloud, tree, bush, stand, figureOf, tuft } from './lib.mjs';
import { dog } from './animals.mjs';

const night = '#4b5a6b';
const sky = '#c7d8dc';
const greyCloud = (x, y, s = 1) => cloud(x, y, s, C.grey3);
const darkCloud = (x, y, s = 1) => cloud(x, y, s, '#8d939a');
const bolt = (x, y, s = 1) => at(x, y, s, p('M0 0L-22 50H-4L-20 100L28 34H8L22 0Z', C.yellow2, 2.2));
const rain = (x1, x2, y1, y2, step = 26) => g('', ...Array.from({ length: Math.floor((x2 - x1) / step) + 1 }, (_, i) => p(`M${x1 + i * step} ${y1 + (i % 2) * 12}l-8 22`, 'none', 2.4, { stroke: C.water2 })),
  ...Array.from({ length: Math.floor((x2 - x1) / step) }, (_, i) => p(`M${x1 + 13 + i * step} ${y1 + 44 + (i % 2) * 10}l-8 22`, 'none', 2.4, { stroke: C.water2 })));
const star = (x, y, s = 1, fill = C.yellow2) => at(x, y, s, p('M0 -20L6 -6 21 -6 9 3 13 18 0 9 -13 18 -9 3 -21 -6 -6 -6Z', fill, 1.8));
const flake = (x, y, s = 1) => at(x, y, s, p('M0 -14V14M-12 -7L12 7M-12 7L12 -7M-4 -10L0 -6 4 -10M-4 10L0 6 4 10', 'none', 2, { stroke: C.white }));
const hills = (fill = C.green2) => p('M0 230Q80 190 160 220Q240 180 320 210Q370 196 400 206V300H0Z', fill, 2.2);
const house = (x, y, s = 1) => at(x, y, s, r(-50, -70, 100, 70, C.brick, 2.4), p('M-62 -66L0 -116 62 -66Z', C.green, 2.4), r(-14, -36, 24, 36, C.brown, 2), r(18, -54, 20, 18, C.water, 1.8));
const thermometer = (x, y, level, s = 1) => at(x, y, s, r(-14, -170, 28, 160, C.white, 2.4, { rx: 14 }), c(0, 0, 22, C.brick, 2.4), r(-6, -level, 12, level, C.brick, 0, { stroke: 'none' }),
  ...Array.from({ length: 7 }, (_, i) => p(`M14 ${-30 - i * 20}H24`, 'none', 2)));

export default [
  { word: 'onweer', alt: 'a thunderstorm: a dark cloud with lightning and heavy rain over a house', art: g('', r(0, 0, 400, 300, '#cfd3cf', 0, { stroke: 'none' }), hills(C.green4), house(200, 250, 1),
    rain(70, 330, 110, 0), darkCloud(130, 80, 1.4), darkCloud(270, 70, 1.6), bolt(220, 92, 1)) },
  { word: 'bliksem', alt: 'a bright bolt of lightning striking down from a cloud', art: g('', r(0, 0, 400, 300, '#cfd3cf', 0, { stroke: 'none' }),
    glow('M210 90L180 160H204L180 240L250 140H222L242 90', 30), darkCloud(200, 70, 2), at(212, 88, 1.5, p('M0 0L-22 50H-4L-20 100L28 34H8L22 0Z', C.yellow2, 2.2)), hills(C.green4)) },
  { word: 'donder', alt: 'Max the dog cowering under a dark cloud that booms with thunder', art: g('', darkCloud(250, 70, 1.6),
    marks('M180 110Q170 130 180 150M160 100Q144 130 160 160M320 110Q330 130 320 150M340 100Q356 130 340 160', C.dark, 3),
    shadow(190, 262, 120), at(180, 258, 0.95, dog()), marks('M96 206l-6 6M96 226l-8 2M118 250l-6 8M262 250l6 8M286 214l8 -2', C.dark, 2), p('M300 116Q306 128 302 132Q296 132 298 122Z', C.water, 1.4)) },
  { word: 'hagel', alt: 'white hailstones falling from a grey cloud and lying on the ground', art: g('', greyCloud(200, 70, 2),
    ...[[110, 130], [160, 150], [210, 128], [260, 156], [300, 132], [140, 190], [230, 196], [290, 200], [180, 220], [120, 236]].map(([x, y]) => c(x, y, 7, C.white, 1.8)),
    r(0, 250, 400, 50, '#c3c9b4', 0, { stroke: 'none' }), ...Array.from({ length: 14 }, (_, i) => c(20 + i * 27, 256 + (i % 3) * 8, 6, C.white, 1.6))) },
  { word: 'regenboog', alt: 'a rainbow over green hills after the rain', art: g('', r(0, 0, 400, 300, sky, 0, { stroke: 'none' }),
    ...[C.brick, C.orange, C.yellow2, C.green3, C.blue, C.purple].map((col, i) => p(`M${40 + i * 14} 240A${160 - i * 14} ${150 - i * 14} 0 0 1 ${360 - i * 14} 240`, 'none', 14, { stroke: col })),
    cloud(70, 220, 1.1), hills(C.green2)) },
  { word: 'plas', alt: 'a large puddle on the street with rain drops making rings in it', art: g('', r(0, 150, 400, 150, '#cfccc0', 0, { stroke: 'none' }), p('M0 150H400', 'none', 2.4),
    p('M70 220Q60 186 130 180Q200 170 270 182Q350 190 334 226Q320 256 220 258Q90 262 70 220Z', C.water, 2.4),
    e(150, 214, 20, 6, 'none', 1.8, { stroke: C.white }), e(240, 228, 26, 7, 'none', 1.8, { stroke: C.white }), e(240, 228, 12, 3, 'none', 1.4, { stroke: C.white }),
    rain(60, 340, 30, 0, 40)) },
  { word: 'druppel', alt: 'one big drop of water running down a window pane', art: g('', r(60, 30, 280, 240, '#d9e5e4', 3), p('M200 30V270M60 150H340', 'none', 8, { stroke: C.cream }), p('M200 30V270M60 150H340', 'none', 2),
    p('M130 60Q132 120 128 170', 'none', 3, { stroke: C.white }), p('M120 170Q104 200 110 214Q120 230 136 216Q146 200 120 170Z', C.water, 2.2), c(122, 206, 3, C.white, 0, { stroke: 'none' })) },
  { word: 'hemel', alt: 'a wide blue sky with a few white clouds above a low landscape', art: g('', r(0, 0, 400, 300, '#b9d0dc', 0, { stroke: 'none' }), cloud(100, 80, 1), cloud(290, 120, 0.8), cloud(250, 50, 0.6),
    marks('M170 160q6 -6 12 0q6 -6 12 0M210 140q5 -5 10 0q5 -5 10 0', C.dark, 2), p('M0 260Q100 250 200 258T400 254V300H0Z', C.green2, 2)) },
  { word: 'ster', alt: 'a dark night sky with one bright star', art: g('', r(0, 0, 400, 300, night, 0, { stroke: 'none' }), glow('M200 110V110', 50), star(200, 112, 1.8), p('M0 266Q100 254 200 262T400 258V300H0Z', '#3d4b45', 2)) },
  { word: 'maan', alt: 'a full moon shining over dark hills at night', art: g('', r(0, 0, 400, 300, night, 0, { stroke: 'none' }), c(220, 110, 56, '#f1e7c4', 2.4), c(200, 96, 10, '#e2d6a8', 0, { stroke: 'none' }), c(240, 128, 8, '#e2d6a8', 0, { stroke: 'none' }),
    marks('M140 110H120M300 110H320M220 30V14M164 54L150 40M276 54L290 40', '#e2d6a8', 2.4), p('M0 250Q100 220 200 246Q300 214 400 240V300H0Z', '#3d4b45', 2)) },
  { word: 'weerbericht', alt: 'a television showing a weather forecast map with sun and rain symbols', art: g('', r(60, 40, 280, 190, C.dark, 2.6), r(74, 54, 252, 162, '#cfe0d6', 2),
    p('M120 200Q100 150 140 120Q160 80 210 92Q260 70 280 120Q300 170 260 200Z', C.green3, 2), at(160, 140, 0.6, sun(0, 0, 22)), at(240, 116, 0.6, cloud(0, 0, 1, C.white)), p('M230 132l-6 12M244 132l-6 12M258 132l-6 12', 'none', 2, { stroke: C.water2 }),
    r(232, 160, 40, 24, C.white, 1.6), p('M170 230L150 262M230 230L250 262', 'none', 5)) },
  { word: 'graad', alt: 'a thermometer showing twenty degrees beside the sun', art: g('', sun(110, 90, 30), thermometer(250, 252, 100, 1.2), ...Array.from({ length: 4 }, (_, i) => p(`M${300} ${152 - i * 24}h20`, 'none', 0))) },
  { word: 'hitte', alt: 'the old man sweating under a blazing sun with heat waves', art: g('', r(0, 0, 400, 300, '#f3e2c2', 0, { stroke: 'none' }), sun(300, 70, 36),
    marks('M60 120q10 -12 0 -24q-10 -12 0 -24M90 140q10 -12 0 -24q-10 -12 0 -24M340 200q10 -12 0 -24q-10 -12 0 -24', C.orange, 2.4),
    shadow(190, 264, 80), stand(190, 270, 0.82, figureOf('old-man.svg')), p('M212 70Q206 82 210 86Q216 86 214 76Z', C.water, 1.4), p('M168 80Q162 92 166 96Q172 96 170 86Z', C.water, 1.4)) },
  { word: 'vorst', alt: 'white frost on blades of grass and a leaf, with ice crystals', art: g('', r(0, 0, 400, 300, '#dfe6e6', 0, { stroke: 'none' }),
    ...Array.from({ length: 14 }, (_, i) => p(`M${20 + i * 28} 300Q${14 + i * 28} 230 ${30 + i * 28} ${170 + (i % 3) * 20}`, '#e9f0ee', 4, { stroke: C.green2 })),
    ...Array.from({ length: 14 }, (_, i) => p(`M${20 + i * 28} 300Q${14 + i * 28} 230 ${30 + i * 28} ${170 + (i % 3) * 20}`, 'none', 2, { stroke: C.white })),
    flake(90, 80, 1.6), flake(200, 60, 1.2), flake(310, 90, 1.5), flake(150, 130, 0.9), flake(260, 140, 1)) },
  { word: 'zonnig', alt: 'a bright sun shining over a green landscape', art: g('', r(0, 0, 400, 300, '#e9ecd8', 0, { stroke: 'none' }), sun(200, 100, 46), hills(C.green3), tree(320, 240, 0.6), bush(80, 246, 0.8)) },
  { word: 'bewolkt', alt: 'a sky full of grey clouds', art: g('', r(0, 0, 400, 300, '#d6d9d6', 0, { stroke: 'none' }), greyCloud(90, 80, 1.6), greyCloud(280, 70, 1.8), greyCloud(190, 150, 1.7), cloud(330, 170, 1.2, C.grey2), cloud(60, 180, 1.1, C.grey2), hills(C.green2)) },
  { word: 'vriezen', alt: 'icicles hanging from a roof and a thermometer below zero', art: g('', r(0, 0, 400, 300, '#dde5e8', 0, { stroke: 'none' }),
    p('M0 40H300L320 70H0Z', C.brick2, 2.4), ...Array.from({ length: 9 }, (_, i) => p(`M${20 + i * 32} 70L${28 + i * 32} ${120 + (i % 3) * 30}L${36 + i * 32} 70Z`, '#eef4f6', 2)),
    thermometer(340, 262, 30, 1), r(0, 250, 300, 50, C.white, 0, { stroke: 'none' }), p('M0 250H300', 'none', 2)) },
  { word: 'waaien', alt: 'a tree bending in a strong wind with leaves blowing away', art: g('', hills(C.green2),
    at(200, 250, 1.1, p('M-8 0Q-4 -60 24 -100L36 -94Q10 -50 10 0Z', '#8a7552', 2.2), p('M30 -170Q-20 -170 -10 -130Q-30 -100 10 -86Q40 -70 80 -96Q120 -110 100 -140Q100 -176 60 -172Z', C.green3, 2.4)),
    marks('M20 80H120M10 120H90M30 160H110M280 70H370M300 110H380', C.grey, 3), ...[[300, 160, 20], [340, 140, -30], [360, 190, 40]].map(([x, y, a]) => g(`translate(${x} ${y}) rotate(${a})`, p('M0 -10Q12 0 0 10Q-12 0 0 -10Z', C.green3, 1.6)))) },
  { word: 'regenjas', alt: 'a yellow hooded raincoat', art: g('', shadow(200, 262, 110),
    p('M168 56Q168 26 200 26Q232 26 232 56L232 70H168Z', '#e2c04e', 2.4), p('M176 64Q200 50 224 64', 'none', 2),
    p('M168 66Q130 76 120 110L92 210 120 220 140 150 136 256H264L260 150 280 220 308 210 280 110Q270 76 232 66Z', '#e2c04e', 2.4),
    p('M200 70V256', 'none', 2), ...[110, 150, 190, 230].map((y) => c(208, y, 4, C.white, 1.4)), p('M150 180H178V200H150ZM222 180H250V200H222Z', 'none', 1.8)) },
  { word: 'muts', alt: 'a warm knitted woolly hat with a bobble on top', art: g('', shadow(200, 252, 110),
    p('M110 230Q100 120 200 110Q300 120 290 230Z', C.brick, 2.4), r(100, 210, 200, 40, '#c97a62', 2.4, { rx: 10 }), ...Array.from({ length: 9 }, (_, i) => p(`M${116 + i * 21} 214V246`, 'none', 2, { stroke: C.brick2 })),
    ...[-2, -1, 0, 1, 2].map((i) => p(`M${200 + i * 34} 206Q${200 + i * 30} 160 ${200 + i * 18} 120`, 'none', 1.6, { stroke: C.brick2 })), c(200, 100, 24, C.cream, 2.4)) },
];
