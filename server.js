const axios = require("axios");

const port = 3000;
const apiKey = "AIzaSyANdcbrTjx5ryb6_DK9dJT749cySbJradA";
const apiUrl = "https://www.googleapis.com/youtube/v3";

const express = require("express");
const bodyParser = require("body-parser");
var videoIDs;

// New app using express module
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", async function (req, res) {
  var searchquery = req.body.num1;
  console.log(searchquery);

  const url = `${apiUrl}/search?key=${apiKey}&type=video&part=snippet&q=${searchquery}`;
  console.log(url);
  const response = await axios.get(url);

  videoIDs = response.data.items.map((item) => item.id.videoId);

  console.log(typeof videoIDs);
  console.log(videoIDs[0]);
 
});
app.get("/search", function (req, res) {
	res.sendFile(__dirname + "/video.html");
  });

app.listen(3000, function () {
  console.log("server is running on port 3000");
});