/**
 * Eudoracare Page Object Model (POM)
 * Encapsulates all interactions with the Eudoracare application
 * Uses selectors from cypress/support/eudoracare.selectors.js
 */

import selectors from "../support/eudoracare.selectors.js"

class EudoracareLoginPage {
  // Base URL
  url = "https://demoesp.staging.eudoracare.com/App/#/login"

  // Credentials
  credentials = {
    username: "wartonosorio",
    password: "Warton.2020",
  }

  // ==================== Navigation Methods ====================

  /**
   * Visit the Eudoracare login page
   */
  visitLoginPage() {
    cy.request({ url: this.url, failOnStatusCode: false, timeout: 20000 }).then(
      (resp) => {
        expect([200, 301, 302, 0]).to.include(resp.status)
      }
    )
    cy.visit(this.url, { timeout: 30000 })
    cy.wait(5000)
    return this
  }

  /**
   * Close the timezone warning modal
   */
  closeTimezoneModal() {
    cy.contains(
      selectors.auth.continueButton.selector,
      selectors.auth.continueButton.contains,
      { timeout: 10000 }
    ).click()
    cy.wait(2000)
    cy.log("Timezone modal closed")
    return this
  }

  /**
   * Click on "Nuevo Usuario" button
   */
  clickNewUserButton() {
    cy.contains(
      selectors.auth.newUserLink.selector,
      selectors.auth.newUserLink.contains,
      { timeout: 10000 }
    ).click()
    cy.wait(3000)
    cy.log("Clicked on Nuevo Usuario")
    return this
  }

  // ==================== Authentication Methods ====================

  /**
   * Enter username in the login form
   */
  enterUsername(username = this.credentials.username) {
    cy.get(selectors.auth.usernameInput, { timeout: 15000 })
      .should("be.visible")
      .type(username, { delay: 50 })
    cy.wait(500)
    cy.log("Username entered: " + username)
    return this
  }

  /**
   * Enter password in the login form
   */
  enterPassword(password = this.credentials.password) {
    cy.get(selectors.auth.passwordInput, { timeout: 15000 })
      .should("be.visible")
      .type(password, { delay: 50 })
    cy.wait(500)
    cy.log("Password entered")
    return this
  }

  /**
   * Submit the login form
   */
  submitLoginForm() {
    cy.get(selectors.auth.submitButton, { timeout: 10000 }).click()
    cy.wait(2000)
    cy.log("Clicked Iniciar sesión button")
    return this
  }

  /**
   * Wait for the page loader to disappear
   */
  waitForPageLoad() {
    cy.get(selectors.main.spinner, { timeout: 30000 }).should("not.be.visible")
    cy.log("Page loaded successfully")
    return this
  }

  /**
   * Perform complete login flow
   */
  login(
    username = this.credentials.username,
    password = this.credentials.password
  ) {
    this.enterUsername(username)
    this.enterPassword(password)
    this.submitLoginForm()
    this.waitForPageLoad()
    return this
  }

  // ==================== Validation Methods ====================

  /**
   * Verify that login was successful by checking for main menu header
   */
  verifyLoginSuccess() {
    cy.get(selectors.main.headerTitle, { timeout: 15000 })
      .should("be.visible")
      .should("contain", "Menú principal")
    cy.log("✓ Login successful - Main menu visible")
    return this
  }

  // ==================== User Management Methods ====================

  /**
   * Navigate to the "Usuarios/as del servicio" section
   */
  navigateToUsers() {
    cy.contains(
      selectors.users.usersServiceLink.selector,
      selectors.users.usersServiceLink.contains,
      { timeout: 15000 }
    ).click()
    cy.wait(3000)
    cy.log("Navigated to Usuarios/as del servicio")
    return this
  }

  /**
   * Search for a user by name
   */
  searchUser(userName) {
    cy.get(selectors.users.searchInput, { timeout: 15000 })
      .should("be.visible")
      .type(userName, { delay: 50 })
    cy.wait(1000)
    cy.log("Typed user name in search box: " + userName)
    return this
  }

  /**
   * Execute the search by clicking the search button
   */
  executeSearch() {
    cy.get(selectors.users.searchInput).parent().find("button").click()
    cy.wait(2000)
    cy.log("Executed search")
    return this
  }

  /**
   * Select a user from the search results
   */
  selectUserFromResults(userName) {
    cy.contains(userName, { timeout: 15000 }).click()
    cy.wait(2000)
    cy.log("Clicked on user: " + userName)
    return this
  }

