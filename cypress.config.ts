const cucumber = require("cypress-cucumber-preprocessor").default;
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('file:preprocessor', cucumber());
    },
    specPattern: "cypress/e2e/step_definitions/**/*.feature",
  },
});
