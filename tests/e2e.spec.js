import { test, expect } from '@playwright/test';
import { lessons, words } from '../src/content.js';

const appUrl = 'http://127.0.0.1:5173';
const interactiveTypes = new Set(['picture-choice', 'listen-choice', 'arrange', 'cloze', 'dictation']);

async function openSection(page, name) {
  const mobileMenu = page.getByRole('button', { name: 'Open navigation', exact: true });
  if (await mobileMenu.isVisible()) await mobileMenu.click();
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: new RegExp(name) }).click();
}

async function assertNoHorizontalOverflow(page) {
  const dimensions = await page.evaluate(() => ({
    content: document.documentElement.scrollWidth,
    viewport: window.innerWidth,
  }));
  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport + 1);
}

async function pictureChoice(page, step, choiceId) {
  const position = step.choices.findIndex(choice => choice.id === choiceId) + 1;
  await page.getByRole('button', { name: new RegExp(`^Picture ${position}:`) }).click();
}

async function fillAnswer(page, step, correct) {
  if (step.type === 'picture-choice' || step.type === 'listen-choice') {
    const choice = correct ? step.answer : step.choices.find(choice => choice.id !== step.answer).id;
    await pictureChoice(page, step, choice);
  } else if (step.type === 'cloze') {
    const choice = step.choices.find(choice => correct ? choice.id === step.answer : choice.id !== step.answer);
    await page.getByRole('button', { name: choice.label, exact: true }).click();
  } else if (step.type === 'arrange') {
    await page.getByRole('button', { name: 'Start the sentence again' }).click();
    const orderedTokens = step.answer.replace(/[.!?]$/u, '').split(' ');
    for (const token of correct ? orderedTokens : [...orderedTokens].reverse()) {
      await page.locator('.token-bank').getByRole('button', { name: token, exact: true }).click();
    }
  } else if (step.type === 'dictation') {
    await page.getByRole('textbox', { name: 'The sentence you hear' }).fill(correct
      ? `  ${step.answer.toLowerCase().replace(/[.!?]$/u, '')}  `
      : 'Dit is een fout.');
  }
}

