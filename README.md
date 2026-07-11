# Playwright POM Framework - JavaScript

A complete, robust Page Object Model (POM) framework for JavaScript-based Playwright automation testing. This framework follows best practices for maintainability, scalability, and CI/CD integration.

## 📁 Project Structure

```
project-root/
├── tests/
│   ├── e2e/                        # UI end-to-end tests
│   │   ├── search.spec.js
│   │   └── login.spec.js
│   └── api/                        # API tests
│       └── users.api.spec.js
│
├── pages/                          # Page Object classes
│   ├── base/
│   │   └── basePage.js             # Shared base class
│   ├── components/                 # Reusable UI components
│   │   ├── navBar.js
│   │   └── modal.js
│   ├── homePage.js
│   └── searchPage.js
│
├── fixtures/                       # Custom fixtures & test data
│   ├── testFixtures.js
│   └── testData/
│       ├── searchData.json
│       └── users.json
│
├── utils/
│   ├── helpers.js                  # Utility functions
│   ├── dataGenerator.js            # Faker-based dynamic data
│   ├── apiHelper.js                # REST API calls
│   ├── retryUtil.js                # Retry wrapper
│   └── logger.js                   # Structured logging
│
├── constants/
│   ├── urls.js                     # Route paths
│   ├── selectors.js                # Test IDs
│   └── timeouts.js                 # Named timeouts
│
├── config/
│   ├── playwright.config.js
│   └── environments/
│       ├── dev.env
│       ├── staging.env
│       └── prod.env
│
├── reports/
│   └── test-results/
│
├── .github/workflows/
│   └── playwright.yml              # CI/CD pipeline
│
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── .husky/pre-commit
├── playwright.config.js
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ installed
- npm or yarn package manager

### Installation

1. **Clone and install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env
```

3. **Update `.env` with your configuration:**
```bash
BASE_URL=http://localhost:3000
API_URL=http://localhost:3001
TEST_USERNAME=testuser@example.com
TEST_PASSWORD=SuperSecret123!
ENV=dev
HEADLESS=true
```

4. **Install Playwright browsers:**
```bash
npx playwright install
```

## 📋 Available Scripts

### Running Tests
```bash
# Run all tests
npm test

# Run tests in specific environment
npm run test:dev
npm run test:staging

# Run smoke tests only
npm run test:smoke

# Run regression tests only
npm run test:regression

# Run tests in headed mode (visible browser)
npm run test:headed

# Debug mode with inspector
npm run test:debug
```

### Code Quality
```bash
# Lint files
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

### Reports
```bash
# View HTML report
npm run report

# View trace files (after failure)
npx playwright show-trace reports/test-results/trace.zip
```

### Code Generation
```bash
# Generate test code by recording interactions
npm run codegen
```

## 🏗️ Architecture

### Page Object Model (POM)
- **Page objects** represent web pages or components
- **Never contain assertions** - kept as action helpers only
- **Extend BasePage** for shared functionality
- **Use data-testid selectors** over CSS classes or XPath

### Example Page Object
```javascript
const { BasePage } = require('./base/basePage');

class SearchPage extends BasePage {
  constructor(page) {
    super(page);
    this.searchInput = page.getByTestId('search-input');
    this.searchButton = page.getByTestId('search-btn');
  }

  async search(keyword) {
    await this.searchInput.fill(keyword);
    await this.searchButton.click();
  }
}

module.exports = { SearchPage };
```

### Example Test
```javascript
const { test, authenticatedTest } = require('../fixtures/testFixtures');
const { expect } = require('@playwright/test');

