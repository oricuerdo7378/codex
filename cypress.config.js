const { defineConfig } = require('cypress')

module.exports = defineConfig({

  video: false,
  screenshotOnRunFailure: true,

  e2e: {
    baseUrl: 'https://example.cypress.io',

    testIsolation: true,

    viewportWidth: 1366,
    viewportHeight: 768,

    defaultCommandTimeout: 15000,
    pageLoadTimeout: 60000,
    requestTimeout: 10000,

    retries: {
      runMode: 2,
      openMode: 0
    },

    chromeWebSecurity: false,

    setupNodeEvents(on, config) {
      return config
    }
  }
})