const { Storage } = require("@google-cloud/storage");
const express = require("express");
const router = express.Router();

// Instanciar el cliente (asegúrate de tener configurado GOOGLE_APPLICATION_CREDENTIALS)
require("dotenv").config();
const storage = new Storage();
const bucketName = "xddmegarata";

// Ruta para obtener el link firmado
router.get("/statement", async (req, res) => {
  try {
    const { userId, month } = req.query;
    if (!month) {
      return res.status(400).json({ message: "Falta el parámetro mes" });
    }

    const filePath = `statements/${userId}/${month}-2025.pdf`;

    const options = {
      version: "v4",
      action: "read",
      expires: Date.now() + 5 * 60 * 1000, // 5 minutos
    };

    const [url] = await storage
      .bucket(bucketName)
      .file(filePath)
      .getSignedUrl(options);

    res.json({ url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al generar el enlace" });
  }
});

module.exports = router;
