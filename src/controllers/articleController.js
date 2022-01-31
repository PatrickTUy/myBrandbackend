import {
  createArticleService,
  getAllArticlesService,
  getOneArticleService,
  updateArticleService,
  deleteArticleService,
} from "../services/articleServices.js";

import cloudinary from "cloudinary";
export class ArticleController {
  // TODO Don't access database from this file you only needs
  async createArticle(req, res, next) {
    try {
      cloudinary.v2.uploader.upload(req.file.path, async function (err, image) {
        if (err) {
          console.warn(err);
        }
        req.body.image = image.url;
        const data = {
          title: req.body.title,
          content: req.body.content,
          image: req.body.image,
          create_at: new Date(),
        };
        console.log(data);
        const article = await createArticleService(data);
        res.status(200).json({
          status: 200,
          message: "Article has been created successfully",
          data: article,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  async getAllArticles(req, res, next) {
    try {
      const articles = await getAllArticlesService();
      res.status(200).json({
        status: 200,
        message: "Articles retrieved successfuly",
        data: articles,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getArticle(req, res, next) {
    try {
      const article = await getOneArticleService(req.params.id);
      if (article) {
        res.status(200).json({
          status: 200,
          message: "requested article retrieved successfully",
          data: article,
        });
      } else {
        res.status(404).json({
          status: 404,
          message: "article not found",
          data: "",
        });
      }
    } catch (error) {
      res.send(error);
    }
  }
  async updateArticle(req, res, next) {
    try {
      cloudinary.v2.uploader.upload(req.file.path, async function (err, image) {
        if (err) {
          console.warn(err);
        }
        req.body.image = image.url;

        const data = {};
        if (req.body.title) {
          data["title"] = req.body.title;
        }
        if (req.body.content) {
          data["content"] = req.body.content;
        }
        if (req.body.image) {
          data["image"] = req.body.image;
        }
        const article = await updateArticleService(req.params.id, data);
        res.send(article);
      });
    } catch (error) {
      res.status(404);
      res.send({ error: "Article doesn't exist!" });
    }
  }
  async deleteArticle(req, res, next) {
    try {
      const deletePost = await deleteArticleService(req.params.id);
      res.status(204).json({
        status: 204,
        message: "Article deleted successfully ",
      });
    } catch {
      res.status(404);
      res.send({ error: "Article doesn't exist!" });
    }
  }
}
