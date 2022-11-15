import { test, expect } from '@playwright/test';
test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="username"]').press('Tab');
  await page.locator('[data-test="password"]').fill('secret_sauce');

  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('a:has-text("1")').click();

  const locator = page.locator('[data-test="remove-sauce-labs-backpack"]');
  await expect(locator).toBeEnabled();
  await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

  const nama_produk = page.getByRole('link', { name: 'Sauce Labs Backpack'}); 
  await expect(nama_produk).toBeVisible();
  await expect(page.getByText('carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.')).toBeVisible();
  await expect(page.getByText('$29.99')).toBeVisible();
  await expect(page.locator('#cart_contents_container').getByText('1')).toBeVisible();

  await page.locator('[data-test="checkout"]').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
  await expect(page.locator('.checkout_info')).toBeVisible();
  const First_Name = page.locator('[data-test="firstName"]');
  await expect(First_Name).toBeEditable();
  const Last_Name = page.locator('[data-test="lastName"]');
  await expect(Last_Name).toBeEditable();
  const Postal_Code = page.locator('[data-test="postalCode"]');
  await expect(Postal_Code).toBeEditable();
  
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('Farhan');

  await page.locator('[data-test="firstName"]').press('Tab');
  await page.locator('[data-test="lastName"]').fill('Sidik');

  await page.locator('[data-test="lastName"]').press('Tab');
  await page.locator('[data-test="postalCode"]').fill('40288');
  await page.locator('[data-test="continue"]').click();

  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
  await expect(page.getByText('Payment Information:')).toBeVisible();
  await expect(page.getByText('Shipping Information:')).toBeVisible();
  await expect(page.getByText('Total: $32.39')).toBeVisible();
  const cancel = page.locator('[data-test="cancel"]');
  await expect(cancel).toBeEnabled();
  const finish = page.locator('[data-test="finish"]');
  await expect(finish).toBeEnabled();
  await page.locator('[data-test="finish"]').click();

  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
  const complete_order = page.getByRole('heading', { name: 'THANK YOU FOR YOUR ORDER' });
  await expect(complete_order).toBeVisible();
  await expect(page.getByText('Your order has been dispatched, and will arrive just as fast as the pony can get there!')).toBeVisible();
  const image = page.getByRole('img', { name: 'Pony Express' });
  await expect(image).toBeVisible();
  const back_home = page.locator('[data-test="back-to-products"]');
  await expect(back_home).toBeEnabled();

});