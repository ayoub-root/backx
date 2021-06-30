const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var ProfessionalSchema = new Schema(
  {
account_id :{type:mongoose.Schema.Types.ObjectId, ref:'accounts'},
address:{type: String, required: false, maxlength: 255},
mobile:{type: String, required: false, maxlength: 20},
job:{type: String, required: false, maxlength: 255},
description:{type: String, required: false},
adder:{type:mongoose.Schema.Types.ObjectId, ref:'accounts'},
is_active:{type: String, required: true, maxlength: 100},
added_by_admin:{type: Boolean, required: true, maxlength: 10},
activation_code:{type:String,required:true},
state:{type:String,default:'active'},
created_at:{type: Date, required: true},
updated_at:{type: Date, required: true},
  }
);

// Virtual for Professional's full name
ProfessionalSchema
.virtual('name')
.get(function () {
  return this.account_id ;
});

// Virtual for Professional's URL
ProfessionalSchema
.virtual('url')
.get(function () {
  return '/professional/' + this._id;
});

//Export model
module.exports = mongoose.model('professionals', ProfessionalSchema);