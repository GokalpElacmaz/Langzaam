import { C, p, c, e, r, g, at, shadow, glow, marks, woman, man, stand, hand } from './lib.mjs';

const steam = (x, y, s = 1) => at(x, y, s, marks('M-16 0Q-24 -14 -14 -26Q-6 -38 -14 -50M0 -4Q-8 -18 2 -30Q10 -42 2 -54M16 0Q8 -14 18 -26Q26 -38 18 -50', C.grey, 2.4));
const table = (y = 236) => g('', r(0, y, 400, 300 - y, '#d9c7a3', 0, { stroke: 'none' }), p(`M0 ${y}H400`, 'none', 2.4));
const wood = '#c9a571';
const flourBag = (x, y, s = 1) => at(x, y, s, p('M-44 0V-96Q-46 -112 -34 -118H34Q46 -112 44 -96V0Z', '#efe6d0', 2.4), p('M-34 -118Q-20 -128 0 -124Q20 -128 34 -118', 'none', 2),
  p('M0 -30V-82M0 -44L-12 -52M0 -44L12 -52M0 -58L-12 -66M0 -58L12 -66M0 -72L-10 -80M0 -72L10 -80', 'none', 2.4, { stroke: C.tan2 }));
const milk = (x, y, s = 1) => at(x, y, s, p('M-26 0V-90L-14 -110H14L26 -90V0Z', C.white, 2.4), p('M-26 -90H26M-14 -110L0 -96 14 -110', 'none', 2), r(-20, -70, 40, 36, C.blue, 1.8), p('M-12 -52Q0 -62 12 -52', 'none', 2, { stroke: C.white }));
const egg = (x, y, s = 1) => at(x, y, s, p('M0 -40Q-22 -40 -22 -14Q-22 4 0 4Q22 4 22 -14Q22 -40 0 -40Z', '#efdcc0', 2));
const butter = (x, y, s = 1) => at(x, y, s, p('M-34 0V-24L-22 -34H34V-10L22 0Z', C.yellow2, 2.2), p('M-34 -24H22V0M22 -24L34 -34', 'none', 2));
const sugar = (x, y, s = 1) => at(x, y, s, r(-26, -64, 52, 64, C.white, 2.2), r(-26, -64, 52, 18, C.blue, 2), ...[[-10, -26], [8, -30], [0, -14]].map(([a, b]) => r(a - 5, b - 5, 10, 10, C.white, 1.4)));
const plate = (x, y, w = 110) => g('', e(x, y, w, w * 0.22, C.white, 2.4), e(x, y - 2, w * 0.72, w * 0.14, 'none', 1.4, { stroke: C.grey2 }));
const jar = (x, y, fill, lid = C.brick, s = 1) => at(x, y, s, p('M-40 0Q-46 0 -46 -10V-86Q-46 -98 -36 -100H36Q46 -98 46 -86V-10Q46 0 40 0Z', fill, 2.4), r(-40, -116, 80, 18, lid, 2.2), p('M-30 -80Q-34 -50 -30 -20', 'none', 3, { stroke: C.white, opacity: '.7' }));
const pot = (x, y, s = 1) => at(x, y, s, p('M-80 -70H80V-12Q80 0 66 0H-66Q-80 0 -80 -12Z', C.grey, 2.4), p('M-90 -70H90', 'none', 6), p('M-80 -52H-100M80 -52H100', 'none', 7));

