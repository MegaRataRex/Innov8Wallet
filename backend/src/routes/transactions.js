const express = require("express");
const router = express.Router();

// Importar controladores
const {
  addTransaction,
  getTransactions,
  getSubscriptions,
  calculateSavings,
} = require("../controllers/transactionsControllers");

// 📌 Define la ruta de transacciones
router.post("/", addTransaction);

// 📌 Nueva ruta para obtener transacciones
router.get("/transactions", getTransactions);

// 📌 Nueva ruta para obtener suscripciones (aplica autenticación si es necesario)
router.get("/subscriptions", getSubscriptions);

// 📌 Ruta para calcular ahorros
router.post("/savings", calculateSavings);

module.exports = router;
