import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';  // Firebase Auth
import { getFirestore } from 'firebase/firestore'; // Import Firestore
import { getAnalytics } from 'firebase/analytics';  // Optional for analytics

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVWYgicyX50UFXj_Q6wesr2DZam19t0PE",
  authDomain: "fixmate-7bac2.firebaseapp.com",
  projectId: "fixmate-7bac2",
  storageBucket: "fixmate-7bac2.firebasestorage.app",
  messagingSenderId: "903251091878",
  appId: "1:903251091878:web:5325563c3017392bed6f67",
  measurementId: "G-M4EP4KNCZG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // Initialize Firebase Auth
const db = getFirestore(app);  // Initialize Firestore

// Optional: Initialize Firebase Analytics (for tracking usage)
const analytics = getAnalytics(app);

// Google authentication provider
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, db };  // Export Firestore
