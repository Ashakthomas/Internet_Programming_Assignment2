const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Car = require('../models/Car');
const fs = require('fs');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Read JSON data
const cars = JSON.parse(fs.readFileSync(`${__dirname}/cars.json`, 'utf-8'));

// Import function
const importData = async () => {
  try {
    await Car.deleteMany();  // Clears existing data
    await Car.insertMany(cars.cars);
    console.log('Data Imported Successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

importData();
