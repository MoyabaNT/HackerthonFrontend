import React, { useState } from 'react';
     import { Link, useNavigate } from 'react-router-dom';
     import { auth } from '../Firebase';
     import { signInWithEmailAndPassword } from 'firebase/auth';
     import axios from 'axios';

     const LogIn = () => {
       const [email, setEmail] = useState('');
       const [password, setPassword] = useState('');
       const navigate = useNavigate();

       const handleLogin = async () => {
         try {
           // Authenticate user using Firebase Auth
           const userCredential = await signInWithEmailAndPassword(auth, email, password);
           const user = userCredential.user;

           // Check if user exists in Firestore via the backend
           const response = await axios.get(`https://hackerthon-backend.vercel.app/api/marshalls/${user.uid}`);
           if (response.data.exists) {
             navigate('/DashBoard');
           } else {
             alert('User authenticated but not found in Firestore.');
           }
         } catch (error) {
           console.error('Login error:', error.message);
           alert('Login failed: ' + error.message);
         }
       };

       return (
         <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
           <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
             <div className="text-center">
               <h2 className="text-3xl font-bold text-blue-600 mb-2">Farfare</h2>
               <p className="text-gray-600 mb-6">Log in to manage passenger records</p>
             </div>
             <div className="space-y-6">
               <div>
                 <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                   Email
                 </label>
                 <input
                   id="email"
                   type="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   required
                   className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                   placeholder="Enter your email"
                 />
               </div>
               <div>
                 <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                   Password
                 </label>
                 <input
                   id="password"
                   type="password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   required
                   className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                   placeholder="Enter your password"
                 />
               </div>
               <div>
                 <button
                   onClick={handleLogin}
                   className="w-full bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                 >
                   Log In
                 </button>
               </div>
               <div className="text-center text-sm">
                 <p className="text-gray-600">
                   Don't have an account?{' '}
                   <Link to="/SignUp" className="text-blue-600 hover:underline">
                     Sign Up
                   </Link>
                 </p>
               </div>
             </div>
           </div>
         </div>
       );
     };

     export default LogIn;