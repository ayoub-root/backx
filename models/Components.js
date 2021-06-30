const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var ComponentsSchema = new Schema(
  {
//account_id :{type:mongoose.Schema.Types.ObjectId, ref:'accounts'},
//evaluation:{type:mongoose.Schema.Types.ObjectId, ref:'evaluations'},
creator:{type:mongoose.Schema.Types.ObjectId, ref:'accounts'},
title:{type:String,required:true},
field:{type:Array},
type:{type:String,required:true},
state:{type:String},
value:{type:String},
options:{type:Array},
logo:{type:String,default: undefined},
background:{type:String,default: undefined},
documentation:{type:String,default: undefined},
description:{type:String,default: undefined},
created_at:{type: Date,default: undefined},
updated_at:{type: Date,default: undefined},
  }
);

// Virtual for Patient's full name
ComponentsSchema
.virtual('name')
.get(function () {
  return this.account_id;
});

// Virtual for Patient's URL
ComponentsSchema
.virtual('url')
.get(function () {
  return '/Components/' + this._id;
});

//Export model
module.exports = mongoose.model('components', ComponentsSchema);