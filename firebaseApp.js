// firebaseApp.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
// (voit tuoda myös muita Firebase-palveluita tarpeen mukaan, esim getStorage yms.)


const firebaseConfig = {
  apiKey: "AIzaSyBFPzcmxBpZJ_O8tWVsW3GN8V5UjNAJgAc",
  authDomain: "tiksihehku.firebaseapp.com",
  projectId: "tiksihehku",
  storageBucket: "tiksihehku.appspot.com",
  messagingSenderId: "141285539616",
  appId: "1:141285539616:web:ed42f9adb41a6b27b9e145"
}

// Alusta Firebase App (jos ei jo alustettu)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Alusta Firebase Auth moduuli AsyncStorage-persistenssillä (Expo/Hermes)
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Alusta Firestore (esimerkkinä, tämä latautuu normaalisti)
export const db = getFirestore(app);

// (Tarvittaessa voit alustaa muita palveluita, esim. export const storage = getStorage(app); )