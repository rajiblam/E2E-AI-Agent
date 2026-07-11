const { test } = require('../../fixtures/testFixtures');
const { expect }  = require('@playwright/test');
const { URLS }    = require('../../constants/urls');

test.describe('User API @api', () => {

  test('GET /api/users returns 200 @smoke', async ({ request }) => {
    await test.step('Make GET request to /api/users', async () => {
      const res = await request.get(URLS.api.users);
      expect(res.status()).toBe(200);
    });

    await test.step('Verify response contains users array', async () => {
      const res = await request.get(URLS.api.users);
      const body = await res.json();
      expect(body).toHaveProperty('users');
      expect(Array.isArray(body.users)).toBe(true);
    });
  });

  test('POST /api/users creates a new user @regression', async ({ request }) => {
    const newUser = {
      email: `test-${Date.now()}@example.com`,
      username: `testuser${Date.now()}`,
      password: 'TempPass123!',
    };

    await test.step('Create new user', async () => {
      const res = await request.post(URLS.api.users, {
        data: newUser,
      });
      expect(res.status()).toBe(201);
      const body = await res.json();
      expect(body).toHaveProperty('id');
      expect(body.email).toBe(newUser.email);
    });
  });

  test('GET /api/search returns matching results @smoke', async ({ request }) => {
    await test.step('Search for JavaScript', async () => {
      const res = await request.get(URLS.api.search, {
        params: { q: 'JavaScript' },
      });
      expect(res.status()).toBe(200);
      const body = await res.json();
      expect(body).toHaveProperty('results');
      expect(Array.isArray(body.results)).toBe(true);
    });
  });

});
