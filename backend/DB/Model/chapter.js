import mongoose from "mongoose";
const { Schema, model } = mongoose;

const chapterSchema = new Schema({
  part: { type: Number, required: true },
  title: { type: String },
  chapterContent: { type: String, required: true },
  storyId: { type: Schema.Types.ObjectId, ref: "Story" },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updated: { type: Date },
});

export default model("Chapter", chapterSchema);
