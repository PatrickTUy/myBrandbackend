import mongoose from "mongoose";

const schema = mongoose.Schema({
  names: String,
  email: String,
  comment: String,
  create_at: Date,
});

export default mongoose.model("Comment", schema);