const { DateTime } = require("luxon");
const { Schema, model } = require("mongoose");

const NoveltySchema = Schema({
  tittle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    // default: now(),
  },
  modifiedAt: {
    type: Date,
  },
});

NoveltySchema.methods.toJSON = function () {
  const { __v, _id, createdAt, modifiedAt, ...novelty } = this.toObject();
  novelty.id = _id;
  novelty.createdAt = DateTime.fromISO(createdAt.toISOString());
  novelty.modifiedAt = DateTime.fromISO(modifiedAt.toISOString());

  return novelty;
};

module.exports = model("Novelty", NoveltySchema);