  /**
   * Verify that a specific user is selected by checking the header
   */
  verifyUserSelected(expectedUsername) {
    cy.get(selectors.main.headerTitleAlt, { timeout: 15000 })
      .should("be.visible")
      .should("contain.text", expectedUsername)
    cy.log("✓ User verified: " + expectedUsername)
    return this
  }

  /**
   * Search and select a user (combined method)
   */
  searchAndSelectUser(userName) {
    this.searchUser(userName)
    this.executeSearch()
    this.selectUserFromResults(userName)
    return this
  }

  // ==================== Diary Methods ====================

  /**
   * Navigate to the Diary (Diario) section
   */
  navigateToDiary() {
    cy.contains(
      selectors.diary.diarioLink.selector,
      selectors.diary.diarioLink.contains,
      { timeout: 15000 }
    ).click()
    cy.wait(3000)
    cy.log("✓ Navigated to Diario")
    return this
  }

  // ==================== User Creation Methods ====================

  /**
   * Open the user creation dialog/form by clicking the + button
   */
  openUserCreateDialog() {
    cy.log("Opening user creation dialog by clicking + button...")

    // Find and click the create button - try to find it with multiple strategies
    cy.get("body", { timeout: 5000 }).then(() => {
      cy.get(selectors.users.createButton, { timeout: 10000 })
        .should("be.visible")
        .click({ force: true })
      cy.log("✓ Clicked + button")
    })

    // Wait for dialog form to appear - check if form fields become visible
    cy.log("Waiting for form dialog to load...")
    cy.get(selectors.userForm.lastNameInput, { timeout: 20000 }).should("be.visible")
    cy.log("✓ Dialog loaded, form fields are visible")

    return this
  }

  /**
   * Fill in the user creation form with basic information
   */
  /**
   * Fill only the firstName (Nombre) field with a pause before typing
   */
  fillFirstNameOnly(firstName) {
    cy.log(`Filling firstName field: ${firstName}`)

    // Wait before typing
    cy.wait(1000)
    cy.log("Paused before typing firstName")

    // Fill firstName (Nombre) with pause
    cy.get(selectors.userForm.firstNameInput, { timeout: 10000 })
      .should("be.visible")
      .clear()
      .wait(300)
      .type(firstName, { delay: 50 })
      .should("have.value", firstName)

    cy.log(`✓ firstName filled: ${firstName}`)
    return this
  }

  fillUserForm(firstName, lastName, gender = "1", birthDate = "01/01/1990") {
    cy.log(`Filling user form with: ${firstName} ${lastName}`)

    // Fill lastName (Apellidos)
    cy.get(selectors.userForm.lastNameInput, { timeout: 10000 })
      .should("be.visible")
      .clear()
      .type(lastName.toUpperCase(), { delay: 50 })
      .should("have.value", lastName.toUpperCase())

    cy.wait(300)

    // Fill firstName (Nombre)
    cy.get(selectors.userForm.firstNameInput, { timeout: 10000 })
      .should("be.visible")
      .clear()
      .type(firstName, { delay: 50 })
      .should("have.value", firstName)

    cy.wait(300)

    // Select gender (Género)
    cy.get(selectors.userForm.genderSelect, { timeout: 10000 })
      .should("be.visible")
      .select(gender)
    cy.log(`Selected gender: ${gender === "1" ? "M" : "F"}`)

    cy.wait(300)

    // Fill birth date (Fecha de nacimiento)
    cy.get(selectors.userForm.birthDatePicker, { timeout: 10000 })
      .should("be.visible")
      .type(birthDate, { delay: 50 })

    cy.log(
      `Form filled: ${firstName} ${lastName} | Gender: ${gender} | BirthDate: ${birthDate}`
    )
    return this
  }

