const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    //baseUrl:"https://www.gamesforthebrain.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern:'cypress/tests/*.js'
  },
});
