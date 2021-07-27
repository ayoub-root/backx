const mongoose = require('mongoose');
const Items = require('./Items');

const Schema = mongoose.Schema;

var BlocksSchema = new Schema(
  {
    title: { type: String, required: true }, //the block name
    label:{type:String},  //le block label, when user wants to change it 
    field: {type:Array, default: undefined},  //
    ListItems: {type:[Items.schema],default: undefined}, // list of items included in each block
    subblocks:  { type: Array,default: undefined }, // list of sub blocks 
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'accounts' }, // block creator (admin or any professional) 
    ref: { type: String, default: undefined}, // block refrence (for scientific refrencing)
    category: { type: Array,default: undefined },  // the main domaine where we can use this block
    type:{ type: Array,default: undefined },  //
    target: { type: Array, default: undefined},
    profession:{type:Array,default: undefined},
    state:{type:String,default:'active'},
    valid:{type:String, default:'user'}, // requires te be validated by the admin
    audience: { type: Array,default: undefined },
    documentation:{type:String,default: undefined},
    description: { type: String,default: undefined },
    logo:{type:String,default: undefined},
    background:{type:String,default: undefined},
    created_at: { type: Date,default: undefined },
    updated_at: { type: Date,default: undefined },
  }
);

// Virtual for Patient's full name
BlocksSchema
  .virtual('name')
  .get(function () {
    return this.account_id;
  });

// Virtual for Patient's URL
BlocksSchema
  .virtual('url')
  .get(function () {
    return '/Blocks/' + this._id;
  });

//Export model
module.exports = mongoose.model('blocks', BlocksSchema);