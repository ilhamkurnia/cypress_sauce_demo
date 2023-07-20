const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'smi3f9',
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    viewportWidth: 1280,
    viewportHeight: 600,
    watchForFileChanges : false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
