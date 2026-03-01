Cypress.Commands.add('loginSession', (email, password) => {

  cy.session([email], () => {
    cy.loginApi(email, password)
  })

})