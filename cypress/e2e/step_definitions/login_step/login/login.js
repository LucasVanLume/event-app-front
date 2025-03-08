import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('que estou na página de login', () => {
    cy.visit('http://localhost:4200/login');
});

When('eu insiro {string} no campo {string}', (valor, campo) => {
    if (valor.trim() === '') {
        //cy.get(`[data-cy=${campo}]`);
    } else {
        cy.get(`[data-cy=${campo}]`).type(valor);
    }
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
  
