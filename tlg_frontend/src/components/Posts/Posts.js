// import { Container, Box } from '@mui/system
import { React } from "react";

import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { Container } from "@mui/system";

const Posts = () => {
  // const [list, setList] = useState();

  const postList = [
    {
      id: 1,
      title: "Title 1",
      post: "Stuff about the things.",
    },
    {
      id: 2,
      title: "Title ",
      post: "Things about the stuff.",
    },
    {
      id: 3,
      title: "Title 3",
      post: "All of the swolio.",
    },
  ];

  const card = (item) => (
    <div>
      <CardContent>
        <Typography variant="h5" component="div">
          {item}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Stuff</Button>
      </CardActions>
    </div>
  );

  return (
    <div>
      {postList.map((item) => (
        <Container>
          <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">{card(item.post)}</Card>
          </Box>
        </Container>
      ))}
    </div>
  );
};

export default Posts;
