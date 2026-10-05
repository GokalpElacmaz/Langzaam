import { C, p, c, e, r, g, at, shadow, glow, tuft, cloud, tree, man, woman, stand, marks } from './lib.mjs';
import { dog } from './animals.mjs';

const navy = '#3f5566';
const navy2 = '#4c6577';
// Props are drawn in the figure's own coordinates (man.svg / woman.svg): head near (130, 60),
// the man's hands near (95, 192) and (170, 186), the woman's near (104, 200) and (169, 198), feet at 280.
const person = (x, y, s, body, ...props) => stand(x, y, s, body + props.join(''));
const cap = (fill, brim = fill) => p('M104 50Q106 28 130 27Q154 28 156 50Z', fill, 2.2) + p('M146 48Q166 48 172 56Q156 59 146 54Z', brim, 2);
const peakedCap = (fill = navy, band = C.line) => p('M100 44Q102 28 130 26Q160 26 162 44Q150 50 130 50Q110 50 100 44Z', fill, 2.2) + p('M106 46H156', 'none', 4, { stroke: band }) + p('M140 48Q158 50 166 58Q148 60 138 52Z', C.dark, 2) + c(130, 38, 3.4, C.yellow2, 1.2);
const apron = (fill = C.white) => p('M110 128H148L152 212Q130 220 106 212Z', fill, 2) + p('M114 128Q118 108 128 104Q140 108 144 128', 'none', 1.6);
const tie = (fill = C.brick) => p('M126 104L130 110 134 104 131 112 134 140 130 146 126 140 129 112Z', fill, 1.4);
const womanCoat = (fill = C.white) => p('M121 97L109 114 114 162 98 222Q134 236 176 221L156 162 165 114 147 98Z', fill, 2.4) + p('M134 104V218', 'none', 1.4, { stroke: C.grey });

const kok = () => person(200, 270, 0.88, man({ jacket: C.white, sleeve: C.cream, trousers: C.dark, shoes: C.brown3 }),
  p('M110 44Q96 22 112 12Q118 -4 132 4Q146 -6 156 10Q170 20 154 44Z', C.white, 2.2), r(108, 40, 48, 12, C.cream, 2),
  apron(), c(122, 118, 2, C.line, 0, { stroke: 'none' }), c(122, 132, 2, C.line, 0, { stroke: 'none' }),
  // a pan with steam in his right hand
  p('M168 184L206 176', 'none', 6, { stroke: C.dark }), p('M200 168H262Q262 192 232 194Q204 192 200 168Z', C.grey, 2.2),
  marks('M214 160Q208 150 216 140M230 158Q224 146 232 134M246 160Q240 150 248 140', C.grey, 2));

const kapper = () => g('',
  // salon chair with a client seen from behind, and a mirror
  r(40, 60, 92, 120, C.water, 2.4), p('M52 76L72 96M60 70L96 106', 'none', 2, { stroke: C.white }),
  p('M62 248V226H112V248M56 226H118', 'none', 3), p('M50 228Q50 170 86 170Q122 170 122 228Z', C.brick2, 2.4),
  c(86, 150, 26, C.brown2, 2.2), p('M58 160Q86 186 114 160L118 178Q86 196 54 178Z', C.white, 2),
  person(268, 272, 0.86, woman({ top: C.green4, skirt: C.dark, hair: C.brown }),
    // scissors in her right hand, comb in the left
    p('M164 190L200 168M166 196L204 182', 'none', 3), c(160, 188, 6, 'none', 2.2), c(162, 200, 6, 'none', 2.2),
    p('M96 196L84 160', 'none', 6, { stroke: C.dark }), marks('M90 176L84 178M88 168L82 170M93 184L87 186', C.dark, 1.6)));

