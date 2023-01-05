const express = require("express");
const db = require("./config/cofig");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

db.once("open", () => {
  app.listen(PORT, () => {
    console.log("listening on port http://localhost:3000");
  });
});
