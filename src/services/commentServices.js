import Comment from "../models/comment.js";

export const createCommentService = async (data) => {
  const comment = await Comment(data);
  comment.save();
  return comment;
};

export const getOneCommentService = async (id) => {
  const comment = await Comment.findOne({ _id: id });
  return comment;
};

export const getAllCommentsService = async () => {
  const comment = await Comment.find();
  return comment;
};
