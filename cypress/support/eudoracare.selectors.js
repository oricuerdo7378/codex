/**
 * Eudoracare Application Selectors Repository
 * Central location for all CSS selectors and locators used in Eudoracare tests
 * This file supports Page Object Model (POM) pattern
 */

export const selectors = {
  // Login form selectors
  auth: {
    usernameInput: 'input[name="username"]',
    passwordInput: 'input[name="password"]',
    submitButton: 'input[type="submit"]',
    continueButton: { contains: "Continuar", selector: "button" },
    newUserLink: { contains: "Nuevo Usuario", selector: "button, a" },
  },

  // Main page selectors
  main: {
    headerTitle: "h1.header-title",
    headerTitleAlt: "div[class*='title']",
    spinner: ".fa-spinner",
    mainMenuTitle: { contains: "Menú principal", on: "h1.header-title" },
  },

  // User management selectors
  users: {
    usersServiceLink: {
      contains: "Usuarios/as del servicio",
      selector: "a, button, li, div",
    },
    searchInput: 'input[placeholder="Buscar..."]',
    searchButton: 'input[placeholder="Buscar..."] + button', // Alternative via parent
    userResultItem: { contains: "ZPROBANDOTESTUNO Testuno" },
    userHeader: {
      contains: "ZPROBANDOTESTUNO",
      on: "h1.header-title, div[class*='title']",
    },
    createButton:
      'button[icon-name="plus"], button.svg-button[icon-name="plus"], button[on-click*="addNewCommand"]', // Button with + icon to create new user
  },

  // Diary/Diario selectors
  diary: {
    diarioLink: { contains: "DIARIO", selector: "a, button, li, div" },
  },

  // User creation form selectors
  userForm: {
    lastNameInput: 'input[id="lastname"]', // Apellidos
    firstNameInput: 'input[formcontrolname="firstname"]', // Nombre
    genderSelect: 'select[formcontrolname="genderId"]', // Género dropdown
    birthDatePicker: 'app-kendo-datepicker[formcontrolname="birthDate"] input', // Fecha de nacimiento
    birthPlaceInput: 'input[formcontrolname="birthPlace"]', // Lugar de nacimiento
    citizenshipInput: 'input[formcontrolname="citizenship"]', // Nacionalidad
    nationalIdInput: 'input[formcontrolname="nationalId"]', // DNI
    confirmNationalIdCheckbox: 'input[formcontrolname="confirmNationalId"]', // He comprobado el código
    nextButton: 'button:contains("Siguiente")', // Siguiente button
    cancelButton: 'button:contains("Cancelar")', // Cancelar button
  },

  // Helper function to get selector by CSS or contains text
  getSelector: (selectorObj) => {
    if (typeof selectorObj === "string") {
      return selectorObj
    }
    if (selectorObj.contains) {
      return selectorObj.contains
    }
    return selectorObj.selector || selectorObj
  },
}

// Default export for easier imports
export default selectors
