
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase/config';
import './ImageDetails.css';

const ImageDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [image, setImage] = useState(location.state?.image || null); 

  useEffect(() => {
    if (!image) {
      const fetchImage = async () => {
        try {
          const docRef = doc(db, 'images', location.state.image.fileId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setImage(docSnap.data());
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchImage();
    }
  }, [image]);

  const handleBackClick = () => {
    navigate('/gallery'); // Navigating back to the gallery
  };

  return (
    <div className="image-details">
      {image ? (
        <>
          <img src={image.imageUrl} alt={image.title} className="full-size-image" />
          <h2>{image.title}</h2>
          <p>{image.description}</p>
          <p>Uploaded by: {image.userEmail}</p>
          <p>Created on: {new Date(image.createdAt.seconds * 1000).toLocaleDateString()}</p>
          <button onClick={handleBackClick} className="back-button">
            Back to Gallery
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ImageDetails;