export default [
  { word: 'bakken', alt: 'Lotte beside an oven with a cake baking inside', art: g('', shadow(200, 268, 170),
    r(170, 120, 190, 150, C.grey3, 2.4), r(188, 150, 154, 100, C.dark, 2.2), r(198, 160, 134, 80, '#e7b36c', 1.6, { opacity: '.8' }),
    p('M228 230V206Q265 192 302 206V230Z', C.tan2, 2), p('M228 206Q265 196 302 206', 'none', 3, { stroke: C.cream }), r(170, 120, 190, 24, C.grey2, 2.2), c(196, 132, 5, C.dark, 1.2), c(216, 132, 5, C.dark, 1.2), p('M190 146H340', 'none', 2),
    stand(100, 272, 0.82, woman())) },
  { word: 'schillen', alt: 'a knife peeling a green apple, a long strip of peel curling down', art: g('', shadow(200, 262, 110),
    c(180, 150, 62, '#9db36e', 2.4), p('M180 88Q176 74 184 66', 'none', 4, { stroke: C.brown }), p('M184 76Q200 62 212 74Q198 84 184 76Z', C.green3, 1.6),
    p('M200 92Q246 112 240 168Q234 204 196 212Q226 180 222 150Q218 112 200 92Z', '#f1e7b8', 1.8),
    p('M236 176Q262 196 250 222Q238 246 268 258Q288 262 296 250', 'none', 13, { stroke: C.line }), p('M236 176Q262 196 250 222Q238 246 268 258Q288 262 296 250', 'none', 9, { stroke: '#9db36e' }),
    p('M228 170L330 112L336 122L236 182Z', C.grey2, 2), p('M330 112L370 90L378 102L336 122Z', C.brown, 2)) },
  { word: 'roeren', alt: 'a spoon stirring soup in a pot on the stove, with a circular arrow and steam', art: g('',
    r(70, 236, 260, 30, C.dark, 2.2), c(150, 251, 6, C.grey, 1.4), c(250, 251, 6, C.grey, 1.4),
    pot(200, 236, 1.2), e(200, 152, 96, 16, C.orange, 2), p('M222 150L286 40', 'none', 8, { stroke: C.brown }),
    p('M150 128Q200 108 252 130', 'none', 3, { stroke: C.tan2 }), p('M244 120L254 132 240 136', 'none', 3, { stroke: C.tan2 }), steam(150, 110, 0.8)) },
  { word: 'mengen', alt: 'a whisk mixing flour and milk in a bowl, next to a flour bag and a milk carton', art: g('', table(),
    p('M110 170H290Q284 236 200 240Q116 236 110 170Z', C.cream, 2.4), e(200, 170, 90, 16, '#f5efdc', 2.2), p('M168 168Q200 156 232 172Q200 186 168 168Z', 'none', 2, { stroke: C.sand }),
    p('M206 166L254 70', 'none', 6, { stroke: C.grey }), p('M200 170Q186 150 206 132Q224 146 212 172Z', 'none', 2), p('M196 168Q178 150 196 128', 'none', 2),
    flourBag(60, 236, 0.7), milk(350, 236, 0.85)) },
  { word: 'raspen', alt: 'a piece of cheese being grated on a grater, with shreds falling', art: g('', table(240),
    p('M130 240L160 70H250L280 240Z', C.grey2, 2.4), p('M168 64H242V82H168Z', C.dark, 2), ...Array.from({ length: 6 }, (_, i) => p(`M${170 + (i % 3) * 22} ${110 + Math.floor(i / 3) * 40}l10 6`, 'none', 2.6)),
    ...Array.from({ length: 6 }, (_, i) => p(`M${176 + (i % 3) * 22} ${126 + Math.floor(i / 3) * 40}h12`, 'none', 2)),
    p('M250 130L330 110 344 160 266 182Z', C.yellow2, 2.2), p('M250 130L330 110 334 120 254 140Z', '#efd27a', 1.6),
    ...[[300, 210], [316, 230], [292, 236], [324, 214]].map(([x, y]) => p(`M${x} ${y}l6 8`, 'none', 3, { stroke: '#e3c25e' }))) },
  { word: 'meel', alt: 'a bag of white flour with a wheat ear on it and a little spilled flour', art: g('', table(),
    flourBag(190, 236, 1.3), p('M260 236Q290 222 320 236Z', C.white, 1.6), c(330, 230, 4, C.white, 1.2), p('M250 208Q256 220 268 226', 'none', 0)) },
  { word: 'deeg', alt: 'a soft ball of dough on a floured board with a rolling pin', art: g('', table(),
    p('M60 236L80 196H330L350 236Z', wood, 2.4), p('M120 220Q140 206 160 222M240 214Q260 206 280 216', 'none', 2, { stroke: C.white }),
    p('M140 214Q130 160 196 156Q262 160 252 214Z', '#efdcb4', 2.4), marks('M170 182Q180 176 190 184', '#c9b48a', 1.6),
    p('M268 196L360 160', 'none', 18, { stroke: C.line }), p('M268 196L360 160', 'none', 14, { stroke: wood })) },
  { word: 'room', alt: 'an open fridge with a carton of cream highlighted on a shelf', art: g('', shadow(200, 270, 130),
    r(110, 30, 180, 240, C.white, 2.6), r(118, 40, 164, 220, '#eef3ef', 1.6), p('M118 120H282M118 190H282', 'none', 3, { stroke: C.grey2 }),
    glow('M170 186V140H214V186', 20), p('M170 186V130L182 118H202L214 130V186Z', C.white, 2.2), r(176, 150, 32, 22, C.cream, 1.6), p('M182 158Q192 152 202 158', 'none', 2, { stroke: C.yellow }),
    c(244, 104, 14, C.brick, 2), r(232, 160, 28, 30, C.green3, 2), p('M130 106H156V120H130Z', C.yellow2, 1.8), p('M290 40L340 70V270L290 270', C.white, 2.4)) },
  { word: 'honing', alt: 'a jar of golden honey with a wooden dipper, honey dripping', art: g('', table(), jar(190, 236, '#e3b85b', C.brown, 1.1),
    p('M250 120L300 60', 'none', 6, { stroke: C.brown }), ...[0, 1, 2].map((i) => e(238 - i * 4, 130 + i * 10, 12, 5, '#c9944a', 1.6)), p('M232 150Q228 166 234 176', 'none', 4, { stroke: '#e3b85b' })) },
  { word: 'jam', alt: 'a jar of red jam with a spoon beside it', art: g('', table(), jar(180, 236, '#b8485a', C.white, 1.1), p('M150 136H210', 'none', 0),
    p('M136 116Q144 108 152 116M168 110Q176 102 184 110M200 116Q208 108 216 116', 'none', 1.6, { stroke: C.brick }),
    p('M260 230L340 200', 'none', 6, { stroke: C.grey }), e(250, 232, 16, 9, C.grey2, 2), e(250, 230, 10, 5, '#b8485a', 1)) },
  { word: 'mosterd', alt: 'a pot of yellow mustard with a small spoon', art: g('', table(), jar(200, 236, '#d9b63c', C.green4, 1.0), e(200, 132, 30, 6, '#e8cc5c', 1.4),
    p('M236 120L276 60', 'none', 5, { stroke: wood }), e(234, 126, 10, 6, wood, 1.6)) },
  { word: 'chocolade', alt: 'a brown chocolate bar partly unwrapped with two broken pieces', art: g('', table(),
    p('M70 210L250 140 300 168 120 238Z', '#7a5038', 2.4), ...[0, 1, 2].map((i) => p(`M${114 + i * 46} ${193 - i * 18}L${164 + i * 46} ${221 - i * 18}`, 'none', 1.6)),
    p('M190 162L250 140 300 168 240 190Z', C.rust, 2.2), p('M200 166L250 147 290 168', 'none', 1.4, { stroke: C.cream }),
    r(300, 200, 34, 24, '#7a5038', 2), r(330, 224, 30, 22, '#7a5038', 2)) },
  { word: 'koekje', alt: 'a plate of small round biscuits', art: g('', shadow(200, 252, 140), plate(200, 236, 130),
    ...[[150, 222], [200, 216], [250, 222], [176, 200], [226, 200]].map(([x, y]) => g('', e(x, y, 30, 12, '#d6a65e', 2), e(x, y - 3, 26, 9, '#e3bb74', 1.4), c(x - 8, y - 4, 2, '#7a5038', 0, { stroke: 'none' }), c(x + 6, y - 2, 2, '#7a5038', 0, { stroke: 'none' })))) },
  { word: 'pannenkoek', alt: 'a stack of warm pancakes on a plate with steam rising', art: g('', shadow(200, 252, 140), plate(200, 236, 130),
    ...[0, 1, 2, 3].map((i) => g('', e(200, 224 - i * 12, 96, 16, '#e3b56c', 2.2), p(`M110 ${226 - i * 12}Q200 ${246 - i * 12} 290 ${226 - i * 12}`, 'none', 1.4, { stroke: '#b9853f' }))),
    e(200, 184, 30, 8, C.yellow2, 1.6), steam(200, 160, 1)) },
  { word: 'boterham', alt: 'a slice of bread with cheese on a plate', art: g('', shadow(200, 252, 140), plate(200, 240, 130),
    p('M120 232V130Q120 98 152 96Q170 80 200 84Q236 80 252 98Q282 100 280 132V232Z', '#d9b07a', 2.4), p('M134 224V136Q134 112 158 110Q174 96 200 98Q230 96 244 112Q266 114 266 138V224Z', '#f3e2bd', 1.8),
    p('M138 150H262V200H138Z', C.yellow2, 2), c(170, 170, 6, '#e8cc5c', 1.2), c(222, 184, 5, '#e8cc5c', 1.2)) },
  { word: 'ingrediënt', alt: 'baking ingredients on a table: flour, milk, an egg, butter and sugar', art: g('', table(), flourBag(70, 236, 0.75), milk(150, 236, 0.85), egg(212, 236, 1), butter(270, 236, 1), sugar(345, 236, 0.9)) },
  { word: 'gram', alt: 'a piece of cheese on a kitchen scale whose dial points to one hundred', art: g('', table(),
    p('M100 236L120 150H280L300 236Z', C.white, 2.4), c(200, 196, 30, C.cream, 2), p('M200 196L216 176', 'none', 3, { stroke: C.brick }), ...Array.from({ length: 7 }, (_, i) => { const a = Math.PI * (1 + i / 6); return p(`M${(200 + Math.cos(a) * 24).toFixed(1)} ${(196 + Math.sin(a) * 24).toFixed(1)}L${(200 + Math.cos(a) * 29).toFixed(1)} ${(196 + Math.sin(a) * 29).toFixed(1)}`, 'none', 1.6); }),
    r(110, 140, 180, 12, C.grey2, 2), p('M150 140L170 96H240L250 140Z', C.yellow2, 2.2), c(196, 120, 5, '#e8cc5c', 1.2), c(222, 112, 4, '#e8cc5c', 1.2)) },
  { word: 'liter', alt: 'a one-litre measuring jug filled with milk to the top line', art: g('', table(),
    p('M130 236L140 90H270L280 236Z', '#e1eae7', 2.4), p('M136 132H274L280 236H130Z', C.white, 2.2), p('M270 100Q310 110 306 150Q302 186 276 190', 'none', 7),
    ...[0, 1, 2, 3].map((i) => p(`M150 ${210 - i * 26}H${i === 3 ? 196 : 176}`, 'none', 2)), p('M140 90L126 82', 'none', 3)) },
  { word: 'snijplank', alt: 'a wooden chopping board with a knife and a sliced tomato on it', art: g('', table(244),
    p('M60 236Q50 236 50 224V150Q50 138 62 138H320Q332 138 332 150V224Q332 236 320 236Z', wood, 2.4), c(310, 158, 8, '#efe6d0', 1.8), p('M90 170Q130 162 170 172M120 210Q180 202 240 212', 'none', 1.6, { stroke: '#a88552' }),
    p('M100 200L230 176', 'none', 0), p('M110 196L220 170L224 182L116 206Z', C.grey2, 2), p('M220 170L270 160L272 174L224 182Z', C.brown, 2),
    c(270, 210, 18, C.brick, 2), c(236, 214, 14, C.brick, 2), c(236, 214, 7, '#e8a090', 1)) },
  { word: 'waterkoker', alt: 'an electric kettle on its base with steam coming out of the spout', art: g('', table(244),
    r(130, 228, 140, 16, C.dark, 2.2), p('M146 228L156 110Q160 96 176 96H226Q242 96 246 110L256 228Z', C.white, 2.4),
    p('M150 140L110 112Q104 126 152 160', C.white, 2.2), p('M246 120Q290 130 286 170Q282 206 252 210', 'none', 9), p('M246 120Q290 130 286 170Q282 206 252 210', 'none', 5, { stroke: C.grey2 }),
    r(170, 88, 60, 10, C.grey3, 2), r(180, 150, 12, 50, C.water, 1.6), steam(100, 96, 0.9)) },
];
