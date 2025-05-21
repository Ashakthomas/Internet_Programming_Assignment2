const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  carType: String,
  brand: String,
  carModel: String,
  image: String,
  yearOfManufacture: Number,
  mileage: String,
  fuelType: String,
  available: Boolean,
  pricePerDay: Number,
  description: String,
  vin: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Car', carSchema);
