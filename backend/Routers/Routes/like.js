const express = require("express");
const authentication = require("../midleware/auth");
const { like, unLike, allLike } = require("../Controllers/like");
const likeRouter = express.Router();

likeRouter.get("/", authentication, allLike);
likeRouter.post("/add", authentication, like);
likeRouter.delete("/remove", authentication, unLike);

module.exports = likeRouter;
