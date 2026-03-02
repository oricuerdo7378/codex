class HomePage {
  visit() {
    cy.visit("/")
  }

  header() {
    return cy.contains("Kitchen Sink")
  }
}

export default new HomePage()
