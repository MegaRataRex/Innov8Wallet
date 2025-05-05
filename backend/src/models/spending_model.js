const { calculateWeights } = require("../util/calculateWeight");
const express = require("express");
const { prepareDataMonth } = require("../util/prepare_data");
const router = express.Router();
const tf = require("@tensorflow/tfjs");

function createModel(inputShape) {
  const transactionInput = tf.input({ shape: inputShape }); // [5]
  const weightInput = tf.input({ shape: [1] });

  const weightedTransactions = tf.layers
    .multiply()
    .apply([transactionInput, weightInput]);

  const output = tf.layers
    .dense({ units: 1, activation: "linear" })
    .apply(weightedTransactions);

  return tf.model({
    inputs: [transactionInput, weightInput],
    outputs: output,
  });
}

router.post("/createModelForNextMonth", async (req, res) => {
  try {
    const model = createModel([4]);

    const initialData = await prepareDataMonth(
      req.body.user_id,
      req.body.category,
      req.body.payment_id
    );

    const data = initialData.map((d) => ({
      ...d,
      weight: calculateWeights(d.year, d.month),
    }));

    const xs = tf.tensor2d(
      data.map((d) => [d.day, d.month, d.weekday, d.is_weekend])
    );

    const weights = tf.tensor2d(data.map((d) => [d.weight]));

    const ys = tf.tensor2d(data.map((d) => [parseFloat(d.total_spent)]));

    model.compile({ optimizer: "adam", loss: "meanSquaredError" });

    await model.fit([xs, weights], ys, {
      epochs: 50,
      batchSize: 32,
    });

    const predictions = [];
    const now = new Date();
    const year =
      now.getMonth() === 11 ? now.getFullYear() + 1 : now.getFullYear();
    const month = now.getMonth() === 11 ? 0 : now.getMonth() + 1;

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const weekday = date.getDay(); // Sunday=0 to Saturday=6
      const is_weekend = weekday === 0 || weekday === 6 ? 1 : 0;

      predictions.push({
        day,
        month: month + 1, // JS months are 0-based
        weekday,
        is_weekend,
        weight: calculateWeights(year, month + 1),
      });
    }

    const xsPred = tf.tensor2d(
      predictions.map((d) => [d.day, d.month, d.weekday, d.is_weekend])
    );
    const weightsPred = tf.tensor2d(predictions.map((d) => [d.weight]));

    const predictedTensor = model.predict([xsPred, weightsPred]);
    const predictedValues = await predictedTensor.array();

    // Adjuntar valores predichos a los días
    const result = predictions.map((d, i) => ({
      ...d,
      predicted_spending: predictedValues[i][0],
    }));

    res.json({ predictions: result });
  } catch (error) {
    console.error("Error al generar predicciones:", error);
    res.status(500).json({ error: "Error al generar predicciones" });
  }
});
module.exports = router;
