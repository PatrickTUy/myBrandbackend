import mongoose from "mongoose";

const schema = mongoose.Schema({
  title: String,
  content: String,
  image: String,
  create_at: Date,
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: [Object],
    default: [],
  },
});

export default mongoose.model("Article", schema);
