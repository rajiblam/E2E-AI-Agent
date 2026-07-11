# Jira Steps Artifact

## Ticket
- Ticket ID: SCRUM-5
- Summary: Add a regression scenario for the OrangeHRM login/logout flow.
- Source: Browser-observed issue context provided for this task.

## Objective
Convert the provided SCRUM-5 ticket steps into an automation-ready regression spec for the login/logout flow.

## Extracted Steps
1. Open the OrangeHRM login URL.
2. Enter the username Admin.
3. Enter the password admin123.
4. Submit the credentials.
5. Validate that the Dashboard is shown.
6. Click the profile menu.
7. Click logout.
8. Validate that the Login text is shown after sign-out.

## Acceptance Criteria
- The login page opens successfully.
- The user can sign in with the supplied credentials.
- The Dashboard appears after successful authentication.
- The profile menu can be opened and the logout action can be triggered.
- The page returns to the login view and shows the Login text after logout.

## Notes
- The automation steps were derived from the explicit ticket description provided for this task.
- No additional steps were invented beyond the supplied login/logout workflow.
