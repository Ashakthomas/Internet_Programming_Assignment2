import React from 'react';

const FilterPanel = ({ carTypes, brands, selectedType, selectedBrand, onTypeChange, onBrandChange, onClear }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <select value={selectedType} onChange={onTypeChange} className="border p-2 rounded">
        <option value="">All Types</option>
        {carTypes.map(type => <option key={type} value={type}>{type}</option>)}
      </select>

      <select value={selectedBrand} onChange={onBrandChange} className="border p-2 rounded">
        <option value="">All Brands</option>
        {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
      </select>

      <button onClick={onClear} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Clear Filters</button>
    </div>
  );
};

export default FilterPanel;
