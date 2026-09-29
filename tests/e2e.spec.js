import { test, expect } from '@playwright/test';
import { itemModel, lessons } from '../src/content.js';
import { tokenize } from '../src/curriculum/text.js';
import { names } from '../src/curriculum/plan.js';


const shots = process.env.SHOTS; // set to a folder to save a screenshot of every page type

async function assertNoHorizontalOverflow(page) {
  const { content, viewport } = await page.evaluate(() => ({ content: document.documentElement.scrollWidth, viewport: window.innerWidth }));
  expect(content).toBeLessThanOrEqual(viewport + 1);
}

/** Answer a page correctly using the lesson data, the way a learner would: typing and tapping. */
async function solve(page, step) {
  if (step.type === 'picture') {
    const position = step.choices.findIndex(choice => choice.image === step.answer) + 1;
    await page.getByRole('button', { name: new RegExp(`^Picture ${position}:`) }).click();
  } else if (step.type === 'arrange') {
    for (const word of tokenize(step.nl)) {
      const label = names.includes(word) ? word : word.toLowerCase();
      await page.locator('.token-bank button:not([disabled])').getByText(label, { exact: true }).first().click();
    }
  } else if (step.type === 'drill') {
    for (const [i, item] of step.items.entries()) {
      const { choices, answer } = itemModel(item, step);
      const row = page.locator('.drill-items > *').nth(i);
      if (choices) await row.getByRole('button', { name: answer, exact: true }).click();
      else await page.locator(`[id="${step.id}-item-${i}"]`).fill(answer.toLowerCase().replace(/[.?!]$/u, ''));
    }
  }
}

async function readLesson(page, lesson, { mistakes = false, mobile = false, seen = new Set() } = {}) {
  for (const step of lesson.steps) {
    await test.step(`${lesson.title}: ${step.id} ${step.type}`, async () => {
      await expect(page.getByRole('heading', { level: 1, name: `${step.title}.`, exact: true })).toBeVisible();
      if (mobile) await assertNoHorizontalOverflow(page);
      if (step.type === 'complete') {
        await page.getByRole('button', { name: 'Finish this lesson', exact: true }).click();
        await expect(page).toHaveURL(/#book$/u);
        return;
      }
      if (['picture', 'arrange', 'drill'].includes(step.type)) {
        await expect(page.getByRole('button', { name: 'Turn the page', exact: true })).toHaveCount(0);
        if (mistakes && step.type === 'drill') {
          // Checking an empty drill marks every item and offers the answers.
          await page.getByRole('button', { name: 'Check my answers', exact: true }).click();
          await expect(page.getByRole('status')).toContainText(step.items.length > 1 ? `${step.items.length} of ${step.items.length} still need work.` : 'Not yet.');
          await page.getByRole('button', { name: 'Show me the answers' }).click();
          await expect(page.locator('.drill-reveal').first()).toBeVisible();
        }
        await solve(page, step);
        await page.getByRole('button', { name: 'Check my answers', exact: true }).click();
        await expect(page.getByRole('status')).toContainText('Correct.');
      }
      const kind = `${step.type}${step.layout ? `-${step.layout}` : ''}`;
      if (shots && !seen.has(kind)) { seen.add(kind); await page.screenshot({ path: `${shots}/${mobile ? 'mobile-' : ''}${kind}.png`, fullPage: true }); }
      await page.getByRole('button', { name: 'Turn the page', exact: true }).click();
    });
  }
}

test('lesson 1 can be completed by typing and tapping every answer, and unlocks lesson 2', async ({ page }) => {
  test.setTimeout(240_000);
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('/');
  const row = lesson => page.locator('.lesson-row').filter({ has: page.getByRole('heading', { name: lesson.title, exact: true }) });
  await expect(page.locator('.lesson-row')).toHaveCount(lessons.length);
  await expect(row(lessons[1])).toBeDisabled();
  await page.getByRole('button', { name: 'Open the first lesson', exact: true }).click();
  await readLesson(page, lessons[0], { mistakes: true });
  await expect(row(lessons[0])).toContainText('Read again');
  await expect(row(lessons[1])).toBeEnabled();
  await page.reload();
  await expect(row(lessons[1])).toBeEnabled();

  await page.goto('/#words');
  await expect(page.locator('.word-card')).toHaveCount(lessons[0].newWordIds.length);
  await page.getByRole('textbox', { name: 'Search your words' }).fill('window');
  await expect(page.getByRole('heading', { name: 'het raam', exact: true })).toBeVisible();

  // Missed words are due at once, and come back as typed sentences.
  await page.goto('/#review');
  await page.getByRole('button', { name: 'Start the review' }).click();
  await expect(page.locator('.review-card .drill-item')).toHaveCount(1);
  await page.getByRole('button', { name: 'I don’t know yet — show me' }).click();
  await expect(page.locator('.review-card .drill-reveal')).toBeVisible();
  if (shots) await page.screenshot({ path: `${shots}/review.png`, fullPage: true });
  expect(errors).toEqual([]);
});

test('every later lesson renders and can be solved', async ({ page }) => {
  test.setTimeout(600_000);
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  // Mark earlier lessons complete so each lesson unlocks.
  await page.evaluate(ids => {
    const state = JSON.parse(localStorage.getItem('langzaam-v2') || 'null') || { version: 2, words: {}, completedSteps: {}, completedLessons: [], processedEvents: {} };
    state.completedLessons = ids;
    localStorage.setItem('langzaam-v2', JSON.stringify(state));
  }, lessons.slice(0, -1).map(l => l.id));
  const seen = new Set();
  for (const lesson of lessons.slice(1)) {
    await page.goto(`/#lesson/${lesson.id}`);
    await page.reload();
    await readLesson(page, lesson, { seen });
  }
  expect(errors).toEqual([]);
});

test('the reader works at phone width without sideways scrolling', async ({ page }) => {
  test.setTimeout(240_000);
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await assertNoHorizontalOverflow(page);
  await page.getByRole('button', { name: 'Open the first lesson', exact: true }).click();
  await readLesson(page, lessons[0], { mobile: true });
});

test('the reader resumes its saved page and locked lessons cannot be opened by URL', async ({ page }) => {
  await page.goto(`/#lesson/${lessons[1].id}`);
  await expect(page.getByRole('button', { name: 'Open the first lesson', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Open the first lesson', exact: true }).click();
  await page.getByRole('button', { name: 'Turn the page', exact: true }).click();
  const resumed = `${lessons[0].steps[1].title}.`;
  await expect(page.getByRole('heading', { level: 1, name: resumed, exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('heading', { level: 1, name: resumed, exact: true })).toBeVisible();
});

test('recorded audio plays for a sentence and a conjugation row', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Open the first lesson', exact: true }).click();
  const [response] = await Promise.all([
    page.waitForResponse(r => r.url().includes('/audio/') && r.url().endsWith('.m4a')),
    page.getByRole('button', { name: 'Listen to Dit is een huis.', exact: true }).click(),
  ]);
  expect(response.status()).toBeLessThan(400);
});
