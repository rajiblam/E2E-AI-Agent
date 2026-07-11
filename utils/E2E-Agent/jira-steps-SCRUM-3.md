# Jira Steps Artifact

## Ticket
- Ticket ID: SCRUM-3
- Summary: Verify login functionality with valid credentials
- Source: https://arpanlama2024.atlassian.net/browse/SCRUM-3

## Objective
Validate the login flow using the visible Jira ticket content and convert it into a Playwright automation scenario.

## Extracted Steps
1. Open URL: https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
2. Enter Username: Admin
3. Enter Password: admin123
4. Validate that the page shows the Dashboard text after login.

## Acceptance Criteria
- User can open the login page.
- User can sign in with the provided valid credentials.
- The dashboard page is shown after successful authentication.

## Notes
- The Jira description contained the concrete login steps and expected validation text.
- This is a smoke scenario that maps well to the existing Playwright login test structure.
