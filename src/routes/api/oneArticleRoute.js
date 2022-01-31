import express from "express";
import { ArticleController } from "./../../controllers/articleController.js";
import { CommentController } from "./../../controllers/commentController.js";

const route = express.Router({ mergeParams: true });
const articleControllers = new ArticleController();
const commentControllers = new CommentController();

route.get("/", articleControllers.getArticle);
route.patch("/", articleControllers.updateArticle);
route.delete("/", articleControllers.deleteArticle);

export default route;
