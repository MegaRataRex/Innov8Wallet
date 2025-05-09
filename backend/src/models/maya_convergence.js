const express = require("express");
const openai = require("openai");
const db = require("../config/db");
const router = express.Router();

const openaiClient = new openai.OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });

router.post("/", async (req, res) => {
  const { userId, message } = req.body;
  try {
    const transactions = db.query(
      "SELECT amount, description, type FROM transactions WHERE user_id = ?",
      [userId]
    );
    const sysPrompt = `
        Eres un asistente financiero de Banorte. Analiza los siguientes datos de gastos del usuario y responde a su pregunta.
        Responde con recomendaciones claras, concisas y personalizadas. Mantén tus respuestas breves (preferentemente bajo 100 palabras), salvo que la complejidad de la consulta requiera mayor detalle.
    `;
    const prompt = `
      Pregunta del usuario:
      ${message}
      Historial de transacciones del usuario:
      ${transactions}
    `;

    const response = await openaiClient.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: sysPrompt },
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
    });

    res.json({ response: response.choices[0].message.content });
  } catch (error) {
    console.error("Error en la consulta a Maya:", error);
    res.status(500).json({ error: "Error procesando la solicitud" });
  }
});

router.post("/advice", async (req, res) => {
  const { userId, action } = req.body;

  try {
    const [transactions] = db.query(
      "SELECT amount, description, type FROM transactions WHERE user_id = ?",
      [userId]
    );
    const userData = transactions
      .map((t) => `${t.description}: ${t.type} de $${t.amount}`)
      .join("\n");
    const prompt = `
        Eres un asistente financiero de Banorte. Analiza los siguientes datos de gastos del usuario y la accción que está realizando.

        Datos de gastos:
        ${userData}

        Acción del usuario:
        "${action}"

        Busca patrones o anomalías y responde con una recomendación financiera que le darías al usuario, asegúrate de dar un consejo claro y conciso. 
    `;
    const response = await openaiClient.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1,
    });

    res.json({ response: response.output_text });
  } catch (error) {
    console.error("Error en la consulta a Maya:", error);
    res.status(500).json({ error: "Error procesando la solicitud" });
  }
});

module.exports = router;
