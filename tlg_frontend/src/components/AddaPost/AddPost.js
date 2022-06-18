import React, { useState } from "react";

import {
  CardContent,
  CardActions,
  CardHeader,
  TextField,
  Container,
  IconButton,
  Card,
  Button,
  Modal,
  Grid,
} from "@mui/material";
import AddPhotoAlternateTwoToneIcon from "@mui/icons-material/AddPhotoAlternateTwoTone";
import AddReactionTwoToneIcon from "@mui/icons-material/AddReactionTwoTone";
import CloseIcon from "@mui/icons-material/Close";
import Picker from "emoji-picker-react";
import axios from "axios";

const AddPost = () => {
  const [open, setOpen] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [inputStr, setInputStr] = useState("");
  const [imgUpload, setImgUpload] = useState(false);
  const [data, setData] = useState({
 
    title: "",
    content: inputStr,
    image:"",

  })

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  const onEmojiClick = (e, emojiObject, name) => {
    setInputStr((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
    handleChange(e, name);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Got in handle Submit')
    const postData = {
      title: data.title,
      content: inputStr,
      image: data.image
    };
    axios.post('https://throughtheliftingglass.herokuapp.com/tlg/posts/', postData, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("access")}` 
      }
    })
    .then((response) => {
      console.log(response)
    })
  }


  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Open Modal
      </Button>
      <Modal
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <Card
          sx={{
            minWidth: "600px",
            minHeight: "400px",
            backgroundColor: "#333737",
            borderRadius: "30px",
          }}
        >
          {" "}
          <Grid container justify="space between" alignItems="center">
            <CardHeader sx={{ textAlign: "center" }} title="Create a Post" />
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
          <CardContent>
            <Container style={{ width: "100%" }}>
              <TextField
                style={{ width: "100%", backgroundColor: "#858787" }}
                required
                id="outlined-required"
                name="title"
                value={data.title}
                placeholder="Enter Title"
                onChange={handleChange}
              />
            </Container>
            <Container style={{ width: "100%" }}>
              <TextField
                style={{ width: "100%", backgroundColor: "#d6d7d7" }}
                id="outlined-multiline-static"
                name="content"
                multiline
                minRows={4}
                placeholder="Got a thought?"
                value={inputStr}
                onChange={(e) => setInputStr(e.target.value, e.target.name)}
              />
            </Container>
            <Container>
              <IconButton
                onClick={() => setImgUpload((val) => !val)}
              >
                <AddPhotoAlternateTwoToneIcon />
              </IconButton>
              <IconButton onClick={() => setShowPicker((val) => !val)}>
                <AddReactionTwoToneIcon />
              </IconButton>
              <Container>{imgUpload && <input type="file" name="image" value={data.image} onChange={handleChange}/>}</Container>
              <Modal
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={showPicker}
                onClose={() => setShowPicker((val) => !val)}
              >
                {showPicker && (
                  <Picker
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onEmojiClick={onEmojiClick}
                    pickerStyle={{ width: "14%" }}
                  />
                )}
              </Modal>
            </Container>
          </CardContent>
          <CardActions sx={{ justifyContent: "center" }}>
            <Button
              style={{
                width: "80%",
                backgroundColor: "black",
                borderRadius: "20px",
              }}
              variant="outlined"
              size="large"
              onClick={handleSubmit}
            >
              Post
            </Button>
          </CardActions>
        </Card>
      </Modal>
    </div>
  );
};

export default AddPost;