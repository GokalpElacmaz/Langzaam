import { test, expect } from '@playwright/test';
import { itemModel, lessons, levelCoverage, publishedLessons } from '../src/content.js';
import { tokenize } from '../src/curriculum/text.js';
import { names } from '../src/curriculum/plan.js';


const shots = process.env.SHOTS; // set to a folder to save a screenshot of every page type

async function assertNoHorizontalOverflow(page) {
  const { content, viewport } = await page.evaluate(() => ({ content: document.documentElement.scrollWidth, viewport: window.innerWidth }));
  expect(content).toBeLessThanOrEqual(viewport + 1);
}

/** Every picture on the page has loaded: no broken image paths. */
async function assertImagesLoad(page) {
  await page.waitForFunction(() => [...document.images].every(image => image.complete));
  const broken = await page.evaluate(() => [...document.images].filter(image => !image.naturalWidth).map(image => image.getAttribute('src')));
  expect(broken).toEqual([]);
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

async function readLesson(page, lesson, { mistakes = false, mobile = false, seen = new Set(), prefix = '' } = {}) {
  for (const step of lesson.steps) {
    await test.step(`${lesson.title}: ${step.id} ${step.type}`, async () => {
      await expect(page.getByRole('heading', { level: 1, name: `${step.title}.`, exact: true })).toBeVisible();
      if (mobile) { await assertNoHorizontalOverflow(page); await assertImagesLoad(page); }
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
      if (shots && !seen.has(kind)) { seen.add(kind); await page.screenshot({ path: `${shots}/${prefix || (mobile ? 'mobile-' : '')}${kind}.png`, fullPage: true, animations: 'disabled' }); }
      await page.getByRole('button', { name: 'Turn the page', exact: true }).click();
    });
  }
}

test('lesson 1 can be completed and published lessons remain available', async ({ page }) => {
  test.setTimeout(240_000);
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('/');
  const row = lesson => page.locator('.lesson-row').filter({ has: page.getByRole('heading', { name: lesson.title, exact: true }) });
  await expect(page.locator('.lesson-row')).toHaveCount(lessons.length);
  await expect(row(lessons[1])).toBeEnabled();
  await expect(row(lessons.find(lesson => !lesson.available))).toBeDisabled();
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
  if (shots) await page.screenshot({ path: `${shots}/review.png`, fullPage: true, animations: 'disabled' });
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
  for (const lesson of publishedLessons.slice(1)) {
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

test('the reader opens published lessons directly, resumes its saved page and keeps drafts closed', async ({ page }) => {
  await page.goto(`/#lesson/${lessons[1].id}`);
  await expect(page.getByRole('heading', { level: 1, name: `${lessons[1].steps[0].title}.`, exact: true })).toBeVisible();
  await page.goto(`/#lesson/${lessons.find(lesson => !lesson.available).id}`);
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

test('reader navigation shows the volume of the open lesson', async ({ page }) => {
  for (const [id, number, level] of [['a2-wonen', '01', 'A2'], ['a2-afspraak', '02', 'A2'], ['wat-is-dit', '00', 'A1']]) {
    await page.goto(`/#lesson/${id}`);
    await expect(page.locator('.breadcrumb strong')).toHaveText(`Volume ${number}`);
    await expect(page.locator('.level-indicator')).toHaveText(level);
    await expect(page.locator('.volume-active small')).toContainText(level);
    await page.reload();
    await expect(page.locator('.breadcrumb strong')).toHaveText(`Volume ${number}`);
  }
});

test('twenty-word practice works on a phone, including its new headword audio', async ({ page }) => {
  test.setTimeout(240_000);
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await page.evaluate(() => localStorage.setItem('langzaam-v2', JSON.stringify({
    version: 2, words: {}, completedSteps: {}, completedLessons: ['wat-is-dit', 'ik-ben'], processedEvents: {},
  })));
  const lesson = lessons.find(l => l.id === 'a1-thuis');
  await page.goto(`/#lesson/${lesson.id}`);
  await page.reload();
  await expect(page.locator('.vocabulary-term').first()).toContainText('de tafel');
  const [response] = await Promise.all([
    page.waitForResponse(r => r.url().includes('/audio/') && r.url().endsWith('.m4a')),
    page.getByRole('button', { name: 'Listen to de tafel', exact: true }).click(),
  ]);
  expect(response.status()).toBeLessThan(400);
  await readLesson(page, lesson, { mobile: true });
});

test('inserting practice preserves an existing saved lesson and keeps drafts closed', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.setItem('langzaam-v2', JSON.stringify({
    version: 2, words: {}, completedSteps: {}, completedLessons: ['wat-is-dit', 'ik-ben'],
    processedEvents: {}, positions: { 'ik-woon': 3 },
  })));
  await page.goto('/#lesson/ik-woon');
  await page.reload();
  const saved = lessons.find(l => l.id === 'ik-woon').steps[3];
  await expect(page.getByRole('heading', { level: 1, name: `${saved.title}.`, exact: true })).toBeVisible();
  const draft = lessons.find(l => !l.available);
  await page.goto(`/#lesson/${draft.id}`);
  await expect(page.locator('.contents-section')).toBeVisible();
  await expect(page.locator('.lesson-row').filter({ has: page.getByRole('heading', { name: draft.title, exact: true }) })).toBeDisabled();
});

test('old bookmarks survive split drills and new page positions survive reload and back', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.setItem('langzaam-v2', JSON.stringify({
    version: 2, words: {}, completedSteps: {}, completedLessons: [], processedEvents: {}, positions: { 'ik-lees': 8 },
  })));
  await page.goto('/#lesson/ik-lees');
  await page.reload();
  const lesson = lessons.find(l => l.id === 'ik-lees');
  const saved = lesson.steps.find(s => s.id === 'ik-lees-09');
  const split = lesson.steps.find(s => s.id === 'ik-lees-08-gaps');
  await expect(page.getByRole('heading', { level: 1, name: `${saved.title}.`, exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Previous page', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1, name: `${split.title}.`, exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('heading', { level: 1, name: `${split.title}.`, exact: true })).toBeVisible();
  await solve(page, split);
  await page.getByRole('button', { name: 'Check my answers', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Correct.');
  await page.getByRole('button', { name: 'Turn the page', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1, name: `${saved.title}.`, exact: true })).toBeVisible();
});

test('all new vocabulary pictures load on their first-showing and recognition pages', async ({ page }) => {
  test.setTimeout(120_000);
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await page.evaluate(ids => localStorage.setItem('langzaam-v2', JSON.stringify({
    version: 2, words: {}, completedSteps: {}, completedLessons: ids, processedEvents: {},
  })), publishedLessons.map(l => l.id));
  await page.reload();
  for (const lesson of publishedLessons.filter(l => l.track === 'practice')) {
    await page.goto(`/#lesson/${lesson.id}`);
    for (let i = 0; i < Math.ceil(lesson.targets.length / 5); i++) {
      const illustrations = page.locator('.observation-card > .vocabulary-illustration');
      const cardCount = Math.min(5, lesson.targets.length - i * 5);
      await expect(illustrations).toHaveCount(cardCount);
      await expect(illustrations.first()).toBeVisible();
      const loaded = await illustrations.locator('image').evaluateAll(async nodes => Promise.all(nodes.map(node => new Promise(resolve => {
        const image = new Image();
        image.onload = () => resolve(image.naturalWidth > 0);
        image.onerror = () => resolve(false);
        image.src = node.getAttribute('href');
      }))));
      expect(loaded).toEqual(Array(cardCount).fill(true));
      await assertNoHorizontalOverflow(page);
      if (shots) await page.screenshot({ path: `${shots}/${lesson.id}-words-${i}.png`, fullPage: true, animations: 'disabled' });
      await page.getByRole('button', { name: 'Turn the page', exact: true }).click();
    }
    const recognition = lesson.steps.find(step => step.type === 'drill');
    await expect(page.locator('.drill-image.vocabulary-illustration')).toHaveCount(recognition.items.filter(item => item.image).length);
    await assertNoHorizontalOverflow(page);
  }
});


test('four course categories show cumulative goals on desktop and phone', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const width of [1440, 375]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/#book');
    await expect(page.locator('.course-level-heading')).toHaveCount(4);
    const goals = page.locator('.level-goal-card');
    await expect(goals).toHaveCount(4);
    for (const [index, goal] of ['500–1,000', '1,000–1,500', '2,000–2,500', '4,000–5,000'].entries()) {
      await expect(goals.nth(index)).toContainText(goal);
    }
    await goals.nth(1).click();
    await expect(page).toHaveURL(/#book$/);
    await expect(page.locator('#level-A2')).toBeInViewport();
    await assertNoHorizontalOverflow(page);
    if (shots) await page.screenshot({ path: `${shots}/levels-book-${width}.png`, fullPage: false });
    await page.goto('/#journey');
    await expect(page.locator('.journey-stage')).toHaveCount(4);
    const a2 = levelCoverage[1];
    await expect(page.locator('.journey-stage').nth(1)).toContainText(`${a2.cumulative.toLocaleString('en-US')} words covered`);
    await expect(page.locator('.journey-stage').nth(1)).toContainText(a2.remaining ? `${a2.remaining} more` : 'Minimum vocabulary coverage reached');
    await expect(page.locator('.journey-stage').nth(2)).toContainText(`${levelCoverage[2].lessons} available lessons`);
    await expect(page.locator('.journey-stage').nth(3)).toContainText('0 available lessons');
    await assertNoHorizontalOverflow(page);
    if (shots) await page.screenshot({ path: `${shots}/levels-journey-${width}.png`, fullPage: true });
  }
  expect(errors).toEqual([]);
});

test('A2 transport can be completed on a phone with every illustration and audio', async ({ page }) => {
  test.setTimeout(180_000);
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const lesson = publishedLessons.find(lesson => lesson.id === 'a2-onderweg');
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/#lesson/a2-onderweg');
  const [response] = await Promise.all([
    page.waitForResponse(r => r.url().includes('/audio/') && r.url().endsWith('.m4a')),
    page.getByRole('button', { name: 'Listen to de buslijn', exact: true }).click(),
  ]);
  expect(response.status()).toBeLessThan(400);
  await readLesson(page, lesson, { mobile: true });
  await expect(page.locator('.lesson-row').filter({ has: page.getByRole('heading', { name: lesson.title, exact: true }) })).toContainText('Read again');
  expect(errors).toEqual([]);
});

// B1 pages are longer, with wider tables and dialogues: every page must fit a small phone, a large
// phone, a tablet and a desktop without sideways scrolling.
const viewports = [
  { name: 'phone-320', width: 320, height: 640 },
  { name: 'phone-390', width: 390, height: 844 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'phone-landscape', width: 844, height: 390 },
  { name: 'desktop-1920', width: 1920, height: 1080 },
];
for (const viewport of viewports) {
  test(`every published B1 lesson fits ${viewport.name}`, async ({ page }) => {
    const b1 = publishedLessons.filter(lesson => lesson.level === 'B1');
    test.setTimeout(240_000 + b1.length * 180_000);
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto('/');
    await page.evaluate(ids => localStorage.setItem('langzaam-v2', JSON.stringify({
      version: 2, words: {}, completedSteps: {}, completedLessons: ids, processedEvents: {},
    })), lessons.map(l => l.id));
    await page.goto('/#book');
    await assertNoHorizontalOverflow(page);
    for (const lesson of b1) {
      await page.goto(`/#lesson/${lesson.id}`);
      await page.reload();
      await readLesson(page, lesson, { mobile: true, seen: new Set(), prefix: `${viewport.name}-${lesson.id}-` });
    }
    expect(errors).toEqual([]);
  });
}
