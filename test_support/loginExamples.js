const path = require('path');
const { gerarNovosExamples } = require("./utils/opanaiClient.js");
const { lerArquivo, salvarArquivo } = require("./utils/filesUtils.js");

const arquivo = path.resolve(__dirname, "../cypress/e2e/step_definitions/login_step/login.feature");

const prompt = `
Gere exemplos de entradas inválidas para um formulário de login usando o método combinatório Pairwise Testing, garantindo um conjunto mínimo de casos de teste que cobrem todas as combinações possíveis. Siga estas regras:
- Email: Pode ser válido ou inválido.
- Senha: Pode ser válida ou inválida.
- Mensagens de erro de saída esperadas devem serguir obrigatoriamente as regras e ordem de prioridade abaixo:
  1. Se email ou senha estiverem vazios → "Os campos de email e senha são obrigatórios."
  2. Se email for inválido → "Por favor, insira um email válido."
  3. Se email e senha não corresponderem → "Credenciais inválidas, tente novamente."
- Formato de saída:
  - Retorne a saída apenas na forma de tabela Gherkin, sem adição de linhas pontilhadas e sem adição de prefixos como \`\`\`gherkin\`.
  - Não inclua explicações antes ou depois da tabela.
  - Utilize apenas as combinações mais relevantes, evitando redundâncias desnecessárias.
  - Certifique-se de que cada par de valores de entrada seja testado pelo menos uma vez.
  - Exemplo do formato correto: 

    | email                | senha       | mensagem                                     |
    | usuario@evento.com   |             | Os campos de email e senha são obrigatórios. |
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
    console.log("✅ Arquivo 'login.feature' atualizado com os novos exemplos gerados pelo LLM!");
  } else {
    console.log("❌ Seção 'Examples:' não encontrada. Verifique se o formato está correto.");
  }
}

atualizarFeature();
