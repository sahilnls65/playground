const express = require("express");
const axios = require("axios");
const sharp = require("sharp");
const mimeTypes = require("mime-types");
const { createClient, commandOptions } = require("redis");
const app = express();

let redisClient;

(async () => {
  redisClient = createClient();

  redisClient.on("connect", () => {
    console.log("Connected to Redis!");
  });

  redisClient.on("error", (err) => {
    console.log("Error connecting to Redis:", err);
  });

  await redisClient.connect();
})();

// http://localhost:5000/image?url=https://younited.s3.ap-south-1.amazonaws.com/development/profile_pictures/17054102239949943.jpg&width=500&height=300

const url = "/development/profile_pictures/17054102239949943.jpg";

const splitUrl = url.split("/");
const pathOfBucket = splitUrl.pop();
console.log("getFileName", splitUrl.join("/"));

app.get("/image", async (req, res) => {
  const { url, width, height, objectFit } = req.query;

  const cachedResizedImage = await redisClient.get(
    commandOptions({ returnBuffers: true }),
    `${url}/${width}x${height}/${objectFit}`
  );

  if (cachedResizedImage) {
    return res.type("image/jpg").send(cachedResizedImage);
  }

  const cachedImage = await redisClient.get(commandOptions({ returnBuffers: true }), url);

  if (cachedImage) {
    const resized = await sharp(cachedImage)
      .resize(parseInt(width), parseInt(height), objectFit)
      .toBuffer();
    await redisClient.set(`${url}/${width}x${height}/${objectFit}`, resized, "EX", 60 * 60);
    return res.type("image/jpg").send(resized);
  }

  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    await redisClient.set(url, response.data, "EX", 60 * 60 * 24);
    const resized = await sharp(response.data)
      .resize(parseInt(width), parseInt(height), objectFit)
      .toBuffer();
    await redisClient.set(`${url}/${width}x${height}/${objectFit}`, resized, "EX", 60 * 60);

    res.type("image/jpg").send(resized);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Something went wrong");
  }
});

app.get("/test_timeout", async (req, res) => {
  setTimeout(() => {
    res.send("test timeout");
  }, 5000);
});

let server = app.listen(5000, () => {
  console.log("Server listening on port 5000");
});

server.timeout = 4000;
