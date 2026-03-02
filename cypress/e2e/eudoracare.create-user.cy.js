/**
 * Eudoracare - Create New User Test
 * Tests user creation functionality using the Page Object Model
 * Fills in all required fields: Apellidos, Nombre, Género, Fecha de nacimiento,
 * Lugar de nacimiento, Nacionalidad, DNI, and checkbox confirmation
 */

import eudoracareLoginPage from "../pages/eudoracare.page.js"

describe("Eudoracare - Create New User", () => {
  it("INSPECT: Navigate to form and pause for inspection", () => {
    cy.log("===== NAVIGATING TO USER CREATION FORM =====")
    
    eudoracareLoginPage.visitLoginPage()
    eudoracareLoginPage.closeTimezoneModal()
    eudoracareLoginPage.clickNewUserButton()
    eudoracareLoginPage.login()
    eudoracareLoginPage.verifyLoginSuccess()
    eudoracareLoginPage.navigateToUsers()
    eudoracareLoginPage.openUserCreateDialog()

    cy.log("===== FORM LOADED - PAUSE FOR INSPECTION =====")
    cy.log("Inspecting form fields in TEST ENVIRONMENT section...")
    
    // Pause to allow manual inspection
    cy.pause()

    cy.log("===== EXTRACTING FIELD LOCATORS =====")
    
    // Get all input fields
    cy.get("input").each(($input, index) => {
      const id = $input.attr("id")
      const name = $input.attr("name")
      const formControl = $input.attr("formcontrolname")
      const type = $input.attr("type")
      cy.log(`Field ${index}: ID=${id}, Name=${name}, FormControl=${formControl}, Type=${type}`)
    })

    // Get all select fields
    cy.get("select").each(($select, index) => {
      const id = $select.attr("id")
      const name = $select.attr("name")
      const formControl = $select.attr("formcontrolname")
      cy.log(`Select ${index}: ID=${id}, Name=${name}, FormControl=${formControl}`)
    })

    // Get all labels to understand field labels
    cy.get("label").each(($label, index) => {
      const text = $label.text().trim()
      if (text) {
        cy.log(`Label ${index}: ${text}`)
      }
    })

    cy.screenshot("form-inspection-complete", { capture: "fullPage" })
  })

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
      firstName: "Anita",
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
