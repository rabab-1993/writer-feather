import mongoose from "mongoose";
const { Schema, model } = mongoose;

const roleSchema = new Schema({
  role: { type: String, required: true },
  permissions: { type: Array, required: true },
});

export default model("Role", roleSchema);
