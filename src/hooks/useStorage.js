
import { useState } from "react";
import { db, storage } from "../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { addDoc, collection } from "firebase/firestore";
import { useAuth } from "./useAuth";

const useStorage = () => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const startUpload = async (file, title, description) => {
    if (!file) {
      console.error("No file provided");
      setError(new Error("No file provided"));
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      console.error("Unsupported file type or format");
      setError(new Error("Unsupported file type or format"));
      return;
    }

    const fileId = uuidv4();
    const formatFile = file.type.split('/')[1];

    const storageRef = ref(storage, `images/${fileId}.${formatFile}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      }, 
      (error) => {
        setError(error);
      }, 
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        await addDoc(collection(db, "images"), {
          imageUrl: downloadURL,
          title,
          description, 
          createdAt: new Date(),
          userEmail: user?.email,
          fileId 
        });

        return fileId; 
      });
  };

  return { progress, error, startUpload };
};

export default useStorage;
