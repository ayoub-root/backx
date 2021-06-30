
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var ListEvaluationsSchema = new Schema(
  {


created_at:{type: Date, required: true},
updated_at:{type: Date, required: true},
  }
);


//Export model
module.exports = mongoose.model('listevaluations', ListEvaluationsSchema);