const express = require("express");
const app = express();
const http = require("http");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const server = http.createServer(app);

// socket.io creation
const io = require("socket.io")(server, {
  cors: {
    origin: "https://testing-remix-green.vercel.app/",
    methods: ["*"],
    credentials: true,
  },
});
global.io = io;

// database connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connection successful!"))
  .catch((err) => console.log(err));

// request parsers
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// set static folder
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  res.json("Hello world");
});

//
const postRouter = require("./routers/postRouter");

app.use("/post", postRouter);

server.listen(8080, () => {
  console.log("Server Start");
});
