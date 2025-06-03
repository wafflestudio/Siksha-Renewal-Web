// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2Ai5OPib8NBdaEv7wf86PIjKw7XmKeh0",
  authDomain: "throwaway-d58de.firebaseapp.com",
  projectId: "throwaway-d58de",
  storageBucket: "throwaway-d58de.firebasestorage.app",
  messagingSenderId: "865764669353",
  appId: "1:865764669353:web:25b2832a66b6a6aa0336b8",
  measurementId: "G-RZFG8LL2K2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);