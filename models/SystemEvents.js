const mongoose = require('mongoose');


const Schema = mongoose.Schema;

var SystemEventsSchema = new Schema(
  {


title: {type:String, required:true}, //name of the action
type:{type:String,required:true}, // new  update, delete, consultingn, delete, archive, put in trash, 
creator:{type:mongoose.Schema.Types.ObjectId, ref:'accounts'}, //event creator,
interestDataId:{type:String},
interestDataType:{type:String},
interestDataValue:{type:String},
created_at:{type:Date, required: true},
updated_at:{type:Date, required: true},
  }
);

// Virtual for Patient's full name
SystemEventsSchema
.virtual('name')
.get(function () {
  return this.account_id;
});

// Virtual for Patient's URL
SystemEventsSchema
.virtual('url')
.get(function () {
  return '/systemevents/' + this._id;
});

//Export model
module.exports = mongoose.model('systemevents', SystemEventsSchema);