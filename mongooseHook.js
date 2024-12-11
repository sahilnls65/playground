const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Schemas
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

userSchema.pre("findOneAndUpdate", async function (next) {
  const oldData = await this.model.findOne(this.getQuery());
  const newData = this.getUpdate();
  console.log(oldData, newData);
  next();
});

const User = mongoose.model("users", userSchema);

// User.create({
//   name: "sahil",
//   email: "sahil@gmail.com",
// });

const updateData = async () => {
  const dd = await User.findOneAndUpdate(
    { _id: new ObjectId("6749501a9632b93bf5a1cf72") },
    {
      $set: {
        name: "sahil 4",
      },
    }
  );
  //   console.log(dd, "dd");
};
updateData();
