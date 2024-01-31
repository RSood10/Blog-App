const express = require("express");
const userRoute = require("./user");
const blogRoute = require("./blog");
const main = express.Router();

main.get("/", (req, res) => {
  res.send("Working main");
});
main.use("/user", userRoute);
main.use("/blog", blogRoute);

module.exports = main;
