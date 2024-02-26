const {test, expect} = require('@playwright/test');
const {createResume} = require('../utils/create-resume');

const name = 'Петров Василий Алексеевич';

test.beforeEach(async ({page}) => {
  await page.goto('/all');
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  await createResume(page, name);

  await page.goto('/all');
});

test('Проверка наличия кнопки "Копировать" (score: 0)', async ({page}) => {
  const actionButton = await page.getByTestId('resume-actions');
  await actionButton.click();

  const copyButton = await page.getByTestId('resume-actions__copy');
  await expect(copyButton).toBeVisible();
});

test('Клик по кнопке "Копировать" открывает диалог с чекбоксами и двумя кнопками (score: 0)', async ({page}) => {
  const actionButton = await page.getByTestId('resume-actions');
  await actionButton.click();

  const copyButton = await page.getByTestId('resume-actions__copy');
  await copyButton.click();

  const modalCheckboxes = await page.getByTestId('copy-modal__checkbox');
  await expect(modalCheckboxes).toHaveCount(7);

  const modalCopyButton = await page.getByTestId('copy-modal__copy');
  await expect(modalCopyButton).toBeVisible();

  const modalCancelButton = await page.getByTestId('copy-modal__cancel');
  await expect(modalCancelButton).toBeVisible();
});

test('Клик по кнопке "Отмена" внутри диалога закрывает диалог (score: 0)', async ({page}) => {
  const actionButton = await page.getByTestId('resume-actions');
  await actionButton.click();

  const copyButton = await page.getByTestId('resume-actions__copy');
  await copyButton.click();

  const modalCancelButton = await page.getByTestId('copy-modal__cancel');
  await expect(modalCancelButton).toBeVisible();

  await modalCancelButton.click();

  await expect(modalCancelButton).toBeHidden();
});

test('Проверяем, что имя копируется (score: 0)', async ({page}) => {
  const actionButton = await page.getByTestId('resume-actions');
  await actionButton.click();

  const copyButton = await page.getByTestId('resume-actions__copy');
  await copyButton.click();

  const personalInfoCheckbox = await page.getByTestId('copy-modal__checkbox').nth(0);
  await personalInfoCheckbox.click();

  const modalCopyButton = await page.getByTestId('copy-modal__copy');
  await modalCopyButton.click();

  const nameInput = await page.getByTestId('personal-info').nth(0);
  await expect(nameInput).toBeVisible();
  await nameInput.fill(name);
});
