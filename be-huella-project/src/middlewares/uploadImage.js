import { addUserIDToFileName } from '../middlewares/multer.js';
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage';

const uploadImage = async (file, quantity) => {
  const storageFB = getStorage();

  await signInWithEmailAndPassword(
    auth,
    process.env.FIREBASE_USER,
    process.env.FIREBASE_AUTH
  );

  if (quantity === 'single') {
    const fileName = addUserIDToFileName();
    const storageRef = ref(storageFB, fileName);
    const metadata = {
      contentType: file.type,
    };
    await uploadBytesResumable(storageRef, file.buffer, metadata);
    return fileName;
  }
};

export { uploadImage };
