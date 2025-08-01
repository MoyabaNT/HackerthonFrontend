import React, { useContext, useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import HomeNav from './HomeNav';
import { ThemeContext } from './Themes/ThemeContext';
import { collection, getDocs, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../Firebase';

const Passengers = () => {
  const { theme } = useContext(ThemeContext);
  const [passengers, setPassengers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPassenger, setNewPassenger] = useState({
    name: '',
    contact: '',
    kin: '',
    kinContact: '',
    kinmail: '',
    pickup: '',
    destination: '',
  });
  const [editingPassenger, setEditingPassenger] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    emailjs.init('3yXkjtJrgGGkyuvav');
  }, []);

  useEffect(() => {
    const fetchPassengers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'passengers'));
        const data = querySnapshot.docs.map((doc) => {
          const passengerData = doc.data();
          return {
            id: doc.id,
            ...passengerData,
            date: passengerData.Date && passengerData.Date.toDate
              ? passengerData.Date.toDate().toLocaleString()
              : 'N/A',
          };
        });
        setPassengers(data);
      } catch (error) {
        console.error('Error fetching passengers:', error);
        setError('Failed to fetch passengers.');
      }
    };

    fetchPassengers();
  }, []);

  const sendPassengerEmail = async (passengerData, action) => {
    try {
      const templateParams = {
        'passengerData.name': passengerData.name,
        'passengerData.contact': passengerData.contact,
        'passengerData.kin': passengerData.kin || 'N/A',
        'passengerData.kinContact': passengerData.kinContact || 'N/A',
        'passengerData.kinmail': passengerData.kinmail || 'N/A',
        'passengerData.pickup': passengerData.pickup,
        'passengerData.destination': passengerData.destination || 'N/A',
        'passengerData.date': new Date().toLocaleString('en-ZA', {
          timeZone: 'Africa/Johannesburg',
          dateStyle: 'medium',
          timeStyle: 'short',
        }),
        action: action,
      };

      await emailjs.send('service_xhlgfp5', 'template_o9tlfri', templateParams);
      alert(`Passenger ${action.toLowerCase()} email sent successfully!`);
    } catch (error) {
      console.error(`Error sending ${action.toLowerCase()} passenger email:`, error);
      alert(`Failed to send ${action.toLowerCase()} passenger email.`);
    }
  };

  const validateInputs = () => {
    if (!newPassenger.name) return 'Name is required.';
    if (!newPassenger.contact) return 'Contact number is required.';
    if (!newPassenger.pickup) return 'Pickup location is required.';
    if (!newPassenger.kinmail) return 'Next of kin email is required.';
    return '';
  };

  const handleAddPassenger = async () => {
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const passengerData = {
        ...newPassenger,
        Date: serverTimestamp(),
      };
      const docRef = await addDoc(collection(db, 'passengers'), passengerData);
      const newPassengerWithId = {
        id: docRef.id,
        ...passengerData,
        date: new Date().toLocaleString(),
      };
      setPassengers([...passengers, newPassengerWithId]);

      await sendPassengerEmail(newPassenger, 'Added');

      setNewPassenger({ name: '', contact: '', kin: '', kinContact: '', kinmail: '', pickup: '', destination: '' });
      setIsModalOpen(false);
      setError('');
    } catch (error) {
      console.error('Error adding passenger:', error);
      setError('Failed to add passenger.');
    }
  };

  const handleEditPassenger = (passenger) => {
    setEditingPassenger(passenger);
    setNewPassenger({
      name: passenger.name || '',
      contact: passenger.contact || '',
      kin: passenger.kin || '',
      kinContact: passenger.kinContact || '',
      kinmail: passenger.kinmail || '',
      pickup: passenger.pickup || '',
      destination: passenger.destination || '',
    });
    setIsModalOpen(true);
    setError('');
  };

  const handleUpdatePassenger = async () => {
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const passengerRef = doc(db, 'passengers', editingPassenger.id);
      const passengerData = {
        ...newPassenger,
        Date: serverTimestamp(),
      };
      await updateDoc(passengerRef, passengerData);
      const updatedPassenger = {
        ...passengerData,
        id: editingPassenger.id,
        date: new Date().toLocaleString(),
      };
      setPassengers(passengers.map((p) => (p.id === editingPassenger.id ? updatedPassenger : p)));

      await sendPassengerEmail(newPassenger, 'Updated');

      setNewPassenger({ name: '', contact: '', kin: '', kinContact: '', kinmail: '', pickup: '', destination: '' });
      setEditingPassenger(null);
      setIsModalOpen(false);
      setError('');
    } catch (error) {
      console.error('Error updating passenger:', error);
      setError('Failed to update passenger.');
    }
  };

  return (
    <div className={`flex min-h-screen ${theme === 'light' ? 'bg-gradient-to-b from-gray-50 to-gray-100' : 'bg-gradient-to-b from-gray-800 to-gray-900'}`}>
      <HomeNav />
      <div className="flex-1 md:ml-64 p-4 sm:p-6 lg:p-8 mt-6">
        <h1 className={`text-2xl sm:text-3xl font-extrabold ${theme === 'light' ? 'text-gray-800' : 'text-white'} mb-6 tracking-tight`}>
          Passenger List
        </h1>

        {error && (
          <div className={`mb-4 p-4 rounded-md ${theme === 'light' ? 'bg-red-100 text-red-700' : 'bg-red-900 text-red-200'}`}>
            {error}
          </div>
        )}

        <div className="mb-8">
          <button
            onClick={() => {
              setEditingPassenger(null);
              setNewPassenger({ name: '', contact: '', kin: '', kinContact: '', kinmail: '', pickup: '', destination: '' });
              setIsModalOpen(true);
              setError('');
            }}
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
                  <span className="font-medium">Kin:</span> {passenger.kin || 'N/A'}
                </p>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-200'}`}>
                  <span className="font-medium">Kin Contact:</span> {passenger.kinContact || 'N/A'}
                </p>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-200'}`}>
                  <span className="font-medium">Kin Email:</span> {passenger.kinmail || 'N/A'}
                </p>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-200'}`}>
                  <span className="font-medium">Pickup:</span> {passenger.pickup}
                </p>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-200'}`}>
                  <span className="font-medium">Destination:</span> {passenger.destination || 'N/A'}
                </p>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-200'}`}>
                  <span className="font-medium">Date:</span> {passenger.date}
                </p>
                <button
                  onClick={() => handleEditPassenger(passenger)}
                  className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-md font-semibold hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm transform hover:scale-105 transition-transform duration-200"
                >
                  Edit
                </button>
              </div>
            ))
          )}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-700'} p-4 sm:p-6 rounded-lg shadow-xl max-w-md w-full transform transition-all duration-300 scale-95 animate-in`}>
              <h2 className={`text-lg sm:text-xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'} mb-4`}>
                {editingPassenger ? 'Edit Passenger' : 'Add New Passenger'}
              </h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={newPassenger.name || ''}
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
                    value={newPassenger.contact || ''}
                    onChange={(e) => setNewPassenger({ ...newPassenger, contact: e.target.value })}
                    required
                    className={`mt-1 w-full px-3 py-2 border ${theme === 'light' ? 'border-gray-300' : 'border-gray-500'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-600 text-white'} text-sm`}
                    placeholder="Enter contact number"
                  />
                </div>
                <div>
                  <label htmlFor="kin" className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
                    Next of Kin
                  </label>
                  <input
                    id="kin"
                    type="text"
                    value={newPassenger.kin || ''}
                    onChange={(e) => setNewPassenger({ ...newPassenger, kin: e.target.value })}
                    className={`mt-1 w-full px-3 py-2 border ${theme === 'light' ? 'border-gray-300' : 'border-gray-500'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-600 text-white'} text-sm`}
                    placeholder="Enter next of kin"
                  />
                </div>
                <div>
                  <label htmlFor="kinContact" className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
                    Next of Kin Contact Number
                  </label>
                  <input
                    id="kinContact"
                    type="tel"
                    value={newPassenger.kinContact || ''}
                    onChange={(e) => setNewPassenger({ ...newPassenger, kinContact: e.target.value })}
                    className={`mt-1 w-full px-3 py-2 border ${theme === 'light' ? 'border-gray-300' : 'border-gray-500'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-600 text-white'} text-sm`}
                    placeholder="Enter kin contact number"
                  />
                </div>
                <div>
                  <label htmlFor="kinmail" className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
                    Next of Kin Email
                  </label>
                  <input
                    id="kinmail"
                    type="email"
                    value={newPassenger.kinmail || ''}
                    onChange={(e) => setNewPassenger({ ...newPassenger, kinmail: e.target.value })}
                    required
                    className={`mt-1 w-full px-3 py-2 border ${theme === 'light' ? 'border-gray-300' : 'border-gray-500'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-600 text-white'} text-sm`}
                    placeholder="Enter next of kin email"
                  />
                </div>
                <div>
                  <label htmlFor="pickup" className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
                    Pickup Location
                  </label>
                  <input
                    id="pickup"
                    type="text"
                    value={newPassenger.pickup || ''}
                    onChange={(e) => setNewPassenger({ ...newPassenger, pickup: e.target.value })}
                    required
                    className={`mt-1 w-full px-3 py-2 border ${theme === 'light' ? 'border-gray-300' : 'border-gray-500'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-600 text-white'} text-sm`}
                    placeholder="Enter pickup location"
                  />
                </div>
                <div>
                  <label htmlFor="destination" className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
                    Destination
                  </label>
                  <input
                    id="destination"
                    type="text"
                    value={newPassenger.destination || ''}
                    onChange={(e) => setNewPassenger({ ...newPassenger, destination: e.target.value })}
                    className={`mt-1 w-full px-3 py-2 border ${theme === 'light' ? 'border-gray-300' : 'border-gray-500'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-600 text-white'} text-sm`}
                    placeholder="Enter destination"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setNewPassenger({ name: '', contact: '', kin: '', kinContact: '', kinmail: '', pickup: '', destination: '' });
                      setEditingPassenger(null);
                      setIsModalOpen(false);
                      setError('');
                    }}
                    className={`px-4 py-2 ${theme === 'light' ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-200 hover:bg-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={editingPassenger ? handleUpdatePassenger : handleAddPassenger}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm transform hover:scale-105 transition-transform duration-200"
                  >
                    {editingPassenger ? 'Update Passenger' : 'Add Passenger'}
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