const multer = require("multer");
const upload = multer();
const postModel = require("../../db/model/post");
const userModel = require("../../db/model/user");

const cloudinary = require("cloudinary").v2;
// cloudinary configuration
cloudinary.config({
  cloud_name: "dtj6j4tpa",
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// creat new post
const newPost = async (req, res) => {
  try {
    const { user, desc, imags } = req.body;
    let imgs = [];

    for (const image of imags) {
      const cloud = await cloudinary.uploader.upload(image, {
        folder: "social-img",
      });

      imgs.push(cloud.secure_url);
    }
    const post = new postModel({
      desc,
      img: imgs,
      user,
    });

    post.save().then((result) => {
      res.status(201).json(result);
    });
  } catch (error) {
    res.status(400).json(error);
  }

  // console.log(imags);
  //  const cloud = await cloudinary.uploader.upload(imags, {
  //     folder: "social-img",
  //   }, function(error, result) {console.log(result, error)})

  // const post = new postModel({
  //   desc,
  //   img: imags,
  //   user,
  // });

  // post
  //   .save()
  //   .then((result) => {
  //     res.status(201).json(result);
  //   })
  //   .catch((err) => {
  //     res.status(400).json(err);
  //   });
};
// get all post

const allPost = (req, res) => {
  postModel
    .find({ isDeleted: false })
    .populate("likes comments user")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// get user is post
const postedBy = async (req, res) => {
  const { userId, postId } = req.query;

  await postModel
    .find({ $or: [{ _id: postId }, { user: userId }], isDeleted: false })
    .populate("likes user")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// update post function
const updatePost = async (req, res) => {
  const { desc, _id } = req.body;

  await postModel
    .findByIdAndUpdate({ _id }, { $set: { desc } }, { new: true })
    .then((result) => {
      res.status(200).json({ massege: "updated successfully", result });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// soft delete post function
const deletePost = async (req, res) => {
  const { _id, adminId } = req.query;
  const tokenId = req.saveToken.id;
  const postBy = await postModel.findById(_id);
  const admin = await userModel.findById(adminId);

  if (tokenId == postBy.user || admin.role == "61a82b332b8f8814ee629667") {
    await postModel
      .findByIdAndUpdate({ _id }, { $set: { isDeleted: true } }, { new: true })
      .then(() => {
        res.json({ massege: "deleted successfully" });
      })
      .catch((err) => {
        res.status(403).json({ massege: "forbidden" });
      });
  }
};

module.exports = { newPost, allPost, updatePost, deletePost, postedBy };
