import { readFileSync } from 'node:fs';
import { C, p, c, e, r, g, at, shadow, glow, marks, man, woman, stand, bust, hand, runner, limb, tree, bush } from './lib.mjs';
import { dog } from './animals.mjs';

const pitch = (y = 230) => g('', r(0, y, 400, 300 - y, '#9fb87c', 0, { stroke: 'none' }), p(`M0 ${y}H400`, 'none', 2));
const ball = (x, y, rad = 14) => g('', c(x, y, rad, C.white, 2.2), p(`M${x - rad * 0.4} ${y - rad * 0.3}L${x} ${y - rad * 0.6}L${x + rad * 0.4} ${y - rad * 0.3}L${x + rad * 0.25} ${y + rad * 0.2}L${x - rad * 0.25} ${y + rad * 0.2}Z`, C.dark, 1.2));
const tennisBall = (x, y, rad = 12) => g('', c(x, y, rad, '#d6df7a', 2), p(`M${x - rad} ${y - 2}Q${x} ${y + rad * 0.8} ${x + rad} ${y - 2}`, 'none', 1.6, { stroke: C.white }));
const whistle = (x, y) => g('', p(`M${x} ${y}h18v10h-18z`, C.grey2, 1.6), c(x - 2, y + 9, 7, C.grey2, 1.6));
const armless = (body) => body.replace('M101 108L89 178 103 181 121 125M152 111L174 174 162 180 142 130', 'M101 108L89 178 103 181 121 125').replace('<path d="M89 178Q86 196 96 199Q105 198 103 181M174 173Q181 187 174 193Q166 197 162 180"', '<path d="M89 178Q86 196 96 199Q105 198 103 181"');
const child = (() => {
  const svg = readFileSync(new URL('../../public/images/child.svg', import.meta.url), 'utf8');
  return svg.match(/<g stroke="#405a4b"[\s\S]*<\/g>(?=<\/g><\/svg>)/u)[0];
})();
const goal = (x, y, s = 1) => at(x, y, s, p('M-120 0V-110H120V0', 'none', 9), p('M-120 0V-110H120V0', 'none', 5, { stroke: C.white }),
  ...Array.from({ length: 11 }, (_, i) => p(`M${-110 + i * 22} -106V0`, 'none', 1, { stroke: C.grey })), ...Array.from({ length: 5 }, (_, i) => p(`M-116 ${-90 + i * 20}H116`, 'none', 1, { stroke: C.grey })));
const stands = () => g('', p('M0 40L60 140H340L400 40Z', C.grey3, 2.4), ...Array.from({ length: 4 }, (_, i) => p(`M${16 + i * 12} ${70 + i * 18}H${384 - i * 12}`, 'none', 2, { stroke: C.grey })),
  ...Array.from({ length: 40 }, (_, i) => c(30 + (i % 20) * 17.5, 62 + Math.floor(i / 20) * 26 + ((i * 7) % 5), 5, [C.blue, C.white, C.blue2, C.cream][i % 4], 1)));

