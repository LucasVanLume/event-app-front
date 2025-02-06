Feature: Criação de evento
  Como organizador de eventos
  Quero criar um novo evento
  Para gerenciar sua programação e participantes

  Background:
    Given que estou na página de criação de evento

  Scenario: Criar evento com sucesso
    When eu insiro "Tech Conference 2025" no campo "Nome do Seu Evento"
    And eu insiro "O maior evento de tecnologia do ano." no campo "Descrição"
    And eu insiro "2025-09-15" no campo "Início"
    And eu insiro "2025-09-16" no campo "Fim"
    And eu insiro "09:00" no campo "Hora de Início"
    And eu insiro "18:00" no campo "Hora de Término"
    And eu insiro "contato@evento.com" no campo "Email"
    And eu insiro "11999999999" no campo "Telefone"
    And eu seleciono "Tecnologia" no campo "Tema"
    And eu marco a opção "Remoto"
    And clico no botão "Criar novo evento"
    Then devo ver a mensagem "Evento criado com sucesso!"

  Scenario: Tentativa de criar evento sem preencher os campos obrigatórios
    When eu deixo os campos obrigatórios em branco
    And clico no botão "Criar novo evento"
    Then devo ver a mensagem "Por favor, preencha todos os campos obrigatórios."

  Scenario: Tentativa de criar evento com email inválido
    When eu insiro "email-invalido" no campo "Email"
    And clico no botão "Criar novo evento"
    Then devo ver a mensagem "Por favor, insira um email válido."

  Scenario: Tentativa de criar evento com data final antes da data inicial
    When eu insiro "2025-09-16" no campo "Início"
    And eu insiro "2025-09-15" no campo "Fim"
    And clico no botão "Criar novo evento"
    Then devo ver a mensagem "A data de término deve ser posterior à data de início."

  Scenario: Tentativa de criar evento com erro no servidor
    When eu preencho todos os campos corretamente
    And o servidor retorna um erro
    Then devo ver a mensagem "Erro ao criar evento. Tente novamente mais tarde."

  Scenario: Cancelar a criação de um evento
    When eu clico no botão "Voltar"
    Then devo ser redirecionado para a página de listagem de eventos
