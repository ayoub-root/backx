const mongoose = require('mongoose');
const Blocks = require('./Blocks');

const Schema = mongoose.Schema;
// oijoijoi //#endregion
/**
 * hello everyone
 */
var AssessmentsModelsSchema = new Schema(
  {

    elementID:{type:String}, // uuid v4  customized id 
title: {type:String, required:true}, // asstessment title
date: {type:Date,default: undefined}, // the date when we take the assessmenet (could be modified by the creator)
field: {type:Array, default: undefined},  // for the application services ['healthcare', 'elarning','research','fitness',]
category: {type:Array, default: undefined},  // domaine where we use this assessment
target: {type:Array,default: undefined}, // sub category of the assesssment
topic:{type:String,default: undefined}, // reason  of doing this assessment like the diagnosis
type:{type:String,required:true},  // ['evaluation','exercise','exergame','gamification','quiz','']
creator:{type:mongoose.Schema.Types.ObjectId, ref:'accounts'},
description:{type:String,default: undefined}, // breif description for the created assessment
documentation:{type:String,default: undefined}, // link or text of the official documentation 
audience:{type:Array}, // visibilty of each assessment ['private','organisation','public', 'specfic user']
state:{type:String,default:'active'}, // states :['active','archive','trash', 'hidden']
valid:{type:String, default:'user'}, // requires te be validated by the admin
ListBlocks:{type:[Blocks.schema],default: undefined}, // block list used to build the assessment (0...N)
filter:{type:Array}, // for advanced/future usage  [{filter1:{}};{filter2:{}}]
logo:{type:String,default: undefined}, // logo of the assessment  
background:{type:String,default: undefined},  // a background image  in case of page preview
created_at:{type:Date}, // first creation date
updated_at:{type:Date,}, // last updated date
  }
);

// Virtual for Patient's full name
AssessmentsModelsSchema
.virtual('name')
.get(function () {
  return this.account_id;
});

// Virtual for Patient's URL
AssessmentsModelsSchema
.virtual('url')
.get(function () {
  return '/assessementsmodels/' + this._id;
});

//Export model
module.exports = mongoose.model('assessmentsmodels', AssessmentsModelsSchema);