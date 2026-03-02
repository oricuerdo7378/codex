/**
 * Eudoracare - Create New User Test
 * Tests user creation functionality using the Page Object Model
 * Fills in all required fields: Apellidos, Nombre, Género, Fecha de nacimiento,
 * Lugar de nacimiento, Nacionalidad, DNI, and checkbox confirmation
 */

import eudoracareLoginPage from "../pages/eudoracare.page.js"

describe("Eudoracare - Create New User", () => {
  it("creates a new user with complete information", () => {
    const testUser = {
      firstName: "Carlos",
      lastName: "Martinez",
      gender: "1", // M
      birthDate: "05/11/1985",
      birthPlace: "Madrid",
      citizenship: "España",
      email: "carlos.martinez@example.com",
    }

    eudoracareLoginPage
      .visitLoginPage()
      .closeTimezoneModal()
      .clickNewUserButton()
      .login()
      .verifyLoginSuccess()
      .navigateToUsers()
      .createUserExtended(testUser)

    cy.log(`✓ User form completed: ${testUser.firstName} ${testUser.lastName}`)
    cy.screenshot("user-form-completed-carlos", { capture: "fullPage" })
  })

  it("creates a female user named Ana Gonzalez", () => {
    const testUser = {
      firstName: "Ana",
      lastName: "Gonzalez",
      gender: "2", // F
      birthDate: "15/03/1990",
      birthPlace: "Barcelona",
      citizenship: "España",
      email: "ana.gonzalez@example.com",
    }

    eudoracareLoginPage
      .visitLoginPage()
      .closeTimezoneModal()
      .clickNewUserButton()
      .login()
      .verifyLoginSuccess()
      .navigateToUsers()
      .createUserExtended(testUser)

    cy.log(`✓ User form completed: ${testUser.firstName} ${testUser.lastName}`)
    cy.screenshot("user-form-completed-ana", { capture: "fullPage" })
  })

  it("creates a user with minimal information (only required fields)", () => {
    eudoracareLoginPage
      .visitLoginPage()
      .closeTimezoneModal()
      .clickNewUserButton()
      .login()
      .verifyLoginSuccess()
      .navigateToUsers()
      .createUser("Juan", "Perez")

    cy.log("✓ User form completed with minimal information")
    cy.screenshot("user-form-completed-juan-minimal", { capture: "fullPage" })
  })
})
