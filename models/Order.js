const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  vin: String,
  name: String,
  phone: String,
  email: String,
  license: String,
  startDate: Date,
  duration: Number,
  total: Number,
  status: {
    type: String,
    default: 'pending'
  }
});

module.exports = mongoose.model('Order', orderSchema);
