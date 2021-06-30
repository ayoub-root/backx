const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var AssessmentsSchema = new Schema(
  {

ref: {type:String, required:true},
title: {type:String, required:true},
category: {type:Array, required:true},
target:{type:Array, required:true},
visiblity:{type:Array, required:true},
zone:{type:Array, required:true},
filter:{type:Array, required:true},
//date:{type:Date,required:true},
creator:{type:mongoose.Schema.Types.ObjectId, ref:'accounts'},
description:{type:String},
objective:{type:String},
iditable:{type:String},
evaluations:[{type: mongoose.Schema.Types.ObjectId, ref:'evaluations'}],
created_at:{type:Date, required: true},
updated_at:{type:Date, required: true},
  }
);

// Virtual for Patient's full name
AssessmentsSchema
.virtual('name')
.get(function () {
  return this.account_id;
});

// Virtual for Patient's URL
AssessmentsSchema
.virtual('url')
.get(function () {
  return '/assessements/' + this._id;
});

//Export model
module.exports = mongoose.model('assessments', AssessmentsSchema);