/**
 * Authoring aid: list the earlier targets a lesson still needs to recycle, grouped by how many more uses each needs.
 *   node scripts/recycling-gaps.mjs wachten-op
 */
import { execFileSync } from 'node:child_process';
const id = process.argv[2];
let out = '';
try { out = execFileSync('node', ['scripts/validate-content.mjs', id], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }); } catch (error) { out = `${error.stdout}${error.stderr}`; }
const need = {};
for (const match of out.matchAll(/earlier target “([^”]+)” is recycled (\d+)×; needs (\d+)/gu)) {
  const missing = Number(match[3]) - Number(match[2]);
  (need[missing] ||= []).push(match[1]);
}
for (const [missing, ids] of Object.entries(need)) console.log(`+${missing}:`, JSON.stringify(ids));
const grammar = [...out.matchAll(/earlier grammar “([^”]+)” returns on (\d+) pages; needs (\d+)/gu)].map((m) => `${m[1]}+${m[3] - m[2]}`);
if (grammar.length) console.log('grammar:', grammar.join(' '));
const other = out.split('\n').filter((line) => line.startsWith('  ') && !/earlier (target|grammar)/u.test(line));
if (other.length) console.log(other.join('\n'));
