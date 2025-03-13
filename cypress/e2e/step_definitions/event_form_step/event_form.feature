Feature: Criação de evento
  Como organizador de eventos
  Quero criar um novo evento
  Para gerenciar sua programação e participantes

  Background:
    Given que estou logado e na página de criação de evento

  Scenario: Criar evento com sucesso
    When preencho "Workshop de Angular" no campo "nome"
    And preencho "Evento para desenvolvedores Angular" no campo "descrição"
    And seleciono "09:00" como horário inicial
    And seleciono "17:00" como horário final
    And seleciono "6/21/2025" como data inicial
    And seleciono "6/22/2025" como data final
    And seleciono "Tecnologia" como tema
    And preencho "evento@teste.com" no campo "email"
    And preencho "81999999999" no campo "telefone"
    And preencho "51020040" no campo "cep"
    And vejo os campos de endereço preenchidos automaticamente
    And clico no botão "Criar novo evento"
    Then devo ver uma mensagem de sucesso "Evento criado com sucesso"
    And devo ser redirecionado para a visualização do evento "Workshop de Angular"
