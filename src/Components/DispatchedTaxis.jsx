import React, { useContext, useState, useEffect } from 'react';
   import HomeNav from './HomeNav';
   import { ThemeContext } from './Themes/ThemeContext';
   import { collection, getDocs, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
   import { db } from '../Firebase'; // Adjust the path based on your project structure

   const DispatchedTaxis = () => {
     const { theme } = useContext(ThemeContext);
     const [taxis, setTaxis] = useState([]);
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [newTaxi, setNewTaxi] = useState({ driverName: '', vehicleNumber: '', destination: '' });
     const [editingTaxi, setEditingTaxi] = useState(null); // Track taxi being edited
     const [showPopup, setShowPopup] = useState(false); // State for popup

     useEffect(() => {
       const fetchTaxis = async () => {
         try {
           const querySnapshot = await getDocs(collection(db, 'dispatchedTaxis'));
           const data = querySnapshot.docs.map(doc => {
             const taxiData = doc.data();
             return {
               id: doc.id,
               ...taxiData,
               dispatchTime: taxiData.dispatchTime && taxiData.dispatchTime.toDate 
                 ? taxiData.dispatchTime.toDate().toLocaleString() 
                 : 'N/A'
             };
           });
           setTaxis(data);
         } catch (error) {
           console.error("Error fetching dispatched taxis:", error);
         }
       };

       fetchTaxis();
     }, []);

     const handleAddTaxi = async () => {
       if (newTaxi.driverName && newTaxi.vehicleNumber && newTaxi.destination) {
         try {
           const taxiData = {
             ...newTaxi,
             dispatchTime: serverTimestamp(),
           };
           const docRef = await addDoc(collection(db, 'dispatchedTaxis'), taxiData);
           setTaxis([...taxis, { id: docRef.id, ...taxiData, dispatchTime: new Date().toLocaleString() }]);
           setNewTaxi({ driverName: '', vehicleNumber: '', destination: '' });
           setIsModalOpen(false);
           setShowPopup(true); // Show popup after successful dispatch
           setTimeout(() => setShowPopup(false), 5000); // Hide after 5 seconds
         } catch (error) {
           console.error("Error adding taxi:", error);
           alert("Failed to dispatch taxi.");
         }
       }
     };

     const handleEditTaxi = (taxi) => {
       setEditingTaxi(taxi);
       setNewTaxi({
         driverName: taxi.driverName,
         vehicleNumber: taxi.vehicleNumber,
         destination: taxi.destination
       });
       setIsModalOpen(true);
     };

     const handleUpdateTaxi = async () => {
       if (newTaxi.driverName && newTaxi.vehicleNumber && newTaxi.destination) {
         try {
           const taxiRef = doc(db, 'dispatchedTaxis', editingTaxi.id);
           const taxiData = {
             ...newTaxi,
             dispatchTime: serverTimestamp(),
           };
           await updateDoc(taxiRef, taxiData);
           setTaxis(taxis.map(t => 
             t.id === editingTaxi.id 
               ? { ...taxiData, id: editingTaxi.id, dispatchTime: new Date().toLocaleString() } 
               : t
           ));
           setNewTaxi({ driverName: '', vehicleNumber: '', destination: '' });
           setEditingTaxi(null);
           setIsModalOpen(false);
           setShowPopup(true); // Show popup after successful update
           setTimeout(() => setShowPopup(false), 5000); // Hide after 5 seconds
         } catch (error) {
           console.error("Error updating taxi:", error);
           alert("Failed to update taxi.");
         }
       }
     };

     return (
       <div className={`flex min-h-screen ${theme === 'light' ? 'bg-gradient-to-b from-gray-50 to-gray-100' : 'bg-gradient-to-b from-gray-800 to-gray-900'}`}>
         <HomeNav />
         <div className="flex-1 md:ml-64 p-4 sm:p-6 lg:p-8 mt-6">
           <h1 className={`text-2xl sm:text-3xl font-extrabold ${theme === 'light' ? 'text-gray-800' : 'text-white'} mb-6 tracking-tight`}>
             Dispatched Taxis
           </h1>

           <div className="mb-8">
             <button
               onClick={() => {
                 setEditingTaxi(null);
                 setNewTaxi({ driverName: '', vehicleNumber: '', destination: '' });
                 setIsModalOpen(true);
               }}
               className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105 transition-transform duration-200 text-sm sm:text-base"
             >
               Dispatch New Taxi
             </button>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
             {taxis.length === 0 ? (
               <div className={`col-span-full text-center py-12 ${theme === 'light' ? 'bg-white' : 'bg-gray-700'} rounded-lg shadow-md`}>
                 <p className={`text-lg ${theme === 'light' ? 'text-gray-500' : 'text-gray-200'}`}>No taxis dispatched. Dispatch a taxi to get started!</p>
               </div>
             ) : (
               taxis.map((taxi) => (
                 <div
                   key={taxi.id}
                   className={`${theme === 'light' ? 'bg-white' : 'bg-gray-700'} rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200`}
                 >
                   <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'} mb-2`}>{taxi.driverName}</h3>
                   <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-200'}`}>
                     <span className="font-medium">Number plate:</span> {taxi.vehicleNumber}
                   </p>
                   <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-200'}`}>
                     <span className="font-medium">Destination:</span> {taxi.destination}
                   </p>
                   <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-200'}`}>
                     <span className="font-medium">Dispatch Time:</span> {taxi.dispatchTime}
                   </p>
                   <button
                     onClick={() => handleEditTaxi(taxi)}
                     className={`mt-4 px-4 py-2 bg-yellow-500 text-white rounded-md font-semibold hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm transform hover:scale-105 transition-transform duration-200`}
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
                   {editingTaxi ? 'Edit Taxi' : 'Dispatch New Taxi'}
                 </h2>
                 <div className="space-y-4">
                   <div>
                     <label htmlFor="driverName" className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
                       Driver Name
                     </label>
                     <input
                       id="driverName"
                       type="text"
                       value={newTaxi.driverName}
                       onChange={(e) => setNewTaxi({ ...newTaxi, driverName: e.target.value })}
                       required
                       className={`mt-1 w-full px-3 py-2 border ${theme === 'light' ? 'border-gray-300' : 'border-gray-500'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-600 text-white'} text-sm`}
                       placeholder="Enter driver name"
                     />
                   </div>
                   <div>
                     <label htmlFor="vehicleNumber" className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
                       Number Plate
                     </label>
                     <input
                       id="vehicleNumber"
                       type="text"
                       value={newTaxi.vehicleNumber}
                       onChange={(e) => setNewTaxi({ ...newTaxi, vehicleNumber: e.target.value })}
                       required
                       className={`mt-1 w-full px-3 py-2 border ${theme === 'light' ? 'border-gray-300' : 'border-gray-500'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-600 text-white'} text-sm`}
                       placeholder="Enter vehicle number"
                     />
                   </div>
                   <div>
                     <label htmlFor="destination" className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
                       Destination
                     </label>
                     <input
                       id="destination"
                       type="text"
                       value={newTaxi.destination}
                       onChange={(e) => setNewTaxi({ ...newTaxi, destination: e.target.value })}
                       required
                       className={`mt-1 w-full px-3 py-2 border ${theme === 'light' ? 'border-gray-300' : 'border-gray-500'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-600 text-white'} text-sm`}
                       placeholder="Enter destination"
                     />
                   </div>
                   <div className="flex justify-end space-x-3">
                     <button
                       onClick={() => {
                         setNewTaxi({ driverName: '', vehicleNumber: '', destination: '' });
                         setEditingTaxi(null);
                         setIsModalOpen(false);
                       }}
                       className={`px-4 py-2 ${theme === 'light' ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-200 hover:bg-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm`}
                     >
                       Cancel
                     </button>
                     <button
                       onClick={editingTaxi ? handleUpdateTaxi : handleAddTaxi}
                       className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm transform hover:scale-105 transition-transform duration-200"
                     >
                       {editingTaxi ? 'Update Taxi' : 'Dispatch Taxi'}
                     </button>
                   </div>
                 </div>
               </div>
             </div>
           )}

           {showPopup && (
             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
               <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-700'} p-6 rounded-lg shadow-xl max-w-sm w-full transform transition-all duration-300 scale-95 animate-in`}>
                 <p className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'} text-center`}>
                   Waiting for the driver to accept dispatch
                 </p>
               </div>
             </div>
           )}
         </div>
       </div>
     );
   };

   export default DispatchedTaxis;