import mongoose from "mongoose";

const schema = mongoose.Schema({
  title: String,
  content: String,
  create_at: Date,
});

export default mongoose.model("Query", schema);