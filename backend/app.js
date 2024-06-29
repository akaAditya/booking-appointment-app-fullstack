const express = require("express");
const path = require("path");
const Sequelize = require("sequelize");
const booking = require("./util/database");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());


const userRoute = require("./routes/userRoute");
app.use("/", userRoute);

booking
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("MySQL database connected successfully on localhost:3000");
    });
  })
  .catch((err) => {
    console.error(err);
  });
