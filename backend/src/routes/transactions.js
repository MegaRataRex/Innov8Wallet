const express = require("express");
const { processTransaction, getSubscriptions, calculateSavings } = require("../controllers/transactionController");

const router = express.Router();

// 📌 Define la ruta de transacciones
router.post("/", processTransaction);
// 📌 Nueva ruta para obtener suscripciones
router.get("/subscriptions", getSubscriptions); // Aplica autenticación si es necesario
// 📌 Ruta para calcular ahorros
router.post("/savings", calculateSavings);

module.exports = router;