const express = require("express");
const CryptoJS = require("crypto-js");

const router = express.Router();

const SECRET_KEY = process.env.SECRET_KEY || "clave_secreta_segura";

// 📌 Ruta para agregar una tarjeta
router.post("/addCard", (req, res) => {
    const { card, cvv } = req.body;

    try {
        const decryptedBytes = CryptoJS.AES.decrypt(card, SECRET_KEY);
        const decryptedCardNumber = decryptedBytes.toString(CryptoJS.enc.Utf8);

        
        res.json({ mensaje: "Tarjeta procesada correctamente" });
    } catch (error) {
        res.status(400).json({ error: "Error al desencriptar la tarjeta" });
    }
});

module.exports = router;