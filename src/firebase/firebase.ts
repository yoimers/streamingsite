import { initializeApp } from "firebase/app";
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Get a list of cities from your database
async function getCities(db: Firestore) {
  const citiesCol = collection(db, "cities");
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map((doc) => doc.data());
  return cityList;
}
