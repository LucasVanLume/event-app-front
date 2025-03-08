// const fs = require("fs");
// const { Configuration, OpenAIApi } = require("openai");
// const path = require('path');
// require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


// // 🚀 Configuração da API da OpenAI (substitua pela sua chave)
// const openai = new OpenAIApi(
//   new Configuration({
//     apiKey: process.env.OPENAI_API_KEY, // 🔴 Substitua pela sua chave de API
//   })
// );

// const arquivo = "../cypress/e2e/step_definitions/signup_step/signup.feature";

// // 🚀 Função para chamar a OpenAI e gerar os novos exemplos
// async function gerarNovosExamples() {
//   const prompt = `
//   Gere exemplos de entradas inválidas para um formulário de cadastro baseado nas seguintes regras:
//   - Nome pode estar vazio ou preenchido.
//   - Email pode ser válido ou inválido.
//   - Senha válida deve conter pelo menos 6 caracteres.
//   - A mensagem deve corresponder ao erro esperado.
//   - Retorne a saída no seguinte formato:

//   | nome         | email            | senha      | confirmarSenha  | mensagem                                     |
//   |              |                  |            |                 | Todos os campos são obrigatórios.            |
//   | Lucas Lima   |                  | Senha123!  | Senha123!       | Todos os campos são obrigatórios.            |
//   | Lucas Lima   | email_invalido   | Senha123!  | Senha123!       | Por favor, insira um email válido.           |
//   | Lucas Lima   | lucas@email.com  | 123        | 123             | A senha deve conter pelo menos 6 caracteres. |
//   | Lucas Lima   | lucas@email.com  | Senha123!  | SenhaDiferente! | As senhas não coincidem.                     |
//   `.trim();

//   try {
//     const response = await openai.createChatCompletion({
//       model: "gpt-4",
//       messages: [{ role: "system", content: prompt }],
//       temperature: 0.7,
//     });

//     const novaSaida = response.data.choices[0].message.content.trim();
//     return novaSaida;
//   } catch (error) {
//     console.error("Erro ao chamar a OpenAI:", error);
//     return null;
//   }
// }

// // 🚀 Função para substituir os exemplos na seção 'Examples' no arquivo .feature
// async function atualizarFeature() {
//   let conteudo = fs.readFileSync(arquivo, "utf-8");

//   const novosExamples = await gerarNovosExamples();
//   if (!novosExamples) {
//     console.log("❌ Falha ao gerar novos exemplos.");
//     return;
//   }

//   // 🔍 Expressão regular para encontrar a seção 'Examples' e atualizar apenas o conteúdo da tabela
//   const regexExamples = /Examples:\s*\|[\s\S]*?(?=\n\s*\n|$)/g;

//   if (regexExamples.test(conteudo)) {
//     // 🔄 Substituindo a tabela dentro da seção 'Examples' pelo novo conteúdo
//     conteudo = conteudo.replace(regexExamples, `Examples:\n${novosExamples.trim()}`);

//     // 💾 Salvando as alterações no arquivo
//     fs.writeFileSync(arquivo, conteudo, "utf-8");
//     console.log("✅ Arquivo 'signup.feature' atualizado com os novos valores do LLM!");
//   } else {
//     console.log("❌ Seção 'Examples:' não encontrada. Verifique se o formato está correto.");
//   }
// }

// // 🚀 Executando a atualização do arquivo
// atualizarFeature();


const path = require('path');
const { gerarNovosExamples } = require("./utils/opanaiClient.js");
const { lerArquivo, salvarArquivo } = require("./utils/filesUtils.js");

const arquivo = path.resolve(__dirname, "../cypress/e2e/step_definitions/signup_step/signup.feature");

const prompt = `
Gere exemplos de entradas inválidas para um formulário de cadastro usando o método combinatório Pairwise Testing seguindo as seguintes regras:
- Nome pode estar vazio ou preenchido.
- Email pode ser válido ou inválido.
- Senha válida deve conter pelo menos 6 caracteres.
- A mensagem deve corresponder ao erro esperado.
- Retorne a saída no seguinte formato:

| nome         | email            | senha      | confirmarSenha  | mensagem                                     |
|              |                  |            |                 | Todos os campos são obrigatórios.            |
| Lucas Lima   |                  | Senha123!  | Senha123!       | Todos os campos são obrigatórios.            |
| Lucas Lima   | email_invalido   | Senha123!  | Senha123!       | Por favor, insira um email válido.           |
| Lucas Lima   | lucas@email.com  | 123        | 123             | A senha deve conter pelo menos 6 caracteres. |
| Lucas Lima   | lucas@email.com  | Senha123!  | SenhaDiferente! | As senhas não coincidem.                     |
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
    console.log("✅ Arquivo 'signup.feature' atualizado com os novos valores do LLM!");
  } else {
    console.log("❌ Seção 'Examples:' não encontrada. Verifique se o formato está correto.");
  }
}

atualizarFeature();