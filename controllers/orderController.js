const Order = require('../models/Order');
const Car = require('../models/Car');

exports.createOrder = async (req, res) => {
  try {
    const car = await Car.findOne({ vin: req.body.vin });
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    if (!car.available) {
      return res.status(400).json({ message: 'Car is no longer available for reservation.' });
    }

    const order = new Order({ ...req.body, status: 'pending' });
    await order.save();

    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.confirmOrder = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ message: 'Order not found' });
  
      order.status = 'confirmed';
      await order.save();
  
      // Now update car availability to false
      await Car.findOneAndUpdate({ vin: order.vin }, { available: false });
  
      res.json({ message: 'Order confirmed', order });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  };
