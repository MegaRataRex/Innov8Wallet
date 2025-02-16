const db = require("../config/db");
const { categorizeSpending } = require("./categorize");

exports.addTransaction = (req, res) => {
  const { amount, category, type, description } = req.body;
  const userId = req.user.userId;

  if (!amount || !type) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  if (!category) {
    category = categorizeSpending(description);
  }

  res.json({ description, amount, category });

  db.query(
    "INSERT INTO transactions (user_id, amount, category, type, description) VALUES (?, ?, ?, ?, ?)",
    [userId, amount, category, type, description],
    (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Error al guardar la transacción" });
      res.status(201).json({
        message: "Transacción guardada",
        transactionId: result.insertId,
      });
    }
  );
};

exports.getTransactions = (req, res) => {
  const userId = req.user.userId;

  db.query(
    "SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC",
    [userId],
    (err, results) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Error obteniendo transacciones" });
      res.json(results);
    }
  );
};

// Controlador para obtener suscripciones
exports.getSubscriptions = (req, res) => {
  const userId = req.user.userId;

  db.query(
    "SELECT * FROM transactions WHERE user_id = ? AND sub_category = 'Subscriptions' ORDER BY date DESC",
    [userId],
    (err, results) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Error obteniendo suscripciones" });

      // Procesar las transacciones para calcular próximos cobros
      const subscriptions = results.map((transaction) => {
        const nextChargeDate = calculateNextChargeDate(transaction.date);
        return { ...transaction, nextChargeDate };
      });

      res.json(subscriptions);
    }
  );
};

// Función auxiliar para calcular la próxima fecha de cobro
function calculateNextChargeDate(lastChargeDate) {
  const date = new Date(lastChargeDate);
  date.setMonth(date.getMonth() + 1); // Asume una recurrencia mensual
  return date;
}

//Función para calcular ahorros
const {
  calculateMonthlySavings,
  calculateRetirementSavings,
  suggestAdjustments,
} = require("../util/savingsCalculator");

exports.calculateSavings = (req, res) => {
  const {
    goalAmount,
    deadline,
    currentSavings,
    expectedRetirementAge,
    lifeExpectancy,
    desiredAnnualIncome,
    userIncome,
  } = req.body;

  if (goalAmount && deadline) {
    const result = calculateMonthlySavings(
      goalAmount,
      deadline,
      currentSavings
    );
    const adjustment = suggestAdjustments(
      goalAmount,
      currentSavings,
      result.monthlySavings,
      userIncome,
      result.monthsRemaining
    );
    return res.json({ ...result, ...adjustment });
  }

  if (expectedRetirementAge && lifeExpectancy && desiredAnnualIncome) {
    const result = calculateRetirementSavings(
      expectedRetirementAge,
      lifeExpectancy,
      desiredAnnualIncome,
      currentSavings
    );
    return res.json(result);
  }

  res
    .status(400)
    .json({ error: "Faltan parámetros para realizar los cálculos." });
};
