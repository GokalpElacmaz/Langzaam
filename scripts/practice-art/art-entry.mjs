/** Print the art.js sheet entry for a drawn topic: node scripts/practice-art/art-entry.mjs animals */
const name = process.argv[2];
const { default: cells } = await import(new URL(`./${name}.mjs`, import.meta.url));
const pairs = cells.map((cell) => `['${cell.word}', '${cell.alt.replace(/'/g, '’')}']`);
const rows = [];
for (let i = 0; i < pairs.length; i += 2) rows.push('    ' + pairs.slice(i, i + 2).join(', ') + ',');
console.log(`  { file: '${name}.svg', aspect: 1600 / 1500, entries: [\n${rows.join('\n')}\n  ] },`);
