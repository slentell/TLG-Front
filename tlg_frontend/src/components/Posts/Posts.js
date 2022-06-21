// import { Container, Box } from '@mui/system
import { React, useEffect } from "react";
import { red } from '@mui/material/colors';
import { usePosts } from "../../Providers/PostProvider";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Box,
  CardHeader,
  IconButton,
  Avatar,
  CardMedia
} from "@mui/material";
import { Container } from "@mui/system";

import AddPost from "../AddaPost/AddPost";

const Posts = () => {
  const { posts, setPosts, handlePostDelete,getAllPosts } = usePosts();
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  const PostCard = ({item}) => (
    <div>
         <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            Coach
          </Avatar>
        }
        
        title={item.title}
        subheader="date"
      />
      
      {item.image && 
      <CardMedia
        component="img"
        height="194"
        image="{item.image}"
        alt="post image"
      />
    }
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {item.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="delete post" onClick={(e) =>handleDelete(e, item.id)}>
          <DeleteForeverIcon />
        </IconButton>
        
      </CardActions>
      
       
    </div>
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
      <AddPost />
      {posts.map((item, index) => (
        <Container key={index} sx={{display:'flex', justifyContent:'space-around',mb: '25px' }}>
          <Box sx={{ minWidth: 550}}>
            <Card variant="outlined" sx={{display:'flex'}}><PostCard item={item} /></Card>
          </Box>
        </Container>
      ))}
    </div>
  );
};

export default Posts;
