//Create the Home UI for the BlogAPP(Cards are preferrred; You may choose your UI preference )
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    axios
      .get("http://localhost:3001/")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.log(err));
  };

  const deleteBlog = (id) => {
    axios
      .delete(`http://localhost:3001/delete/${id}`)
      .then((res) => {
        alert(res.data.message);
        fetchBlogs(); // refresh list
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box sx={{ padding: 5 }}>
      <Grid container spacing={4}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog._id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={blog.img_url}
                alt={blog.title}
              />
              <CardContent>
                <Typography color="secondary" variant="subtitle2">
                  {blog.category}
                </Typography>
                <Typography variant="h6">{blog.title}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => deleteBlog(blog._id)}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate(`/update/${blog._id}`)}
                >
                  Update
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
