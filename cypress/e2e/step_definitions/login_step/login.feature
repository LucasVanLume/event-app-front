Feature: Login no site de eventos
  Como usuário do site de eventos
  Quero acessar minha conta
  Para gerenciar meus eventos e configurações

  Background:
    Given que estou na página de login

  Scenario: Login com credenciais válidas
    When eu insiro "lvll@cin.ufpe.br" no campo "email"
    And eu insiro "123456789" no campo "senha"
    And clico no botão "Entrar"
    Then devo ser redirecionado para "/home"

  Scenario: Login com credenciais inválidas
    When eu insiro "usuario@evento.com" no campo "email"
    And eu insiro "senhaErrada" no campo "senha"
    And clico no botão "Entrar"
    Then devo continuar na página "/login"
    And devo ver a mensagem "Credenciais inválidas, tente novamente."

  Scenario: Tentativa de login com campo vazio
    When eu insiro " " no campo "email"
    And eu insiro " " no campo "senha"
    And clico no botão "Entrar"
    Then devo continuar na página "/login"
    And devo ver a mensagem "Os campos de email e senha são obrigatórios."

  Scenario: Tentativa de login com formato de email inválido
    When eu insiro "usuarioinvalido" no campo "email"
    And eu insiro "senha123" no campo "senha"
    And clico no botão "Entrar"
    Then devo continuar na página "/login"
    And devo ver a mensagem "Por favor, insira um email válido."
