const {test, expect} = require('@playwright/test');
const {createResume} = require('../utils/create-resume');

test.beforeEach(async ({page}) => {
  await page.goto('/');
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
});

test('Наличие страницы со списком (score: 0)', async ({page}) => {
  await page.goto('/all');

  const title = await page.getByText('Мои резюме');
  await expect(title).toBeVisible();
});

test('Наличие кнопки добавления резюме (score: 0)', async ({page}) => {
  await page.goto('/all');

  const addResumeButton = await page.getByTestId('add-resume');

  await expect(addResumeButton).toHaveText('+');
  await expect(addResumeButton).toHaveAttribute('title', 'Добавить');
});

test('Нажатие на кнопку добавления резюме ведет на форму (score: 0)', async ({page}) => {
  await page.goto('/all');

  const addResumeButton = await page.getByTestId('add-resume');
  await addResumeButton.click();

  const resumeForm = await page.getByTestId('resume-builder');
  await expect(resumeForm).toBeVisible();
});

test('Генерация резюме с названием (score: 0)', async ({page}) => {
  await page.goto('/');

  const nameInput = await page.getByTestId('personal-info').nth(0);
  await expect(nameInput).toBeVisible();
  await nameInput.fill('Данилов Дмитрий Евгеньевич');

  const resumeInput = await page.getByTestId('resume-title-field');
  await expect(resumeInput).toBeVisible();
  await resumeInput.fill('JS разработчик');

  const generateResumeButton = await page.getByTestId('generate-resume');
  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled();
  await generateResumeButton.click();
  await expect(generateResumeButton).toBeHidden();
  const backButton = await page.getByTestId('back-button');
  await expect(backButton).toBeVisible();

  const resume = await page.getByTestId('resume-main-content');

  await expect(resume).toBeVisible();

  await backButton.click();
  await expect(resumeInput).toHaveValue('JS разработчик');
  await resumeInput.fill('TS разработчик');
  await generateResumeButton.click();

  await backButton.click();
  await expect(resumeInput).toHaveValue('TS разработчик');
});

test('Проверка наличия кнопки "Действия" (score: 0)', async ({page}) => {
  await createResume(page, 'Пушкин Александр Сергеевич');
  await page.goto('/all');

  const actionButton = await page.getByTestId('resume-actions');
  const title = await actionButton.nth(0).getAttribute('title');
  expect(title).toBe('Действия');
});
