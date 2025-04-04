const { Configuration, OpenAIApi } = require("openai");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const AI_PROVIDER = process.env.AI_PROVIDER || "gemini"; // "openai" or "gemini"
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const openai = OPENAI_API_KEY
  ? new OpenAIApi(new Configuration({ apiKey: OPENAI_API_KEY }))
  : null;

const gemini = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;

async function gerarNovosExamples(prompt) {
  try {
    if (AI_PROVIDER === "openai" && openai) {
      const response = await openai.createChatCompletion({
        model: "gpt-4o-mini",
        messages: [{ role: "system", content: prompt }],
        temperature: 0.7,
      });

      return response.data.choices[0].message.content.trim();
    } else if (AI_PROVIDER === "gemini" && gemini) {
      const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });
      const response = await model.generateContent(prompt);
      
      return response.response.text().trim();
    } else {
      throw new Error("Nenhuma API configurada corretamente.");
    }
  } catch (error) {
    console.error(`Erro ao chamar a API (${AI_PROVIDER}):`, error);
    return null;
  }
}

module.exports = { gerarNovosExamples };