const schilder = () => g('',
  r(0, 0, 400, 300, '#e9dfc6', 0, { stroke: 'none' }), r(268, 0, 132, 300, '#cfdcc7', 0, { stroke: 'none' }), p('M268 0V300', 'none', 1.4, { stroke: C.green2 }),
  // stepladder
  p('M110 272L150 166M200 272L166 166', 'none', 6, { stroke: C.line }), p('M110 272L150 166M200 272L166 166', 'none', 3, { stroke: C.tan3 }),
  p('M124 236H188M134 204H180M146 172H170', 'none', 5, { stroke: C.tan2 }),
  person(158, 170, 0.56, man({ jacket: C.white, sleeve: C.cream, trousers: C.cream, shoes: C.brown3 }), cap(C.white, C.cream),
    // paint roller pressed against the wall
    p('M170 186L250 140', 'none', 6, { stroke: C.brown }), p('M250 140L262 118', 'none', 4), r(236, 70, 22, 54, C.green3, 2.2)),
  p('M48 272V244H88V272Z', C.grey2, 2), p('M44 244H92', 'none', 3), p('M50 252Q68 258 86 252', 'none', 3, { stroke: C.green3 }));

const loodgieter = () => g('',
  // a washbasin with a pipe below
  p('M40 126H170V142Q170 162 150 166H60Q40 162 40 142Z', C.white, 2.4), p('M96 126V104Q96 92 108 92H116', 'none', 5), p('M92 104H102', 'none', 4),
  p('M104 166V200Q104 214 120 214H160', 'none', 10, { stroke: C.line }), p('M104 166V200Q104 214 120 214H160', 'none', 6, { stroke: C.grey3 }),
  p('M70 166V270M138 166V270', 'none', 0), r(52, 166, 16, 104, C.grey2, 2), marks('M164 224Q168 232 164 238', C.water2, 2.2), c(166, 244, 3, C.water, 1.4),
  person(270, 272, 0.86, man({ jacket: C.blue2, sleeve: C.blue2, trousers: C.blue2, shoes: C.brown3 }), cap(C.blue),
    // pipe wrench
    p('M96 196L66 136', 'none', 8, { stroke: C.brick2 }), p('M58 140Q48 120 62 112L80 104 84 112 70 120Q66 128 72 134Z', C.grey3, 2), p('M64 136L82 128', 'none', 3)));

const elektricien = () => g('',
  r(0, 0, 400, 300, '#ebe4d2', 0, { stroke: 'none' }),
  r(70, 120, 60, 70, C.white, 2.4), c(90, 155, 5, C.line, 0, { stroke: 'none' }), c(110, 155, 5, C.line, 0, { stroke: 'none' }), c(100, 155, 22, 'none', 2),
  p('M100 120V60Q100 40 120 40H200', 'none', 3, { stroke: C.grey }),
  p('M70 100L84 84 80 98 94 94 78 112 82 100Z', C.yellow, 1.4),
  person(240, 272, 0.86, man({ jacket: C.tan2, sleeve: C.tan2, trousers: C.dark, shoes: C.brown3 }), p('M104 48Q104 22 130 22Q156 22 156 48Z', C.yellow, 2.2) + p('M100 48H162', 'none', 4),
    // tool belt and a screwdriver held towards the socket
    r(98, 186, 58, 12, C.brown, 2), r(104, 196, 12, 18, C.brown2, 1.6), r(136, 196, 12, 18, C.brown2, 1.6),
    p('M96 192L60 170', 'none', 0)),
  p('M162 196L134 170', 'none', 7, { stroke: C.yellow }), p('M134 170L118 156', 'none', 3));

const politieagent = () => g('',
  // crossroads lines
  p('M0 236H400', 'none', 0), r(0, 226, 400, 74, '#cfccc0', 0, { stroke: 'none' }), p('M20 262H70M110 262H160M240 262H290M330 262H380', 'none', 5, { stroke: C.white }),
  person(200, 274, 0.9, man({ jacket: navy, sleeve: navy2, trousers: navy, shoes: C.dark }), peakedCap(),
    p('M112 120H120V128H112Z', C.yellow2, 1.2), p('M100 134H156', 'none', 0),
    // hand up to stop the traffic
    p('M152 111L196 74 204 84 160 128', navy2, 2.4), p('M198 72Q196 54 206 52Q214 54 212 74Q210 84 202 84Z', C.skin, 2)));

