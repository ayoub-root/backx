const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var PatientSchema = new Schema(
  {
account_id :{type:mongoose.Schema.Types.ObjectId, ref:'accounts'},
activation_code:{type:String,required:true},
doctor:{type:mongoose.Schema.Types.ObjectId, ref:'accounts'},
information:{type:String},
assessments:[{type:mongoose.Schema.Types.ObjectId,ref:'assessments'}],
is_active:{type: String, required: true, maxlength: 100},
state:{type:String,default:'active'},
created_at:{type: Date, required: true},
updated_at:{type: Date, required: true},
  }
);

// Virtual for Patient's full name
PatientSchema
.virtual('name')
.get(function () {
  return this.account_id;
});

// Virtual for Patient's URL
PatientSchema
.virtual('url')
.get(function () {
  return '/patient/' + this._id;
});

//Export model
module.exports = mongoose.model('patients', PatientSchema);