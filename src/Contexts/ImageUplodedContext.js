import React, { createContext, useState, useContext } from "react";

const ImageUplodedContext = createContext();

export function ImageUplodedProvider({ children }) {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageData, setImageData] = useState([]);

  return (
    <ImageUplodedContext.Provider
      value={{ imageUpload, setImageUpload, imageData, setImageData }}
    >
      {children}
    </ImageUplodedContext.Provider>
  );
}

export function useImage() {
  return useContext(ImageUplodedContext);
}
