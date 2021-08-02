const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
account_id :{type:mongoose.Schema.Types.ObjectId, ref:'accounts'},
activation_code:{type:String,required:true},
administrator:{type:mongoose.Schema.Types.ObjectId, ref:'accounts'},
information:{type:String},
assessments:[{type:mongoose.Schema.Types.ObjectId,ref:'assessmentslist'}],
is_active:{type: String, required: true, maxlength: 100},
state:{type:String,default:'active'},
created_at:{type: Date, required: true},
updated_at:{type: Date, required: true},
  }
);

// Virtual for User's full name
UserSchema
.virtual('name')
.get(function () {
  return this.account_id;
});

// Virtual for User's URL
UserSchema
.virtual('url')
.get(function () {
  return '/user/' + this._id;
});

//Export model
module.exports = mongoose.model('users', UserSchema);