export default [
  { word: 'sportschool', alt: 'Bram with a sports bag in a gym with dumbbells and an exercise bike', art: g('', r(0, 230, 400, 70, '#c9c0a8', 0, { stroke: 'none' }), shadow(250, 264, 150),
    r(30, 120, 110, 110, C.cream, 2.2), ...[0, 1, 2].map((i) => g('', r(44, 140 + i * 30, 82, 6, C.grey, 1.6), r(40, 132 + i * 30, 10, 22, C.dark, 1.6), r(120, 132 + i * 30, 10, 22, C.dark, 1.6))),
    p('M300 262L320 180M300 262H360M320 180H350', 'none', 6), c(340, 240, 22, 'none', 4), r(306, 170, 30, 10, C.dark, 2), r(340, 172, 30, 8, C.dark, 2),
    stand(220, 266, 0.8, man({ jacket: C.blue2, trousers: C.dark })), r(232, 202, 50, 34, C.brick, 2.2), p('M244 202Q256 184 270 202', 'none', 3)) },
  { word: 'training', alt: 'a training session: cones and a ball on a pitch with a clock showing seven', art: g('', pitch(200),
    ...[[70, 250], [150, 236], [230, 252], [310, 238]].map(([x, y]) => p(`M${x - 16} ${y}L${x} ${y - 36}L${x + 16} ${y}Z`, C.orange, 2)), ball(190, 270, 16),
    c(300, 90, 46, C.white, 2.6), p('M300 90V58M300 90L276 104', 'none', 3.4), ...Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; return c(300 + Math.cos(a) * 38, 90 + Math.sin(a) * 38, 2, C.line, 0, { stroke: 'none' }); }),
    marks('M60 120h60M80 140h40', C.grey, 0)) },
  { word: 'trainer', alt: 'a coach in a tracksuit and cap with a whistle and a clipboard', art: g('', shadow(), stand(200, 270, 0.9, man({ jacket: C.green4, sleeve: C.green4, trousers: C.green4, shoes: C.white }) +
    p('M104 50Q106 28 130 27Q154 28 156 50Z', C.brick, 2.2) + p('M146 48Q166 48 172 56Q156 59 146 54Z', C.brick, 2) + p('M118 100Q130 136 142 100', 'none', 1.8) + p('M100 120V200M156 120V200', 'none', 2, { stroke: C.white })),
    whistle(196, 146), r(220, 160, 44, 60, C.tan3, 2.2), r(228, 168, 28, 40, C.white, 1.6), p('M232 178h20M232 188h20M232 198h14', 'none', 1.4)) },
  { word: 'hardlopen', alt: 'Lotte running in sports clothes in the park', art: g('', p('M0 240Q200 228 400 240V300H0Z', C.green2, 0, { stroke: 'none' }), tree(60, 240, 0.7), bush(340, 242, 0.9), shadow(200, 262, 90),
    at(200, 262, 0.95, runner({ top: C.green3, shorts: C.dark, hair: C.brown2, bun: true })), marks('M90 140H130M80 170H120M96 200H136', C.grey, 3)) },
  { word: 'schaatsen', alt: 'a pair of ice skates on a frozen pond', art: g('', r(0, 190, 400, 110, '#dbe9ec', 0, { stroke: 'none' }), marks('M40 230L90 220M250 270L320 256M150 280L190 274', C.white, 3),
    ...[[150, 0], [260, 1]].map(([x, i]) => at(x, 230 + i * 10, 1, p('M-40 -10V-110Q-40 -126 -24 -126H6Q18 -126 18 -110V-70Q50 -66 60 -40V-10Z', i ? C.cream : C.white, 2.4), p('M-30 -100H8M-30 -86H8M-30 -72H10', 'none', 1.6),
      p('M-50 2H70Q80 2 76 -6', 'none', 4, { stroke: C.grey }), p('M-30 -10V2M40 -10V2', 'none', 3, { stroke: C.grey })))) },
  { word: 'skiën', alt: 'Bram skiing down a snowy slope between mountains', art: g('', r(0, 0, 400, 300, '#e3eaee', 0, { stroke: 'none' }),
    p('M0 140L80 60 140 120 220 40 320 130 400 80V300H0Z', C.white, 2.2), p('M60 80L80 60 100 80M200 58L220 40 240 58', '#cfd9de', 2),
    p('M0 300L400 170V300Z', '#f4f7f8', 2), g('rotate(-14 200 220)', at(200, 236, 0.75, runner({ top: C.brick, shorts: C.blue2, hair: C.brown, shoes: C.dark })), p('M110 240H300', 'none', 6, { stroke: C.blue }), p('M150 140L130 244M250 128L262 236', 'none', 3))) },
  { word: 'zwembroek', alt: 'a pair of blue swimming trunks', art: g('', shadow(200, 252, 110),
    p('M110 90H290L300 230Q260 238 220 230L200 150 180 230Q140 238 100 230Z', C.blue, 2.6), p('M110 90H290V112H110Z', C.blue2, 2.2), p('M190 100Q200 120 210 100', 'none', 2, { stroke: C.white }), p('M120 200L150 160M270 160L290 200', 'none', 3, { stroke: C.white })) },
  { word: 'badpak', alt: 'a red one-piece swimsuit', art: g('', shadow(200, 262, 90),
    p('M150 40V90Q140 130 150 170Q140 200 160 250H240Q260 200 250 170Q260 130 250 90V40H232V84Q200 110 168 84V40Z', C.brick, 2.6), p('M160 250Q200 220 240 250', 'none', 2.2), p('M156 150Q200 170 244 150', 'none', 3, { stroke: C.rust })) },
  { word: 'helm', alt: 'a white bicycle helmet with air vents', art: g('', shadow(200, 252, 110),
    p('M90 210Q80 110 200 96Q320 110 310 210Z', C.white, 2.6), p('M90 210H310', 'none', 3), ...[[140, 140], [200, 126], [260, 140], [170, 176], [230, 176]].map(([x, y]) => e(x, y, 18, 8, C.grey2, 1.6)),
    p('M110 210Q120 260 160 260', 'none', 3), p('M290 210Q280 260 240 260', 'none', 3), r(186, 254, 28, 12, C.dark, 1.6)) },
  { word: 'racket', alt: 'a tennis racket with a yellow tennis ball', art: g('', shadow(200, 262, 120),
    g('rotate(-30 200 150)', e(200, 110, 70, 90, 'none', 12, { stroke: C.line }), e(200, 110, 70, 90, 'none', 8, { stroke: C.blue }),
      ...Array.from({ length: 9 }, (_, i) => p(`M${144 + i * 14} ${44 + Math.abs(i - 4) * 6}V${176 - Math.abs(i - 4) * 6}`, 'none', 1.2, { stroke: C.grey })), ...Array.from({ length: 11 }, (_, i) => p(`M${150 - Math.abs(i - 5) * 4} ${40 + i * 14}H${250 + Math.abs(i - 5) * 4}`, 'none', 1.2, { stroke: C.grey })),
      r(190, 198, 20, 90, C.dark, 2.4)), tennisBall(320, 230, 16)) },
  { word: 'doelpunt', alt: 'a football flying into the net of a goal', art: g('', pitch(220), goal(200, 246, 1.2), ball(232, 150, 18), marks('M120 230Q160 200 200 166', C.grey, 0), marks('M286 130L300 120M290 150L308 150M282 170L296 182', C.tan2, 2.6)) },
  { word: 'scheidsrechter', alt: 'a referee in a black shirt with a whistle holding up a yellow card', art: g('', pitch(240), shadow(190, 270, 80),
    stand(190, 272, 0.9, armless(man({ jacket: C.dark, sleeve: C.dark, trousers: C.dark, shoes: C.dark })) + limb('M150 110L182 80L200 40', 13, C.dark) + p('M196 26L216 22 222 48 202 52Z', C.yellow2, 2)),
    whistle(196, 150)) },
  { word: 'supporter', alt: 'three cheering fans with blue scarves in the stands', art: g('', r(0, 0, 400, 300, '#d9d6cb', 0, { stroke: 'none' }), ...Array.from({ length: 3 }, (_, i) => p(`M0 ${200 + i * 40}H400`, 'none', 2, { stroke: C.grey })),
    ...[[100, C.white], [200, C.cream], [300, C.white]].map(([x, shirt], i) => g('', at(x, 300, 0.95, bust({ style: i === 1 ? 'bun' : 'short', hair: [C.brown, C.brown2, C.dark][i], shirt, mouth: 'laugh', eyes: 'happy', brows: 'raised' }),
      p('M-36 -64Q0 -40 36 -64L44 -50Q0 -24 -44 -50Z', C.blue, 2), p('M30 -56V-20H44V-54', C.blue, 2)), limb(`M${x - 40} 260L${x - 60} 170`, 12, C.skin2), limb(`M${x + 40} 260L${x + 60} 170`, 12, C.skin2)))) },
  { word: 'stadion', alt: 'a large football stadium with full stands around a green pitch', art: g('', r(0, 0, 400, 300, C.sky, 0, { stroke: 'none' }), stands(),
    p('M60 140L20 270H380L340 140Z', '#9fb87c', 2.4), p('M200 140V270M120 205H280', 'none', 2, { stroke: C.white }), e(200, 205, 30, 14, 'none', 2, { stroke: C.white }), p('M0 270H400V300H0Z', C.grey3, 2)) },
  { word: 'veld', alt: 'a green football pitch with white lines', art: g('', r(0, 0, 400, 300, '#9fb87c', 0, { stroke: 'none' }), ...Array.from({ length: 5 }, (_, i) => r(i * 80, 0, 40, 300, '#adc48b', 0, { stroke: 'none' })),
    r(30, 30, 340, 240, 'none', 3, { stroke: C.white }), p('M200 30V270', 'none', 3, { stroke: C.white }), c(200, 150, 40, 'none', 3, { stroke: C.white }), r(30, 100, 50, 100, 'none', 3, { stroke: C.white }), r(320, 100, 50, 100, 'none', 3, { stroke: C.white })) },
  { word: 'medaille', alt: 'a shiny gold medal on a blue ribbon', art: g('', p('M150 20L196 150H220L180 20ZM250 20L204 150H180L220 20Z', C.blue, 2.2), c(200, 190, 54, '#d9b85a', 2.6), c(200, 190, 40, '#e8cc74', 2), at(200, 194, 1.1, p('M0 -20L6 -6 21 -6 9 3 13 18 0 9 -13 18 -9 3 -21 -6 -6 -6Z', '#d9b85a', 1.6)),
    marks('M120 170L104 162M120 196H100M280 170L296 162M280 196H300', C.tan2, 2.4)) },
  { word: 'kampioen', alt: 'a winners’ trophy cup with confetti around it', art: g('', shadow(200, 268, 90),
    p('M140 60H260V120Q260 170 200 176Q140 170 140 120Z', '#d9b85a', 2.6), p('M140 80Q100 80 104 112Q108 140 146 140M260 80Q300 80 296 112Q292 140 254 140', 'none', 8), p('M140 80Q100 80 104 112Q108 140 146 140M260 80Q300 80 296 112Q292 140 254 140', 'none', 4, { stroke: '#d9b85a' }),
    r(190, 176, 20, 40, '#d9b85a', 2.2), r(150, 216, 100, 26, C.brown, 2.4), r(140, 242, 120, 22, C.brown3, 2.4), p('M160 80Q170 120 190 150', 'none', 4, { stroke: '#f0dc9a' }),
    ...[[80, 50, C.brick], [320, 60, C.blue], [100, 200, C.green3], [310, 190, C.yellow2], [60, 120, C.blue], [340, 120, C.brick], [200, 30, C.green3]].map(([x, y, col], i) => g(`translate(${x} ${y}) rotate(${i * 40})`, r(-6, -3, 12, 6, col, 1.2)))) },
  { word: 'gooien', alt: 'Bram throwing a ball high into the air', art: g('', p('M0 250Q200 240 400 250V300H0Z', C.green2, 0, { stroke: 'none' }), shadow(160, 268, 70),
    stand(160, 270, 0.88, armless(man()) + limb('M150 112L178 76L192 30', 13, C.tan) + p('M186 32Q182 10 194 8Q206 10 204 30Z', C.skin, 2)), ball(300, 60, 16), marks('M210 70Q250 40 282 52', C.grey, 2.4)) },
  { word: 'vangen', alt: 'Max the dog jumping to catch a ball in his mouth', art: g('', p('M0 250Q200 240 400 250V300H0Z', C.green2, 0, { stroke: 'none' }), shadow(190, 268, 110),
    g('rotate(-12 200 200)', at(180, 250, 0.95, dog())), ball(330, 104, 14), marks('M250 60Q290 50 316 90', C.grey, 2.4)) },
  { word: 'springen', alt: 'Noor jumping into the water of a swimming pool with a splash', art: g('', r(0, 210, 400, 90, C.water, 0, { stroke: 'none' }), p('M0 210H400', 'none', 2.4), r(0, 190, 120, 20, C.grey3, 2),
    g('rotate(12 210 120)', at(210 - 200 * 0.62, 190 - 265 * 0.62, 0.62, child)), marks('M150 206Q160 180 170 206M250 206Q262 176 274 206M200 200V180', C.white, 3), marks('M60 240Q80 234 100 240M290 260Q310 254 330 260', C.water2, 2)) },
];
