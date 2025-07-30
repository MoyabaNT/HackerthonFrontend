// src/Firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB6oNiurFGAuQJogqYwL-ldxZbqvVdA40k',
  authDomain: 'farfare-387de.firebaseapp.com',
  projectId: 'farfare-387de',
  storageBucket: 'farfare-387de.firebasestorage.app',
  messagingSenderId: '198273860861',
  appId: '1:198273860861:web:fda1c9cf6d52059bf9ea94',
  measurementId: 'G-3DRXBDK8QV',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db }; // ✅ Make sure to export auth
