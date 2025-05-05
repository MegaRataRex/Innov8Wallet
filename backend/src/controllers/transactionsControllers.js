const db = require("../config/db");
const { categorizeSpending, subCategorize } = require("./categorize");
const jwt = require("jsonwebtoken");

exports.addTransaction = async (req, res) => {
  let transactions = req.body; // Expecting an array of transactions

  if (!Array.isArray(transactions)) {
    // If not an array, wrap single transaction into an array
    transactions = [req.body];
  }

  if (transactions.length === 0) {
    return res.status(400).json({ error: "No transactions provided" });
  }

  const values = [];

  for (let tx of transactions) {
    let {
      userId,
      amount,
      category,
      type,
      date,
      description,
      sub_category,
      payment_method_id,
      beneficiary,
    } = tx;

    if (!amount || !type || !payment_method_id) {
      return res.status(400).json({
        error:
          "Amount, type, and payment_method_id are required for each transaction",
      });
    }

    if (!category) {
      category = categorizeSpending(beneficiary);
      sub_category = subCategorize(beneficiary);
    }

    values.push([
      userId,
      amount,
      category,
      type,
      date,
      description,
      sub_category,
      payment_method_id,
      beneficiary,
    ]);
  }

  // SQL for multiple inserts
  db.query(
    "INSERT INTO transactions (user_id, amount, category, type, date, description, sub_category, payment_method_id, beneficiary) VALUES ?",
    [values],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error saving transactions" });
      }
      res.status(201).json({
        message: "Transactions saved",
        insertedCount: result.affectedRows,
      });
    }
  );
};

exports.getTransactions = async (req, res) => {
  const userId = req.query.userId;

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
exports.getSubscriptions = async (req, res) => {
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

exports.getCards = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token
  console.log("Received token:", token); // Debugging

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded); // Debugging

    const authenticatedUserId = decoded.userId;
    const requestedUserId = req.params.userId;

    // Ensure the user is only accessing their own cards
    if (parseInt(authenticatedUserId) !== parseInt(requestedUserId)) {
      return res.status(403).json({ error: "Unauthorized access." });
    }

    // Query to fetch the user's cards
    const query =
      "SELECT id, last_four, type, exp_date, cardType, brand FROM cards WHERE user_id = ?";
    db.query(query, [requestedUserId], (err, results) => {
      if (err) {
        console.error("Error in query:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      res.json(results);
    });
  } catch (error) {
    console.error("JWT Verification Error:", error); // Debugging
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};

exports.transferFunds = async (req, res) => {
  const { userId, fromAccountId, toAccountId, amount, description } = req.body;

  if (!userId || !fromAccountId || !toAccountId || !amount) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  if (fromAccountId === toAccountId) {
    return res
      .status(400)
      .json({ error: "No puedes transferir a la misma cuenta" });
  }

  try {
    // Verificar saldo disponible en la cuenta origen
    const [account] = await db.query(
      "SELECT balance FROM accounts WHERE id = ? AND user_id = ?",
      [fromAccountId, userId]
    );
    if (!account || account.balance < amount) {
      return res.status(400).json({ error: "Saldo insuficiente" });
    }

    db.beginTransaction();

    // Descontar saldo de la cuenta origen
    db.query("UPDATE accounts SET balance = balance - ? WHERE id = ?", [
      amount,
      fromAccountId,
    ]);

    // Aumentar saldo en la cuenta destino
    db.query("UPDATE accounts SET balance = balance + ? WHERE id = ?", [
      amount,
      toAccountId,
    ]);

    // Registrar transacción de débito
    db.query(
      "INSERT INTO transactions (user_id, amount, category, type, description, account_id) VALUES (?, ?, ?, ?, ?, ?)",
      [
        userId,
        amount,
        "Transfer",
        "debit",
        description || "Transferencia",
        fromAccountId,
      ]
    );

    // Registrar transacción de crédito
    db.query(
      "INSERT INTO transactions (user_id, amount, category, type, description, account_id) VALUES (?, ?, ?, ?, ?, ?)",
      [
        userId,
        amount,
        "Transfer",
        "credit",
        description || "Transferencia recibida",
        toAccountId,
      ]
    );

    res.status(201).json({ message: "Transferencia realizada con éxito" });
  } catch (error) {
    console.error("Error en la transferencia:", error);
    res.status(500).json({ error: "Error procesando la transferencia" });
  }
};
