const likeModel = require("../../db/model/likes");
const postModel = require("../../db/model/post");


const allLike = (req, res) => {
  const { postId } = req.query;
  likeModel
    .find({ postId })
    .populate("post user")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}

const like = (req, res) => {
  const { post, user } = req.body;
  const addLike = new likeModel({ post, user });

  addLike
    .save()
    .then(async (result) => {
      await postModel.findByIdAndUpdate(post, {
        $push: { likes: result },
      });
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const unLike = async (req, res) => {
  const { likeId } = req.query;
  

  await likeModel
    .findByIdAndDelete(likeId)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = { like, unLike, allLike };
