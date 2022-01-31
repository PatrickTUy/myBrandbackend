// import the model you need to access
import Article from "../models/article.js";

export const createArticleService = async (data) => {
  const article = await Article(data);
  article.save();
  return article;
};

export const getAllArticlesService = async () => {
  const articles = await Article.find();
  return articles;
};

export const getOneArticleService = async (id) => {
  const article = await Article.findOne({ _id: id });

  return article;
};
export const updateArticleService = async (id, data) => {
  const update = await Article.findOne({ _id: id });
  if (data.title) {
    update.title = data.title;
  }
  if (data.content) {
    update.content = data.content;
  }
  if (data.image) {
    update.image = data.image;
  }

  await update.save();
  return update;
};
export const deleteArticleService = async (id) => {
  const deletedArticle = await Article.deleteOne({ _id: id });
  return deletedArticle;
};
