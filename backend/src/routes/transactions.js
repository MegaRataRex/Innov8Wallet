const express = require("express");
const { processTransaction, getSubscriptions } = require("../controllers/transactionController");

const router = express.Router();

// 📌 Define la ruta de transacciones
router.post("/", processTransaction);
// 📌 Nueva ruta para obtener suscripciones
router.get("/subscriptions", getSubscriptions); // Aplica autenticación si es necesario


module.exports = router;