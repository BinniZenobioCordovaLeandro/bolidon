import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { FirebaseOptions, initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";


const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyCLz3T1RBCnH6Eo9PxxcmqS0qpkoWOspwQ",
  authDomain: "https://accounts.google.com/o/oauth2/auth",
  databaseURL: 'https://bolidon.firebaseio.com',
  projectId: "bolidon",
  storageBucket: "bolidon.appspot.com",
  messagingSenderId: "",
  appId: "108170554948266129288",
  measurementId: 'G-measurement-id',
}

export const initFirebaseApp = () => {
  const app = initializeApp(firebaseConfig)
  initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
};