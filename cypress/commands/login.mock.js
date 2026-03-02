// Example: stub the `/api/login` endpoint with `cy.intercept` so tests do not
// depend on an external backend.

// Usage in a spec before calling any login helper:
//   cy.stubLoginApi('test@example.com', 'stub-token')
//   cy.loginSession('test@example.com', 'ignored-password')
// The `cy.loginApi` implementation (which does a real `cy.request`) will
// receive the intercepted response and `localStorage.authToken` will be set.

Cypress.Commands.add('stubLoginApi', (email = 'test@example.com', token = 'stub-token') => {
  cy.intercept('POST', '/api/login', (req) => {
    // Optionally validate request body: req.body.email === email
    req.reply({ statusCode: 200, body: { token } })
  }).as('loginApi')
})

// If you prefer to bypass the network entirely, set the token directly:
// Cypress.Commands.add('setAuthToken', (token) => {
//   window.localStorage.setItem('authToken', token)
// })
