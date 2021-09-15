import { initializeApp } from "firebase/app";
import firebase from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  Firestore,
} from "firebase/firestore/lite";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDON-C6NdvL2tjBpaIpJjHomyUfag6t-uQ",
  authDomain: "wavelet-f30ce.firebaseapp.com",
  projectId: "wavelet-f30ce",
  storageBucket: "wavelet-f30ce.appspot.com",
  messagingSenderId: "318251867890",
  appId: "1:318251867890:web:b669f31dd06f32ad9c7a6b",
  measurementId: "G-YCE53QHGT3",
};

// Initialize Firebase
if (!firebase.apps.length) {
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);
}
