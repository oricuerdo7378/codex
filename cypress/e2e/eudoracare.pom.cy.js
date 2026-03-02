/**
 * Eudoracare Login Test using Page Object Model
 * This test demonstrates how to use the POM pattern for cleaner and more maintainable tests
 */

import eudoracareLoginPage from "../pages/eudoracare.page.js"

describe("Eudoracare - Login and Navigation (POM Pattern)", () => {
  it("performs complete login flow and navigates to diary", () => {
    eudoracareLoginPage
      .visitLoginPage()
      .closeTimezoneModal()
      .clickNewUserButton()
      .login()
      .verifyLoginSuccess()
      .navigateToUsers()
      .searchAndSelectUser("ZPROBANDOTESTUNO Testuno")
      .verifyUserSelected("ZPROBANDOTESTUNO")
      .navigateToDiary()

    cy.log("✓ Test completed successfully - All steps passed!")
  })

  it("performs login with custom credentials", () => {
    const customUsername = "wartonosorio"
    const customPassword = "Warton.2020"

    eudoracareLoginPage
      .visitLoginPage()
      .closeTimezoneModal()
      .clickNewUserButton()
      .login(customUsername, customPassword)
      .verifyLoginSuccess()

    cy.log("✓ Login with custom credentials successful!")
  })

  it("navigates through user management section", () => {
    eudoracareLoginPage
      .visitLoginPage()
      .closeTimezoneModal()
      .clickNewUserButton()
      .login()
      .verifyLoginSuccess()
      .navigateToUsers()
      .searchUser("ZPROBANDOTESTUNO Testuno")
      .executeSearch()
      .selectUserFromResults("ZPROBANDOTESTUNO Testuno")
      .verifyUserSelected("ZPROBANDOTESTUNO")

    cy.log("✓ User navigation test completed!")
  })
})
