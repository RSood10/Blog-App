const express = require("express");
const demoRoute = express.Router();

demoRoute.get("/", (req, res) => {
  res.send("demo under user working");
});

module.exports = demoRoute;
