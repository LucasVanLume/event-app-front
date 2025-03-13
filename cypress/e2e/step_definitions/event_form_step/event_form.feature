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
  
  Scenario: Criar evento com data inicial no passado
    When preencho "Evento do passado" no campo "nome"
    And preencho "Descrição de evento" no campo "descrição"
    And seleciono "10:00" como horário inicial
    And seleciono "12:00" como horário final
    And seleciono "2024-01-10" como data inicial
    And seleciono "2025-01-12" como data final
    And seleciono "Palestra" como tema
    And preencho "evento@empresa.com" no campo "email"
    And preencho "82988776611" no campo "telefone"
    And preencho "11111-000" no campo "cep"
    And vejo os campos de endereço preenchidos corretamente
    And clico no botão "Criar Evento"
    Then devo ver uma mensagem de erro "A data inicial deve ser maior ou igual à data atual"

  Scenario: Criar evento com horário final antes do horário inicial
    When preencho "Workshop de Segurança" no campo "nome"
    And preencho "Técnicas modernas de segurança" no campo "descrição"
    And seleciono "18:00" como horário inicial
    And seleciono "08:00" como horário final
    And seleciono "2025-06-15" como data inicial
    And seleciono "2025-06-16" como data final
    And seleciono "Segurança" como tema
    And preencho "contato@seguranca.com" no campo "email"
    And preencho "11988887777" no campo "telefone"
    And preencho "12345-678" no campo "CEP"
    And vejo os campos de endereço preenchidos automaticamente
    When clico no botão "Criar Evento"
    Then devo ver uma mensagem de erro "O horário inicial deve ser menor que o horário final"

  Scenario: Criar evento com data final anterior à data inicial
    When preencho "Conferência Anual" no campo "nome"
    And preencho "Reunião sobre tendências do setor" no campo "descrição"
    And seleciono "09:00" como horário inicial
    And seleciono "18:00" como horário final
    And seleciono "2025-10-05" como data inicial
    And seleciono "2025-06-10" como data final
    And seleciono "Inovação" como tema
    And preencho "contato@tech.com" no campo "email"
    And preencho "11987654321" no campo "telefone"
    And preencho "13579-246" no campo "CEP"
    And clico no botão "Criar Evento"
    Then devo ver uma mensagem de erro "A data final deve ser posterior à data inicial"


  #  Scenario Outline: Criar evento com dados inválidos
  #   Given o usuário preenche "<nome>" no campo "nome"
  #   And preencho "<descricao>" no campo "descrição"
  #   And seleciono "<horarioInicial>" como horário inicial
  #   And seleciono "<horarioFinal>" como horário final
  #   And seleciono "<dataInicial>" como data inicial
  #   And seleciono "<dataFinal>" como data final
  #   And seleciono "<tema>" como tema
  #   And preencho "<email>" no campo "email"
  #   And preencho "<telefone>" no campo "telefone"
  #   And preencho "<CEP>" no campo "CEP"
  #   And vejo os campos de endereço preenchidos automaticamente
  #   And clico no botão "Criar Evento"
  #   Then devo ver uma mensagem de erro "<mensagem>"

  # Examples:
  #   | nome                     | descricao                | horarioInicial | horarioFinal | dataInicial | dataFinal   | tema                  | email                 | telefone    | CEP        | mensagem                                       |
  #   | ""                       | "Descrição do evento"  | "14:00" | "18:00" | "2025-06-15" | "2025-06-16" | "Inovação"       | "evento@exemplo.com" | "81987654321" | "52080000" | O campo 'nome' é obrigatório.                 |
  #   | "Evento Teste"           | ""                     | "14:00" | "18:00" | "2025-06-15" | "2025-06-16" | "Inovação"  | "evento@email.com" | "81987654321" | "50740-100" | O campo 'descrição' é obrigatório.             |
  #   | "Conferência Tech"       | "Discussão sobre IA"   | "09:00" | "17:00" | "2025-07-05" | "2025-07-04" | "Tecnologia" | "evento@exemplo.com" | "81912345678" | "50670-400" | A data final não pode ser anterior à inicial. |
  #   | "Fórum de Economia"      | "Mercado financeiro"   | "10:00" | "12:00" | "2025-09-10" | "2025-09-11" | "Economia"   | ""                   | "81956563221" | "50050-200" | O campo 'e-mail' é obrigatório.               |
  #   | "Conferência de Design"  | "Tendências UX/UI"     | "14:00" | "16:00" | "2025-10-20" | "2025-10-22" | "Design"          | "evento@exemplo.com" | "" | "70040-300" | O campo 'telefone' é obrigatório.             |
  #   | "Summit de Engenharia"   | "Inovações na Indústria" | "08:30" | "17:30" | "" | "2025-06-16" | "Tecnologia" | "evento@exemplo.com" | "81955443322" | "40020-200" | O campo 'data inicial' é obrigatório.        |
  #   | "Congresso de Tecnologia" | "Avanços tecnológicos" | "10:00" | "12:00" | "2025-08-15" | "2025-08-17" | ""                 | "evento@exemplo.com" | "2299775544" | "22222-333" | O campo 'tema' é obrigatório.                 |
  #   | "Simpósio de Biotecnologia" | "Descobertas recentes" | "09:00" | "17:00" | "2025-11-05" | "2025-11-07" | "Ciência"          | "evento@biotec.com"  | "85988776655" | "" | O campo 'CEP' é obrigatório.                 |