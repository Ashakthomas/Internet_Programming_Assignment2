import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white text-center py-4 mt-12">
      <p className="text-sm">
        © {new Date().getFullYear()} Car Rental App. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
