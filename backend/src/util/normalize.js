const tf = require("@tensorflow/tfjs");
const monthUtil = require("./monthUtil");

function prepareInputsToTensors(data) {
  return tf.tidy(() => {
    tf.util.shuffle(data);

    const inputs = data.map((d) => [d.day, d.month, d.weekday, d.is_weekend]);

    const inputTensor = tf.tensor2d(inputs);

    const inputMax = inputTensor.max();
    const inputMin = inputTensor.min();

    const normalizedInputs = inputTensor
      .sub(inputMin)
      .div(inputMax.sub(inputMin));

    const binaryValues = data.map((d) => {
      const isPayday =
        d.day === 15 || d.day === monthUtil.getMonthDays(d.month);
      const isWeekend =
        d.weekday === 0 || d.weekday === 6 || d.weekday === 5 ? 1 : 0;

      return {
        isPayday,
        isWeekend,
      };
    });

    return {
      inputs: normalizedInputs,
      inputMax: inputMax,
      inputMin: inputMin,
      binaryValues: binaryValues,
    };
  });
}

module.exports = { prepareInputsToTensors };
