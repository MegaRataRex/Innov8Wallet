const express = require("express");
const { processTransaction } = require("../controllers/transactionController");

const router = express.Router();

// 📌 Define la ruta de transacciones
router.post("/", processTransaction);

module.exports = router;