const express = require("express");
const main = require("./routes/main");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Working");
});
app.use("/api", main);

app.listen(3000, () => {
  console.log("working on 3000");
});
