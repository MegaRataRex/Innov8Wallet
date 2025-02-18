const { calculateWeights } = require("../util/calculateWeight");
const express = require("express");
const { prepareDataMonth } = require("../util/prepare_data");
const router = express.Router();
tf = require("@tensorflow/tfjs");
prepare = require("../util/prepare_data");

// Definir el modelo con la capa de pesos
function createModel(inputShape) {
  const transactionInput = tf.input({ shape: inputShape });
  const weightInput = tf.input({ shape: [1] });

  const weightedTransactions = tf.layers
    .multiply()
    .apply([transactionInput, weightInput]);

  return tf.model({
    inputs: [transactionInput, weightInput],
    outputs: weightedTransactions,
  });
}

router.post("/createModelForNextMonth", async (req, res) => {
  try {
    const model = createModel([5]);

    const dataObject = await prepareDataMonth(
      req.body.user_id,
      req.body.category,
      req.body.payment_id
    );
    const data = dataObject.monthSpendings;

    data = data.map((d) => ({
      ...d,
      weight: calculateWeights(d.year, d.month),
    }));

    const xs = tf.tensor2d(
      data.map((d) => [d.amount, d.category, d.day, d, weekday, d.is_weekend])
    );
    const weights = tf.tensor2d(data.map((d) => [d.weight])); // Pesos como tensor

    const ys = tf.tensor2d(data.map((d) => [d.total_spent])); // Etiqueta a predecir

    // Compilar y entrenar el modelo
    model.compile({ optimizer: "adam", loss: "meanSquaredError" });

    await model.fit([xs, weights], ys, {
      epochs: 50,
      batchSize: 32,
    });

    res.json({ message: "Modelo entrenado correctamente" });
  } catch (error) {
    console.error("Error al entrenar el modelo:", error);
    res.status(500).json({ error: "Error al entrenar el modelo" });
  }
});

module.exports = router;
