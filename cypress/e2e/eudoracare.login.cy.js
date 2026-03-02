import selectors from "../support/eudoracare.selectors.js"

describe("Eudoracare - Login page", () => {
  const url = "https://demoesp.staging.eudoracare.com/App/#/login"
  const usuario = "wartonosorio"
  const contrasena = "Warton.2020"

  it("loads page, closes timezone modal, clicks Nuevo Usuario, and performs login", () => {
    // Verify that the URL responds
    cy.request({ url, failOnStatusCode: false, timeout: 20000 }).then(
      (resp) => {
        expect([200, 301, 302, 0]).to.include(resp.status)
      }
    )

    // Visit the page with extended timeout
    cy.visit(url, { timeout: 30000 })

    // Wait for the page to render completely
    cy.wait(5000)

    // Close the timezone modal by clicking "Continuar"
    cy.contains(
      selectors.auth.continueButton.selector,
      selectors.auth.continueButton.contains,
      { timeout: 10000 }
    ).click()
    cy.wait(2000)
    cy.log("Timezone modal closed")

    // Click on "Nuevo Usuario"
    cy.contains(
      selectors.auth.newUserLink.selector,
      selectors.auth.newUserLink.contains,
      { timeout: 10000 }
    ).click()
    cy.wait(3000)
    cy.log("Clicked on Nuevo Usuario")

    // Enter username using the name="username" selector
    cy.get(selectors.auth.usernameInput, { timeout: 15000 })
      .should("be.visible")
      .type(usuario, { delay: 50 })
    cy.wait(500)
    cy.log("Username entered: " + usuario)

    // Enter password using the name="password" selector
    cy.get(selectors.auth.passwordInput, { timeout: 15000 })
      .should("be.visible")
      .type(contrasena, { delay: 50 })
    cy.wait(500)
    cy.log("Password entered")

    // Click the login button
    cy.get(selectors.auth.submitButton, { timeout: 10000 }).click()
    cy.wait(2000)
    cy.log("Clicked Iniciar sesión button - waiting for page to load")

    // Wait for the loader/spinner to disappear
    cy.get(selectors.main.spinner, { timeout: 30000 }).should("not.be.visible")
    cy.log("Loader disappeared")

    // Validate we are inside the session by checking for "Menú principal"
    cy.get(selectors.main.headerTitle, { timeout: 15000 })
      .should("be.visible")
      .should("contain", "Menú principal")
    cy.log("✓ Login successful - Main menu visible")

    // Click on "Usuarios/as del servicio" link
    cy.contains(
      selectors.users.usersServiceLink.selector,
      selectors.users.usersServiceLink.contains,
      {
        timeout: 15000,
      }
    ).click()
    cy.wait(3000)
    cy.log("Clicked on Usuarios/as del servicio")

    // Search for the user by typing in the search input
    cy.get(selectors.users.searchInput, { timeout: 15000 })
      .should("be.visible")
      .type("ZPROBANDOTESTUNO Testuno", { delay: 50 })
    cy.wait(1000)
    cy.log("Typed user name in search box")

    // Click the search button or press Enter
    cy.get(selectors.users.searchInput).parent().find("button").click()
    cy.wait(2000)
    cy.log("Executed search")

    // Click on the user in the search results
    cy.contains(selectors.users.userResultItem.contains, {
      timeout: 15000,
    }).click()
    cy.wait(2000)
    cy.log("Clicked on user ZPROBANDOTESTUNO Testuno")

    // Validate that we are inside the correct user by checking for the user name in the header
    cy.get(selectors.main.headerTitleAlt, { timeout: 15000 })
      .should("be.visible")
      .should("contain.text", "ZPROBANDOTESTUNO")
    cy.log("✓ Successfully navigated to user ZPROBANDOTESTUNO Testuno")

    // Click on "Diario"
    cy.contains(
      selectors.diary.diarioLink.selector,
      selectors.diary.diarioLink.contains,
      { timeout: 15000 }
    ).click()
    cy.wait(3000)
    cy.log("✓ Clicked on Diario")
  })
})
