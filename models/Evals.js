const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var NotesSchema = new Schema(
  {
    ref: {type:String},
    title: {type:String, required:true,maxlength:255},
    category: {type:Array },
    target:{type:Array },
    visiblity:{type:Array },
    zone:{type:Array },
    filter:{type:Array },
    blocks:{type:Array},
    description:{type:String, required:false},
    blocks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'blocks' }],
    creator:{type:mongoose.Schema.Types.ObjectId, ref:'accounts'},
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