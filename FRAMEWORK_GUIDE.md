# Playwright POM Framework - Setup & Usage Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
# Copy the template
cp .env.example .env

# Update with your values
BASE_URL=http://localhost:3000
API_URL=http://localhost:3001
TEST_USERNAME=testuser@example.com
TEST_PASSWORD=SuperSecret123!
```

### 3. Run Tests
```bash
# Run all tests
npm test

# Run smoke tests
npm run test:smoke

# Run in headed mode (see browser)
npm run test:headed

# Debug mode
npm run test:debug
```

## Framework Key Features

### ✅ Page Object Model
- Centralized locators and page methods
- Base class for shared functionality
- Component objects for reusable UI sections

### ✅ Test Fixtures
- Pre-configured fixtures with page objects
- Authenticated fixtures with session reuse
- API helper fixture for backend testing

### ✅ Global Setup/Teardown
- Single login performed before tests
- Session saved and reused across tests
- Global cleanup after tests complete

### ✅ Utilities
- **Helpers**: Date formatting, waits, environment variables
- **DataGenerator**: Faker-based random data generation
- **ApiHelper**: REST API calls for test data management
- **RetryUtil**: Automatic retry mechanism for flaky calls
- **Logger**: Structured console output

### ✅ Constants
- Centralized URLs, selectors, and timeouts
- Easy to update for different environments
- Prevents magic strings in tests

### ✅ Environment Management
- Multi-environment support (dev, staging, prod)
- Environment-specific configuration
- Dotenv for secrets management

### ✅ CI/CD Ready
- GitHub Actions workflow configured
- Cross-browser matrix testing
- Browser caching for speed
- Artifact upload for reports

## Test Structure Example

```javascript
const { test } = require('../fixtures/testFixtures');
const { expect } = require('@playwright/test');

test.describe('Feature @smoke', () => {
  test.beforeEach(async ({ searchPage }) => {
    await searchPage.navigate('/search');
  });

  test('user can search successfully', async ({ searchPage }) => {
    await test.step('Perform search', async () => {
      await searchPage.search('JavaScript');
    });
    
    await test.step('Verify results', async () => {
      expect(await searchPage.getResultCount()).toBeGreaterThan(0);
    });
  });
});
```

## Common Commands

```bash
# Testing
npm test                    # Run all tests
npm run test:dev            # Run tests against dev
npm run test:staging        # Run tests against staging
npm run test:smoke          # Run @smoke tagged tests
npm run test:regression     # Run @regression tagged tests
npm run test:headed         # Run in headed mode
npm run test:debug          # Debug mode with inspector

# Code Quality
npm run lint                # Check linting errors
npm run lint:fix            # Fix linting issues
npm run format              # Format code with prettier

# Utilities
npm run report              # View HTML report
npm run codegen             # Record test interactions

# Install browsers
npx playwright install
```

## Project Structure

```
tests/
├── e2e/               # UI tests
│   ├── search.spec.js
│   └── login.spec.js
└── api/               # API tests
    └── users.api.spec.js

pages/
├── base/
│   └── basePage.js    # Shared page functionality
├── components/        # Reusable components
│   ├── navBar.js
│   └── modal.js
├── homePage.js
└── searchPage.js

utils/
├── helpers.js         # Utility functions
├── dataGenerator.js   # Faker data generation
├── apiHelper.js       # API calls
├── retryUtil.js       # Retry logic
└── logger.js          # Logging

constants/
├── urls.js            # URL paths
├── selectors.js       # Test IDs/Selectors
└── timeouts.js        # Named timeouts

fixtures/
├── testFixtures.js    # Custom fixtures
└── testData/
    ├── searchData.json
    └── users.json
```

## Debugging Tips

### 1. Use Playwright Inspector
```bash
npm run test:debug
```

### 2. View Trace Files
Traces capture network requests, console logs, and screenshots:
```bash
npx playwright show-trace reports/test-results/trace.zip
```

### 3. Take Screenshots
```javascript
await page.screenshot({ path: 'reports/screenshots/debug.png' });
```

### 4. Generate Test Code
```bash
npm run codegen http://localhost:3000
```

### 5. Add Logging
```javascript
const { Logger } = require('../utils/logger');
Logger.info('Starting test');
Logger.error('Test failed');
```

## Test Tagging Strategy

Use tags to organize and run specific test groups:

```javascript
// Run only smoke tests
npx playwright test --grep @smoke

// Exclude slow tests
npx playwright test --grep-invert @slow
```

Available tags:
- `@smoke` - Critical functionality
- `@regression` - Full test suite
- `@critical` - Business critical
- `@slow` - Long-running tests
- `@api` - API tests
- `@a11y` - Accessibility tests
- `@wip` - Work in progress

## Authentication

The framework handles authentication automatically:

1. **global-setup.js** logs in before tests
2. Session is saved to **fixtures/auth.json**
3. **authenticatedTest** fixture reuses this session

To add authentication, update `global-setup.js` with your login flow.

## Tips & Best Practices

### ✅ Do's
- Use `test.step()` for clear test structure
- Keep page objects focused on actions
- Use centralized locators (constants/selectors)
- Extract repeated logic into utilities
- Use meaningful test names
- Prefix test data with `[TEST]` for cleanup
- Use environment variables for config

### ❌ Don'ts
- Don't put assertions in page objects
- Don't hardcode URLs/selectors in tests
- Don't create long test chains
- Don't skip error handling
- Don't ignore flaky tests
- Don't commit .env files
- Don't mix test concerns (UI + API in one test)

## Troubleshooting

### Tests timeout
- Increase timeout in `playwright.config.js`
- Check network conditions
- Use `PWDEBUG=1` to see what's happening

### Element not found
- Verify data-testid exists in HTML
- Check if element is in an iframe
- Use `page.screenshot()` to debug
- Use Inspector: `npm run test:debug`

### Authentication fails
- Verify credentials in `.env`
- Check if login flow changed
- Update `global-setup.js`
- Check `fixtures/auth.json` exists

### Flaky tests
- Use retry utility: `withRetry()`
- Add wait for elements
- Check for race conditions
- Add explicit waits

## CI/CD Pipeline

GitHub Actions workflow at `.github/workflows/playwright.yml`:

- Runs on: push, PR, and schedule (nightly)
- Tests matrix: chromium, firefox, webkit
- Caches browsers for speed
- Uploads reports and traces
- Requires GitHub Secrets: BASE_URL, TEST_USERNAME, TEST_PASSWORD

## Next Steps

1. ✅ Update page objects for your application
2. ✅ Create test data in `fixtures/testData/`
3. ✅ Update constants for your URLs/selectors
4. ✅ Implement authentication in `global-setup.js`
5. ✅ Write tests using the fixtures
6. ✅ Set up GitHub Secrets for CI/CD
7. ✅ Run tests locally and in CI

## Resources

- [Playwright Docs](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Guide](https://playwright.dev/docs/debug)
- [API Reference](https://playwright.dev/docs/api/class-page)

Happy testing! 🎭
