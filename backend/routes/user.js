const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const Jwt_Key = require("../jwt/jwt_key");
// const demoRoute = require("./demo");
const mongoose = require("mongoose");

const userRoute = express.Router();
const { User } = require("../db");

// userRoute.use("/demo", demoRoute);
userRoute.get("/", (req, res) => {
  res.send("user working");
});
const signinSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
});
//signin will verify if user already exist or not
userRoute.post("/signin", async (req, res) => {
  const data = req.body;
  const { success } = signinSchema.safeParse(data);
  const exist = await User.find({ username: data.username });

  console.log(req.body);
  if (success && exist.length == 1 && data.password == exist[0].password) {
    const successToken = jwt.sign({ name: data.username }, Jwt_Key);
    res.json({ payload: successToken });
  } else res.send("no data");
});

const signupSchema = zod.object({
  username: zod.string().email(),
  firstname: zod.string(),
  lastname: zod.string(),
  password: zod.string().min(6),
});
//signup will add new user after checking some  conditions are met
userRoute.post("/signup", async (req, res) => {
  const data = req.body;
  const { success } = signupSchema.safeParse(data);
  const exist = await User.find({ username: data.username });
  console.log(exist);
  console.log(data);
  if (success && exist.length == 0) {
    const successToken = jwt.sign({ name: data.username }, Jwt_Key);
    const status = new User({
      username: data.username,
      firstName: data.firstname,
      lastName: data.lastname,
      password: data.password,
    });
    status.save();
    res.json({ message: "valid user details added to database" });
  } else res.send("no data");
});

module.exports = userRoute;
