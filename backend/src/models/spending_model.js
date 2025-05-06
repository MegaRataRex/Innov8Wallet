const { calculateWeights } = require("../util/calculateWeight");
const express = require("express");
const { prepareDataMonth } = require("../util/prepare_data");
const router = express.Router();
const tf = require("@tensorflow/tfjs");
const normal = require("../util/normalize");

function createModel(inputShape) {
  const transactionInput = tf.input({ shape: inputShape });
  const weightInput = tf.input({ shape: [1] });

  const dense1 = tf.layers
    .dense({ units: 16, activation: "relu" })
    .apply(transactionInput);
  const dense2 = tf.layers
    .dense({ units: 8, activation: "relu" })
    .apply(dense1);

  const weighted = tf.layers.multiply().apply([dense2, weightInput]);

  const output = tf.layers
    .dense({ units: 1, activation: "linear" }) // Cambié a linear para permitir cualquier rango
    .apply(weighted);

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

    // Normalizamos los inputs
    const normalizedInputs = normal.prepareInputsToTensors(initialData);

    // Pesos
    const weightData = initialData.map((d) => ({
      weight: calculateWeights(d.year, d.month),
    }));

    const weights = tf.tensor2d(weightData.map((d) => [d.weight]));

    // TARGET (gasto)
    const ysRaw = initialData.map((d) => parseFloat(d.total_spent));
    const ys = tf.tensor2d(ysRaw.map((v) => [v]));

    // Guardamos min y max para desnormalizar luego
    const ysMin = ys.min();
    const ysMax = ys.max();

    // Normalizamos las Y
    const ysNormalized = ys.sub(ysMin).div(ysMax.sub(ysMin));

    model.compile({ optimizer: "adam", loss: "meanSquaredError" });

    await model.fit([normalizedInputs.inputs, weights], ysNormalized, {
      epochs: 50,
      batchSize: 32,
    });

    // Predicciones para el próximo mes
    const predictions = [];
    const now = new Date();
    const year =
      now.getMonth() === 11 ? now.getFullYear() + 1 : now.getFullYear();
    const month = now.getMonth() === 11 ? 0 : now.getMonth() + 1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const weekday = date.getDay();
      const is_weekend = weekday === 0 || weekday === 6 ? 1 : 0;

      predictions.push({
        day,
        month: month + 1,
        weekday,
        is_weekend,
        weight: calculateWeights(year, month + 1),
      });
    }

    const xsPred = tf.tensor2d(
      predictions.map((d) => [d.day, d.month, d.weekday, d.is_weekend])
    );

    // Normalizamos las Xs de predicción
    const xsPredNormalized = xsPred
      .sub(normalizedInputs.inputMin)
      .div(normalizedInputs.inputMax.sub(normalizedInputs.inputMin));

    const weightsPred = tf.tensor2d(predictions.map((d) => [d.weight]));

    const predictedTensor = model.predict([xsPredNormalized, weightsPred]);

    // Desnormalizamos usando min y max original
    const predictedDesnormalized = predictedTensor
      .mul(ysMax.sub(ysMin))
      .add(ysMin);

    const predictedValues = await predictedDesnormalized.array();

    // Armamos el resultado final
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
