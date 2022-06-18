import React from "react";
import Card from '@mui/material/Card'
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
function rand() {
    return Math.round(Math.random() * 20) - 10;
}
function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const AddPost = () => {

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
      setOpen(true);
  };
  const handleClose = () => {
      setOpen(false);
  };
  return (
      <div>
          <Button variant="contained" color="primary" onClick={handleOpen}>
              Open Modal
          </Button>
          <Modal 
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={open}
              onClose={handleClose}
          >
              <Card sx={{
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
              }}style={modalStyle}>
                  <h2>Simple React Modal</h2>
                  <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi accumsan odio enim, non pharetra est ultrices et.
                  </p>
              </Card>
          </Modal>
      </div>
  );
}

export default AddPost