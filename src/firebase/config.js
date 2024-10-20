// Import the functions you need from the SDKs you need
import { initializeApp  } from "firebase/app";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnfwJaE2vK6WCK7gdRrB-vsihIBh4VMNY",
  authDomain: "react18-l2.firebaseapp.com",
  projectId: "react18-l2",
  storageBucket: "react18-l2.appspot.com",
  messagingSenderId: "718271677098",
  appId: "1:718271677098:web:4dd8e5a38d071f665486d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
