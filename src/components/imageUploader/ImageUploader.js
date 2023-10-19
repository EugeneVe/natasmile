import React, { useRef, useEffect, useState } from "react";
import { useImage } from "../../Contexts/ImageUplodedContext";
import { useAuth } from "../../Contexts/AuthUserContext";
import { ReactComponent as AddImage } from "../../assests/icons/addImg.svg";
import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
  getMetadata,
  deleteObject,
} from "firebase/storage";
import { imageDb } from "../../Firebase";
import "./imageUploader.scss";

const ImageUploader = () => {
  const [loading, setLoading] = useState(false); // Add loading state
  const { imageUpload, setImageUpload, imageData, setImageData } = useImage();
  const { authUser } = useAuth();
  const fileInputRef = useRef(null);
  const imagesListRef = ref(imageDb, "images/");

  const uploadFile = () => {
    if (imageUpload) {
      const specificName = "avatar.jpg"; // Replace with the desired name
      const imageRef = ref(imageDb, `images/${specificName}`);
      setLoading(true); // Set loading state to true

      uploadBytes(imageRef, imageUpload)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            setImageData([
              { url, timestamp: new Date().getTime() },
              ...imageData,
            ]);
            fileInputRef.current.value = "";
            setLoading(false); // Set loading state to false after upload
          });
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error uploading image: ", error);
          setLoading(false); // Set loading state to false in case of an error
        });
    }
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      Promise.all(
        response.items.map((item) =>
          Promise.all([getDownloadURL(item), getMetadata(item)])
        )
      ).then((results) => {
        const imageDataArray = results.map(([url, metadata]) => ({
          url,
          timestamp: new Date(metadata.timeCreated).getTime(),
        }));
        setImageData(imageDataArray);
      });
    });
  }, []);

  const deleteImage = (imageUrl) => {
    const imageRef = ref(imageDb, imageUrl);
    deleteObject(imageRef)
      .then(() => {
        setImageData(imageData.filter((data) => data.url !== imageUrl));
      })
      .catch((error) => {
        console.error("Error deleting image: ", error);
      });
  };

  return (
    <>
      {authUser ? (
        <div className="image-uploader-wrapper">
          {imageData.length !== 0 ? (
            <>
              {imageData.map(({ url, timestamp }) => (
                <div className="avatar-content" key={timestamp}>
                  <img className="uploaded-avatar" src={url} alt={timestamp} />
                  {authUser && (
                    <div
                      className="remove-avatar"
                      onClick={() => deleteImage(url)}
                    >
                      Delete
                    </div>
                  )}
                </div>
              ))}
            </>
          ) : (
            <div className="logo" />
          )}

          <div className="upload">
            <p>Just select a picture from your device</p>
            <br />
            <label title={imageUpload?.name}>
              <AddImage />
              <p>Select a file:</p>
              <div className="image-name">{imageUpload?.name}</div>
              <input
                type="file"
                ref={fileInputRef}
                multiple
                onChange={(e) => setImageUpload(e.target.files[0])}
              />
            </label>
            {loading ? (
              <div className="loader">IMAGE IS LOADING...</div>
            ) : (
              <div className="upload-image-button" onClick={uploadFile}>
                Set Avatar
              </div>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ImageUploader;
