// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Analytics, getAnalytics, isSupported } from "firebase/analytics";
import { get } from "http";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDUzF-Vi8DN8CQ1saQvKD5jOtSNPJe6E0E",
  authDomain: "siksha-306012.firebaseapp.com",
  projectId: "siksha-306012",
  storageBucket: "siksha-306012.appspot.com",
  messagingSenderId: "503489745362",
  appId: "1:503489745362:web:c530753bcba91190d2780b",
  measurementId: "G-J3EFSHP43S",
};

export const app = initializeApp(firebaseConfig);

export let analytics: Analytics | null = null;

console.log("typeof window", typeof window);

if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
  console.log("analytics", analytics);
}