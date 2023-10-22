import React, { useState, useEffect } from "react";
import { useUserData } from "../../Contexts/UserDataContext";
import {
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";

import "./UserData.scss";

const UserData = () => {
  const { fetchData, setFetchData, dbref } = useUserData();
  const [input, setInput] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    // Add a Firebase Firestore data listener to update fetchData
    const unsubscribe = onSnapshot(dbref, (querySnapshot) => {
      const updatedData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFetchData(updatedData);
    });

    // Clear the listener when unmounting a component
    return () => {
      unsubscribe();
    };
  }, [dbref, setFetchData]);

  const add = async () => {
    const addData = await addDoc(dbref, {
      Name: name,
      Description: description,
    });
  };

  const passData = async (id) => {
    const matchId = fetchData.find((data) => {
      return data.id === id;
    });
    setName(matchId.Name);
    setDescription(matchId.Description);
    setId(matchId.id);
  };

  const update = async () => {
    const updateRef = doc(dbref, id);
    const updateData = await updateDoc(updateRef, {
      Name: name,
      Description: description,
    });
  };

  const del = async (id) => {
    const delRef = doc(dbref, id);
    await deleteDoc(delRef)
      .then(() => {
        setName("");
        setDescription("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="user-data-wrapper">
      {input || !fetchData[0]?.id ? (
        <>
          <div className="user-data-label">Enter your Data:</div>
          <input
            type="text"
            placeholder="Full Name"
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            type="text"
            placeholder="Short description"
            autoComplete="off"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </>
      ) : (
        <></>
      )}
      {!fetchData[0]?.id ? (
        <button className="user-data-button" onClick={add}>
          Add
        </button>
      ) : (
        <></>
      )}
      {input ? (
        <button
          className="user-data-button"
          onClick={() => {
            update();
            setInput(false);
          }}
        >
          Update
        </button>
      ) : (
        <></>
      )}
      <div className="user-data-container">
        {fetchData[0]?.id ? (
          <>
            <div className="user-data-content">
              <p>
                Name: <span>{fetchData[0]?.Name}</span>
              </p>
              <p>
                Description: <br />
                <span>{fetchData[0]?.Description}</span>
              </p>
            </div>
            <div className="user-data-buttons">
              <button
                className="user-data-button"
                onClick={() => {
                  passData(fetchData[0]?.id);
                  setInput(true);
                }}
              >
                Update
              </button>
              <button
                className="user-data-button alert"
                onClick={() => {
                  del(fetchData[0]?.id);
                  setInput(false);
                }}
              >
                Delete
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default UserData;
