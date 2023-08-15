// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6jcpcbT5UB-SrUZ96xBe7Sn-jq8TReik",
  authDomain: "blog-roshak.firebaseapp.com",
  projectId: "blog-roshak",
  storageBucket: "blog-roshak.appspot.com",
  messagingSenderId: "1058964931580",
  appId: "1:1058964931580:web:99b9548c324221b778a879",
  measurementId: "G-H3PJF40B2R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const dataBase = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);
