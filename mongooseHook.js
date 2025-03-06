// const mongoose = require("mongoose");
// const ObjectId = require("mongoose").Types.ObjectId;

// // MongoDB connection
// mongoose.connect("mongodb://localhost:27017/test", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Define Schemas
// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
// });

// userSchema.pre("findOneAndUpdate", async function (next) {
//   const oldData = await this.model.findOne(this.getQuery());
//   const newData = this.getUpdate();
//   console.log(oldData, newData);
//   next();
// });

// const User = mongoose.model("users", userSchema);

// // User.create({
// //   name: "sahil",
// //   email: "sahil@gmail.com",
// // });

// const updateData = async () => {
//   const dd = await User.findOneAndUpdate(
//     { _id: new ObjectId("6749501a9632b93bf5a1cf72") },
//     {
//       $set: {
//         name: "sahil 4",
//       },
//     }
//   );
//   //   console.log(dd, "dd");
// };
// updateData();

const mongoose = require("mongoose");

// Mongoose connection
mongoose.connect("mongodb://localhost:27017/test");
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Handle nodemon restarts (SIGUSR2)
process.on("SIGUSR2", async () => {
  console.log("Nodemon restart detected. Cleaning up...");

  // Close Mongoose connection
  try {
    await mongoose.connection.close();
    console.log("Mongoose connection closed.");
  } catch (err) {
    console.error("Error closing Mongoose connection:", err);
  }

  // Gracefully exit
  // process.kill(process.pid, "SIGUSR2");
});

// Handle app termination
process.on("SIGINT", async () => {
  console.log("App is shutting down...");
  try {
    await mongoose.connection.close();
    console.log("Mongoose connection closed.");
  } catch (err) {
    console.error("Error during shutdown:", err);
    process.exit(1);
  }
});

// Dummy server
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
