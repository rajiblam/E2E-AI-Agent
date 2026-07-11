const { test } = require('../../fixtures/testFixtures');
const { expect } = require('@playwright/test');
const config = require('../../config/config.json');

test.describe('Practice login scenario @smoke', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  // Test case for invalid credentials
  test('user sees invalid credentials message for wrong username and password', async ({ loginPage, page }, testInfo) => {
    const invalidCredentials = config.credentials.invalidUser;

    await test.step('Login with invalid credentials', async () => {
      await loginPage.login(invalidCredentials.username, invalidCredentials.password, testInfo);
    });

    await test.step('Verify invalid credentials message', async () => {
      const errorMsg = await loginPage.getErrorMessage('login-error');
      expect(errorMsg).toContain(config.messages.invalidUsernameMessage);
      await expect(loginPage.loginButton).toBeVisible();
    });
  });

  // Test case for successful login and logout
  test('user can login, verify logout button, logout, and confirm the login page text', async ({ loginPage, page }, testInfo) => {
    const studentCredentials = config.credentials.student;

    await test.step('Login with the provided credentials', async () => {
      await loginPage.login(studentCredentials.username, studentCredentials.password, testInfo);
    });

    await test.step('Verify successful login and logout button', async () => {
      await expect(page).toHaveURL(new RegExp(config.urls.loggedInSuccessPattern.replace(/\//g, '\\/')));
      await expect(loginPage.logoutButton).toBeVisible();
      expect(await loginPage.isLoggedIn()).toBe(true);
    });

    await test.step('Logout and verify the login page heading', async () => {
      await loginPage.logout(testInfo);
      await expect(page.getByRole('heading', { name: new RegExp(config.messages.loginPageTitle, 'i') })).toBeVisible();
      await expect(loginPage.loginButton).toBeVisible();
    });
  });

});
