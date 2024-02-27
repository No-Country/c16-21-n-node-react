import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // Importa la función getFirestore

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGESENDERID,
  appId: process.env.FIREBASE_APPID,
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Obtiene una instancia de Firestore
const db = getFirestore(app);

export { db };
