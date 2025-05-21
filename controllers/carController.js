const Car = require('../models/Car');

exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCarByVin = async (req, res) => {
    console.log('Requested VIN:', req.params.vin);
  try {
    const car = await Car.findOne({ vin: req.params.vin });
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
