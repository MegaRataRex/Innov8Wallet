const express = require("express");

const transactionsRoutes = require("./transactions");
const usersRoutes = require("./users");
const mayaConvergence = require("../models/maya_convergence");
const spendingModel = require("../models/spending_model");
const router = express.Router();

// 📌 Define prefijos para cada conjunto de rutas
router.use("/transactions", transactionsRoutes);
router.use("/users", usersRoutes);
router.use("/ask", mayaConvergence);
router.use("/predict", spendingModel);

module.exports = router;

router.get("/", (req, res) => {
  res.send("¡El backend está funcionando y conectado a MySQL!");
});
