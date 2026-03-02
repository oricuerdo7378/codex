// Template for creating new custom Cypress commands.
// Copy this file to start a new command and update the name/signature.

// Example usage:
// In `cypress/commands/index.js` import this file (already done).
// In a test: `cy.myCustomCommand('arg').then(...)`

Cypress.Commands.add('myCustomCommand', (arg1, options = {}) => {
  // Keep commands chainable by returning a Cypress chainable.
  // Replace the body below with the actual implementation.
  return cy.get('body').then(($body) => {
    // perform actions, assertions, or return values
    return $body
  })
})

// When adding new command files, import them from `cypress/commands/index.js`
// so that `cypress/support/e2e.js` (which imports `../commands`) loads them.
