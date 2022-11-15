import { test, expect } from '@playwright/test';
test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  const username = page.locator('[data-test="username"]');
  await expect(username).toBeEditable();
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('inibukanusername');

  const password = page.locator('[data-test="password"]');
  await expect(password).toBeEditable();
  await page.locator('[data-test="username"]').press('Tab');
  await page.locator('[data-test="password"]').fill('inijugabukanpassword');

  const login_button = page.locator('[data-test="login-button"]');
  await expect(login_button).toBeEnabled();
  
  await page.locator('[data-test="login-button"]').click();

  const locator = page.locator('[data-test="error"]');
  await expect(locator).toHaveText("Epic sadface: Username and password do not match any user in this service");
});