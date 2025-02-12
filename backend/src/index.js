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

const SECRET_KEY = process.env.SECRET_KEY || "clave_secreta_segura";

app.post("/api/addCard", (req, res) => {
    const { card, cvv } = req.body;

    const decryptedBytes = CryptoJS.AES.decrypt(tarjeta, SECRET_KEY);
    const decryptedCardNumber = decryptedBytes.toString(CryptoJS.enc.Utf8);

    console.log("Número de tarjeta desencriptado:", decryptedCardNumber);
    console.log("CVV recibido (no almacenado):", cvv);

    res.json({ mensaje: "Tarjeta procesada correctamente" });
});

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
const PORT = process.env.PORT || 3000;
app.listen(process.env.PORT, () => 
  console.log(`Servidor corriendo en http://localhost${PORT}`));