import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from './Themes/ThemeContext';
import { auth } from '../Firebase'; // 🔁 adjust this path if needed
import { signOut } from 'firebase/auth'; // ✅ this line fixes the error
import { useNavigate } from 'react-router-dom';


const HomeNav = () => {
  const { theme } = useContext(ThemeContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };


const handleLogout = async () => {
  const confirmed = window.confirm('Are you sure you want to log out?');

  if (confirmed) {
    try {
      await signOut(auth);
      alert('Logged out successfully.');
      navigate('/LogIn'); // redirect to login page
    } catch (error) {
      console.error('Logout error:', error);
      alert('Failed to log out. Please try again.');
    }
  }
};


  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 w-64 ${theme === 'light' ? 'bg-white' : 'bg-gray-700'} shadow-md transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-4">
          <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`}>Farfare</h2>
          <nav className="mt-8 space-y-4">
            <Link
              to="/dashboard"
              className={`block ${theme === 'light' ? 'text-gray-600 hover:text-blue-600' : 'text-gray-200 hover:text-blue-400'} text-sm md:text-base`}
              onClick={closeSidebar}
            >
              Dashboard
            </Link>
            <Link
              to="/Passangers"
              className={`block ${theme === 'light' ? 'text-gray-600 hover:text-blue-600' : 'text-gray-200 hover:text-blue-400'} text-sm md:text-base`}
              onClick={closeSidebar}
            >
              Passengers
            </Link>
            <Link
              to="/faqs"
              className={`block ${theme === 'light' ? 'text-gray-600 hover:text-blue-600' : 'text-gray-200 hover:text-blue-400'} text-sm md:text-base`}
              onClick={closeSidebar}
            >
              FAQ
            </Link>
            <Link
              to="/settings"
              className={`block ${theme === 'light' ? 'text-gray-600 hover:text-blue-600' : 'text-gray-200 hover:text-blue-400'} text-sm md:text-base`}
              onClick={closeSidebar}
            >
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className={`block w-full text-left ${theme === 'light' ? 'text-gray-600 hover:text-blue-600' : 'text-gray-200 hover:text-blue-400'} text-sm md:text-base`}
            >
              Logout
            </button>
          </nav>
        </div>
      </div>

      <button
        className={`md:hidden fixed top-4 left-4 ${theme === 'light' ? 'text-gray-600 hover:text-blue-600' : 'text-gray-200 hover:text-blue-400'} z-50 focus:outline-none`}
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isSidebarOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
          />
        </svg>
      </button>
    </>
  );
};

export default HomeNav;