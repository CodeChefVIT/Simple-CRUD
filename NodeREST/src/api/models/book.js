const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
  title: String,
  author: String,
  image_url: String,
  description: String,
});

module.exports = mongoose.model("Book", bookSchema);
