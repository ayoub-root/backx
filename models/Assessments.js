const mongoose = require('mongoose');
const Blocks = require('./Blocks');
const Evaluations = require('./Evaluations');

const Schema = mongoose.Schema;

var AssessmentsSchema = new Schema(
  {

    elementID:{type:String}, // uuid v4  customized id 
title: {type:String, required:true},
category: {type:Array, required:true},
desease: {type:Array, required:true},
diagnosis:{type:String, required:true},
//target:{type:Array, required:true},
//zone:{type:Array, required:true},
type:{type:String,required:true},
//filter:{type:Array, required:true},
creator:{type:mongoose.Schema.Types.ObjectId, ref:'accounts'},
description:{type:String},
//iditable:{type:String},
state:{type:String,default:'active'},
blocks:[Blocks.schema],
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