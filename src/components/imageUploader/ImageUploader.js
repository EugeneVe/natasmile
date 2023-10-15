import React, { useRef, useEffect } from "react";
import { useImage } from "../../Contexts/ImageUplodedContext";
import { useAuth } from "../../Contexts/AuthUserContext";
import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
  getMetadata,
} from "firebase/storage";
import { imageDb } from "../../Firebase";
import "./imageUploader.scss";

const ImageUploader = () => {
  const { imageUpload, setImageUpload, imageData, setImageData } = useImage();
  const { authUser } = useAuth();
  const fileInputRef = useRef(null);
  const imagesListRef = ref(imageDb, "images/");

  const uploadFile = () => {
    if (imageUpload) {
      const specificName = "avarar.jpg"; // Replace with desired name
      const imageRef = ref(imageDb, `images/${specificName}`);
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageData([
            { url, timestamp: new Date().getTime() },
            ...imageData,
          ]);
          fileInputRef.current.value = "";
        });
        window.location.reload();
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

  return (
    <>
      {authUser ? (
        <div className="image-uploader-wrapper">
          <div className="upload">
            <p>Just select a picture from your device</p>
            <br />
            <label>
              Select a file: {imageUpload?.name}
              <input
                type="file"
                ref={fileInputRef}
                multiple
                onChange={(e) => setImageUpload(e.target.files[0])}
              />
            </label>

            <div className="upload-image-button" onClick={uploadFile}>
              Set Avatar
            </div>
          </div>{" "}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ImageUploader;
