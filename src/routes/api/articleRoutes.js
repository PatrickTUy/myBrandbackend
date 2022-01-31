import express from "express";
import oneArticleRoute from "./oneArticleRoute.js";
import { ArticleController } from "./../../controllers/articleController.js";
import { CommentController } from "./../../controllers/commentController.js";

import multer from "multer";
const route = express.Router({ mergeParams: true });

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("invalid image file!", false);
  }
};

const uploads = multer({ storage, fileFilter });

const articleControllers = new ArticleController();
const commentControllers = new CommentController();
route.post("/", uploads.single("image"), articleControllers.createArticle);
route.get("/", articleControllers.getAllArticles);

route.use(
  "/:id",
  uploads.single("image"),
  (req, res, next) => {
    console.log(req.params.id);
    return next();
  },
  oneArticleRoute
);

export default route;
