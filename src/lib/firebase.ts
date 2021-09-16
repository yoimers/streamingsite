import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BAKET,
  appID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
}
const provider = new firebase.auth.GoogleAuthProvider();

export const auth = firebase.auth();
export const signInWithGoogle = () => {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((res) => console.log(res))
    .catch((error) => console.log(error.message));
};
export const signOutWithGoogle = () => {
  firebase
    .auth()
    .signOut()
    .then((res) => console.log(res))
    .catch((error) => console.log(error.message));
};
export const createUserWithEmailAndPassword = (
  email: string,
  password: string
) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log(userCredential);
    })
    .catch((error) => {
      console.log(error);
    });
};
