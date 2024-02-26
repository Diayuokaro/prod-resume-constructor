const {test, expect} = require('@playwright/test');

test('Демонстрация работы тестов (score: 0)', async ({page}) => {
  await page.goto('/');

  const resumeFormTitle = await page.getByTestId('resume-form-title')
  await expect(resumeFormTitle).toHaveText('Конструктор резюме');

  await expect(resumeFormTitle).toHaveScreenshot('resume-form-title.png');
});
