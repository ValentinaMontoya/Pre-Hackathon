const { Router } = require("express");
const { check } = require("express-validator");

const {
  getNovelties,
  createNovelty,
} = require("../controllers/novelty.controller");
const { validateFields } = require("../middlewares");

const router = Router();

router.get("/", getNovelties);

router.post(
  "/",
  [
    check("tittle", "El título es requerido").not().isEmpty(),
    check("description", "La descripción es requerida").not().isEmpty(),
    check("user", "El id del usuario es requerido").not().isEmpty(),
    validateFields,
  ],
  createNovelty
);

module.exports = router;
