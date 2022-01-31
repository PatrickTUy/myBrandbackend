import {
  createCommentService,
  getOneCommentService,
  getAllCommentsService,
} from "../services/commentServices.js";

export class CommentController {
  async createComment(req, res, next) {
    try {
      if (error) {
        console.warn(error);
      }
      const data = {
        names: req.body.names,
        email: req.body.email,
        comment: req.body.comment,
        create_at: new Date(),
      };
      const comment = await createCommentService(data);
      res.status(200).json({
        status: 200,
        message: "comment created succesfully",
        data: comment,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllComments(req, res, next) {
    try {
      const comments = await getAllCommentsService.find();
      res.status(200).json({
        status: 200,
        message: "Comments retrieved succesfully",
        data: comments,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getOneComment(req, res, next) {
    try {
      comment = await getOneCommentService.findOne(req.params.id);
      if (comment) {
        res.status(204).json({
          status: 204,
          message: "Comment retrieved succesfully",
          data: comment,
        });
      } else {
        res.status(404).json({
          status: 404,
          message: "article not found",
          data: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
