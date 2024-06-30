// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClX4oSPUeiqco9E6YFdIegIXmBf1Eth4k",
  authDomain: "harshalhousing.firebaseapp.com",
  projectId: "harshalhousing",
  storageBucket: "harshalhousing.appspot.com",
  messagingSenderId: "963195131009",
  appId: "1:963195131009:web:727d137ecb40eaac056980"
};

// Initialize Firebase
export const Firebase_app = initializeApp(firebaseConfig);
export const Firebase_auth = getAuth(Firebase_app);
export const Firebase_store = getFirestore(Firebase_app);
export const Firebase_storage = getStorage(Firebase_app);
export const storageRef = ref(Firebase_storage);


