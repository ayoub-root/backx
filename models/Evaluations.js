
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var EvaluationsSchema = new Schema(
  {

ref: {type:String, required:true,maxlength:20},
title: {type:String, required:true,maxlength:255},
category: {type:Array, required:true},
target:{type:Array, required:true},
visiblity:{type:Array, required:true},
zone:{type:Array, required:true},
filter:{type:Array, required:true},
template:{type:Array},
description:{type:String, required:false},
creator:{type:mongoose.Schema.Types.ObjectId, ref:'accounts'},
created_at:{type: Date, required: true},
updated_at:{type: Date, required: true},
  }
);

// Virtual for Patient's full name
EvaluationsSchema
.virtual('name')
.get(function () {
  return this.account_id;
});

// Virtual for Patient's URL
EvaluationsSchema
.virtual('url')
.get(function () {
  return '/evalaution/' + this._id;
});

//Export model
module.exports = mongoose.model('evaluations', EvaluationsSchema);