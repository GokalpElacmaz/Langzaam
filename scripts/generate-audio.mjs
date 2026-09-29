/**
 * Generate the offline Dutch recordings in every voice listed in src/curriculum/plan.js.
 * Requires macOS and those voices installed (`say -v '?'`).
 * Run: node scripts/generate-audio.mjs [--force]
 *
 * Audio is synthetic, recorded separately at normal and slower speaking rates.
 * Files are bundled with the site; visitors need no speech service or API key.
 */
import { execFile, execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { promisify } from 'node:util';
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outputDirectory = join(root, 'public', 'audio');
const contentPath = join(root, 'src', 'content.js');
const manifestPath = join(root, 'src', 'audio-manifest.json');
const force = process.argv.includes('--force');
const rates = { normal: 145, slow: 105 };

if (process.platform !== 'darwin') {
  throw new Error('Audio regeneration requires macOS. The checked-in recordings work on any platform.');
}

const content = existsSync(contentPath) ? await import(pathToFileURL(contentPath)) : {};
const clips = content.audioClips ?? [];
if (!Array.isArray(clips) || clips.some((clip) => typeof clip.text !== 'string' || !content.voices[clip.voice])) {
  throw new Error('src/content.js must export audioClips as [{ text, voice }] with voices from plan.js.');
}
const manifest = {};
const slugs = new Map();
const temporaryDirectory = mkdtempSync(join(tmpdir(), 'langzaam-audio-'));
mkdirSync(outputDirectory, { recursive: true });

function slugFor(text) {
  let slug = text.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
  if (!slug) throw new Error(`Cannot make an audio filename for ${JSON.stringify(text)}`);
  // Accents change the sound (een / één), so accented texts get a distinct name.
  if (/[^\u0000-\u007f]/.test(text.normalize('NFC'))) slug += `-${createHash('sha1').update(text.normalize('NFC')).digest('hex').slice(0, 6)}`;
  // Questions are spoken with a rising tone, so they get their own recording.
  if (text.trim().endsWith('?')) slug += '-q';
  if (slug.length > 80) slug = `${slug.slice(0, 70)}-${createHash('sha1').update(slug).digest('hex').slice(0, 8)}`;
  const previousText = slugs.get(slug);
  // Variants that differ only in capitals or punctuation deliberately share a recording.
  const bare = (value) => value.toLowerCase().replace(/[^\p{L}\s]/gu, '').replace(/\s+/g, ' ').trim();
  if (previousText && bare(previousText) !== bare(text)) {
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

const run = promisify(execFile);
let generated = 0;
let verified = 0;
try {
  const jobs = [];
  const slugOf = new Map();
  for (const { text, voice } of clips) {
    if (!slugOf.has(text)) slugOf.set(text, slugFor(text));
    const slug = slugOf.get(text);
    manifest[text] ??= { default: content.voiceFor(text) };
    manifest[text][voice] = {};
    for (const [speed, rate] of Object.entries(rates)) {
      // Ellen keeps the original file names, so existing recordings stay valid.
      const filename = `${slug}${voice === 'ellen' ? '' : `--${voice}`}${speed === 'slow' ? '-slow' : ''}.m4a`;
      const destination = join(outputDirectory, filename);
      manifest[text][voice][speed] = `/audio/${filename}`;
      jobs.push(async () => {
        if (force || !existsSync(destination)) {
          const intermediate = join(temporaryDirectory, `${slug}-${voice}-${speed}.aiff`);
          await run('/usr/bin/say', ['-v', content.voices[voice].system, '-r', String(rate), '-o', intermediate, text]);
          durationOf(intermediate);
          await run('/usr/bin/afconvert', ['-f', 'm4af', '-d', 'aac', intermediate, destination]);
          generated += 1;
        }
        durationOf(destination);
        verified += 1;
      });
    }
  }
  // A small pool: macOS speech synthesis is happy with a few parallel voices.
  await Promise.all(Array.from({ length: 6 }, async () => { while (jobs.length) await jobs.shift()(); }));
  const used = new Set(Object.values(manifest).flatMap((entry) => Object.values(entry).filter((v) => typeof v === 'object').flatMap((speeds) => Object.values(speeds).map((path) => path.replace('/audio/', '')))));
  const stale = readdirSync(outputDirectory).filter((file) => file.endsWith('.m4a') && !used.has(file));
  for (const file of stale) rmSync(join(outputDirectory, file));
  mkdirSync(dirname(manifestPath), { recursive: true });
  const serialized = `${JSON.stringify(manifest, null, 2)}\n`;
  if (!existsSync(manifestPath) || readFileSync(manifestPath, 'utf8') !== serialized) {
    writeFileSync(manifestPath, serialized);
  }
  console.log(`Generated ${generated} recordings; verified ${verified} recordings for ${slugOf.size} Dutch texts in ${Object.keys(content.voices).length} voices; removed ${stale.length} unused.`);
} finally {
  rmSync(temporaryDirectory, { recursive: true, force: true });
}
