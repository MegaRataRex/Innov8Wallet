const express = require("express");

const transactionsRoutes = require("./transactions");
const usersRoutes = require("./users");

const router = express.Router();

// 📌 Define prefijos para cada conjunto de rutas
router.use("/transactions", transactionsRoutes);
router.use("/users", usersRoutes);

module.exports = router;

app.get("/", (req, res) => {
  res.send("¡El backend está funcionando y conectado a MySQL!");
});

app.post("/api/transaction",(req,res)  => {
  
});

