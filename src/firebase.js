// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA-sq1FegItiMdHgaxcG_9pt36q2hkRf3Y',
  authDomain: 'streetfoodie-99a1e.firebaseapp.com',
  projectId: 'streetfoodie-99a1e',
  storageBucket: 'streetfoodie-99a1e.appspot.com',
  messagingSenderId: '449080975677',
  appId: '1:449080975677:web:7eee3e2236fc0bd6eae554',
  measurementId: 'G-SZELTPHHBC',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
