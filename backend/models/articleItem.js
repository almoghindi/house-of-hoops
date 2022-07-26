const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const articleSchema = new Schema({
  articleId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("articles", articleSchema);
