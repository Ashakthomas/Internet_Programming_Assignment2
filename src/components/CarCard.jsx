import React from 'react';
import { Link } from 'react-router-dom';

const CarCard = ({ car }) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-lg transition-transform hover:scale-105">
      <img
        src={`/images/${car.image}`}
        alt={car.carModel}
        className="w-full h-40 object-contain mb-4"
      />
      <h2 className="text-lg font-semibold text-blue-700">{car.carModel}</h2>
      <p className="text-gray-600">Type: {car.carType}</p>
      <p className="text-gray-600">Year: {car.yearOfManufacture}</p>
      <p className="text-gray-600">Mileage: {car.mileage}</p>
      <p className="text-gray-600">Fuel: {car.fuelType}</p>
      <p className="text-gray-800 font-semibold mt-2">AU${car.pricePerDay} / day</p>
      <p className={`mt-1 font-semibold ${car.available ? 'text-green-600' : 'text-red-600'}`}>
        {car.available ? 'Available' : 'Not Available'}
      </p>
      <Link to={`/reservation/${car.vin}`}>
        <button
          className={`mt-4 w-full py-2 rounded-xl text-white ${
            car.available ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
          }`}
          disabled={!car.available}
        >
          Rent Now
        </button>
      </Link>
    </div>
  );
};

export default CarCard;
