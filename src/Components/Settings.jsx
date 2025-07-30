import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeNav from './HomeNav';
import { ThemeContext } from './Themes/ThemeContext';

const Settings = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [userProfile, setUserProfile] = useState({ name: 'John Doe', contact: '+27 123 456 789' });
  const [notifications, setNotifications] = useState(true);
  const navigate = useNavigate();

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const { name, contact } = e.target.elements;
    setUserProfile({ name: name.value, contact: contact.value });
    alert('Profile updated successfully!'); // Placeholder feedback
  };

  const toggleNotifications = () => {
    setNotifications(!notifications);
    // TODO: Update notification settings in backend
  };

  const handleExportData = () => {
    alert('Data export triggered!'); // Placeholder
  };

  const handleResetTaxis = () => {
    alert('Taxi dispatch count reset!'); // Placeholder
  };

  const handleLogout = () => {
    navigate('/LogIn');
  };

  return (
    <div className={`flex min-h-screen ${theme === 'light' ? 'bg-gradient-to-b from-gray-50 to-gray-100' : 'bg-gradient-to-b from-gray-800 to-gray-900'}`}>
      <HomeNav />
      <div className="flex-1 md:ml-64 p-4 sm:p-6 lg:p-8 mt-6">
        <h1 className={`text-2xl sm:text-3xl font-extrabold ${theme === 'light' ? 'text-gray-800' : 'text-white'} mb-6 tracking-tight`}>
          Settings
        </h1>

        <div className="max-w-3xl mx-auto space-y-6">
          {/* User Profile */}
          <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-700'} rounded-lg shadow-md p-6`}>
            <h2 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'} mb-4`}>User Profile</h2>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <label htmlFor="name" className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  defaultValue={userProfile.name}
                  required
                  className={`mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-600 text-white border-gray-500'}`}
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label htmlFor="contact" className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
                  Contact Number
                </label>
                <input
                  id="contact"
                  type="tel"
                  defaultValue={userProfile.contact}
                  required
                  className={`mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-600 text-white border-gray-500'}`}
                  placeholder="Enter contact number"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105 transition-transform duration-200 text-sm"
              >
                Update Profile
              </button>
            </form>
          </div>

          {/* Notification Preferences */}
          <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-700'} rounded-lg shadow-md p-6`}>
            <h2 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'} mb-4`}>Notifications</h2>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-200'}`}>
                Receive notifications for new passengers and taxi dispatches
              </span>
              <button
                onClick={toggleNotifications}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 focus:outline-none ${
                  notifications ? 'bg-blue-600' : 'bg-gray-400'
                }`}
              >
                <span
                  className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ${
                    notifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Theme Toggle */}
          <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-700'} rounded-lg shadow-md p-6`}>
            <h2 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'} mb-4`}>Theme</h2>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-200'}`}>
                Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
              </span>
              <button
                onClick={toggleTheme}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105 transition-transform duration-200 text-sm"
              >
                Toggle Theme
              </button>
            </div>
          </div>

          {/* Data Management */}
          <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-700'} rounded-lg shadow-md p-6`}>
            <h2 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'} mb-4`}>Data Management</h2>
            <div className="space-y-4">
              <div>
                <button
                  onClick={handleExportData}
                  className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105 transition-transform duration-200 text-sm"
                >
                  Export Passenger Data
                </button>
              </div>
              <div>
                <button
                  onClick={handleResetTaxis}
                  className="w-full sm:w-auto bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transform hover:scale-105 transition-transform duration-200 text-sm"
                >
                  Reset Taxi Dispatch Count
                </button>
              </div>
            </div>
          </div>

          {/* Support Contact */}
          <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-700'} rounded-lg shadow-md p-6`}>
            <h2 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'} mb-4`}>Support</h2>
            <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-200'}`}>
              Contact Farfare support at <a href="mailto:support@farfare.com" className="text-blue-600 hover:underline">support@farfare.com</a> or call +27 123 456 789.
            </p>
          </div>

          {/* Logout */}
          <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-700'} rounded-lg shadow-md p-6`}>
            <h2 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'} mb-4`}>Account</h2>
            <button
              onClick={handleLogout}
              className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105 transition-transform duration-200 text-sm"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;