/// <reference types="Cypress" />

import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I open NextJs Reviews Project home page', () => {
	cy.visit(Cypress.env('url'));
});

Then('Validate that one featured game exists', () => {
	cy.get('a.flex').should('exist');
});

Given('I open NextJs Reviews Project reviews page', () => {
	cy.visit(Cypress.env('url') + 'reviews');
});

Then('Validate that three game reviews exist', () => {
	cy.get('li.bg-white').should('have.length', 3);
});

Given('I open the Hellblade page', () => {
	cy.visit(Cypress.env('url') + 'reviews/hellblade');
});

Given('I open the Hollow Knight page', () => {
	cy.visit(Cypress.env('url') + 'reviews/hollow-knight');
});

Given('I open the Stardew Valley page', () => {
	cy.visit(Cypress.env('url') + 'reviews/stardew-valley');
});

Then('Validate that page contents exists', () => {
	cy.get('h1.font-bold').should('exist');
	cy.get('p.italic').should('exist');
	cy.get('img.mb-2').should('exist');
	cy.get('article.max-w-screen').should('exist');
});
