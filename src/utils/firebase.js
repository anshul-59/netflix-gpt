// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACzeRBReTzcn7HTs72HEd6zRqpRO3HqNs",
  authDomain: "netflixgpt-8faa0.firebaseapp.com",
  projectId: "netflixgpt-8faa0",
  storageBucket: "netflixgpt-8faa0.appspot.com",
  messagingSenderId: "766388424791",
  appId: "1:766388424791:web:3876fa9fe828f145ad9312",
  measurementId: "G-XNGNGWBF1Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
