const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Car = require('../models/Car');

// Load .env config
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Sample car data array
const sampleCars = [
  {
    carType: 'Sedan',
    brand: 'Toyota',
    carModel: 'Corolla',
    image: 'corolla.jpg',
    yearOfManufacture: 2020,
    mileage: '30,000km',
    fuelType: 'Petrol',
    available: true,
    pricePerDay: 2200,
    description: 'Reliable and fuel-efficient.',
    vin: 'VIN000001'
  },
  {
    carType: 'SUV',
    brand: 'Ford',
    carModel: 'Everest',
    image: 'everest.jpg',
    yearOfManufacture: 2021,
    mileage: '18,000km',
    fuelType: 'Diesel',
    available: true,
    pricePerDay: 3500,
    description: 'Spacious and comfortable.',
    vin: 'VIN000002'
  },
  {
    carType: 'Wagon',
    brand: 'Mazda',
    carModel: '6 Wagon',
    image: '6wagon.jpg',
    yearOfManufacture: 2019,
    mileage: '45,000km',
    fuelType: 'Petrol',
    available: true,
    pricePerDay: 2800,
    description: 'Great for family trips.',
    vin: 'VIN000003'
  },
  {
    carType: 'Hatchback',
    brand: 'Hyundai',
    carModel: 'i20',
    image: 'i20.jpg',
    yearOfManufacture: 2022,
    mileage: '12,000km',
    fuelType: 'Petrol',
    available: true,
    pricePerDay: 1800,
    description: 'Compact and efficient.',
    vin: 'VIN000004'
  },
  {
    carType: 'SUV',
    brand: 'Kia',
    carModel: 'Seltos',
    image: 'seltos.jpg',
    yearOfManufacture: 2021,
    mileage: '22,000km',
    fuelType: 'Diesel',
    available: true,
    pricePerDay: 3200,
    description: 'Bold design and modern tech.',
    vin: 'VIN000005'
  },
  {
    carType: 'Sedan',
    brand: 'Honda',
    carModel: 'City',
    image: 'city.jpg',
    yearOfManufacture: 2018,
    mileage: '50,000km',
    fuelType: 'Petrol',
    available: true,
    pricePerDay: 2100,
    description: 'Smooth and reliable.',
    vin: 'VIN000006'
  },
  {
    carType: 'SUV',
    brand: 'Nissan',
    carModel: 'Terrano',
    image: 'terrano.jpg',
    yearOfManufacture: 2019,
    mileage: '40,000km',
    fuelType: 'Diesel',
    available: true,
    pricePerDay: 3100,
    description: 'Sturdy and powerful.',
    vin: 'VIN000007'
  },
  {
    carType: 'Hatchback',
    brand: 'Volkswagen',
    carModel: 'Polo',
    image: 'polo.jpg',
    yearOfManufacture: 2020,
    mileage: '28,000km',
    fuelType: 'Petrol',
    available: true,
    pricePerDay: 1900,
    description: 'German engineering, compact size.',
    vin: 'VIN000008'
  },
  {
    carType: 'Wagon',
    brand: 'Subaru',
    carModel: 'Outback',
    image: 'outback.jpg',
    yearOfManufacture: 2021,
    mileage: '20,000km',
    fuelType: 'Petrol',
    available: true,
    pricePerDay: 3400,
    description: 'Adventure-ready wagon.',
    vin: 'VIN000009'
  },
  {
    carType: 'SUV',
    brand: 'MG',
    carModel: 'Hector',
    image: 'hector.jpg',
    yearOfManufacture: 2023,
    mileage: '8,000km',
    fuelType: 'Petrol',
    available: true,
    pricePerDay: 3800,
    description: 'Feature-loaded premium SUV.',
    vin: 'VIN000010'
  }
];

// Insert data
const seedData = async () => {
  try {
    await Car.deleteMany();
    await Car.insertMany(sampleCars);
    console.log('✅ Car data seeded successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