const brandweerman = () => g('',
  person(190, 274, 0.9, man({ jacket: '#b39a5a', sleeve: '#b39a5a', trousers: '#b39a5a', shoes: C.dark }),
    p('M100 140H156M100 176H156M88 160L102 164M172 160L158 164', 'none', 5, { stroke: C.yellow2 }),
    p('M98 52Q98 18 130 16Q162 18 162 52Z', C.brick, 2.4), p('M92 52Q130 60 170 52L174 60Q130 68 88 60Z', C.brick2, 2), c(130, 30, 5, C.yellow2, 1.4)),
  // hose
  p('M248 214Q290 230 320 210Q350 190 370 220', 'none', 10, { stroke: C.line }), p('M248 214Q290 230 320 210Q350 190 370 220', 'none', 6, { stroke: C.brick }),
  p('M238 196L254 220', 'none', 9, { stroke: C.grey }), marks('M226 186Q210 170 218 150M236 180Q226 160 240 142', C.water2, 2.4));

const piloot = () => g('',
  cloud(320, 70, 0.9), at(110, 70, 0.7, p('M-80 0Q-80 -14 -60 -14H60Q84 -12 92 0Q84 12 60 14H-60Q-80 14 -80 0Z', C.white, 2.2), p('M-10 -12L-40 -50H-22L20 -12ZM-10 12L-30 40H-14L20 12Z', C.grey2, 2), p('M-76 -2L-94 -30H-80L-62 -10Z', C.grey2, 2), c(70, -2, 4, C.water, 1.2), c(52, -2, 4, C.water, 1.2), c(34, -2, 4, C.water, 1.2)),
  person(230, 274, 0.9, man({ jacket: C.dark, sleeve: C.dark, trousers: C.dark, shoes: C.dark }), peakedCap(C.dark, C.yellow2), tie(C.dark),
    p('M95 176L101 172M164 172L170 176', 'none', 4, { stroke: C.yellow2 }), p('M112 106L130 112 148 106', 'none', 2, { stroke: C.white })));

const tandarts = () => g('',
  // dental chair with a patient, and a lamp
  p('M40 230L150 196L160 214L52 250Z', C.water2, 2.4), r(70, 250, 70, 14, C.grey3, 2), p('M100 250V240', 'none', 5),
  p('M60 220Q58 202 74 200', 'none', 0), c(62, 204, 18, C.skin2, 2.2), p('M48 194Q52 182 64 184Q76 184 80 194', C.brown, 2), e(68, 210, 5, 4, C.brick2, 1.4),
  p('M78 222L150 200L156 212L84 236Z', C.blue, 2),
  p('M40 30H120L110 60', 'none', 4, { stroke: C.grey }), e(110, 66, 18, 8, C.yellow2, 2), marks('M100 80L94 96M112 80L112 98M122 80L128 96', C.yellow, 1.6),
  person(240, 272, 0.86, woman({ top: C.white, skirt: C.white, hair: C.brown2, legs: C.water2 }), womanCoat(),
    p('M100 200L70 196', 'none', 3, { stroke: C.grey }), c(66, 196, 5, C.grey2, 1.4), p('M118 76Q136 92 154 74L156 64Q136 70 118 64Z', C.water, 1.6)));

const dierenarts = () => g('',
  r(30, 198, 170, 14, C.grey3, 2.2), p('M48 212V270M182 212V270', 'none', 5),
  at(118, 198, 0.5, dog()),
  person(270, 272, 0.86, woman({ top: C.green3, skirt: C.white, hair: C.brown, legs: C.green3 }), womanCoat(),
    p('M124 104Q118 130 130 140Q142 130 146 104', 'none', 2.4, { stroke: C.dark }), c(130, 142, 5, C.grey2, 1.6)));

