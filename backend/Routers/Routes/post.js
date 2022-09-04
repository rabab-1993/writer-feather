const express = require("express");
const authentication = require('../midleware/auth')
const {newPost, allPost, updatePost, deletePost, postedBy} = require('../Controllers/post');

const postRouter = express.Router();

postRouter.post('/add',authentication, newPost)
postRouter.get('/',authentication, allPost)
postRouter.get('/onePost',authentication, postedBy)
postRouter.put('/update',authentication, updatePost)
postRouter.delete('/delete',authentication, deletePost)



module.exports = postRouter;