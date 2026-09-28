/**
 * Generate the demo's offline Belgian Dutch pronunciation recordings.
 * Requires macOS and the installed Ellen voice (`say -v '?'`).
 * Run: node scripts/generate-audio.mjs [--force]
 *
 * Audio is synthetic, recorded separately at normal and slower speaking rates.
 * Files are bundled with the site; visitors need no speech service or API key.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outputDirectory = join(root, 'public', 'audio');
const contentPath = join(root, 'src', 'content.js');
const manifestPath = join(root, 'src', 'audio-manifest.json');
const force = process.argv.includes('--force');
const voice = 'Ellen';
const rates = { normal: 145, slow: 105 };

if (process.platform !== 'darwin') {
  throw new Error('Audio regeneration requires macOS. The checked-in recordings work on any platform.');
}

const seedTexts = [
  'dit', 'is', 'een', 'huis', 'boom', 'bank', 'de', 'man', 'vrouw', 'loopt', 'zit',
  'Dit is een huis.', 'Dit is een boom.', 'Dit is een bank.',
  'Dit is een man.', 'Dit is een vrouw.',
  'De man loopt.', 'De vrouw zit.', 'De vrouw loopt.', 'De man zit.',
];
const content = existsSync(contentPath) ? await import(pathToFileURL(contentPath)) : {};
const suppliedTexts = content.audioTexts ?? [];
if (!Array.isArray(suppliedTexts) || suppliedTexts.some((text) => typeof text !== 'string')) {
  throw new Error('src/content.js must export audioTexts as an array of Dutch strings.');
}
const texts = [...new Set([...seedTexts, ...suppliedTexts].map((text) => text.trim()).filter(Boolean))];
const manifest = {};
const slugs = new Map();
const temporaryDirectory = mkdtempSync(join(tmpdir(), 'langzaam-audio-'));
mkdirSync(outputDirectory, { recursive: true });

function slugFor(text) {
  const slug = text.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
  if (!slug) throw new Error(`Cannot make an audio filename for ${JSON.stringify(text)}`);
  const previousText = slugs.get(slug);
  // Capitalization and punctuation variants deliberately share a recording.
  if (previousText && previousText.toLowerCase().replace(/[.!?]/g, '') !== text.toLowerCase().replace(/[.!?]/g, '')) {
    throw new Error(`Audio filename collision: ${JSON.stringify(previousText)} and ${JSON.stringify(text)}`);
  }
  slugs.set(slug, text);
  return slug;
}

function durationOf(path) {
  const info = execFileSync('/usr/bin/afinfo', [path], { encoding: 'utf8' });
  const duration = Number(info.match(/estimated duration:\s*([\d.]+) sec/)?.[1]);
  if (!Number.isFinite(duration) || duration <= 0) {
    throw new Error(`Audio file is empty or unreadable: ${path}. macOS speech services must be available.`);
  }
  return duration;
}

let generated = 0;
let verified = 0;
try {
  for (const text of texts) {
    const slug = slugFor(text);
    manifest[text] = {};
    for (const [speed, rate] of Object.entries(rates)) {
      const filename = `${slug}${speed === 'slow' ? '-slow' : ''}.m4a`;
      const destination = join(outputDirectory, filename);
      if (force || !existsSync(destination)) {
        const intermediate = join(temporaryDirectory, `${slug}-${speed}.aiff`);
        execFileSync('/usr/bin/say', ['-v', voice, '-r', String(rate), '-o', intermediate, text], { stdio: 'pipe' });
        durationOf(intermediate);
        execFileSync('/usr/bin/afconvert', ['-f', 'm4af', '-d', 'aac', intermediate, destination], { stdio: 'pipe' });
        generated += 1;
      }
      durationOf(destination);
      verified += 1;
      manifest[text][speed] = `/audio/${filename}`;
    }
  }
  mkdirSync(dirname(manifestPath), { recursive: true });
  const serialized = `${JSON.stringify(manifest, null, 2)}\n`;
  if (!existsSync(manifestPath) || readFileSync(manifestPath, 'utf8') !== serialized) {
    writeFileSync(manifestPath, serialized);
  }
  console.log(`Generated ${generated} recordings; verified ${verified} recordings for ${texts.length} Dutch texts.`);
} finally {
  rmSync(temporaryDirectory, { recursive: true, force: true });
}
