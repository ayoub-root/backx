const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var NotesSchema = new Schema(
  {
account_id :{type:mongoose.Schema.Types.ObjectId, ref:'accounts'},
evaluation:{type:mongoose.Schema.Types.ObjectId, ref:'evaluations'},
creator:{type:mongoose.Schema.Types.ObjectId, ref:'accounts'},
title:{type:String,required:true},
description:{type:String},
created_at:{type: Date, required: true},
updated_at:{type: Date, required: true},
  }
);

// Virtual for Patient's full name
NotesSchema
.virtual('name')
.get(function () {
  return this.account_id;
});

// Virtual for Patient's URL
NotesSchema
.virtual('url')
.get(function () {
  return '/notes/' + this._id;
});

//Export model
module.exports = mongoose.model('notes', NotesSchema);