const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/loginPage');
const { URLS } = require('../../constants/urls');

test.describe('SCRUM-5 OrangeHRM login/logout regression @smoke', () => {
  test('user can sign in, verify the dashboard, log out, and return to the login page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const username = 'Admin';
    const password = 'admin123';
    const expectedDashboardText = 'Dashboard';
    const expectedLoginText = 'Login';

    await test.step('Open the OrangeHRM login URL', async () => {
      await loginPage.openOrangeHrmLogin(URLS.orangeHrmLogin);
    });

    await test.step('Enter valid credentials and submit the form', async () => {
      await loginPage.loginOrangeHrm(username, password);
    });

    await test.step('Validate the dashboard is shown after login', async () => {
      await loginPage.expectDashboardVisible(expectedDashboardText);
    });

    await test.step('Open the profile menu and trigger logout', async () => {
      await loginPage.logoutOrangeHrm();
    });

    await test.step('Validate the login text is shown after logout', async () => {
      await loginPage.expectLoginTextVisible(expectedLoginText);
    });
  });
});
