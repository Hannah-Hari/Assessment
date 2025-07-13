import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    category: "",
    img_url: "",
  });

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const addData = () => {
    axios
      .post("http://localhost:3001/add", inputs)
      .then((res) => {
        alert(res.data.message);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
      }}
    >
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "600px",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Title"
          name="title"
          onChange={inputHandler}
          value={inputs.title}
          fullWidth
        />
        <TextField
          variant="outlined"
          placeholder="Category"
          name="category"
          onChange={inputHandler}
          value={inputs.category}
          fullWidth
        />
        <TextField
          variant="outlined"
          placeholder="Image URL"
          name="img_url"
          onChange={inputHandler}
          value={inputs.img_url}
          fullWidth
        />
        <Button variant="contained" color="secondary" onClick={addData}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Add;
