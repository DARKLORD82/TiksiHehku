import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyBFPzcmxBpZJ_O8tWVsW3GN8V5UjNAJgAc",
  authDomain: "tiksihehku.firebaseapp.com",
  projectId: "tiksihehku",
  storageBucket: "tiksihehku.appspot.com",
  messagingSenderId: "141285539616",
  appId: "1:141285539616:web:ed42f9adb41a6b27b9e145"
 };


export default firebaseConfig;
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

