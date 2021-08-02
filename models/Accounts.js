const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var AccountSchema = new Schema(
  {
    administrator: { type: mongoose.Schema.Types.ObjectId, ref: 'accounts' },
    code: { type: Number, required: true, maxlength: 12 },
    email: { type: String, required: true, maxlength: 100 },
    password: { type: String, required: true, maxlength: 1024 },
    first_name: { type: String, required: false, maxlength: 100 },
    last_name: { type: String, required: false, maxlength: 100 },
    date_of_birth: { type: Date, required: false },
    sex: { type: String, required: false },
    address: { type: String, required: false, maxlength: 255 },
    mobile: { type: String, required: false, maxlength: 20 },
    avatar: { type: String, required: false },
    NIR_number: { type: Number, required: false, maxlength: 14 },
    role: { type: String, required: false, maxlength: 20 },
    profession: { type: String, required: false, maxlength: 100 },
    bio: { type: String, required: false },
    is_active: { type: String, required: true, maxlength: 100 },
    activation_code: { type: String, required: true },
    is_loged: { type: String, required: true, maxlength: 100 },
    logo: { type: String, default: undefined },
    background: { type: String, default: undefined },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
  }
);

// Virtual for Account's full name
AccountSchema
  .virtual('name')
  .get(function () {
    return this.family_name + ', ' + this.first_name;
  });

// Virtual for Account's URL
AccountSchema
  .virtual('url')
  .get(function () {
    return '/account/' + this._id;
  });

//Export model
module.exports = mongoose.model('accounts', AccountSchema);