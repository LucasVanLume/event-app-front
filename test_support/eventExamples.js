
const path = require('path');
const { gerarNovosExamples } = require("./utils/opanaiClient.js");
const { lerArquivo, salvarArquivo } = require("./utils/filesUtils.js");

const arquivo = path.resolve(__dirname, "../cypress/e2e/step_definitions/login_step/login.feature");

const prompt = `
Gere exemplos de entradas inválidas para um formulário de criação de evento utilizando o método combinatório Pairwise Testing, garantindo um conjunto mínimo de casos de teste que cubram todas as combinações relevantes e não redundantes. Siga estas regras:

Campos obrigatórios: nome, descricao, horarioInicial, horarioFinal, dataInicial, dataFinal, tema, email, telefone, CEP.
Regras de validação:
Se qualquer campo obrigatório estiver vazio → Retornar mensagem: "O campo '<nome_do_campo>' é obrigatório."
Se dataFinal for anterior a dataInicial → Retornar mensagem: "A data final não pode ser anterior à inicial."

Formato de saída:

A resposta deve estar somente no formato de tabela Gherkin, sem explicações extras.
Não incluir linhas tracejadas ou explicações fora da tabela.
Evite combinações redundantes, priorize os casos mais relevantes com falhas distintas.
Utilize o seguinte formato de exemplo:

| nome         | descricao   | horarioInicial | horarioFinal | dataInicial | dataFinal | tema       | email               | telefone     | CEP        | mensagem        |
|              |             |                |              |             |           |            |                     |              |            |                 |
`.trim();

async function atualizarFeature() {
  let conteudo = lerArquivo(arquivo);

  const novosExamples = await gerarNovosExamples(prompt);
  if (!novosExamples) {
    console.log("❌ Falha ao gerar novos exemplos.");
    return;
  }

  const regexExamples = /Examples:\s*\|[\s\S]*?(?=\n\s*\n|$)/g;

  if (regexExamples.test(conteudo)) {
    conteudo = conteudo.replace(regexExamples, `Examples:\n${novosExamples.trim()}`);
    salvarArquivo(arquivo, conteudo);
    console.log(`✅ Arquivo 'event.feature' atualizado com os novos exemplos gerados pelo LLM!`);
  } else {
    console.log("❌ Seção 'Examples:' não encontrada. Verifique se o formato está correto.");
  }
}

atualizarFeature();
