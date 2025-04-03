const fs = require("fs");
const path = require("path");

function gerarConteudoScript(featureName) {
  const featureFilePath = `path.resolve(__dirname, "../cypress/e2e/step_definitions/${featureName}_step/${featureName}.feature")`;

  return `
const path = require('path');
const { gerarNovosExamples } = require("./utils/opanaiClient.js");
const { lerArquivo, salvarArquivo } = require("./utils/filesUtils.js");

const arquivo = ${featureFilePath};

const prompt = \`
Gere exemplos de entradas inválidas para um formulário de ${featureName} usando o método combinatório Pairwise Testing, garantindo um conjunto mínimo de casos de teste que cobrem todas as combinações possíveis. Siga estas regras:
- Email: Pode ser válido ou inválido.
- NOME2: DESCRIAÇÃO2

- Mensagens de erro de saída esperadas devem seguir obrigatoriamente as regras e ordem de prioridade abaixo:
  1. Se email ou senha estiverem vazios → "Os campos de email e senha são obrigatórios."
  2. [DESCREVA A REGRA 2]
  3. [DESCREVA A REGRA 3]

- Formato de saída:
  - Retorne a saída apenas na forma de tabela Gherkin, sem adição de linhas pontilhadas e sem adição de prefixos como \`\`\`gherkin\`.
  - Não inclua explicações antes ou depois da tabela.
  - Utilize apenas as combinações mais relevantes, evitando redundâncias desnecessárias.
  - Certifique-se de que cada par de valores de entrada seja testado pelo menos uma vez.
  - Exemplo do formato correto: 

    | email | senha | mensagem |
    |       |       |          |
\`.trim();

async function atualizarFeature() {
  let conteudo = lerArquivo(arquivo);

  const novosExamples = await gerarNovosExamples(prompt);
  if (!novosExamples) {
    console.log("❌ Falha ao gerar novos exemplos.");
    return;
  }

  const regexExamples = /Examples:\\s*\\|[\\s\\S]*?(?=\\n\\s*\\n|$)/g;

  if (regexExamples.test(conteudo)) {
    conteudo = conteudo.replace(regexExamples, \`Examples:\\n\${novosExamples.trim()}\`);
    salvarArquivo(arquivo, conteudo);
    console.log(\`✅ Arquivo '${featureName}.feature' atualizado com os novos exemplos gerados pelo LLM!\`);
  } else {
    console.log("❌ Seção 'Examples:' não encontrada. Verifique se o formato está correto.");
  }
}

atualizarFeature();
`;
}

function gerarArquivo(featureName) {
  const scriptPath = path.join(__dirname, `../${featureName}Examples.js`);
  const conteudo = gerarConteudoScript(featureName);

  fs.writeFileSync(scriptPath, conteudo);
  console.log(`✅ Script '${scriptPath}' gerado com sucesso!`);
}

// Exemplo de uso: `node form-script-feature.js cadastro`
const featureName = process.argv[2];
if (!featureName) {
  console.error("❌ Você precisa especificar o nome da funcionalidade. Exemplo:");
  console.error("   npm run gerar-feature-script cadastro");
  process.exit(1);
}

gerarArquivo(featureName);
