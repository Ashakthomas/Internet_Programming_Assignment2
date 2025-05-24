import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Reservation = () => {
  const { vin } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [carError, setCarError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    license: '',
    startDate: '',
    duration: 1,
  });
  const [total, setTotal] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);

  // Fetch car details and saved form data
  useEffect(() => {
    if (!vin) {
      setCarError('No car selected. Please choose a car from the homepage.');
      return;
    }

    axios.get(`http://localhost:5000/api/cars/${vin}`)
      .then(res => {
        setCar(res.data);
        const savedData = localStorage.getItem(`reservation_${vin}`);
        if (savedData) {
          setFormData(JSON.parse(savedData));
        }
      })
      .catch(() => {
        setCarError('Car not found. Please select a valid car from the homepage.');
      });
  }, [vin]);

  // Calculate total price
  useEffect(() => {
    if (car) {
      setTotal(car.pricePerDay * formData.duration);
    }
  }, [formData.duration, car]);

  // Validate form
  useEffect(() => {
    const { name, phone, email, license, startDate, duration } = formData;
    if (name && phone && email && license && startDate && duration > 0) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [formData]);

  // Input change handler
  const handleChange = (e) => {
    const newFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newFormData);
    localStorage.setItem(`reservation_${vin}`, JSON.stringify(newFormData));
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const order = {
      vin: car.vin,
      ...formData,
      total
    };

    axios.post('http://localhost:5000/api/orders', order)
      .then(response => {
        toast.success('Reservation confirmed!');
        localStorage.removeItem(`reservation_${vin}`);
        navigate(`/confirmation/${response.data._id}`);
      })
      .catch(error => {
        const msg = error.response?.data?.message || 'Failed to reserve car!';
        toast.error(msg);
      });
  };

  // Error states
  if (carError) {
    return (
      <div className="text-center mt-10 text-red-600 text-xl font-semibold">
        {carError}
      </div>
    );
  }

  if (!car) {
    return (
      <div className="text-center text-lg mt-10">Loading car details...</div>
    );
  }

  if (!car.available) {
    return (
      <div className="text-center mt-10 text-red-600 text-xl font-semibold">
        Sorry, this car is currently unavailable for reservation.
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">
        Reserve {car.brand} {car.carModel}
      </h1>

      {/* Read-only car info section */}
      <div className="mb-6 p-4 border rounded-lg shadow bg-gray-50">
        <img
          src={`/images/${car.image}`}
          alt={car.carModel}
          className="w-full h-48 object-contain mb-4"
        />
        <p className="text-lg font-semibold">{car.brand} {car.carModel}</p>
        <p>Type: {car.carType}</p>
        <p>Year: {car.yearOfManufacture}</p>
        <p>Mileage: {car.mileage}</p>
        <p>Fuel: {car.fuelType}</p>
        <p className="mt-2 text-blue-600 font-bold">AU${car.pricePerDay} / day</p>
      </div>

      {/* Reservation form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required className="w-full p-3 border rounded" />
        <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required className="w-full p-3 border rounded" />
        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required className="w-full p-3 border rounded" />
        <input type="text" name="license" placeholder="Driver's License Number" value={formData.license} onChange={handleChange} required className="w-full p-3 border rounded" />
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required className="w-full p-3 border rounded" />
        <input type="number" name="duration" min="1" value={formData.duration} onChange={handleChange} required className="w-full p-3 border rounded" />

        <div className="text-xl font-bold text-yellow-400 mt-4 mb-2">
          Total: <span className="text-white">AU${total}</span>
        </div>


        <button type="submit" disabled={!isFormValid}
          className={`w-full py-3 text-white rounded ${isFormValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}>
          Confirm Reservation
        </button>

        <button type="button" onClick={() => navigate('/')}
          className="w-full py-3 bg-gray-300 text-black rounded hover:bg-gray-400 transition">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Reservation;
