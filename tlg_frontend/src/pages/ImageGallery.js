import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Container } from "@mui/system";
import { Button, Box } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";

const ImageGallery = () => {
  // TO DO :
  // make call to save selected images stored in imageGallery
  // make API call to get photos from backend, return a JSON object and save in imageGallery instead of itemData

  // view dummy images for now
  const itemData = [
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Lasha_Talakhadze_Rio_2016.jpg",
    },
    {
      img: "https://secure.img1-fg.wfcdn.com/im/26406397/resize-h445%5Ecompr-r85/1828/182899244/Charmander+Figure+Statue.jpg",
    },
    {
      img: "https://secure.img1-fg.wfcdn.com/im/36739748/resize-h800%5Ecompr-r85/1829/182901259/default_name.jpg",
    },
    {
      img: "https://secure.img1-fg.wfcdn.com/im/44879560/resize-h800-w800%5Ecompr-r85/1829/182901174/Pikachu+Figure+Statue.jpg",
    },
    {
      img: "https://i0.wp.com/post.greatist.com/wp-content/uploads/sites/2/2021/07/GRT-375873-Heres-How-to-Rack-Up-the-Right-Eating-Plan-As-a-Weight-Lifter_Header.jpg?w=1155&h=1528",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQd8476loJvJWJIvjptI6nvyE19mJ6qH2Ckw&usqp=CAU",
    },
  ];

  // state
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageGallery, setImageGallery] = useState(itemData);
  const [imageUrl, setImageUrl] = useState(null);

  // if selected image changes, create an object url for the selected image for image preview
  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  // upload an image
  const fileInput = () => {
    return (
      <div>
        <input
          accept="image/*"
          type="file"
          id="select-image"
          style={{ display: "none" }}
          onChange={(e) => setSelectedImage(e.target.files[0])}
        />
        <label htmlFor="select-image">
          <Button variant="contained" color="primary" component="span">
            Upload Image
          </Button>
        </label>
      </div>
    );
  };

  const previewPhoto = () => {
    return (
      <div>
        {imageUrl && selectedImage && (
          <Box mt={2} textAlign="center">
            <div>Image Preview:</div>
            <img src={imageUrl} alt={selectedImage.name} height="100px" />
          </Box>
        )}
      </div>
    );
  };

  return (
    <Container>
      {fileInput()}
      {previewPhoto()}
      <ImageList sx={{ width: 1100, height: 1000 }} cols={3} rowHeight={164}>
        {imageGallery.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  );
};

export default ImageGallery;
