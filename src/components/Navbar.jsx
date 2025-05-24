import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow">
      <div className="container mx-auto flex justify-between items-center">
       <Link to="/" className="text-2xl font-bold flex items-center gap-2"> <img src="/logo2.png" alt="Logo" className="h-8" /> Car Rental </Link>
      </div>
    </nav>
  );
};

export default Navbar;
