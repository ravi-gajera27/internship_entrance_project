const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
  uname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  mobileNo: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('Contact', contactSchema);