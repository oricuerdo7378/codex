import './auth.commands'
import './command.template'
import './login.mock'

Cypress.Commands.add('getBySel', (selector) => {
  return cy.get(`[data-test="${selector}"]`)
})