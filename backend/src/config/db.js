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
    db.query("USE users");
    console.log("✅ Conectado a MySQL correctamente");
  }
});

db.query(
  "SET SESSION sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));"
);

module.exports = db;
