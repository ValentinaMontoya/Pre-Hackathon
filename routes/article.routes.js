const { Router } = require("express");
const { check } = require("express-validator");

const {
  getArticles,
  createArticle,
} = require("../controllers/article.controller");

const { validateFields } = require("../middlewares");

const router = Router();

router.get("/", getArticles);

router.post(
  "/",
  [
    check("tittle", "El título es requerido").not().isEmpty(),
    check("description", "La descripción es requerida").not().isEmpty(),
    check("user", "El id del usuario es requerido").not().isEmpty(),
    validateFields,
  ],
  createArticle
);

module.exports = router;
