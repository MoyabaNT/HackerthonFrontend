import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="text-2xl font-bold text-blue-600">Farfare</div>
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 items-center">
          <a href="#home" className="text-gray-600 hover:text-blue-600">Home</a>
          <a href="#features" className="text-gray-600 hover:text-blue-600">Features</a>
          <a href="#contact" className="text-gray-600 hover:text-blue-600">Contact</a>
          <Link to='/LogIn'><button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Sign Up</button></Link>
        </div>
        {/* Hamburger Button for Mobile */}
        <button
          className="md:hidden text-gray-600 hover:text-blue-600 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>
      {/* Mobile Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-white shadow-md`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col space-y-4">
          <a href="#home" className="text-gray-600 hover:text-blue-600" onClick={toggleMenu}>Home</a>
          <a href="#features" className="text-gray-600 hover:text-blue-600" onClick={toggleMenu}>Features</a>
          <a href="#contact" className="text-gray-600 hover:text-blue-600" onClick={toggleMenu}>Contact</a>
          <Link to='/SignUp'><button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full text-left" onClick={toggleMenu}>
            Sign Up
          </button></Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;