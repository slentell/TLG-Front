import React, { useState, useEffect, createContext, useContext } from "react";

const axios = require("axios");
const ImageContext = createContext({});

export const useImages = () => useContext(ImageContext);

export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState([]);

  const imageCalls = async (method, endpoint = "", dataPayload = null) => {
    try {
      const payload = {
        method: method,
        headers: {
          authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };
      payload.url = endpoint
        ? `${process.env.REACT_APP_API_URL}/tlg/image-gallery/${endpoint}`
        : `${process.env.REACT_APP_API_URL}/tlg/image-gallery/`;
      if (dataPayload) {
        payload.data = dataPayload;
      }
      const { data } = await axios(payload);
      return data;
    } catch (error) {
      console.error(`Error ${method} call for Images`, error.message);
    } // end of catch
  } // end of imageCalls

  const handleImageSubmit = async (imageData) => {
    try {
      const data = await imageCalls("post", "", imageData);
      console.log(data);
      await getAllImages();
    } catch (e) {
      console.log("There's an error", e);
    }
  
  } // end of handleImageSubmit

  const getAllImages = async () => {
    try {
      const response = await imageCalls("get");
      if (response.length !== images.length) {
        console.log("trying to do this shit right now")
        setImages(response);
      }
    } catch (error) {
      console.error("Error fetching api data", error);
    }
  } // end of getAllImages

  const deleteImage = async (id) => {
    try {
      const data = await imageCalls("delete", id);
      console.log(data);
      await getAllImages();
    } catch (e) {
      console.log("There's an error", e);
    }
  } // end of deleteImage



  useEffect(() => {
    getAllImages();
  }
  , []);

  return (
    <ImageContext.Provider
      value={{
        images,
        setImages,
        handleImageSubmit,
        deleteImage,
       
      }}
    >
      {children}
    </ImageContext.Provider>
  );
} // end of ImageProvider