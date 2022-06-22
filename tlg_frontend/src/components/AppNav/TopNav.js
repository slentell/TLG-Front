import * as React from "react";

import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
// import Switch from '@mui/material/Switch';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormGroup from '@mui/material/FormGroup';

import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AddIcon from "@mui/icons-material/Add";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import EmojiPeopleTwoToneIcon from '@mui/icons-material/EmojiPeopleTwoTone';
import SportsTwoToneIcon from '@mui/icons-material/SportsTwoTone';
import ChatIcon from "@mui/icons-material/Chat";
import {
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
} from "@mui/material";
import { HomeOutlined, InboxOutlined } from "@mui/icons-material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const data = [
  { name: "Home", icon: <HomeOutlined />, path: "/" },
  { name: "Add a lift sesh", icon: <AddIcon />, path: "/add-lift-session" },
  { name: "Track your progress", icon: <AssessmentIcon />, path: "/" },
  { name: "View Posts", icon: <InboxOutlined />, path: "/posts" },
  { name: "Bell Ringers", icon: <NotificationsActiveIcon />, path: "/" },
  { name: "Image Gallery", icon: <PhotoLibraryIcon />, path: "/images" },
  { name: "Calendar", icon: <CalendarMonthIcon />, path: "/" },
  { name: "Chat", icon: <ChatIcon />, path: "/" },
];

export default function MenuAppBar() {
  // eslint-disable-next-line
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = useState(false);
  const [showCoachDash, setShowCoachDash] = useState(false);
  const [showAthleteDash, setShowAthleteDash] = useState(false);
  const {user: currentUser } = useSelector((state) => state.auth) 

  // const handleChange = (event) => {
  //   setAuth(event.target.checked);
  // };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    if (currentUser) {
      setShowCoachDash(currentUser.account_type === 2)
      setShowAthleteDash(currentUser.account_type === 1)
    }
  }, [currentUser])

  const logOut = () => {
    dispatch(logout())
    navigate('/')
  };

  const getList = () => (
    <div style={{ width: 250 }} onClick={() => setOpen(false)}>
      {data.map((item, index) => (
        <ListItem button key={index} component={Link} to={item.path}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItem>
      ))}
      {showCoachDash && (
      <ListItem component ={Link} to={'/coach-dashboard'}>
        <ListItemIcon><SportsTwoToneIcon /></ListItemIcon>
        <ListItemText primary='Coach Dashboard' />
      </ListItem>
      )}
      {showAthleteDash && (
        <ListItem component ={Link} to={'/athlete-dashboard'}>
        <ListItemIcon><EmojiPeopleTwoToneIcon /></ListItemIcon>
        <ListItemText primary='Athlete Dashboard' />
      </ListItem>
      )}
    </div>
  );



  

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{bgcolor:'2a2f31'}}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon onClick={() => setOpen(true)} />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <FitnessCenterIcon />
            </Typography>
            { currentUser && <Typography>Hello, {currentUser.first_name}</Typography> }
            {auth && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {showCoachDash &&
                  <MenuItem >Create Team</MenuItem>}
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={logOut}>Logout</MenuItem>

                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer open={open} anchor={"left"} onClose={() => setOpen(false)}>
        {getList()}
      </Drawer>
    </div>
  );
}