const advocaat = () => person(200, 274, 0.9, man({ jacket: C.dark, sleeve: C.dark, trousers: C.dark, shoes: C.dark, hair: C.brown3 }), tie(C.brick2),
  p('M112 106L130 112 148 106', 'none', 2, { stroke: C.white }),
  // briefcase and papers
  r(74, 200, 50, 38, C.brown, 2.2), p('M90 200V192H108V200', 'none', 2.4), p('M74 214H124', 'none', 1.4),
  p('M170 176L206 150 222 174 186 200Z', C.white, 2), marks('M190 168L206 158M194 174L210 164M198 180L214 170', C.grey, 1.4));

const postbode = () => g('',
  // a letterbox on a post
  r(300, 150, 60, 44, C.brick, 2.4), p('M308 166H352', 'none', 3), p('M330 194V270', 'none', 6),
  person(190, 274, 0.9, man({ jacket: C.brick2, sleeve: C.brick2, trousers: navy, shoes: C.dark }), cap(navy),
    p('M154 108L106 196', 'none', 4, { stroke: C.brown }), p('M88 180H124V222H88Z', C.brown, 2.2),
    // parcel
    p('M150 160H210V206H150Z', C.tan3, 2.2), p('M180 160V206M150 182H210', 'none', 2, { stroke: C.brown })));

const kassier = () => g('',
  person(250, 230, 0.78, woman({ top: C.brick, skirt: C.brick, hair: C.brown2 })),
  // checkout counter with a till and shopping
  r(20, 190, 360, 80, C.grey3, 2.4), p('M20 206H380', 'none', 2), r(220, 150, 64, 40, C.dark, 2.2), r(228, 156, 48, 16, C.water, 1.4), p('M234 182H278', 'none', 3, { stroke: C.grey }),
  r(70, 168, 30, 22, C.white, 2), c(140, 178, 12, C.brick, 2), p('M150 168Q156 160 160 166', 'none', 2, { stroke: C.green4 }), r(170, 160, 22, 30, C.yellow2, 2));

const monteur = () => g('',
  // car with the bonnet open
  p('M20 230Q22 196 60 190L110 160H210L250 190Q290 194 296 230Z', C.blue, 2.4), p('M120 166L102 190H230L204 166Z', C.water, 2),
  p('M250 190L300 120', 'none', 5), p('M248 190L300 122 310 128 262 196Z', C.blue, 2), c(70, 234, 22, C.dark, 2.4), c(250, 234, 22, C.dark, 2.4), c(70, 234, 8, C.grey3, 1.6), c(250, 234, 8, C.grey3, 1.6),
  person(338, 272, 0.76, man({ jacket: C.grey, sleeve: C.grey, trousers: C.grey, shoes: C.brown3 }), cap(C.grey3),
    p('M96 196L60 168', 'none', 6, { stroke: C.grey3 }), p('M48 156L62 160 58 176Z', C.grey3, 2)));

const kunstenaar = () => g('',
  // easel with a painting
  p('M80 270L120 60M200 270L160 60M140 70V270', 'none', 6, { stroke: C.line }), p('M80 270L120 60M200 270L160 60', 'none', 3, { stroke: C.tan2 }),
  r(80, 80, 120, 100, C.white, 2.4), p('M84 176L120 130 146 160 160 146 196 176Z', C.green3, 1.6), c(170, 110, 12, C.yellow2, 1.6),
  person(286, 272, 0.86, woman({ top: C.rust, skirt: C.dark, hair: C.brown2 }),
    p('M110 40Q112 22 136 24Q160 26 158 42Q134 34 110 40Z', C.brick2, 2), c(112, 34, 4, C.brick2, 1.4),
    p('M100 198L78 170', 'none', 4, { stroke: C.brown }), p('M76 166L70 158', 'none', 5, { stroke: C.brick }),
    p('M160 200Q190 180 212 198Q214 214 192 214Q176 222 160 210Z', C.tan3, 2), c(180, 200, 4, C.brick, 1), c(194, 196, 4, C.yellow, 1), c(200, 208, 4, C.blue, 1)));

