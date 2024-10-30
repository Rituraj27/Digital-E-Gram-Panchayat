// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5Lmj5VRRNfTZJd9PmqlszeU14oO2ibeI",
  authDomain: "digital-gram-swaraj.firebaseapp.com",
  projectId: "digital-gram-swaraj",
  storageBucket: "digital-gram-swaraj.appspot.com",
  messagingSenderId: "479131964308",
  appId: "1:479131964308:web:1115a640810fb1e1577581",
  measurementId: "G-Z55RMSBQD7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);