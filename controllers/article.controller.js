const { request, response } = require("express");
const { DateTime } = require("luxon");

const { isObjectId } = require("../helpers/validate-object-id");
const { Article, User } = require("../models");

const getArticles = async (req = request, res = response) => {
  try {
    const articles = await Article.find().populate("user");

    res.json({
      total: articles.length,
      articles,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

const createArticle = async (req = request, res = response) => {
  try {
    const { user: userId, ...rest } = req.body;

    const data = {
      ...rest,
      user: "",
      createdAt: DateTime.now(),
      modifiedAt: DateTime.now(),
    };

    if (!isObjectId(userId)) {
      return res.status(400).json({
        msg: "Debe ser un id Mongo",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        msg: `No existe un usuario con id ${userId} en la BD`,
      });
    }
    data.user = userId;

    const article = new Article(data);
    article.save();

    res.status(200).json({
      article,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

module.exports = {
  getArticles,
  createArticle,
};
