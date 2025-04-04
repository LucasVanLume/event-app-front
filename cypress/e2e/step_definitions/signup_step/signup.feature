# Feature: Cadastro no site de eventos
#   Como um novo usuário
#   Quero criar uma conta no site
#   Para acessar meus eventos e configurações

#   Background:
#     Given que estou na página de cadastro

#   Scenario: Cadastro bem-sucedido
#     When eu insiro "Lucas Lima" no campo "nome"
#     And eu insiro "lucas@email.com" no campo "email"
#     And eu insiro "Senha123!" no campo "senha"
#     And eu insiro "Senha123!" no campo "confirmarSenha"
#     And clico no botão "Cadastrar-se"
#     Then devo ser redirecionado para "/login"

#   Scenario: Tentativa de cadastro com campos vazios
#     When eu insiro " " no campo "nome"
#     And eu insiro " " no campo "email"
#     And eu insiro " " no campo "senha"
#     And eu insiro " " no campo "confirmarSenha"
#     And clico no botão "Cadastrar-se"
#     Then devo continuar na página "/signup"
#     And devo ver a mensagem "Todos os campos são obrigatórios."

#   Scenario: Cadastro com formato de email inválido
#     When eu insiro "Lucas Lima" no campo "nome"
#     And eu insiro "email_invalido" no campo "email"
#     And eu insiro "Senha123!" no campo "senha"
#     And eu insiro "Senha123!" no campo "confirmarSenha"
#     And clico no botão "Cadastrar-se"
#     Then devo continuar na página "/signup"
#     And devo ver a mensagem "Por favor, insira um email válido."

#   Scenario: Cadastro com senha fraca
#     When eu insiro "Lucas Lima" no campo "nome"
#     And eu insiro "lucas@email.com" no campo "email"
#     And eu insiro "123" no campo "senha"
#     And eu insiro "123" no campo "confirmarSenha"
#     And clico no botão "Cadastrar-se"
#     Then devo continuar na página "/signup"
#     And devo ver a mensagem "A senha deve conter pelo menos 6 caracteres."

#   Scenario: Cadastro com senhas diferentes
#     When eu insiro "Lucas Lima" no campo "nome"
#     And eu insiro "lucas@email.com" no campo "email"
#     And eu insiro "Senha123!" no campo "senha"
#     And eu insiro "SenhaDiferente!" no campo "confirmarSenha"
#     And clico no botão "Cadastrar-se"
#     Then devo continuar na página "/signup"
#     And devo ver a mensagem "As senhas não coincidem."


Feature: Cadastro no site de eventos
  Como um novo usuário
  Quero criar uma conta no site
  Para acessar meus eventos e configurações

  Background:
    Given que estou na página de cadastro

  Scenario: Cadastro bem-sucedido
    When eu insiro "Lucas Lima" no campo "nome"
    And eu insiro "lucas@email.com" no campo "email"
    And eu insiro "Senha123!" no campo "senha"
    And eu insiro "Senha123!" no campo "confirmarSenha"
    And clico no botão "Cadastrar-se"
    Then devo ser redirecionado para "/login"

  Scenario Outline: Tentativas de cadastro inválidas
    When eu insiro "<nome>" no campo "nome"
    And eu insiro "<email>" no campo "email"
    And eu insiro "<senha>" no campo "senha"
    And eu insiro "<confirmarSenha>" no campo "confirmarSenha"
    And clico no botão "Cadastrar-se"
    Then devo continuar na página "/signup"
    And devo ver a mensagem "<mensagem>"

  Examples:
  | nome      | email          | senha    | confirmarSenha | mensagem                                     |
  |           |                |          |                | Todos os campos são obrigatórios.            |
  |           | email@valido.com | senha123 | senha123      | Todos os campos são obrigatórios.            |
  | Nome      |                | senha123 | senha123      | Todos os campos são obrigatórios.            |
  | Nome      | email@valido.com |          | senha123      | Todos os campos são obrigatórios.            |
  | Nome      | email@valido.com | senha123 |                | Todos os campos são obrigatórios.            |
  | Nome      | emailInvalido   | senha123 | senha123      | Por favor, insira um email válido.           |
  | Nome      | email@valido.com | senh     | senh          | A senha deve conter pelo menos 6 caracteres. |
  | Nome      | email@valido.com | senha123 | senha321      | As senhas não coincidem.                    |
