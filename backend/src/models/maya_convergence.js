const express = require("express");
const openai = require("openai");
const db = require("../config/db");
const router = express.Router();

const openaiClient = new openai.OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });

router.post("/", async (req, res) => {
  const { userId, message } = req.body;
  try {
    const transactions = `[
    {
        "id": 34,
        "user_id": 3,
        "amount": "100.00",
        "category": "Transportation",
        "type": "expense",
        "date": "2025-04-16T18:30:00.000Z",
        "description": "Recarga de gasolina",
        "sub_category": "Fuel",
        "payment_method_id": 5,
        "beneficiary": "Pemex"
    },
    {
        "id": 33,
        "user_id": 3,
        "amount": "95.00",
        "category": "Entertainment",
        "type": "expense",
        "date": "2025-04-15T22:00:00.000Z",
        "description": "Spotify Premium",
        "sub_category": "Streaming Services",
        "payment_method_id": 5,
        "beneficiary": "Spotify"
    },
    {
        "id": 32,
        "user_id": 3,
        "amount": "2700.00",
        "category": "Debt",
        "type": "expense",
        "date": "2025-04-14T09:00:00.000Z",
        "description": "Pago tarjeta BBVA",
        "sub_category": "Credit Card Payment",
        "payment_method_id": 5,
        "beneficiary": "BBVA"
    },
    {
        "id": 24,
        "user_id": 3,
        "amount": "175.00",
        "category": "Entertainment",
        "type": "expense",
        "date": "2025-04-13T20:00:00.000Z",
        "description": "Cinemex - boleto de cine",
        "sub_category": "Cinema",
        "payment_method_id": 5,
        "beneficiary": "Cinemex"
    },
    {
        "id": 23,
        "user_id": 3,
        "amount": "340.00",
        "category": "Food",
        "type": "expense",
        "date": "2025-04-12T13:15:00.000Z",
        "description": "Supermercado Walmart",
        "sub_category": "Groceries",
        "payment_method_id": 5,
        "beneficiary": "Walmart"
    },
    {
        "id": 31,
        "user_id": 3,
        "amount": "290.00",
        "category": "Food",
        "type": "expense",
        "date": "2025-04-10T12:15:00.000Z",
        "description": "Despensa semanal en Chedraui",
        "sub_category": "Groceries",
        "payment_method_id": 5,
        "beneficiary": "Chedraui"
    },
    {
        "id": 22,
        "user_id": 3,
        "amount": "600.00",
        "category": "Healthcare",
        "type": "expense",
        "date": "2025-04-10T09:30:00.000Z",
        "description": "Medicinas Farmacias Similares",
        "sub_category": "Pharmacy",
        "payment_method_id": 5,
        "beneficiary": "Farmacias Similares"
    },
    {
        "id": 30,
        "user_id": 3,
        "amount": "780.00",
        "category": "Utilities",
        "type": "expense",
        "date": "2025-04-09T07:45:00.000Z",
        "description": "Pago de internet Telmex",
        "sub_category": "Internet",
        "payment_method_id": 5,
        "beneficiary": "Telmex"
    },
    {
        "id": 21,
        "user_id": 3,
        "amount": "220.00",
        "category": "Utilities",
        "type": "expense",
        "date": "2025-04-08T08:00:00.000Z",
        "description": "Pago de Luz CFE",
        "sub_category": "Electricity",
        "payment_method_id": 5,
        "beneficiary": "CFE"
    },
    {
        "id": 20,
        "user_id": 3,
        "amount": "780.00",
        "category": "Housing",
        "type": "expense",
        "date": "2025-04-07T12:00:00.000Z",
        "description": "Compra en The Home Depot",
        "sub_category": "Home Supplies",
        "payment_method_id": 5,
        "beneficiary": "The Home Depot"
    },
    {
        "id": 19,
        "user_id": 3,
        "amount": "2550.00",
        "category": "Debt",
        "type": "expense",
        "date": "2025-04-06T10:00:00.000Z",
        "description": "Pago parcial tarjeta Santander",
        "sub_category": "Credit Card Payment",
        "payment_method_id": 5,
        "beneficiary": "Santander"
    },
    {
        "id": 18,
        "user_id": 3,
        "amount": "198.00",
        "category": "Transportation",
        "type": "expense",
        "date": "2025-04-05T19:30:00.000Z",
        "description": "Uber - trayecto oficina",
        "sub_category": "Ride Sharing",
        "payment_method_id": 5,
        "beneficiary": "Uber"
    },
    {
        "id": 29,
        "user_id": 3,
        "amount": "350.00",
        "category": "Healthcare",
        "type": "expense",
        "date": "2025-04-05T10:00:00.000Z",
        "description": "Medicamentos para resfriado",
        "sub_category": "Pharmacy",
        "payment_method_id": 5,
        "beneficiary": "Farmacias Guadalajara"
    },
    {
        "id": 28,
        "user_id": 3,
        "amount": "149.00",
        "category": "Entertainment",
        "type": "expense",
        "date": "2025-04-04T21:00:00.000Z",
        "description": "Renta de película en Apple TV",
        "sub_category": "Streaming Services",
        "payment_method_id": 5,
        "beneficiary": "Apple TV"
    },
    {
        "id": 17,
        "user_id": 3,
        "amount": "430.00",
        "category": "Food",
        "type": "expense",
        "date": "2025-04-03T16:00:00.000Z",
        "description": "Compra en Soriana",
        "sub_category": "Groceries",
        "payment_method_id": 5,
        "beneficiary": "Soriana"
    },
    {
        "id": 16,
        "user_id": 3,
        "amount": "150.00",
        "category": "Entertainment",
        "type": "expense",
        "date": "2025-04-02T21:00:00.000Z",
        "description": "Spotify Premium mensual",
        "sub_category": "Streaming Services",
        "payment_method_id": 5,
        "beneficiary": "Spotify"
    },
    {
        "id": 15,
        "user_id": 3,
        "amount": "10500.00",
        "category": "Income",
        "type": "income",
        "date": "2025-04-01T09:20:00.000Z",
        "description": "Pago de cliente freelance - diseño de app",
        "sub_category": "Freelance",
        "payment_method_id": 5,
        "beneficiary": "Cliente ABC"
    },
    {
        "id": 27,
        "user_id": 3,
        "amount": "8900.00",
        "category": "Income",
        "type": "income",
        "date": "2025-03-28T12:00:00.000Z",
        "description": "Pago por proyecto UX/UI",
        "sub_category": "Freelance",
        "payment_method_id": 5,
        "beneficiary": "Cliente Freelance MX"
    },
    {
        "id": 26,
        "user_id": 3,
        "amount": "260.00",
        "category": "Transportation",
        "type": "expense",
        "date": "2025-03-27T08:45:00.000Z",
        "description": "Uber para reunión con cliente",
        "sub_category": "Ride Sharing",
        "payment_method_id": 5,
        "beneficiary": "Uber"
    },
    {
        "id": 25,
        "user_id": 3,
        "amount": "175.00",
        "category": "Food",
        "type": "expense",
        "date": "2025-03-25T14:20:00.000Z",
        "description": "Comida en Chili's",
        "sub_category": "Restaurant",
        "payment_method_id": 5,
        "beneficiary": "Chili's"
    },
    {
        "id": 14,
        "user_id": 3,
        "amount": "280.00",
        "category": "Healthcare",
        "type": "expense",
        "date": "2025-03-22T11:00:00.000Z",
        "description": "Consulta médica Farmacias San Pablo",
        "sub_category": "Medical Services",
        "payment_method_id": 5,
        "beneficiary": "Farmacia San Pablo"
    },
    {
        "id": 13,
        "user_id": 3,
        "amount": "550.00",
        "category": "Transportation",
        "type": "expense",
        "date": "2025-03-21T17:30:00.000Z",
        "description": "Gasolina - Shell",
        "sub_category": "Fuel",
        "payment_method_id": 5,
        "beneficiary": "Shell"
    },
    {
        "id": 12,
        "user_id": 3,
        "amount": "3300.00",
        "category": "Debt",
        "type": "expense",
        "date": "2025-03-20T10:00:00.000Z",
        "description": "Pago parcial tarjeta Citibanamex",
        "sub_category": "Credit Card Payment",
        "payment_method_id": 5,
        "beneficiary": "Citibanamex"
    },
    {
        "id": 11,
        "user_id": 3,
        "amount": "120.00",
        "category": "Food",
        "type": "expense",
        "date": "2025-03-19T15:00:00.000Z",
        "description": "McDonald's - comida rápida",
        "sub_category": "Fast Food",
        "payment_method_id": 5,
        "beneficiary": "McDonald's"
    },
    {
        "id": 10,
        "user_id": 3,
        "amount": "7800.00",
        "category": "Income",
        "type": "income",
        "date": "2025-03-18T12:30:00.000Z",
        "description": "Pago Fiverr - servicios de ilustración",
        "sub_category": "Freelance",
        "payment_method_id": 5,
        "beneficiary": "Fiverr"
    },
    {
        "id": 9,
        "user_id": 3,
        "amount": "800.00",
        "category": "Entertainment",
        "type": "expense",
        "date": "2025-03-16T20:00:00.000Z",
        "description": "Pago Netflix anual",
        "sub_category": "Streaming Services",
        "payment_method_id": 5,
        "beneficiary": "Netflix"
    },
    {
        "id": 8,
        "user_id": 3,
        "amount": "420.00",
        "category": "Food",
        "type": "expense",
        "date": "2025-03-15T13:45:00.000Z",
        "description": "Supermercado H-E-B",
        "sub_category": "Groceries",
        "payment_method_id": 5,
        "beneficiary": "H-E-B"
    },
    {
        "id": 7,
        "user_id": 3,
        "amount": "300.00",
        "category": "Healthcare",
        "type": "expense",
        "date": "2025-03-12T10:00:00.000Z",
        "description": "Medicinas Farmacias del Ahorro",
        "sub_category": "Pharmacy",
        "payment_method_id": 5,
        "beneficiary": "Farmacias del Ahorro"
    },
    {
        "id": 6,
        "user_id": 3,
        "amount": "220.00",
        "category": "Utilities",
        "type": "expense",
        "date": "2025-03-11T09:00:00.000Z",
        "description": "Pago de Telcel",
        "sub_category": "Mobile Services",
        "payment_method_id": 5,
        "beneficiary": "Telcel"
    },
    {
        "id": 5,
        "user_id": 3,
        "amount": "1650.00",
        "category": "Housing",
        "type": "expense",
        "date": "2025-03-10T07:50:00.000Z",
        "description": "Reserva Airbnb para viaje",
        "sub_category": "Rentals",
        "payment_method_id": 5,
        "beneficiary": "Airbnb"
    },
    {
        "id": 4,
        "user_id": 3,
        "amount": "260.00",
        "category": "Transportation",
        "type": "expense",
        "date": "2025-03-09T18:20:00.000Z",
        "description": "Uber - traslado cliente",
        "sub_category": "Ride Sharing",
        "payment_method_id": 5,
        "beneficiary": "Uber"
    },
    {
        "id": 3,
        "user_id": 3,
        "amount": "2550.00",
        "category": "Debt",
        "type": "expense",
        "date": "2025-03-08T08:00:00.000Z",
        "description": "Pago mínimo tarjeta Nu",
        "sub_category": "Credit Card Payment",
        "payment_method_id": 5,
        "beneficiary": "Nu México"
    },
    {
        "id": 2,
        "user_id": 3,
        "amount": "190.00",
        "category": "Food",
        "type": "expense",
        "date": "2025-03-06T14:30:00.000Z",
        "description": "Compra en Burger King",
        "sub_category": "Fast Food",
        "payment_method_id": 5,
        "beneficiary": "Burger King"
    },
    {
        "id": 1,
        "user_id": 3,
        "amount": "9200.00",
        "category": "Income",
        "type": "income",
        "date": "2025-03-05T12:45:00.000Z",
        "description": "Pago de proyecto freelance - campaña de marketing",
        "sub_category": "Freelance",
        "payment_method_id": 5,
        "beneficiary": "Cliente XYZ"
    }
]`;
    const sysPrompt = `
        Eres un asistente financiero de Banorte. Analiza los siguientes datos de gastos del usuario y responde a su pregunta.
        Responde con recomendaciones claras, concisas y personalizadas. Mantén tus respuestas breves (preferentemente bajo 100 palabras), salvo que la complejidad de la consulta requiera mayor detalle.
    `;
    const prompt = `
      Pregunta del usuario:
      ${message}
      Historial del Usuario:
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