const schoonmaker = () => g('',
  r(0, 238, 400, 62, '#ddd6c2', 0, { stroke: 'none' }), marks('M60 262Q90 256 120 262M150 280Q190 274 230 280', C.water2, 2),
  person(220, 272, 0.88, woman({ top: C.blue2, skirt: C.blue2, hair: C.brown, legs: C.blue2 }),
    // mop
    p('M104 200L40 280', 'none', 5, { stroke: C.tan2 }), p('M24 276L58 290 52 300 16 288Z', C.grey2, 2)),
  // bucket
  p('M290 270L284 226H336L330 270Z', C.yellow2, 2.2), p('M284 226Q310 200 336 226', 'none', 2.4), e(310, 226, 26, 5, C.water, 1.6));

const uniform = () => g('',
  // a police uniform on a hanger, with its cap above
  p('M200 46V36Q200 28 208 28Q216 30 214 38', 'none', 2.4), p('M150 64L200 50 250 64', 'none', 3, { stroke: C.brown }),
  p('M150 66L118 160 140 168 156 116 156 250H244V116L260 168 282 160 250 66 224 58 200 90 176 58Z', navy, 2.4),
  p('M176 58L200 90 224 58 214 54 200 70 186 54Z', C.white, 2), p('M200 90V250', 'none', 1.6), c(200, 130, 3, C.yellow2, 1.2), c(200, 170, 3, C.yellow2, 1.2), c(200, 210, 3, C.yellow2, 1.2),
  p('M166 120H184V132H166Z', C.yellow2, 1.4), p('M118 160L140 168', 'none', 0),
  at(320, 230, 1.0, p('M-40 -10Q-38 -30 0 -32Q40 -30 42 -10Q20 -2 0 -2Q-20 -2 -40 -10Z', navy, 2.2), p('M-34 -8H36', 'none', 4), p('M10 -6Q30 -4 40 6Q16 8 4 0Z', C.dark, 2), c(0, -20, 4, C.yellow2, 1.2)));

const note = (x, y, rot = 0) => g(`translate(${x} ${y}) rotate(${rot})`, r(-46, -24, 92, 48, '#b9c9a4', 2.2), c(0, 0, 14, '#cfdcbc', 1.6), p('M4 -8Q-6 -10 -8 0Q-6 10 4 8M-12 -3H2M-12 3H2', 'none', 2), r(-40, -18, 80, 36, 'none', 1, { stroke: '#8fa477' }));
const salaris = () => g('',
  // an open pay envelope with a few banknotes and coins
  shadow(200, 252, 130), note(180, 140, -12), note(214, 150, 6),
  p('M100 150H300V250H100Z', C.cream, 2.4), p('M100 150L200 206 300 150', 'none', 2), p('M100 250L176 198M300 250L224 198', 'none', 1.6),
  c(320, 238, 14, C.yellow2, 2), c(344, 248, 12, C.grey2, 2), c(80, 244, 13, C.yellow2, 2));

const building = () => g('', r(150, 40, 130, 220, C.grey3, 2.4), ...[0, 1, 2, 3, 4, 5].flatMap((row) => [0, 1, 2].map((col) => r(164 + col * 38, 56 + row * 30, 26, 18, C.water, 1.6))), r(196, 230, 38, 30, C.dark, 2));
const werkgever = () => g('', building(), shadow(110, 268, 60, 8),
  person(100, 272, 0.78, woman({ top: C.dark, skirt: C.dark, hair: C.brown2 }), womanCoat(C.dark), p('M128 104L134 116 140 104', 'none', 2, { stroke: C.white }),
    // arm stretched out towards her company
    p('M158 103L208 120 204 132 160 126', C.dark, 2.2), p('M206 118Q222 118 222 126Q220 134 206 132Z', C.skin2, 2)),
  tree(350, 262, 0.7));

