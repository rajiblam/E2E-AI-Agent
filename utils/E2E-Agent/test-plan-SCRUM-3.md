# Automation Test Plan

## Ticket
- Ticket ID: SCRUM-3
- Repository: https://github.com/rajiblam/E2E-AI-Agent.git
- Target Framework: Playwright + Page Object Model

## Scope
Automate the valid-credential login flow based on the Jira description by opening the login URL, entering the provided credentials, and asserting the dashboard is shown.

## Recommended Automation Scenarios
### Smoke
- Scenario 1: User opens the login page and signs in with valid credentials.
- Scenario 2: User lands on the dashboard and sees the expected text after successful authentication.

### Regression
- Scenario 3: The login page remains accessible when the sign-in flow is repeated.

### Negative / Edge Cases
- Scenario 4: Invalid credentials still show a login error and prevent dashboard access.

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
