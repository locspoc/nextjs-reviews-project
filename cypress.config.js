require('dotenv').config();
const { defineConfig } = require('cypress');
const browserify = require('@badeball/cypress-cucumber-preprocessor/browserify');
const preprocessor = require('@badeball/cypress-cucumber-preprocessor');

async function setupNodeEvents(on, config) {
	// Browserify
	on('file:preprocessor', browserify.default(config));

	// Cucumber
	await preprocessor.addCucumberPreprocessorPlugin(on, config);

	return config;
}

module.exports = defineConfig({
	chromeWebSecurity: false,
	defaultCommandTimeout: 6000,
	e2e: {
		setupNodeEvents,
		specPattern: 'cypress/integration/examples/BDD/*.feature',
	},
	env: {
		url: 'http://localhost:3000/',
	},
	retries: {
		runMode: 1,
	},
});
