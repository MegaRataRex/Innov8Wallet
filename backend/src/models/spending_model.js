tf = require("@tensorflow/tfjs");
data = require("../util/prepare_data");

function createModel() {
  const model = tf.sequential();
  model.add(tf.layers.dense({}));
}
