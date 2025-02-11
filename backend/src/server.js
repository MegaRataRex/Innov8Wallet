//Pongo esto aquí para no meterlo en index

const express = require("express");
const CryptoJS = require("crypto-js");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const SECRET_KEY = process.env.SECRET_KEY || "clave_secreta_segura";

app.post("/api/agregarTarjeta", (req, res) => {
    const { tarjeta, cvv } = req.body;

    // Desencriptar número de tarjeta
    const decryptedBytes = CryptoJS.AES.decrypt(tarjeta, SECRET_KEY);
    const decryptedCardNumber = decryptedBytes.toString(CryptoJS.enc.Utf8);

    console.log("Número de tarjeta desencriptado:", decryptedCardNumber);
    console.log("CVV recibido (no almacenado):", cvv);

    res.json({ mensaje: "Tarjeta procesada correctamente" });
});

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));