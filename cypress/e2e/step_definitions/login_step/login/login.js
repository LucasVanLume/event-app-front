import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

// Given("I'm on the login page", () => {
//     cy.visit("https://admin-demo.nopcommerce.com/login?ReturnUrl=%2Fadmin%2F");
// });

// When("I type a registered my email and password", () => {
//     cy.get('#Email').clear().type('admin@yourstore.com');
//     cy.get('#Password').clear().type('admin');
//     cy.get('.login-button').click();
// });

// Then("I have a successful login", () => {
//     cy.get('.brand-image-xl')
// });

Given('que estou na página de login', () => {
    cy.visit('http://localhost:4200/login');
});

When('eu insiro {string} no campo {string}', (valor, campo) => {
    cy.get(`[data-cy=${campo}]`).clear().type(valor);
});

When('clico no botão {string}', (botao) => {
    cy.contains('button', botao).click();
});

Then('devo ser redirecionado para {string}', (url) => {
    cy.url().should('include', url);
});

Then('devo continuar na página {string}', (url) => {
    cy.url().should('include', url);
});

Then('devo ver a mensagem {string}', (mensagem) => {
    cy.contains(mensagem).should('be.visible');
});
  
