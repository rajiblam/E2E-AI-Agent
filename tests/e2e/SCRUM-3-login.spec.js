const { test, expect } = require('@playwright/test');

test.describe('SCRUM-3 login flow @smoke', () => {
  test('user can open the login URL, enter valid credentials, and reach the dashboard', async ({ page }) => {
    const loginUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
    const username = 'Admin';
    const password = 'admin123';
    const expectedDashboardText = 'Dashboard';

    await test.step('Open the login URL', async () => {
      await page.goto(loginUrl, { waitUntil: 'domcontentloaded' });
    });

    await test.step('Enter valid credentials', async () => {
      await page.locator('input[name="username"]').fill(username);
      await page.locator('input[name="password"]').fill(password);
      await page.locator('button[type="submit"]').click();
    });

    await test.step('Verify the dashboard is visible', async () => {
      await expect(page.locator('body')).toContainText(expectedDashboardText);
    });
  });
});
