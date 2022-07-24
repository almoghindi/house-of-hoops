const HttpError = require("../models/http-error");
const ArticleItem = require("../models/articleItem");
const Article = require("../models/article");

const getArticles = async (req, res, next) => {
  let articles;
  try {
    articles = await ArticleItem.find({}).limit(7);
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({
    articles: articles.map((article) => article.toObject({ getters: true })),
  });
};

const getArticle = async (req, res, next) => {
  const articleId = req.params.articleId;
  console.log(articleId);
  let article;
  try {
    article = await Article.findById(articleId);
    console.log(article);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a place.",
      500
    );
    return next(error);
  }

  if (!article) {
    const error = new HttpError(
      "Could not find place for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ article: article.toObject({ getters: true }) });
};

exports.getArticles = getArticles;
exports.getArticle = getArticle;
