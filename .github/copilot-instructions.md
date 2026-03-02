**Purpose**: Quick orientation for AI coding agents working on this repository (Cypress test suite).

**Repository Shape**
- **`cypress/e2e`**: test specs (uses ES modules). Example: `cypress/e2e/public/home.cy.js`.
- **`cypress/pages`**: small Page Object classes. Pattern: `export default new HomePage()` (see `cypress/pages/home.page.js`).
- **`cypress/commands`**: command implementations (e.g. `auth.commands.js`). `cypress/commands/index.js` imports and exposes custom commands.
- **`cypress/support`**: global support files. `support/e2e.js` imports `../commands` and `./session`.

**Big Picture & Dataflow**
- Tests call page objects and custom commands. Example flow for an authenticated test:
  - `cy.loginSession(email,password)` (in `cypress/support/session.js`) uses `cy.session` and calls `cy.loginApi`.
  - `cy.loginApi` (in `cypress/commands/auth.commands.js`) does a `cy.request({ method: 'POST', url: '/api/login', body: { email, password } })` and stores `resp.body.token` in `window.localStorage` under key `authToken`.
  - After that, page visits use the `baseUrl` from `cypress.config.js` (currently `https://example.cypress.io`).

**Important files & patterns to reference**
- `cypress.config.js` — global timeouts, retries (runMode: 2, openMode: 0), `baseUrl`, `chromeWebSecurity: false`.
- `cypress/support/session.js` — session caching pattern: `cy.session([email], () => cy.loginApi(email, password))`.
- `cypress/commands/index.js` — central import file for custom commands (add new commands here or import them from this index so `support/e2e.js` picks them up).
- `cypress/pages/*.page.js` — Page Object pattern (small helpers returning Cypress chains).

**Run / Dev workflows (verified from repo)**
- Install dependencies: `npm install` (this project lists `cypress` in `devDependencies`).
- Open interactive runner: `npx cypress open`.
- Run headless: `npx cypress run`.

Notes: there is no application server in the repo. Tests use `baseUrl` and network requests (e.g. `/api/login`). Do not attempt to start a backend from this repo — prefer `cy.intercept` when you need deterministic responses or ask for the correct environment/credentials from the maintainer.

**Conventions & best practices specific to this project (discoverable patterns)**
- Page objects are small and exported as singletons: `export default new Class()`.
- Custom commands live under `cypress/commands/` and should be exported via `cypress/commands/index.js` so `support/e2e.js` can import them via `import '../commands'`.
- API login stores a token under `localStorage['authToken']` — other tests rely on this key.
- All code and comments are in English for consistency across the team.

**When editing or adding tests/commands**
- Add new command files to `cypress/commands/` and import them in `cypress/commands/index.js`.
- For authentication helper changes, update `cypress/commands/auth.commands.js` and `cypress/support/session.js` to keep session caching behavior.
- Prefer `cy.intercept()` to stub external APIs when adding unit-like tests, because the repo doesn't include a backend and CI may not have test accounts.

Examples included in the repo:
- `cypress/commands/command.template.js`: a ready-to-copy template for new `Cypress.Commands.add(...)` implementations.
- `cypress/commands/login.mock.js`: example showing `cy.intercept('POST','/api/login', ...)` to stub login responses; works with the existing `cy.loginApi` implementation so `localStorage.authToken` is still set.


**Common pitfalls for an AI agent**
- Do not assume a local server exists; network calls target `baseUrl` in `cypress.config.js`.
- Respect configured retries/timeouts before changing them; they are intentionally set (`defaultCommandTimeout: 8000`, etc.).
- When adding files, preserve ES module style (use `import` / `export default`) to match existing tests.

If anything here is unclear or you want me to expand examples (e.g., a template for adding a new command or a mocked login test), tell me which part to expand.
