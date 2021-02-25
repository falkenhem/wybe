import * as firebase from "firebase";

// Optionally import the services that you want to use
//import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
//import "firebase/functions";
import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAi0c7VmKtroRg_lGUeSTH8C7o8Al_Ca_I",
  authDomain: "simplechat-d02bf.firebaseapp.com",
  databaseURL:
    "https://simplechat-d02bf-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "simplechat-d02bf",
  storageBucket: "simplechat-d02bf.appspot.com",
  messagingSenderId: "sender-id",
  appId: "1:159935117174:web:e370c9279a2d71de5f2c57",
  measurementId: "G-measurement-id",
};

firebase.initializeApp(firebaseConfig);

export default firebaseConfig;
