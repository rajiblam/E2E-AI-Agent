# Automation Test Plan

## Ticket
- Ticket ID: SCRUM-3
- Repository: https://github.com/rajiblam/E2E-AI-Agent.git
- Target Framework: Playwright + Page Object Model

## Scope
Automate the valid-credential login scenario for the Practice Test Automation app, including successful authentication, verification of the logged-in state, and logout confirmation.

## Recommended Automation Scenarios
### Smoke
- Scenario 1: User logs in with valid credentials and lands on the successful login state.
- Scenario 2: User logs out successfully and returns to the login page.

### Regression
- Scenario 3: The login page still shows the expected heading and controls after logout.

### Negative / Edge Cases
- Scenario 4: Invalid credentials still surface the expected error message and keep the user on the login page.

## Mapping to Framework Components
- Page Objects: pages/loginPage.js, pages/base/basePage.js
- Fixtures / Data: fixtures/testFixtures.js, config/config.json
- Utilities / Helpers: utils/helpers.js, utils/retryUtil.js
- Selectors / Constants: constants/urls.js, constants/selectors.js, constants/timeouts.js

## Execution Strategy
1. Reuse the existing login page object and fixtures.
2. Implement or adjust the Playwright spec under tests/e2e.
3. Execute the relevant Playwright tests and heal failures until green.
4. Capture evidence through Playwright report and screenshots.
5. Prepare the repository handoff with the verified diff.
