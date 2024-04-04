// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDH1ezjJlIBLsUAoeaAO1CpKwnA8WSIls",
  authDomain: "music-db-4f97f.firebaseapp.com",
  projectId: "music-db-4f97f",
  storageBucket: "music-db-4f97f.appspot.com",
  messagingSenderId: "455545787635",
  appId: "1:455545787635:web:0846148fedc7ad638b1386",
  measurementId: "G-2NK8PK45GD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);