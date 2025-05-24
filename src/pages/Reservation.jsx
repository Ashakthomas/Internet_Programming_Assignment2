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
  const [formErrors, setFormErrors] = useState({});
  const [total, setTotal] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);

  // Fetch car details and saved form data
  useEffect(() => {
    if (!vin) {
      setCarError('No car selected. Please choose a car from the homepage.');
      return;
    }

    axios
      .get(`http://localhost:5000/api/cars/${vin}`)
      .then((res) => {
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
    const errors = validateForm(formData);
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  }, [formData]);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    localStorage.setItem(`reservation_${vin}`, JSON.stringify(updatedFormData));
  };

  // Form validation logic
  const validateForm = (data) => {
    const errors = {};
    const nameRegex = /^[a-zA-Z\s]{3,}$/; // Name: at least 3 letters/spaces
    const phoneRegex = /^\d{10}$/; // Phone: exactly 10 digits
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format
    const licenseRegex = /^[A-Z0-9]{6,}$/; // License: alphanumeric, 6+ chars

    if (!nameRegex.test(data.name)) {
      errors.name = 'Name must contain only letters and at least 3 characters.';
    }
    if (!phoneRegex.test(data.phone)) {
      errors.phone = 'Phone number must be exactly 10 digits.';
    }
    if (!emailRegex.test(data.email)) {
      errors.email = 'Invalid email format.';
    }
    if (!licenseRegex.test(data.license)) {
      errors.license = 'License must be at least 6 alphanumeric characters.';
    }

    return errors;
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const order = {
      vin: car.vin,
      ...formData,
      total,
    };

    axios
      .post('http://localhost:5000/api/orders', order)
      .then((response) => {
        toast.success('Reservation confirmed!');
        localStorage.removeItem(`reservation_${vin}`);
        navigate(`/confirmation/${response.data._id}`);
      })
      .catch((error) => {
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
    return <div className="text-center text-lg mt-10">Loading car details...</div>;
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
        {/* Name Input */}
        <div>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />
          {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
        </div>

        {/* Phone Input */}
        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />
          {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
        </div>

        {/* Email Input */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />
          {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
        </div>

        {/* License Input */}
        <div>
          <input
            type="text"
            name="license"
            placeholder="Driver's License Number"
            value={formData.license}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />
          {formErrors.license && <p className="text-red-500 text-sm">{formErrors.license}</p>}
        </div>

        {/* Start Date Input */}
        <div>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />
        </div>

        {/* Duration Input */}
        <div>
          <input
            type="number"
            name="duration"
            min="1"
            value={formData.duration}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />
        </div>

        {/* Total Price */}
        <div className="text-xl font-bold text-yellow-400 mt-4 mb-2">
          Total: <span className="text-white">AU${total}</span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-3 text-white rounded ${
            isFormValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Confirm Reservation
        </button>

        {/* Cancel Button */}
        <button
          type="button"
          onClick={() => navigate('/')}
          className="w-full py-3 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Reservation;
