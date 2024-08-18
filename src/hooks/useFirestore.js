
import { orderBy, collection, query, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config"; 
const useFirestore = (collectionName) => {
  const [docs, setDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let unsubscribe;
    const getData = async () => {
      try {
        const q = query(collection(db, collectionName), orderBy("createdAt", "desc"));
        unsubscribe = onSnapshot(q, (querySnapshot) => {
          const images = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            images.push({
              id: doc.id, 
              imageUrl: data.imageUrl,
              title: data.title, 
              description: data.description, 
              createdAt: data.createdAt.toDate(),
              userEmail: data.userEmail
            });
          });
          setDocs(images);
          setIsLoading(false);
        });
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    getData();

    return () => unsubscribe && unsubscribe();
  }, [collectionName]);

  return { docs, isLoading };
};

export default useFirestore;
