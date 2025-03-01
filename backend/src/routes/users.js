const express = require("express");
const CryptoJS = require("crypto-js");
const bcrypt = require("bcrypt");
const db = require("../config/db");
const jwt = require("jsonwebtoken");
const router = express.Router();

const SECRET_KEY = process.env.SECRET_KEY || "clave_secreta_segura";

function getRandomCardType() {
  const cardTypes = ["debit", "credit"];
  return cardTypes[Math.floor(Math.random() * cardTypes.length)];
}

// 📌 Ruta para agregar una tarjeta
router.post("/addCard", (req, res) => {
  const { userId, card, balance, cardType, brand } = req.body;

  if (!userId || !card || !brand) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const balanceValue = balance || 0; // Fix balance default value

  try {
    const type = getRandomCardType();

    const fourYearsFromNow = new Date();
    fourYearsFromNow.setFullYear(fourYearsFromNow.getFullYear() + 4);

    const query = `INSERT INTO cards (user_id, token, last_four, type, exp_date, cardType, brand, balance)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    // 🔓 Decrypt the card first
    const encryptedToken = CryptoJS.AES.encrypt(card, SECRET_KEY).toString();

    // 🏷️ Get last four digits
    const lastFour = card.slice(-4);
    // 📌 Insert into database
    db.query(
      query,
      [
        userId,
        encryptedToken,
        lastFour,
        type,
        fourYearsFromNow.toISOString().split("T")[0],
        cardType,
        brand,
        balanceValue,
      ],
      (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Database error", details: err });
        }
        res.json({ mensaje: "Tarjeta procesada correctamente" });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Error al procesar la tarjeta" });
  }
});

router.post("/register", (req, res) => {
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
              userId: result.insertId,
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
router.post("/login", (req, res) => {
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
