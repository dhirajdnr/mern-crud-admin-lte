const express = require("express");
const app = express();
const port = 5000;
const keys = require("./config/keys");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("./models/Post");

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("./routes/postRoutes")(app);

app.get("/", (req, res) => res.send("Hello World!"));

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static("client/build"));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || port;

app.listen(PORT, () => console.log(`Example App listinig on port ${PORT}`));
