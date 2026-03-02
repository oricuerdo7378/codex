/**
 * Eudoracare - Debug User Creation
 * Simple test to debug the user creation form step by step
 */

import eudoracareLoginPage from "../pages/eudoracare.page.js"
import selectors from "../support/eudoracare.selectors.js"

describe("Eudoracare - Debug User Creation", () => {
  it("step 1: navigate to users list", () => {
    eudoracareLoginPage
      .visitLoginPage()
      .closeTimezoneModal()
      .clickNewUserButton()
      .login()
      .verifyLoginSuccess()
      .navigateToUsers()

    cy.screenshot("01-users-list", { capture: "fullPage" })
    cy.log("✓ Navigated to users list")
  })

  it("step 2: click the + button to open create dialog", () => {
    eudoracareLoginPage
      .visitLoginPage()
      .closeTimezoneModal()
      .clickNewUserButton()
      .login()
      .verifyLoginSuccess()
      .navigateToUsers()

    cy.log("Looking for + button...")
    cy.get("button").each((button) => {
      const text = button.text()
      if (text.includes("+")) {
        cy.log(`Found button with +: ${text}`)
      }
    })

    // Log all classes and attributes of all buttons
    cy.get("button").then(($buttons) => {
      $buttons.each((index, btn) => {
        cy.log(
          `Button ${index}: class="${
            btn.className
          }" | icon-name="${btn.getAttribute("icon-name")}"`
        )
      })
    })

    cy.screenshot("02-before-click-plus", { capture: "fullPage" })

    // Try to click the + button using the selector
    cy.get(selectors.users.createButton)
      .first()
      .then(($btn) => {
        cy.log(`Found button: ${$btn.html()}`)
        cy.wrap($btn).click({ force: true })
      })

    cy.wait(3000)
    cy.screenshot("03-after-click-plus", { capture: "fullPage" })
    cy.log("✓ Should have clicked + button")
  })

  it("step 3: fill in the form fields", () => {
    eudoracareLoginPage
      .visitLoginPage()
      .closeTimezoneModal()
      .clickNewUserButton()
      .login()
      .verifyLoginSuccess()
      .navigateToUsers()

    // Click + button
    cy.get(selectors.users.createButton).first().click({ force: true })
    cy.wait(5000)

    // The form might be in a modal or new page, let's wait longer and check URL
    cy.url().then((url) => {
      cy.log(`Current URL: ${url}`)
    })

    cy.screenshot("04-after-click-plus-wait", { capture: "fullPage" })

    // Wait for the form to be visible
    cy.get(selectors.userForm.lastNameInput, { timeout: 30000 })
      .should("exist")
      .then(($input) => {
        cy.log(`Found lastName input: ${$input.attr("id")}`)
        cy.wrap($input).type("TEST", { delay: 50 })
      })

    cy.screenshot("05-after-fill-lastname", { capture: "fullPage" })
    cy.log("✓ Filled lastName field")

    // Fill firstName
    cy.get(selectors.userForm.firstNameInput, { timeout: 15000 }).type(
      "TestName",
      { delay: 50 }
    )

    cy.screenshot("06-after-fill-firstname", { capture: "fullPage" })
    cy.log("✓ Filled firstName field")

    // Select gender
    cy.get(selectors.userForm.genderSelect, { timeout: 15000 }).select("1")

    cy.screenshot("07-after-select-gender", { capture: "fullPage" })
    cy.log("✓ Selected gender")

    // Look for next button
    cy.get("button", { timeout: 15000 })
      .filter((_, el) => {
        const text = (el.textContent || "").toLowerCase()
        return text.includes("siguiente") || text.includes("next")
      })
      .first()
      .then(($btn) => {
        cy.log(`Found next button: ${$btn.text()}`)
        cy.screenshot("08-before-click-next", { capture: "fullPage" })
        cy.wrap($btn).click()
      })

    cy.wait(2000)
    cy.screenshot("09-after-click-next", { capture: "fullPage" })
    cy.log("✓ Clicked Siguiente button")
  })
})
