import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { db } from '../firebase/firebase.js';

const uploadImage = async (file) => {
  // Obtener una referencia al almacenamiento de Firebase
  const storageFB = getStorage();
  // Generar un nombre de archivo único
  const dateTime = Date.now();
  const fileName = `images/${dateTime}`;

  // Obtener una referencia al archivo en el almacenamiento de Firebase
  const storageRef = ref(storageFB, fileName);

  // Subir la imagen al almacenamiento de Firebase
  const metadata = {
    contentType: file.mimetype,
  };
  await uploadBytesResumable(storageRef, file.buffer, metadata);

  // Obtener la URL de descarga de la imagen
  const downloadURL = await getDownloadURL(storageRef);

  return downloadURL;
};

export { uploadImage };
