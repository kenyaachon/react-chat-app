const express = require("express");

const cors = require("cors");

const app = express();

const authenticationRoutes = require("./routes/authentication.js");
const PORT = process.env.PORT || 5000;
require("dotenv").config();
var colors = require("colors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (request, response) => {
  response.send("Hello bitches");
});

app.use("/auth", authenticationRoutes);

app.listen(PORT, () =>
  console.log(colors.yellow(`Server running on port ${PORT}`))
);
