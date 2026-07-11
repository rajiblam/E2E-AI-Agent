const { test } = require('../../fixtures/testFixtures');
const { expect } = require('@playwright/test');
const config = require('../../config/config.json');

test.describe('SCRUM-3 login flow @smoke', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('user can log in with valid credentials, verify the logged-in state, and log out', async ({ loginPage, page }, testInfo) => {
    const studentCredentials = config.credentials.student;

    await test.step('Login with valid credentials', async () => {
      await loginPage.login(studentCredentials.username, studentCredentials.password, testInfo);
    });

    await test.step('Verify the user is logged in', async () => {
      await expect(page).toHaveURL(new RegExp(config.urls.loggedInSuccessPattern.replace(/\//g, '\\/')));
      await expect(loginPage.logoutButton).toBeVisible();
      expect(await loginPage.isLoggedIn()).toBe(true);
    });

    await test.step('Logout and return to the login page', async () => {
      await loginPage.logout(testInfo);
      await expect(page.getByRole('heading', { name: new RegExp(config.messages.loginPageTitle, 'i') })).toBeVisible();
      await expect(loginPage.loginButton).toBeVisible();
    });
  });
});
