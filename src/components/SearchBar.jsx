import React, { useState } from 'react';

const SearchBar = ({ onSearch, suggestions }) => {
  const [keyword, setKeyword] = useState('');

  const handleChange = (e) => {
    setKeyword(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="relative mb-6">
      <input
        type="text"
        value={keyword}
        onChange={handleChange}
        placeholder="Search by type, brand, model, description"
        className="border border-gray-300 rounded-lg p-3 w-full"
      />
      {suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 z-10 max-h-40 overflow-y-auto">
          {suggestions.map((item, index) => (
            <li
              key={index}
              className="p-2 hover:bg-blue-100 cursor-pointer"
              onClick={() => {
                setKeyword(item);
                onSearch(item);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
