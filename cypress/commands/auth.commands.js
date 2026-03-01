Cypress.Commands.add('loginApi', (email, password) => {

  cy.request({
    method: 'POST',
    url: '/api/login',
    body: { email, password }
  }).then((resp) => {

    window.localStorage.setItem('authToken', resp.body.token)

  })

})