const {expect} = require('@playwright/test');

export async function createResume(page, name) {
  await page.goto('/');
  const nameInput = await page.getByTestId('personal-info').nth(0);
  await expect(nameInput).toBeVisible();
  await nameInput.fill(name);

  const generateResumeButton = await page.getByTestId('generate-resume');
  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled();
  await generateResumeButton.click();
  await expect(generateResumeButton).toBeHidden();
  const saveButton = await page.getByTestId('save-button');
  await expect(saveButton).toBeVisible();
  await saveButton.click();
}
