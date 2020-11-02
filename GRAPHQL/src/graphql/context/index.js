const Book = require('../../models/book');
const JWT = require('jsonwebtoken')
require('dotenv').config()

const book = new Book();

const context = async ({ request, connection }) => ({
  book,
});

module.exports = {context};
