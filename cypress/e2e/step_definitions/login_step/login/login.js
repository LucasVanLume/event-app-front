import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given("I'm on the login page", () => {
    cy.visit("https://admin-demo.nopcommerce.com/login?ReturnUrl=%2Fadmin%2F");
});

When("I type a registered my email and password", () => {
    cy.get('#Email').clear().type('admin@yourstore.com');
    cy.get('#Password').clear().type('admin');
    cy.get('.login-button').click();
});

Then("I have a successful login", () => {
    cy.get('.brand-image-xl')
});