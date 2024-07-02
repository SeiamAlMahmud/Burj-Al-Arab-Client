// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWZuXisuUjwTYGlR9TeaAW41qKPqTPh5o",
  authDomain: "burj-al-arab-a8a17.firebaseapp.com",
  projectId: "burj-al-arab-a8a17",
  storageBucket: "burj-al-arab-a8a17.appspot.com",
  messagingSenderId: "929010805964",
  appId: "1:929010805964:web:87b340260fb3acaa1e6669"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();