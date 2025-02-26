const express = require("express");
const CryptoJS = require("crypto-js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

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

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ error: "All fields are required" });

  try {
    // Check if user already exists
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (results.length > 0)
          return res.status(400).json({ error: "User already exists" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        db.query(
          "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
          [name, email, hashedPassword],
          (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({
              message: "User registered successfully",
              userId: result.userId,
            });
          }
        );
      }
    );
  } catch (error) {
    console.error("🚨 Error en el servidor:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// LOGIN a user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required" });

  try {
    // Find user by email
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (results.length === 0)
          return res.status(401).json({ error: "Invalid credentials" });

        const user = results[0];

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(401).json({ error: "Invalid credentials" });

        // Generate token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });

        res.json({ message: "Login successful", token, userId: user.id });
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
