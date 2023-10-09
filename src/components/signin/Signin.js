import React, { useState, useEffect, useRef } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase";
import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
  deleteObject,
  getMetadata,
} from "firebase/storage";
import { imageDb } from "../../Firebase";
import { v4 } from "uuid";
import "./Signin.scss";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authUser, setAuthUser] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageData, setImageData] = useState([]);
  const [modal, setModal] = useState(false);
  const fileInputRef = useRef(null);

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);
  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const imagesListRef = ref(imageDb, "images/");
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(imageDb, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        const timestamp = new Date().getTime();
        setImageData((prev) => [...prev, { url, timestamp }]);

        // Reset the file input by clearing its value
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      });
    });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      const promises = response.items.map((item) => {
        return getDownloadURL(item).then((url) => {
          return getMetadata(item).then((metadata) => {
            const timestamp = new Date(metadata.timeCreated).getTime();
            return { url, timestamp };
          });
        });
      });

      Promise.all(promises).then((imageDataArray) => {
        // Sort the images by timestamp in descending order (most recent first)
        imageDataArray.sort((a, b) => b.timestamp - a.timestamp);
        setImageData(imageDataArray);
      });
    });
  }, []);

  // Function to delete an image
  const deleteImage = (imageUrl) => {
    // Create a reference to the image
    const imageRef = ref(imageDb, imageUrl);

    // Delete the image from Firebase Storage
    deleteObject(imageRef)
      .then(() => {
        // Remove the deleted image from imageData state
        setImageData((prev) => prev.filter((data) => data.url !== imageUrl));
        // Close the modal if the deleted image was open
      })
      .catch((error) => {
        console.error("Error deleting image: ", error);
      });
  };

  return (
    <>
      <div className="open-modal-login" onClick={() => setModal(!modal)}>
        ☰
      </div>
      {modal ? (
        <div className="signin-wrapper">
          <div>Log In</div>
          <form onSubmit={signIn}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!authUser ? (
              <button type="submit" className="login-button">
                Signin
              </button>
            ) : (
              <></>
            )}
          </form>
          <div>
            {authUser ? (
              <div className="sing-out-button" onClick={userSignOut}>
                Sign Out
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="image-wrapper">
        <div className="upload-image">
          {imageData.map(({ url, timestamp }) => (
            <div className="image-content" key={timestamp}>
              <img className="uploaded-img" src={url} alt={timestamp} />
              {authUser ? (
                <div className="remove-image" onClick={() => deleteImage(url)}>
                  Delete
                </div>
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
        {authUser ? (
          <div className="upload">
            <input
              type="file"
              ref={fileInputRef} // Attach the ref to the file input element
              multiple
              onChange={(e) => {
                setImageUpload(e.target.files[0]);
              }}
            />
            <div className="upload-image-button" onClick={uploadFile}>
              Upload Image
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default SignIn;
