import React, { useContext, useState } from 'react';
import HomeNav from './HomeNav';
import { ThemeContext } from './Themes/ThemeContext';

const Passengers = () => {
  const { theme } = useContext(ThemeContext);
  const [passengers, setPassengers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPassenger, setNewPassenger] = useState({ name: '', contact: '', kin: '', kinContact: '', pickup: '' , Destination: ''});

  const handleAddPassenger = () => {
    if (newPassenger.name && newPassenger.contact && newPassenger.pickup) {
      setPassengers([
        ...passengers,
        { id: passengers.length + 1, ...newPassenger },
      ]);
      setNewPassenger({ name: '', contact: '',  kin: '', kinContact: '', pickup: '', Destination: '' });
      setIsModalOpen(false);
    }
  };

  return (
    <div className={`flex min-h-screen ${theme === 'light' ? 'bg-gradient-to-b from-gray-50 to-gray-100' : 'bg-gradient-to-b from-gray-800 to-gray-900'}`}>
      <HomeNav />
      <div className="flex-1 md:ml-64 p-4 sm:p-6 lg:p-8 mt-6">
        <h1 className={`text-2xl sm:text-3xl font-extrabold ${theme === 'light' ? 'text-gray-800' : 'text-white'} mb-6 tracking-tight`}>
          Passenger List
        </h1>

        <div className="mb-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105 transition-transform duration-200 text-sm sm:text-base"
          >
            Add New Passenger
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {passengers.length === 0 ? (
            <div className={`col-span-full text-center py-12 ${theme === 'light' ? 'bg-white' : 'bg-gray-700'} rounded-lg shadow-md`}>
              <p className={`text-lg ${theme === 'light' ? 'text-gray-500' : 'text-gray-200'}`}>No passengers found. Add a passenger to get started!</p>
            </div>
          ) : (
            passengers.map((passenger) => (
              <div
                key={passenger.id}
                className={`${theme === 'light' ? 'bg-white' : 'bg-gray-700'} rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200`}
              >
                <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'} mb-2`}>{passenger.name}</h3>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-200'}`}>
                  <span className="font-medium">Contact:</span> {passenger.contact}
                </p>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-200'}`}>
                  <span className="font-medium">Kin:</span> {passenger.kin}
                </p>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-200'}`}>
                  <span className="font-medium">Contact:</span> {passenger.kinContact}
                </p>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-200'}`}>
                  <span className="font-medium">Pickup:</span> {passenger.pickup}
                </p>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-200'}`}>
                  <span className="font-medium">Destination:</span> {passenger.Destination}
                </p>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'} mt-2`}>ID: {passenger.id}</p>
              </div>
            ))
          )}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-700'} p-4 sm:p-6 rounded-lg shadow-xl max-w-md w-full transform transition-all duration-300 scale-95 animate-in`}>
              <h2 className={`text-lg sm:text-xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'} mb-4`}>Add New Passenger</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={newPassenger.name}
                    onChange={(e) => setNewPassenger({ ...newPassenger, name: e.target.value })}
                    required
                    className={`mt-1 w-full px-3 py-2 border ${theme === 'light' ? 'border-gray-300' : 'border-gray-500'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-600 text-white'} text-sm`}
                    placeholder="Enter passenger name"
                  />
                </div>
                <div>
                  <label htmlFor="contact" className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
                     Contact Number
                  </label>
                  <input
                    id="contact"
                    type="tel"
                    value={newPassenger.contact}
                    onChange={(e) => setNewPassenger({ ...newPassenger, contact: e.target.value })}
                    required
                    className={`mt-1 w-full px-3 py-2 border ${theme === 'light' ? 'border-gray-300' : 'border-gray-500'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-600 text-white'} text-sm`}
                    placeholder="Enter Contact Number"
                  />
                </div>
                <div>
                  <label htmlFor="name" className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
                    Kin
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={newPassenger.name}
                    onChange={(e) => setNewPassenger({ ...newPassenger, kin: e.target.value })}
                    required
                    className={`mt-1 w-full px-3 py-2 border ${theme === 'light' ? 'border-gray-300' : 'border-gray-500'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-600 text-white'} text-sm`}
                    placeholder="Enter net of Kin"
                  />
                </div>
                <div>
                  <label htmlFor="contact" className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
                    Next of Kin Contact number
                  </label>
                  <input
                    id="contact"
                    type="tel"
                    value={newPassenger.kinContact}
                    onChange={(e) => setNewPassenger({ ...newPassenger, kinContact: e.target.value })}
                    required
                    className={`mt-1 w-full px-3 py-2 border ${theme === 'light' ? 'border-gray-300' : 'border-gray-500'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-600 text-white'} text-sm`}
                    placeholder="Enter Kin Contact Number"
                  />
                </div>
                <div>
                  <label htmlFor="pickup" className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
                    Pickup Location
                  </label>
                  <input
                    id="pickup"
                    type="text"
                    value={newPassenger.pickup}
                    onChange={(e) => setNewPassenger({ ...newPassenger, pickup: e.target.value })}
                    required
                    className={`mt-1 w-full px-3 py-2 border ${theme === 'light' ? 'border-gray-300' : 'border-gray-500'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-600 text-white'} text-sm`}
                    placeholder="Enter pickup location"
                  />
                </div>
                <div>
                  <label htmlFor="Destination" className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
                     Destination
                  </label>
                  <input
                    id="Destination"
                    type="text"
                    value={newPassenger.Destination}
                    onChange={(e) => setNewPassenger({ ...newPassenger, Destination: e.target.value })}
                    required
                    className={`mt-1 w-full px-3 py-2 border ${theme === 'light' ? 'border-gray-300' : 'border-gray-500'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-600 text-white'} text-sm`}
                    placeholder="Enter Destination"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className={`px-4 py-2 ${theme === 'light' ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-200 hover:bg-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddPassenger}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm transform hover:scale-105 transition-transform duration-200"
                  >
                    Add Passenger
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Passengers;