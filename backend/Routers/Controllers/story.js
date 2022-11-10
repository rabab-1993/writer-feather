import storyModel from "../../DB/Model/story.js";
import userModel from "../../DB/Model/user.js";

import { v2 as cloudinary } from "cloudinary";
// cloudinary configuration
cloudinary.config({
  cloud_name: "dtj6j4tpa",
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// creat new story
const newStory = async (req, res) => {
  try {
    const { author, description, cover, title, category } = req.body;

    const cloud = await cloudinary.uploader.upload(cover, {
      folder: "story-cover",
    });
    const story = new storyModel({
      author,
      description,
      cover: cloud.secure_url,
      title,
      category,
    });

    story.save().then((result) => {
      res.status(201).json(result);
    });
  } catch (error) {
    res.status(400).json(error);
  }
};


// get all Stories
const allStories = (req, res) => {
  storyModel
    .find({ isDeleted: false })
    .populate("review chapters rate author")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// search stories by tittle or author or by category
const storyBy = async (req, res) => {
  const { authorId, storyId, category, tittle } = req.query;

  await storyModel
    .find({
      $or: [
        { _id: storyId },
        { author: authorId },
        { category: category },
        { tittle: tittle },
      ],
      isDeleted: false,
    })
    .populate("author")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
      console.log(err);
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
  const admin = await findById(adminId);

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

export { newStory, allStories, updatePost, deletePost, storyBy };
