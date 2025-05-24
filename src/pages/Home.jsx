import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarCard from '../components/CarCard';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel'; // ⬅️ NEW

const Home = () => {
  const [cars, setCars] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [carTypes, setCarTypes] = useState([]); // ⬅️ NEW
  const [brands, setBrands] = useState([]); // ⬅️ NEW
  const [selectedType, setSelectedType] = useState(''); // ⬅️ NEW
  const [selectedBrand, setSelectedBrand] = useState(''); // ⬅️ NEW

  useEffect(() => {
   axios.get('https://internet-programming-assignment2.onrender.com/api/cars')

      .then((response) => {
        const data = response.data;
        setCars(data);

        // Populate filter options
        setCarTypes([...new Set(data.map((car) => car.carType))]);
        setBrands([...new Set(data.map((car) => car.brand))]);
      })
      .catch((error) => console.error('Error fetching cars:', error));
  }, []);

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);

    if (keyword === '') {
      setSuggestions([]);
      return;
    }

    // Build a unique suggestion list from car attributes
    const keywords = [];
    cars.forEach((car) => {
      keywords.push(car.carType, car.brand, car.carModel, car.description);
    });

    const uniqueSuggestions = [...new Set(keywords)].filter((item) =>
      item.toLowerCase().includes(keyword.toLowerCase())
    );

    setSuggestions(uniqueSuggestions);
  };

  // Filter handler functions
  const handleTypeChange = (e) => setSelectedType(e.target.value);
  const handleBrandChange = (e) => setSelectedBrand(e.target.value);
  const clearFilters = () => {
    setSelectedType('');
    setSelectedBrand('');
  };

  // Final filtered + searched car list
  const filteredCars = cars.filter(
    (car) =>
      (selectedType === '' || car.carType === selectedType) &&
      (selectedBrand === '' || car.brand === selectedBrand) &&
      (car.carType.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        car.carModel.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        car.description.toLowerCase().includes(searchKeyword.toLowerCase()))
  );

  return (
    <div className="container mx-auto px- py-8">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Available Cars</h1>

      {/* Search and Filters in a Single Row */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {/* Search bar */}
        <SearchBar onSearch={handleSearch} suggestions={suggestions} />

        {/* Filter dropdowns */}
        <FilterPanel
          carTypes={carTypes}
          brands={brands}
          selectedType={selectedType}
          selectedBrand={selectedBrand}
          onTypeChange={handleTypeChange}
          onBrandChange={handleBrandChange}
          onClear={clearFilters}
        />
      </div>

      {/* Car Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredCars.map((car) => (
          <CarCard key={car.vin} car={car} />
        ))}
      </div>
    </div>
  );
};

export default Home;
