const express = require("express");

const articlesController = require("../controllers/articles-controller");

const router = express.Router();

router.get("/", articlesController.getArticles);
router.get("/:articleId", articlesController.getArticle);

module.exports = router;
