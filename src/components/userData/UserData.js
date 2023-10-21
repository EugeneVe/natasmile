import React, { useState } from "react";
import { useUserData } from "../../Contexts/UserDataContext";
import { doc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import "./UserData.scss";

const UserData = () => {
  const { fetchData, setFetchData, dbref } = useUserData();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");

  const add = async () => {
    const addData = await addDoc(dbref, {
      Name: name,
      Description: description,
    });
    window.location.reload();
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
    window.location.reload();
  };

  const del = async (id) => {
    const delRef = doc(dbref, id);
    try {
      await deleteDoc(delRef);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="user-data-wrapper">
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
      {!fetchData[0]?.id ? (
        <button className="user-data-button" onClick={add}>
          Add
        </button>
      ) : (
        <></>
      )}
      {id ? (
        <button className="user-data-button" onClick={update}>
          Update
        </button>
      ) : (
        <></>
      )}
      <div className="user-data-container">
        {fetchData[0]?.id ? (
          <>
            <div className="user-data-content">
              <p>Name: {fetchData[0]?.Name}</p>
              <p>Description: {fetchData[0]?.Description}</p>
            </div>
            <div className="user-data-buttons">
              <button
                className="user-data-button"
                onClick={() => passData(fetchData[0]?.id)}
              >
                Update
              </button>
              <button
                className="user-data-button alert"
                onClick={() => del(fetchData[0]?.id)}
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
