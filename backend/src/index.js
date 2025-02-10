const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API de la app bancaria funcionando!");
});

app.listen(process.env.PORT, () => console.log("Backend corriendo en http://localhost:3306"));