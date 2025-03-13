import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given("que estou logado e na página de criação de evento", () => {
  cy.visit('http://localhost:4200/login');
  cy.get(`[data-cy=email]`).type("lvll@cin.ufpe.br");
  cy.get(`[data-cy=senha]`).type("123456789");
  cy.contains('button', "Entrar").click();
  cy.url().should("include", "/home");
  cy.visit('http://localhost:4200/home');
});

When("preencho {string} no campo {string}", (valor, campo) => {
  cy.get(`[data-cy=${campo}]`).type(valor);
});

When("seleciono {string} como horário inicial", (horario) => {
  cy.get('[data-cy=horarioInicial]').type(horario);
});

When("seleciono {string} como horário final", (horario) => {
  cy.get('[data-cy=horarioFinal]').type(horario);
});

When("seleciono {string} como data inicial", (data) => {
  cy.get('[data-cy=dataInicial]').type(data, { force: true });
});

When("seleciono {string} como data final", (data) => {
  cy.get('[data-cy=dataFinal]').type(data, { force: true });
});

When("seleciono {string} como tema", (tema) => {
  cy.get('[data-cy=tema]').click();
  cy.contains("mat-option", tema).click();
});

When("preencho {string} no campo {string}", (valor, campo) => {
  cy.get(`[data-cy=${campo}]`).type(valor);
});

When("preencho {string} no campo {string}", (valor, campo) => {
  cy.get(`[data-cy=${campo}]`).type(valor);
});

When("vejo os campos de endereço preenchidos automaticamente", () => {
  cy.get(`[data-cy=rua]`).should("not.have.value", "");
  cy.get(`[data-cy=cidade]`).should("not.have.value", "");
  cy.get(`[data-cy=bairro]`).should("not.have.value", "");
});

When("clico no botão {string}", (botao) => {
  cy.contains("button", botao).click();
});

Then("devo ver uma mensagem de sucesso {string}", (mensagem) => {
  cy.contains(mensagem).should("be.visible");
});

Then("devo ser redirecionado para a visualização do evento {string}", (evento) => {
  cy.get(`[data-cy=event-title]`).should("contain", evento);
});
