const { calculateWeights } = require("../util/calculateWeight");
const express = require("express");
const prepareDataMonth = require("../util/prepare_data");
const router = express.Router();
tf = require("@tensorflow/tfjs");
prepare = require("../util/prepare_data");

// Función que aplica pesos a las transacciones
const weightedLayer = tf.layers.lambda({
  function: (inputs) => {
    const transactions = inputs[0]; // Transacciones de entrada
    const weights = inputs[1]; // Pesos correspondientes
    return transactions.mul(weights); // Multiplica cada transacción por su peso
  },
});

// Definir el modelo con la capa de pesos
function createModel(inputShape) {
  const transactionInput = tf.input({ shape: inputShape }); // Entrada de transacciones
  const weightInput = tf.input({ shape: [1] }); // Entrada de pesos (1 valor por transacción)

  const weightedTransactions = weightedLayer.apply([
    transactionInput,
    weightInput,
  ]);

  const x = tf.layers
    .dense({ units: 64, activation: "relu" })
    .apply(weightedTransactions);
  const output = tf.layers.dense({ units: 1 }).apply(x);

  return tf.model({ inputs: [transactionInput, weightInput], outputs: output });
}

router.post("/createModelForNextMonth", async (req, res) => {
  try {
    const model = createModel([5]);

    const dataObject = prepareDataMonth(
      req.body.user_id,
      req.body.category,
      req.body.payment_id
    );

    const data = (await dataObject).historicalTransactions;

    data = data.map((d) => ({
      ...d,
      weight: calculateWeights(d.year, d.month),
    }));

    const xs = tf.tensor2d(
      data.map((d) => [d.amount, d.category, d.day, d.weekday])
    );
    const weights = tf.tensor2d(data.map((d) => [d.weight])); // Pesos como tensor

    const ys = tf.tensor2d(data.map((d) => [d.futureSpending])); // Etiqueta a predecir

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