const werknemer = () => {
  const crowd = [
    [70, man({ jacket: C.green4, trousers: C.dark })], [130, woman({ top: C.rust, skirt: C.dark, hair: C.brown2 })], [190, man({ jacket: C.blue2, trousers: C.grey, hair: C.brown3 })],
    [250, woman({ top: C.green3, skirt: C.blue2, hair: C.tan2 })], [310, man({ jacket: C.tan2, trousers: C.dark, hair: C.dark })],
  ];
  return g('', r(30, 36, 340, 120, C.grey3, 2.4), ...Array.from({ length: 8 }, (_, i) => r(44 + i * 41, 52, 28, 18, C.water, 1.4)), ...Array.from({ length: 8 }, (_, i) => r(44 + i * 41, 84, 28, 18, C.water, 1.4)),
    shadow(200, 270, 170, 8), ...crowd.map(([x, body], i) => stand(x, 272 - (i % 2) * 4, 0.56, body)));
};

export default [
  { word: 'kok', alt: 'a cook in a white jacket, apron and tall chef’s hat holding a steaming pan', art: g('', shadow(), kok()) },
  { word: 'kapper', alt: 'a hairdresser with scissors and a comb beside a client in a salon chair', art: g('', shadow(200, 262, 170), kapper()) },
  { word: 'schilder', alt: 'a painter in white overalls on a stepladder painting a wall with a roller', art: schilder() },
  { word: 'loodgieter', alt: 'a plumber in blue overalls with a pipe wrench beside a washbasin and its pipe', art: g('', shadow(220, 266, 160), loodgieter()) },
  { word: 'elektricien', alt: 'an electrician with a yellow helmet and tool belt working on a wall socket', art: g('', elektricien(), shadow(240, 270, 90)) },
  { word: 'politieagent', alt: 'a police officer in a dark blue uniform and cap raising a hand at a crossroads', art: politieagent() },
  { word: 'brandweerman', alt: 'a firefighter in a red helmet and striped jacket holding a spraying hose', art: g('', shadow(), brandweerman()) },
  { word: 'piloot', alt: 'a pilot in a dark uniform and cap with an aeroplane in the sky behind', art: g('', shadow(230, 268, 90), piloot()) },
  { word: 'tandarts', alt: 'a dentist in a white coat looking into a patient’s mouth in a dental chair', art: g('', shadow(200, 268, 170), tandarts()) },
  { word: 'dierenarts', alt: 'a vet with a stethoscope examining a dog on a table', art: g('', shadow(200, 270, 170), dierenarts()) },
  { word: 'advocaat', alt: 'a lawyer in a dark suit and tie holding a briefcase and a document', art: g('', shadow(), advocaat()) },
  { word: 'postbode', alt: 'a postman with a mail bag holding a parcel beside a letterbox', art: g('', shadow(230, 268, 160), postbode()) },
  { word: 'kassier', alt: 'a cashier behind a supermarket checkout with a till and groceries', art: kassier() },
  { word: 'monteur', alt: 'a mechanic in grey overalls with a spanner beside a car with its bonnet open', art: g('', shadow(190, 262, 180), monteur()) },
  { word: 'kunstenaar', alt: 'an artist in a beret holding a palette and brush beside a painting on an easel', art: g('', shadow(200, 270, 160), kunstenaar()) },
  { word: 'schoonmaker', alt: 'a cleaner mopping the floor beside a yellow bucket', art: schoonmaker() },
  { word: 'uniform', alt: 'a blue uniform jacket on a hanger with a matching cap', art: g('', shadow(220, 262, 120), uniform()) },
  { word: 'salaris', alt: 'an open pay envelope with two banknotes and a few coins', art: salaris() },
  { word: 'werkgever', alt: 'a woman in a dark suit pointing to her large office building', art: werkgever() },
  { word: 'werknemer', alt: 'five employees standing together in front of their office building', art: werknemer() },
];
