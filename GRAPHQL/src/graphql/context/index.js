const Book = require('../../models/book');
require('dotenv').config()

const book = new Book();

const context = async ({ request, connection }) => ({
  book,
});

module.exports = {context};