  /**
   * Fill in the extended user creation form with all required fields
   * Includes handling for typeahead suggestions (Lugar de nacimiento, Nacionalidad)
   */
  fillExtendedUserForm(
    firstName,
    lastName,
    gender = "1",
    birthDate = "01/01/1990",
    birthPlace = "Madrid",
    citizenship = "España",
    email = "test@example.com"
  ) {
    // Fill basic information first
    this.fillUserForm(firstName, lastName, gender, birthDate)

    cy.wait(500)

    // Fill birthPlace (Lugar de nacimiento) - has typeahead dropdown
    cy.get(selectors.userForm.birthPlaceInput, { timeout: 10000 })
      .should("be.visible")
      .clear()
      .type(birthPlace, { delay: 50 })

    cy.wait(800)
    cy.log(`Typed birth place: ${birthPlace}`)

    // Click on the typeahead suggestion for birth place
    cy.get("div[role='option'], li[role='option'], .dropdown-item")
      .contains(birthPlace, { matchCase: false })
      .first()
      .click({ force: true })

    cy.wait(500)
    cy.log(`✓ Selected birth place suggestion`)

    // Fill citizenship (Nacionalidad) - has typeahead dropdown
    cy.get(selectors.userForm.citizenshipInput, { timeout: 10000 })
      .should("be.visible")
      .clear()
      .type(citizenship, { delay: 50 })

    cy.wait(800)
    cy.log(`Typed citizenship: ${citizenship}`)

    // Click on the typeahead suggestion for citizenship
    cy.get("div[role='option'], li[role='option'], .dropdown-item")
      .contains(citizenship, { matchCase: false })
      .first()
      .click({ force: true })

    cy.wait(500)
    cy.log(`✓ Selected citizenship suggestion`)

    // Fill nationalId (DNI)
    cy.get(selectors.userForm.nationalIdInput, { timeout: 10000 })
      .should("be.visible")
      .clear()
      .type("12345678X", { delay: 50 })
      .should("have.value", "12345678X")

    cy.wait(300)

    // Check the confirmation checkbox
    cy.get(selectors.userForm.confirmNationalIdCheckbox, { timeout: 10000 })
      .should("be.visible")
      .check()

    cy.wait(500)
    cy.log(`✓ Personal information section complete`)

    // ========== Contact information section ==========
    // Fill email (E-mail) - the only contact field needed
    cy.get("input[formcontrolname='email']", { timeout: 10000 })
      .should("be.visible")
      .type(email, { delay: 50 })
      .should("have.value", email)

    cy.log(`✓ Extended form completely filled with all fields including email`)
    return this
  }

  /**
   * Fill the form WITHOUT clicking Siguiente - leaves form ready for inspection
   */
  fillExtendedUserFormWithoutSubmit(userData) {
    const {
      firstName = "Test",
      lastName = "User",
      gender = "1",
      birthDate = "01/01/1990",
      birthPlace = "Madrid",
      citizenship = "España",
      email = "test@example.com",
    } = userData

    this.openUserCreateDialog()
    this.fillExtendedUserForm(
      firstName,
      lastName,
      gender,
      birthDate,
      birthPlace,
      citizenship,
      email
    )
    // DO NOT CLICK SIGUIENTE - return so caller can take screenshot or verify
    return this
  }

  /**
   * Click the Siguiente (Next) button to proceed
   */
  clickNext() {
    cy.log("Clicking Siguiente button...")
    cy.get("button")
      .filter((_, el) => {
        const text = (el.textContent || "").toLowerCase()
        return text.includes("siguiente") || text.includes("next")
      })
      .first()
      .click()
    cy.wait(2000)
    cy.log("✓ Siguiente button clicked")
    return this
  }

  /**
   * Save/submit the user creation form (legacy - now use clickNext)
   */
  saveUser() {
    cy.log("Clicking save/next button...")
    this.clickNext()
    return this
  }

  /**
   * Create a new user (combined method) - simplified version with basic fields
   */
  createUser(firstName, lastName) {
    this.openUserCreateDialog()
    this.fillUserForm(firstName, lastName)
    this.clickNext()
    return this
  }

  /**
   * Create a new user with extended information
   * Fills all form fields but DOES NOT click Siguiente - leaves form in completed state
   * Caller can verify form completion before submission
   */
  createUserExtended(userData) {
    const {
      firstName = "Test",
      lastName = "User",
      gender = "1",
      birthDate = "01/01/1990",
      birthPlace = "Madrid",
      citizenship = "España",
      email = "test@example.com",
    } = userData

    this.openUserCreateDialog()
    this.fillExtendedUserForm(
      firstName,
      lastName,
      gender,
      birthDate,
      birthPlace,
      citizenship,
      email
    )
    // Do NOT click Siguiente - leave form in ready state for verification/screenshot
    cy.log("✓ User form completed (not submitted)")
    return this
  }
}

export default new EudoracareLoginPage()
