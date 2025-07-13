// index.js
const express = require("express");
const cors = require("cors");
require("./connection"); // this connects to MongoDB
const BlogModel = require("./model"); // this imports the blog schema

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

// POST: Add a blog
app.post("/add", async (req, res) => {
  try {
    const newBlog = new BlogModel(req.body);
    await newBlog.save();
    res.status(200).json({ message: "Blog added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding blog", error });
  }
});

// GET: All blogs
app.get("/", async (req, res) => {
  try {
    const data = await BlogModel.find();
    res.send(data);
  } catch (error) {
    res.status(500).send("Error fetching blogs");
  }
});

// DELETE: By ID
app.delete("/delete/:id", async (req, res) => {
  try {
    await BlogModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog", error });
  }
});

// PUT: Update by ID
app.put("/update/:id", async (req, res) => {
  try {
    await BlogModel.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Blog updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error updating blog", error });
  }
});

app.listen(PORT, () => {
  console.log(`${PORT} is up and running`);
});

