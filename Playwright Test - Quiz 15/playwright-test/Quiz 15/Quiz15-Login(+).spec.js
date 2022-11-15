import { test, expect } from '@playwright/test';
test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByText('Accepted usernames are:standard_userlocked_out_userproblem_userperformance_glitc').click();

  const username = page.locator('[data-test="username"]');
  await expect(username).toBeEditable();
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');

  const password = page.locator('[data-test="password"]');
  await expect(password).toBeEditable();
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');

  const login_button = page.locator('[data-test="login-button"]');
  await expect(login_button).toBeEnabled();
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); 
});