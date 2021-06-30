const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var ExercisesSchema = new Schema(
  {

ref: {type:String, required:false},
title: {type:String, required:true},
category: {type:Array, required:false},
target:{type:Array, required:false},
visiblity:{type:Array, required:false},
zone:{type:Array, required:false},
filter:{type:Array, required:false},
exercisefile:{type: String, required: false},
creator:{type:mongoose.Schema.Types.ObjectId, ref:'accounts'},
description:{type:String},
objective:{type:String},
created_at:{type:Date, required: true},
updated_at:{type:Date, required: true},
  }
);

// Virtual for Patient's full name
ExercisesSchema
.virtual('name')
.get(function () {
  return this.account_id;
});

// Virtual for Patient's URL
ExercisesSchema
.virtual('url')
.get(function () {
  return '/exercises/' + this._id;
});
//Export model
module.exports = mongoose.model('exercises', ExercisesSchema);