const mongoose = require('mongoose');
const Components = require('./Components');

const Schema = mongoose.Schema;

var ItemsSchema = new Schema(
  {
creator:{type:mongoose.Schema.Types.ObjectId, ref:'accounts'},
title:{type:String,required:true},
label:{type:String},
field: {type:Array, default: undefined}, 
category: { type: Array ,default: undefined},
target: { type: Array,default: undefined },
bodyzone:{type: Array,default: undefined},
profession:{type:Array,default: undefined},
type:{ type: Array,default: undefined },
state:{type:String,default:'active'},
valid:{type:String, default:'user'}, // requires te be validated by the admin
audience:{type:Array,default: undefined},
clonable:{type:Boolean,default:true,required:false},
documentation:{type:String,default: undefined},
ListComponents:{type:[Components.schema],default: undefined},
ListOptions:{type:[Components.schema],default: undefined},
description:{type:String,default: undefined},
logo:{type:String,default: undefined},
background:{type:String,default: undefined},
created_at:{type: Date},
updated_at:{type: Date},
  }
);

// Virtual for Patient's full name
ItemsSchema
.virtual('name')
.get(function () {
  return this.account_id;
});

// Virtual for Patient's URL
ItemsSchema
.virtual('url')
.get(function () {
  return '/Items/' + this._id;
});

//Export model
module.exports = mongoose.model('items', ItemsSchema);