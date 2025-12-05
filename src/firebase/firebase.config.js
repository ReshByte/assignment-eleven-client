// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0S6oLcvUMFgzQA9wiPaC2T66JJI0LFxU",
  authDomain: "assignment-11-679ac.firebaseapp.com",
  projectId: "assignment-11-679ac",
  storageBucket: "assignment-11-679ac.firebasestorage.app",
  messagingSenderId: "731566055310",
  appId: "1:731566055310:web:a1f703564a562bf3984edf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);