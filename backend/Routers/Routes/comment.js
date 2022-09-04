const express = require("express");
const commentRouter = express.Router();
const {newComment, updateComment, deleteComment, allComment} = require('../Controllers/comment');
const authentication = require("../midleware/auth");


commentRouter.get('/', authentication, allComment)
commentRouter.post('/add', authentication, newComment)
commentRouter.put('/', authentication, updateComment)
commentRouter.delete('/', authentication , deleteComment)






module.exports = commentRouter;