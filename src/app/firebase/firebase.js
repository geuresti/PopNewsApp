import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCooOS7GscCmyfDtZ0jumkm6VuuZUO5c0o",
    authDomain: "test-995ab.firebaseapp.com",
    projectId: "test-995ab",
    storageBucket: "test-995ab.firebasestorage.app",
    messagingSenderId: "1089639441652",
    appId: "1:1089639441652:web:03e6e35e0b0bb6b41f2aa1",
    measurementId: "G-RBTB6V8P3L"
};

export const app = initializeApp(firebaseConfig);

export const isAuthenticated = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    return user ? true : false;
};