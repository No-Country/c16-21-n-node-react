<<<<<<< HEAD
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // Importa la función getFirestore

// Tu configuración de Firebase
=======
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
>>>>>>> 0718d42 (firebase added)
const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGESENDERID,
  appId: process.env.FIREBASE_APPID,
};

<<<<<<< HEAD
// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Obtiene una instancia de Firestore
const db = getFirestore(app);

export { db };
=======
// Initialize Firebase
const app = initializeApp(firebaseConfig);
>>>>>>> 0718d42 (firebase added)
