// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAc6JD5lqMa97BrJX-RypEyBWRXXJfZ8t4",
    authDomain: "npost-e95cf.firebaseapp.com",
    projectId: "npost-e95cf",
    storageBucket: "npost-e95cf.appspot.com",
    messagingSenderId: "278948110221",
    appId: "1:278948110221:web:5580d4c5a6d22fa76c67c4"
};

// const messaging = getMessaging(app);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
