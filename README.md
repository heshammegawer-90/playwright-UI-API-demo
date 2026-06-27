# Playwright-UI-API-demo

This is a demo project for UI and API test automation using Playwright and TypeScript.

The project demonstrates modern test automation practices including Page Object Model (POM), custom fixtures, helper utilities, environment management, authentication via storage state, and CI/CD integration using GitHub Actions.

## Features

### UI Testing

- Login functionality
- Negative login scenarios
- Product selection
- Shopping cart validation
- Checkout flow
- Order confirmation
- URL validation
- UI element assertions

### API Testing

- GET requests
- POST requests
- PUT requests
- DELETE requests
- Authentication using API keys
- Status code validation
- Response body validation
- Positive and negative test scenarios

### Framework Features

- Page Object Model (POM)
- Custom Playwright fixtures
- Reusable helper methods
- Environment variable management
- Storage State authentication
- GitHub Actions CI/CD pipeline
- HTML reporting
- Screenshots on failure
- Videos on failure
- Trace collection on failure

---

## Tech Stack

- Playwright
- TypeScript
- Node.js
- GitHub Actions

---

## Project Structure

```text
tests/
├── ui/
│   ├── login.spec.ts
│   └── checkout.spec.ts
│
├── api/
│   └── users.api.spec.ts
│
pages/
├── LoginPage.ts
├── InventoryPage.ts
├── CartPage.ts
├── PersonalDataPage.ts
├── CheckoutPage.ts
└── ConfirmationPage.ts
│
helpers/
├── env.ts
└── generateRandomEmails.ts
│
fixtures/
└── pageFixture.ts
│
playwright/
└── .auth/
    └── user.json
│
.github/
└── workflows/
    └── playwright.yml
```

---

## Authentication

The framework uses Playwright Storage State to avoid repeating login steps across tests.

Authenticated sessions are stored in:

```text
playwright/.auth/user.json
```

This improves test execution speed and reduces unnecessary UI login operations.

---

## Environment Variables

Test data and secrets are managed using environment variables.

Example:

```env
USER_NAME=
PASSWORD=
FIRST_NAME=
LAST_NAME=
POSTAL_CODE=
REQRES_API_KEY=
```

The `.env` file is excluded from source control using `.gitignore`.

---

## Running Tests

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

Run all tests:

```bash
npx playwright test
```

Run UI tests only:

```bash
npx playwright test tests/ui
```

Run API tests only:

```bash
npx playwright test tests/api
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run a specific test:

```bash
npx playwright test -g "Checkout flow"
```

Generate and open the HTML report:

```bash
npx playwright show-report
```

---

## CI/CD

The project includes a GitHub Actions pipeline that automatically executes tests on:

- Push events
- Pull Requests
- Scheduled executions (optional)

Artifacts generated during execution include:

- HTML Reports
- Screenshots
- Videos
- Traces

These artifacts can be downloaded from GitHub Actions to help investigate failed test runs.

---

## Design Principles

- Maintainable and scalable architecture
- Reusable test components
- Separation of test logic and page logic
- Centralized test data management
- Fast execution using authenticated sessions
- Readable and easy-to-maintain codebase
