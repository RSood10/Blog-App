const express = require("express");
const jwt_key = require("../jwt/jwt_key");
const blogRoute = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { Blog } = require("../db");
const mongoose = require("mongoose");

const blogSchema = zod.object({
  username: zod.string(),
  title: zod.string(),
  description: zod.string(),
});

blogRoute.post("/add", async (req, res) => {
  const newblog = req.body;
  const { success } = blogSchema.safeParse(newblog);
  console.log(newblog);
  if (success && newblog.username != null) {
    console.log(newblog.username);

    const status = new Blog({
      username: newblog.username, // Ensure `username` is provided and not null
      title: newblog.title,
      description: newblog.description,
    });
    await status.save(); // Ensure to wait for the save operation to complete
    console.log(newblog);
    res.send("done");
  } else {
    res.send("no data");
  }
});
blogRoute.get("/daily-blogs", async (req, res) => {
  // const tokenData = req.headers.Authorization;
  // const token = tokenData.split("_")[1];
  // // console.log(token + " " + jwt_key + " " + jwt.verify(token, jwt_key));
  // // console.log(jwt.verify(token[1], jwt_key));
  // const verifyzToken = jwt.verify(token, jwt_key);
  const blogs = await Blog.find();
  console.log("daily", blogs);
  if (blogs.length > 0) res.json(blogs);
  else
    res.json([
      {
        username: "Demo",
        title: "welcome",
        description: "lorem101njdcjasndjnajnajdna",
      },
    ]);
});

blogRoute.get("/user-specific", async (req, res) => {
  const tokenData = req.headers.authorization;
  const token = tokenData.split(" ")[1];
  console.log(token + " " + jwt_key + " ");
  // console.log(jwt.verify(token[1], jwt_key));
  const verifyzToken = jwt.verify(token, jwt_key);
  console.log(verifyzToken);
  if (verifyzToken) {
    const uname = verifyzToken.name;
    const userBlogs = await Blog.find({ username: uname });
    if (userBlogs.length > 0) res.json(userBlogs);
    //extract username from token and then find call on db of all of its blogs
    else
      res.json({
        username: uname,
        title: "welcome",
        description: "lorem101njdcjasndjnajnajdna",
      });
    console.log("Sending User's Blogs");
  } else {
    res.send("No user blogs found");
  }
  // console.log(req.headers.authorization);
  // res.send("working");
});

blogRoute.put("/put", (req, res) => {
  res.send("put called");
});

module.exports = blogRoute;