test.describe('Search feature @smoke', () => {
  test('returns results for valid keyword', async ({ searchPage }) => {
    await test.step('Search for JavaScript', async () => {
      await searchPage.search('JavaScript');
    });
    
    await test.step('Verify results are shown', async () => {
      expect(await searchPage.getResultCount()).toBeGreaterThan(0);
    });
  });
});
```

## 🔐 Authentication

The framework uses Playwright's `storageState` for session management:

1. **Global Setup** (`global-setup.js`): Performs login once before tests run
2. **Saves Auth State** to `fixtures/auth.json`
3. **Reuses Session** across tests via `authenticatedTest` fixture

## 🔖 Test Tagging

Use tags for test categorization:

| Tag           | Purpose                    |
|---------------|----------------------------|
| `@smoke`      | Critical path - run on PR  |
| `@regression` | Full suite - nightly runs  |
| `@critical`   | Business-critical flows    |
| `@slow`       | Long-running tests         |
| `@api`        | API-only tests             |
| `@a11y`       | Accessibility tests        |

```bash
# Run smoke tests
npx playwright test --grep @smoke

# Exclude slow tests
npx playwright test --grep-invert @slow
```

## 🌐 Cross-Browser Testing

Configured browsers:
- ✓ Chromium (Desktop)
- ✓ Firefox (Desktop)
- ✓ WebKit (Safari)
- ✓ Mobile Chrome (Pixel 5)
- ✓ Mobile Safari (iPhone 13)

```bash
# Run specific browser
npx playwright test --project=firefox

# Run mobile tests only
npx playwright test --project=mobile-chrome
```

## 📊 Reporting

Multiple report formats supported:

- **HTML Report** (Visual report in `reports/html/`)
- **JUnit XML** (For Jenkins/Azure DevOps)
- **Allure Report** (Rich dashboard with history)
- **List** (CI-friendly stdout)

## 🔄 CI/CD Integration

GitHub Actions workflow configured in `.github/workflows/playwright.yml`:

- ✓ Runs on push/PR to main branch
- ✓ Runs nightly regression tests (2am UTC)
- ✓ Matrix testing across browsers
- ✓ Browser caching for speed
- ✓ Artifact upload for reports & traces

Requires GitHub Secrets:
- `BASE_URL`
- `TEST_USERNAME`
- `TEST_PASSWORD`

## 🛠️ Utilities

### Helpers
```javascript
const { today, formatDate, sleep, getEnvVar } = require('../utils/helpers');
```

### Data Generator (Faker)
```javascript
const { DataGenerator } = require('../utils/dataGenerator');
const email = DataGenerator.randomEmail();
```

### API Helper
```javascript
const { ApiHelper } = require('../utils/apiHelper');
const user = await apiHelper.getUser(userId);
```

### Retry Utility
```javascript
const { withRetry } = require('../utils/retryUtil');
await withRetry(() => unstableFunction(), 3, 500);
```

### Logger
```javascript
const { Logger } = require('../utils/logger');
Logger.info('Test started');
Logger.error('Test failed');
```

## 📝 Best Practices

1. **One assertion per test step** for clarity
2. **Use `test.step()`** to structure complex tests
3. **Extract common patterns** into utilities
4. **Keep locators in page objects** - never in tests
5. **Use descriptive test names** - avoid "Test 1"
6. **Prefix test data with `[TEST]`** for easy cleanup
7. **Use environment variables** for configuration
8. **Mock external APIs** when possible
9. **Run smoke tests frequently** - regression nightly
10. **Keep tests independent** - no test dependencies

## 🐛 Debugging

### Debug Mode
```bash
npm run test:debug
```

Opens Playwright Inspector for step-by-step execution.

### Generate Tests
```bash
npm run codegen http://localhost:3000
```

Records interactions and generates test code.

### View Traces
```bash
npx playwright show-trace reports/test-results/trace.zip
```

Step-by-step replay of test execution with network logs.

## 🔧 Configuration Files

- **`playwright.config.js`** - Test runner configuration
- **`.env.example`** - Environment variable template
- **`.eslintrc.json`** - Linting rules
- **`.prettierrc`** - Code formatting
- **`.husky/pre-commit`** - Git hooks

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Test API](https://playwright.dev/docs/api/class-test)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Guide](https://playwright.dev/docs/debug)

## 📞 Support

For issues or questions:
1. Check the [Playwright Documentation](https://playwright.dev)
2. Review test examples in `tests/` directory
3. Check framework constants in `constants/` directory

## 📄 License

ISC
# E2E-AI-Agent
