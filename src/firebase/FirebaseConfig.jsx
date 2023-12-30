// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAtbSc-xEBYmgR6aKFpbEB0vse8Tz1-mi4",
  authDomain: "myfirstapp-50006.firebaseapp.com",
  projectId: "myfirstapp-50006",
  storageBucket: "myfirstapp-50006.appspot.com",
  messagingSenderId: "14695473734",
  appId: "1:14695473734:web:a5e5ff2ed9c3693b73a047"
};


const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export {fireDB,auth}

