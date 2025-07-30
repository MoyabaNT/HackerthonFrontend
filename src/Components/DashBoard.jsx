import React, { useContext, useState } from 'react';
import HomeNav from './HomeNav';
import { ThemeContext } from './Themes/ThemeContext';

const DashBoard = () => {
  const { theme } = useContext(ThemeContext);
  const [passengers, setPassengers] = useState([]);
  const [taxisDispatched, setTaxisDispatched] = useState(0);

  const handleDispatchTaxi = () => {
    setTaxisDispatched(taxisDispatched + 1);
  };

  return (
    <div className={`flex min-h-screen ${theme === 'light' ? 'bg-gradient-to-b from-gray-50 to-gray-100' : 'bg-gradient-to-b from-gray-800 to-gray-900'}`}>
      <HomeNav />
      <div className="flex-1 md:ml-64 p-4 sm:p-6 lg:p-8 mt-6">
        <h1 className={`text-2xl sm:text-3xl font-extrabold ${theme === 'light' ? 'text-gray-800' : 'text-white'} mb-6 tracking-tight`}>
          Marshall Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-700'} rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200`}>
            <h2 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'} mb-2`}>Passengers Added</h2>
            <p className="text-3xl font-bold text-blue-600">{passengers.length}</p>
          </div>
          <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-700'} rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200`}>
            <h2 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'} mb-2`}>Taxis Dispatched</h2>
            <p className="text-3xl font-bold text-blue-600">{taxisDispatched}</p>
            <button
              onClick={handleDispatchTaxi}
              className="mt-4 w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105 transition-transform duration-200 text-sm"
            >
              Dispatch Taxi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;