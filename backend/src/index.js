const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("¡El backend está funcionando y conectado a MySQL!");
});

app.post("/api/transaction",(req,res)  => {
  
});

const PORT = process.env.PORT || 3000;
app.listen(process.env.PORT, () => 
  console.log(`Servidor corriendo en http://localhost${PORT}`));