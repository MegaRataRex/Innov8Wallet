const express = require("express");

const transactionsRoutes = require("./routes/transactions");
const usersRoutes = require("./routes/users");
const mayaConvergence = require("./models/maya_convergence");
const spendingModel = require("./models/spending_model");
const cors = require("cors"); // Asegúrate de que apunte al archivo correcto
const pdfManager = require("./storage/pdfManager");

const app = express();
app.use(cors()); // Permite peticiones desde el frontend
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Soporta JSON en requests

// Usa las rutas definidas

app.get("/", (req, res) => {
  res.send("¡El backend está funcionando!");
});

app.use("/transactions", transactionsRoutes);
app.use("/users", usersRoutes);
app.use("/ask", mayaConvergence);
app.use("/predict", spendingModel);
app.use("/api", pdfManager);

// Inicia el servidor en el puerto que asigna App Engine o en el 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
