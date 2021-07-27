const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var FiltersSchema = new Schema(
  {
//account_id :{type:mongoose.Schema.Types.ObjectId, ref:'accounts'},
//evaluation:{type:mongoose.Schema.Types.ObjectId, ref:'evaluations'},
creator:{type:mongoose.Schema.Types.ObjectId, ref:'accounts'},
title:{type:String,required:true},
field:{type:String,required:true}, // for the application services ['healthcare', 'elarning','research','fitness',]
type:{type:String,required:true},
value:{type:Array},
option:{type:Array},
state:{type:String,default:'active'},
description:{type:String},
created_at:{type: Date, required: true},
updated_at:{type: Date, required: true},
  }
);

// Virtual for Patient's full name
FiltersSchema
.virtual('name')
.get(function () {
  return this.account_id;
});

// Virtual for Patient's URL
FiltersSchema
.virtual('url')
.get(function () {
  return '/Filters/' + this._id;
});

//Export model
module.exports = mongoose.model('filters', FiltersSchema);