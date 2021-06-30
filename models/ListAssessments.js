const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var ListAssessmentsSchema = new Schema(
  {


visiblity:{type:Array, required:true},

//date:{type:Date,required:true},
adder:{type:mongoose.Schema.Types.ObjectId, ref:'accounts'},
iditable:{type:String},
visiblity:{type:String},
evaluation:{type: mongoose.Schema.Types.ObjectId, ref:'evaluations'},
created_at:{type:Date, required: true},
updated_at:{type:Date, required: true},
  }
);

// Virtual for Patient's full name




//Export model
module.exports = mongoose.model('listassessments', ListAssessmentsSchema);