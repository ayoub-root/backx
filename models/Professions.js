const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var ProfessionsSchema = new Schema(
  {
//account_id :{type:mongoose.Schema.Types.ObjectId, ref:'accounts'},
//evaluation:{type:mongoose.Schema.Types.ObjectId, ref:'evaluations'},
creator:{type:mongoose.Schema.Types.ObjectId, ref:'accounts'},
title:{type:String,required:true},
label:{type:String,},
description:{type:String},

//description:{type:String},
created_at:{type: Date, required: true},
updated_at:{type: Date, required: true},
  }
);

// Virtual for Patient's full name
ProfessionsSchema
.virtual('name')
.get(function () {
  return this.account_id;
});

// Virtual for Patient's URL
ProfessionsSchema
.virtual('url')
.get(function () {
  return '/Professions/' + this._id;
});

//Export model
module.exports = mongoose.model('professions', ProfessionsSchema);