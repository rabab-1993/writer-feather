const commentModel = require("../../db/model/comment");
const postModel = require("../../db/model/post");

// creat new comment
const newComment = (req, res) => {
  const { comment, postId, userId } = req.body;
  const comments = new commentModel({
    comment,
    postId,
    userId,
  });

  comments
    .save()
    .then(async (result) => {
      await postModel.findByIdAndUpdate(postId, {
        $push: { comments: result },
      });
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// get all comment for post

const allComment = (req, res) => {
  const { postId } = req.query;
  commentModel
    .find({ postId: postId })
    .populate("userId")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// update comment function
const updateComment = async (req, res) => {
  const { comment, _id } = req.body;
 
    await commentModel
      .findByIdAndUpdate({ _id }, { $set: { comment } })
      .then((result) => {
        res.status(200).json({ massege: "updated successfully", result });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
};

// delete comment function
const deleteComment = async (req, res) => {
  const { _id } = req.query;
  
  await commentModel
    .findByIdAndDelete(_id)
    .then(() => {
      res.status(200).json({ massege: "deleted successfully" });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = { newComment, updateComment, deleteComment, allComment };
