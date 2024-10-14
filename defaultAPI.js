const express = require("express");

const app = express();
app.use(express.json());

function handleApiRequest(req, res) {
  console.log(req.path, req.method, "");
  res.send("OK");
}

app.all("*", handleApiRequest);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
