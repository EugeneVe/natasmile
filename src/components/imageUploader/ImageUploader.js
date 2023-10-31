import React, { useRef, useEffect, useState } from "react";
import { useImage } from "../../Contexts/ImageUplodedContext";
import { useAuth } from "../../Contexts/AuthUserContext";
import { ReactComponent as AddImage } from "../../assests/icons/addImg.svg";
import Modal from "../modal/Modal";
import Tooltip from "@mui/material/Tooltip";
import AddNewButton from "../addNewButton/AddNewButton";
import UserData from "../userData/UserData";
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
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState("");
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
            setImageUpload("");
            setLoading(false); // Set loading state to false after upload
          });
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
              <div className="avatar-content">
                <img
                  className="uploaded-avatar"
                  src={imageData[0].url}
                  alt={imageData[0].timestamp}
                />
                {authUser && (
                  <div className="remove-avatar" onClick={() => setModal(true)}>
                    Delete
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {!imageUpload ? (
                <div className="logo" />
              ) : (
                <img
                  className="uploaded-avatar"
                  src={URL.createObjectURL(imageUpload)}
                  alt=""
                />
              )}
            </>
          )}
          <div className="upload">
            {!imageUpload?.name && <p>Select a picture from your device</p>}
            <br />
            <label>
              <AddImage />
              {imageUpload ? (
                <Tooltip
                  arrow
                  title={
                    <div className="image-to-be-upload">
                      <img src={URL.createObjectURL(imageUpload)} alt="" />
                      <br />
                      {imageUpload?.name}
                    </div>
                  }
                >
                  {!imageUpload ? (
                    <></>
                  ) : (
                    <div className="image-name">{imageUpload?.name}</div>
                  )}
                </Tooltip>
              ) : (
                <p>Select your image:</p>
              )}
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
              <>
                {imageUpload ? (
                  <div className="upload-image-button" onClick={uploadFile}>
                    Save avatar
                  </div>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
          <UserData />
          <AddNewButton />
          {modal && (
            <Modal>
              <>
                <p>Are you sure you want to remove image?</p>
                <div className="user-data-buttons">
                  <button
                    className="user-data-button alert"
                    onClick={() => {
                      deleteImage(imageData[0].url);
                      setModal(false);
                    }}
                  >
                    YES
                  </button>
                  <button
                    className="user-data-button"
                    onClick={() => {
                      setModal(false);
                    }}
                  >
                    NO
                  </button>
                </div>
              </>
            </Modal>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ImageUploader;
