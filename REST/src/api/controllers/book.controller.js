const Book = require('../models/book');
const mongoose = require("mongoose")
const createBook = async (req, res) => {

  const { title, author, image_url, description } = req.body;

  const book = new Book({
    _id: new mongoose.Types.ObjectId(),
    title,
    author,
    image_url,
    description
  })
    .save()
    .then((book) => {
      res.status(201).json({
        message: "Book Created"
      })
    })
    .catch((err) => {
      res.status(400).json({
        error: err.toString()
      })
    })

}


const updateBook = async (req, res) => {
  const bookId = req.body._id;
  await Book.updateOne({ _id: bookId }, req.body)
    .then((result) => {
      res.status(200).json({
        message: "Updated!"
      })
    })
    .catch((err) => {
      res.status(400).json({
        error: err.toString()
      })
    }
    )
}

const deleteBook = async (req, res) => {

  const bookId = req.body._id;
  await Book.deleteOne({ _id: bookId })
    .then(() => {
      res.status(200).json({
        message: "Deleted!"
      })
    }).catch((err) => {
      res.status(400).json({
        error: err.toString()
      })
    })

}

const getOneBook = async (req, res) => {
  const bookId = req.params.id;
  await Book.findById(bookId).then((book) => {
    res.status(200).json({
      book
    })
  })
}

const getAllBooks = async (req, res) => {

  await Book.find().then((books) => {
    res.status(200).json({
      books
    })
  })
}


module.exports = {
  createBook,
  updateBook,
  getAllBooks,
  getOneBook,
  deleteBook
}