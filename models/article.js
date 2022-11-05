const { DateTime } = require("luxon");
const { Schema, model } = require("mongoose");

const ArticleSchema = Schema({
  tittle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  img: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  modifiedAt: {
    type: Date,
    required: true,
  },
});

ArticleSchema.methods.toJSON = function () {
  const { __v, _id, createdAt, ...article } = this.toObject();
  article.id = _id;
  article.createdAt = DateTime.fromISO(createdAt.toISOString());

  return article;
};

module.exports = model("Article", ArticleSchema);
