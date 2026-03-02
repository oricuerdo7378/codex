/**
 * Eudoracare - Debug Button Click
 * Test different ways to click the + button
 */

import selectors from "../support/eudoracare.selectors.js"
import eudoracareLoginPage from "../pages/eudoracare.page.js"

describe("Eudoracare - Debug Button Click", () => {
  it("inspect the + button and try multiple click methods", () => {
    eudoracareLoginPage
      .visitLoginPage()
      .closeTimezoneModal()
      .clickNewUserButton()
      .login()
      .verifyLoginSuccess()
      .navigateToUsers()

    cy.wait(2000)

    cy.log("Inspecting all buttons with icon-name attribute...")
    cy.get("button[icon-name]").each(($btn, index) => {
      const iconName = $btn.attr("icon-name")
      const text = $btn.text()
      const classes = $btn.attr("class")
      cy.log(
        `Button ${index}: icon-name="${iconName}" | text="${text}" | class="${classes}"`
      )
    })

    cy.screenshot("01-inspect-buttons", { capture: "fullPage" })

    // Try to find and click the + button
    cy.get("button[icon-name='plus']").then(($btns) => {
      cy.log(`Found ${$btns.length} buttons with icon-name="plus"`)

      if ($btns.length > 0) {
        const btn = $btns[0]
        cy.log(`Button HTML: ${btn.outerHTML.substring(0, 200)}`)

        // Method 1: Regular click
        cy.log("Trying method 1: Regular click...")
        cy.wrap(btn).click()
        cy.wait(3000)

        cy.screenshot("02-after-click-method1", { capture: "fullPage" })

        // Check if modal appeared
        cy.get("input[id='lastname']")
          .then(($input) => {
            if ($input.length > 0) {
              cy.log("✓ Form appeared with method 1!")
            } else {
              cy.log("✗ Form did not appear with method 1")

              // Method 2: Force click
              cy.log("Trying method 2: Force click...")
              cy.wrap(btn).click({ force: true })
              cy.wait(3000)
              cy.screenshot("03-after-click-method2", { capture: "fullPage" })
            }
          })
          .catch(() => {
            cy.log("Form not found, trying method 2...")
          })
      }
    })

    cy.screenshot("04-final-state", { capture: "fullPage" })
  })

  it("try clicking via ng-click directive", () => {
    eudoracareLoginPage
      .visitLoginPage()
      .closeTimezoneModal()
      .clickNewUserButton()
      .login()
      .verifyLoginSuccess()
      .navigateToUsers()

    cy.wait(2000)

    // The button has ng-click="onClickFunc()"
    // Try to trigger it via JavaScript
    cy.get("button[ng-click='onClickFunc()']").then(($btn) => {
      if ($btn.length > 0) {
        cy.log(`Found button with ng-click, element: ${$btn.attr("class")}`)
        cy.wrap($btn).first().click({ force: true, shiftKey: false })
        cy.wait(5000)
        cy.screenshot("05-after-ng-click", { capture: "fullPage" })
      }
    })
  })
})
