const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const app = express();

app.use(express.json({ limit: "10mb" })); // support parsing of application/json type post data
app.use(express.urlencoded({ extended: true })); // support parsing of application/x-www-form-urlencoded post data

// Session configuration
const sessionMiddleware = session({
  secret: "yourSecretKey",
  resave: false,
  saveUninitialized: false, // Only save session if data is added
  store: MongoStore.create({
    mongoUrl: "mongodb://localhost:27017/test",
    collectionName: "sessions",
  }),
  cookie: {
    maxAge: 1000 * 60 * 60, // 1 hour
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
});

// Apply session only to login
app.post("/login", sessionMiddleware, (req, res) => {
  if (!req.session.state) {
    req.session.state = Math.random().toString(36).substring(2);
    req.session.verifier = Math.random().toString(36).substring(2);
  }

  res.json({ state: req.session.state, verifier: req.session.verifier });
});

// Validate state and verifier
app.post("/validate", sessionMiddleware, (req, res) => {
  const { state, verifier } = req.body;

  if (req.session.state === state && req.session.verifier === verifier) {
    res.json({ message: "Validation successful" });
  } else {
    res.status(400).json({ message: "Invalid state or verifier" });
  }
  req.session.destroy();
});

app.get("/", (req, res) => {
  res.send("OK");
});

// Debugging session creation
app.use((req, res, next) => {
  console.log("Session ID:", req.sessionID);
  next();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
