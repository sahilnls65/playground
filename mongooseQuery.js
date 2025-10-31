const mongoose = require("mongoose");

mongoose.connect("mongodb://root:root@localhost:27017/test?authSource=admin");

const CommentSchema = new mongoose.Schema({
  text: String,
  author: String,
  replies: [
    {
      text: String,
      author: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  comments: [CommentSchema],
});

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  profile: {
    age: Number,
    address: {
      street: String,
      city: String,
      geo: {
        lat: Number,
        lng: Number,
      },
    },
  },
  posts: [PostSchema],
});

const User = mongoose.model("Query", UserSchema);

async function insertSampleData() {
  await User.deleteMany({});
  const user = new User({
    username: "john_doe",
    email: "john@example.com",
    profile: {
      age: 30,
      address: {
        street: "123 Main St",
        city: "Metropolis",
        geo: {
          lat: 40.7128,
          lng: -74.006,
        },
      },
    },
    posts: [
      {
        title: "First Post",
        content: "This is my first post",
        comments: [
          {
            text: "Great post!",
            author: "alice",
            replies: [
              {
                text: "Thanks!",
                author: "Sahil",
              },
            ],
          },
        ],
      },
    ],
  });
  await user.save();
  console.log("Sample data inserted.");
}

async function updateNestedField() {
  async function unsetFieldByPath(path, filter = {}) {
    const arrayPath = path
      .split(".")
      .map((segment) => segment + ".$[]")
      .join(".")
      .replace(/\.\$\[\]$/, "");

    const unsetObj = {};
    unsetObj[arrayPath] = "";

    await User.updateMany(filter, { $unset: unsetObj });
  }

  await unsetFieldByPath("email", {
    "posts.comments.replies.text": "Thanks!",
  });
}

async function runTest() {
  await insertSampleData();
  await updateNestedField();
  mongoose.connection.close();
}

runTest().catch((err) => {
  console.error(err);
  mongoose.connection.close();
});
