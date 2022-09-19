import mongoose from "mongoose";
const { Schema, model } = mongoose;

const storySchema = new Schema({
  title: { type: String, required: true },
  category: [{type:String}],
  description: { type: String },
  cover: { type: String },
  status: {type:String, default: "غير مكتمل"},
  author: { type: Schema.Types.ObjectId, ref: "User" },
  rate: { type: Schema.Types.ObjectId, ref: "Rate" },
  review: { type: Schema.Types.ObjectId, ref: "Review" },
  chapters: [{type: Schema.Types.ObjectId, ref: "Chapter"}],
  createdAt: {type: Date, default: Date.now},
  updated: {type: Date}
});

export default model("Story", storySchema);
