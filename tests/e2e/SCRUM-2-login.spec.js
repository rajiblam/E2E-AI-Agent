const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/loginPage');
const { URLS } = require('../../constants/urls');

test.describe('SCRUM-2 orangehrm invalid login flow @smoke', () => {
  test('user sees an invalid credentials error and remains on the login page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const username = 'Admin';
    const password = 'wrongPassword';
    const expectedErrorText = 'Invalid credentials';

    await test.step('Open the orangehrm login URL', async () => {
      await loginPage.openOrangeHrmLogin(URLS.orangeHrmLogin);
    });

    await test.step('Enter invalid credentials and submit the form', async () => {
      await loginPage.loginOrangeHrm(username, password);
    });

    await test.step('Verify the invalid credentials error is shown and the user stays on the login page', async () => {
      await loginPage.expectInvalidCredentialsErrorVisible(expectedErrorText);
      await expect(page).toHaveURL(/auth\/login/i);
      await expect(page.locator('input[name="username"]')).toBeVisible();
      await expect(page.locator('input[name="password"]')).toBeVisible();
    });
  });
});
