const { Configuration, OpenAIApi } = require("openai");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

async function gerarNovosExamples(prompt) {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "system", content: prompt }],
      temperature: 0.7,
    });

    const novaSaida = response.data.choices[0].message.content.trim();
    return novaSaida;
  } catch (error) {
    console.error("Erro ao chamar a OpenAI:", error);
    return null;
  }
}

module.exports = { gerarNovosExamples };