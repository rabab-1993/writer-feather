import chapterModel from "../../DB/Model/chapter.js";
import storyModel from "../../DB/Model/story.js";

const allChapters = (req, res) => {
  chapterModel
    .find({ isDeleted: false })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const newChapter = (req, res) => {
  const { part, title, chapterContent, storyId } = req.body;
  const chapter = new chapterModel({ part, title, chapterContent, storyId });

  chapter
    .save()
    .then(async (result) => {
      await storyModel.findByIdAndUpdate(storyId, {
        $push: { chapters: result },
      });
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const deleteChapter = async (req, res) => {
  const { _id, adminId, chapterId } = req.query;

  await chapterModel
    .findByIdAndUpdate(
      { chapterId },
      { $set: { isDeleted: true } },
      { new: true }
    )
    .then(() => {
      res.json({ massege: "deleted successfully" });
    })
    .catch((err) => {
      res.status(403).json({ massege: "forbidden" });
    });
};



const updateChapter = async (req, res) => {
    const { chapterContent, chapterId } = req.body;
  
    await chapterModel
      .findByIdAndUpdate({ chapterId }, { $set:[ { chapterContent }, {title}] }, { new: true })
      .then((result) => {
        res.status(200).json({ massege: "updated successfully", result });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };

export { allChapters, newChapter, deleteChapter, updateChapter };