async function readLesson(page, lesson, { mistakes = false, mobile = false } = {}) {
  await expect(page).toHaveURL(new RegExp(`#lesson/${lesson.id}$`));
  for (const step of lesson.steps) {
    await test.step(`${lesson.title}: ${step.type}`, async () => {
      await expect(page.getByRole('heading', { level: 1, name: `${step.title}.`, exact: true })).toBeVisible();
      if (mobile) await assertNoHorizontalOverflow(page);
      if (step.type === 'observe') {
        await expect(page.locator('.observation-card')).toHaveCount(step.cards.length);
        for (let index = 0; index < step.cards.length; index++) {
          const card = page.locator('.observation-card').nth(index);
          await expect(card.getByText(step.cards[index].sentence, { exact: true })).toBeVisible();
          await expect(card.getByRole('button', { name: `Listen to ${step.cards[index].sentence}`, exact: true })).toBeVisible();
        }
      }
      if (interactiveTypes.has(step.type)) {
        await expect(page.getByRole('button', { name: 'Check my answer', exact: true })).toBeDisabled();
        if (step.type === 'listen-choice' || step.type === 'dictation') {
          await expect(page.getByRole('button', { name: 'Play Dutch audio', exact: true })).toBeVisible();
          await expect(page.locator('.transcript')).toHaveCount(0);
        }
        if (mistakes) {
          await fillAnswer(page, step, false);
          await page.getByRole('button', { name: 'Check my answer', exact: true }).click();
          await expect(page.getByRole('status')).toContainText('Almost. Let’s have another look.');
          await expect(page.getByRole('button', { name: 'Turn the page', exact: true })).toHaveCount(0);
        }
        await fillAnswer(page, step, true);
        await page.getByRole('button', { name: 'Check my answer', exact: true }).click();
        await expect(page.getByRole('status')).toContainText('You’ve got it.');
        await expect(page.getByRole('status')).toContainText(step.explanation);
      }
      if (step.type === 'story') {
        await expect(page.locator('.story-line')).toHaveCount(step.lines.length);
        for (let index = 0; index < step.lines.length; index++) {
          await expect(page.locator('.story-line').nth(index).getByText(step.lines[index].sentence, { exact: true })).toBeVisible();
        }
        await page.getByRole('button', { name: 'A pattern you might have noticed' }).click();
        await expect(page.getByText(lesson.grammar, { exact: true })).toBeVisible();
      }
      if (step.type === 'complete') {
        await page.getByRole('button', { name: 'Finish this lesson', exact: true }).click();
        await expect(page).toHaveURL(/#book$/u);
      } else {
        await page.getByRole('button', { name: 'Turn the page', exact: true }).click();
      }
    });
  }
}

test('the complete three-lesson book accepts corrections, unlocks lessons, and saves the word collection', async ({ page }) => {
  test.setTimeout(120_000);
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  await page.goto(appUrl);
  const lessonRow = lesson => page.locator('.lesson-row').filter({ has: page.getByRole('heading', { name: lesson.title, exact: true }) });
  await expect(lessonRow(lessons[0])).toBeEnabled();
  await expect(lessonRow(lessons[1])).toBeDisabled();
  await expect(lessonRow(lessons[2])).toBeDisabled();
  await page.getByRole('button', { name: 'Open the first lesson', exact: true }).click();
  for (let index = 0; index < lessons.length; index++) {
    const lesson = lessons[index];
    if (index > 0) await lessonRow(lesson).click();
    await readLesson(page, lesson, { mistakes: true });
    await expect(lessonRow(lesson)).toContainText('Read again');
    await page.reload();
    await expect(lessonRow(lesson)).toContainText('Read again');
    if (index + 1 < lessons.length) await expect(lessonRow(lessons[index + 1])).toBeEnabled();
  }
  await expect(page.getByText('3 of 3 lessons complete', { exact: true })).toBeVisible();
  await openSection(page, 'Your words');
  await expect(page.locator('.word-card')).toHaveCount(words.length);
  const search = page.getByRole('textbox', { name: 'Search your words' });
  await search.fill('huis');
  await expect(page.locator('.word-card')).toHaveCount(1);
  await expect(page.getByRole('heading', { name: 'huis', exact: true })).toBeVisible();
  await search.fill('house');
  await expect(page.locator('.word-card')).toHaveCount(1);
  await expect(page.getByRole('heading', { name: 'huis', exact: true })).toBeVisible();
  await search.fill('a word not in this volume');
  await expect(page.getByRole('heading', { name: 'A little quiet here.' })).toBeVisible();
  await search.clear();
  await expect(page.locator('.word-card')).toHaveCount(words.length);
  expect(pageErrors).toEqual([]);
});

test('the reader resumes its saved page and locked lessons cannot be opened by URL', async ({ page }) => {
  await page.goto(`${appUrl}/#lesson/${lessons[1].id}`);
  await expect(page.getByRole('button', { name: 'Open the first lesson', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Open the first lesson', exact: true }).click();
  await page.getByRole('button', { name: 'Turn the page', exact: true }).click();
  const resumedTitle = `${lessons[0].steps[1].title}.`;
  await expect(page.getByRole('heading', { level: 1, name: resumedTitle, exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('heading', { level: 1, name: resumedTitle, exact: true })).toBeVisible();
  await openSection(page, 'The book');
  await page.getByRole('button', { name: 'Continue reading', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1, name: resumedTitle, exact: true })).toBeVisible();
});

test('a missed review word remains due while correctly recalled words leave the due queue', async ({ page }) => {
  await page.goto(appUrl);
  await page.getByRole('button', { name: 'Open the first lesson', exact: true }).click();
  await expect(page.locator('.observation-card')).toHaveCount(3);
  await openSection(page, 'A little review');
  await page.getByRole('button', { name: 'Begin a little review', exact: true }).click();
  const failedEnglish = await page.locator('.review-card h2').innerText();
  const failedWord = words.find(word => word.english === failedEnglish);
  expect(failedWord).toBeDefined();
  await page.getByRole('textbox').fill('nog niet');
  await page.getByRole('button', { name: 'Check the word', exact: true }).click();
  await expect(page.getByRole('status')).toContainText(failedWord.dutch);
  await expect(page.getByRole('status')).toContainText('You’ll meet this word again soon.');
  await page.getByRole('button', { name: 'Another familiar word', exact: true }).click();
  for (let index = 1; index < lessons[0].steps[0].wordIds.length; index++) {
    const english = await page.locator('.review-card h2').innerText();
    const word = words.find(candidate => candidate.english === english);
    await page.getByRole('textbox').fill(word.dutch);
    await page.getByRole('button', { name: 'Check the word', exact: true }).click();
    await expect(page.getByRole('status')).toContainText('Yes. A little more familiar.');
    await page.getByRole('button', { name: index === lessons[0].steps[0].wordIds.length - 1 ? 'Finish this review' : 'Another familiar word', exact: true }).click();
  }
  await expect(page.getByText('5 words recalled. 1 to meet again soon.', { exact: false })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('heading', { name: '1 familiar word is waiting.', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Begin a little review', exact: true }).click();
  await expect(page.locator('.review-card h2')).toHaveText(failedEnglish);
  await expect(page.locator('.review-card-top')).toContainText('1 / 1');
});

test('normal and slow recordings really play through to the ended event', async ({ page }) => {
  test.setTimeout(45_000);
  await page.addInitScript(() => {
    window.__audioEvents = [];
    const NativeAudio = window.Audio;
    window.Audio = class extends NativeAudio {
      constructor(...args) {
        super(...args);
        for (const event of ['playing', 'ended', 'error']) {
          this.addEventListener(event, () => window.__audioEvents.push({ event, src: this.currentSrc, duration: this.duration }));
        }
      }
    };
  });
  await page.goto(appUrl);
  const firstSentence = lessons[0].steps[0].cards[0].sentence;
  await page.getByRole('button', { name: `Listen to ${firstSentence}`, exact: true }).click();
  await expect.poll(() => page.evaluate(() => window.__audioEvents.filter(item => item.event === 'playing').length)).toBe(1);
  await expect.poll(() => page.evaluate(() => window.__audioEvents.filter(item => item.event === 'ended').length), { timeout: 15_000 }).toBe(1);
  await page.getByRole('button', { name: 'Open reading settings', exact: true }).click();
  await page.getByRole('checkbox', { name: /Slower audio/u }).check();
  await page.getByRole('button', { name: 'Close settings', exact: true }).click();
  await page.getByRole('button', { name: `Listen to ${firstSentence}`, exact: true }).click();
  await expect.poll(() => page.evaluate(() => window.__audioEvents.filter(item => item.event === 'playing').length)).toBe(2);
  await expect.poll(() => page.evaluate(() => window.__audioEvents.filter(item => item.event === 'ended').length), { timeout: 20_000 }).toBe(2);
  const events = await page.evaluate(() => window.__audioEvents);
  expect(events.filter(item => item.event === 'error')).toEqual([]);
  const recordings = events.filter(item => item.event === 'ended');
  expect(recordings[0].src).toMatch(/\/audio\/.*\.m4a$/u);
  expect(recordings[1].src).toMatch(/-slow\.m4a$/u);
  expect(recordings[1].src).not.toBe(recordings[0].src);
  expect(recordings[1].duration).toBeGreaterThan(recordings[0].duration);
  await expect(page.getByRole('alert')).toHaveCount(0);
});

test('mobile navigation, exercises, collection, and settings fit a narrow screen', async ({ page }) => {
  test.setTimeout(90_000);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(appUrl);
  await assertNoHorizontalOverflow(page);
  await page.getByRole('button', { name: 'Open the first lesson', exact: true }).click();
  await readLesson(page, lessons[0], { mobile: true });
  await assertNoHorizontalOverflow(page);
  for (const name of ['Your words', 'A little review', 'The journey']) {
    await openSection(page, name);
    await assertNoHorizontalOverflow(page);
  }
  await page.getByRole('button', { name: 'Open reading settings', exact: true }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await assertNoHorizontalOverflow(page);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
});
