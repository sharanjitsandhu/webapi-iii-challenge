const express = require("express");
const server = express();

server.use(express.json()); // add this for POST request

const usersRouter = require("./routers/users-router.js");
const postsRouter = require("./routers/posts-router.js");

// routing
server.use("/api/users", usersRouter);
server.use("/api/posts", postsRouter);

// route handlers are middlewares
server.get("/", (req, res) => {
  res.send("It's working!");
});

module.exports = server;
