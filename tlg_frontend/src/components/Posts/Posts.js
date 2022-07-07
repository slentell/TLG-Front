// import { Container, Box } from '@mui/system
import { React, useEffect } from "react";
import { red } from '@mui/material/colors';
import { usePosts } from "../../Providers/PostProvider";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Header from "../Header/Header.js";
import "./Posts.css";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Box,
  CardHeader,
  IconButton,
  Avatar,
  CardMedia,
  Link,
} from "@mui/material";
import { Container } from "@mui/system";

import AddPost from "../AddaPost/AddPost";

const Posts = () => {
  const { posts, setPosts, handlePostDelete,getAllPosts } = usePosts();
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  const PostCard = ({item}) => (
    <div className="post">
      <img
        className="postImg"
        src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        alt=""
      />
      <div className="postInfo">
     
          <Typography className="postTitle" sx={{fontFamily:'Alice'}}>
            {item.title}
            </Typography>

   
        <hr />
        <span className="postDate">{item.date}</span>
      </div>
      <Typography className="postDesc">
        {item.content}
      </Typography>
      <IconButton aria-label="delete post" onClick={(e) =>handleDelete(e, item.id)}>
    <DeleteForeverIcon />
    </IconButton>
    </div>
    // <div>
    //      <CardHeader
    //     avatar={
    //       <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
    //         Coach
    //       </Avatar>
    //     }
        
    //     title={item.title}
    //     subheader={item.date}
    //     />
    //   {item.image && 
    //   <CardMedia
    //     component="img"
    //     height="194"
    //     image="{item.image}"
    //     alt="post image"
    //   />
    // }
    //   <CardContent>
    //     <Typography variant="body2" color="text.secondary">
    //       {item.content}
    //     </Typography>
    //   </CardContent>
    //   <CardActions disableSpacing>

        
    //   </CardActions>
      
    // </div>
  );
  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      await handlePostDelete(id);
    } catch (e) {
      console.error('Error deleting post', e)
    }
    let newPosts = posts.filter((post) => post.id !== id);
    setPosts(newPosts)
  }

  return (
    <div>
      <Header />
      <AddPost />
      <Container sx={{bgcolor:'lightgrey'}}>
      {posts.map((item, index) => (
        <Container key={index} sx={{display:'flex', justifyContent:'space-around',mb: '25px' }}>
          <Box sx={{ minWidth: 550}}>
            <Card variant="outlined" sx={{display:'flex'}}><PostCard item={item} /></Card>
          </Box>
        </Container>
      ))}
      </Container>
    </div>
  );
};

export default Posts;
