
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyCTHD04MU0vreDbYFAdv7vzXMcDO186JfE",
    authDomain: "foto-app-394208.firebaseapp.com",
    projectId: "foto-app-394208",
    storageBucket: "foto-app-394208.appspot.com",
    messagingSenderId: "1068055364293",
    appId: "1:1068055364293:web:8c31f2f7b406e45160a6ac",
    measurementId: "G-YLDHGVF2RW",
    cookieDomain: "auto"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
    .then((result) => {
        const name = result.user.displayName;
        const email = result.user.email;
        const profilePic = result.user.photoURL;

        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("profilePic", profilePic);
    })
    .catch((error) => {
        console.log(error);
    })
};

export const db = getFirestore(app);
export const storage = getStorage(app);
