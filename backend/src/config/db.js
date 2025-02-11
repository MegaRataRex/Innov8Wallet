const mysql = require("mysql2");
require("dotenv").config();

// Crear conexión a la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Conectar y manejar errores
db.connect((err) => {
  if (err) {
    console.error("❌ Error conectando a MySQL:", err.message);
  } else {
    console.log("✅ Conectado a MySQL correctamente");
  }
});



module.exports = db;