const {   
  createBook,
  updateBook,
  getAllBooks,
  getOneBook,
  deleteBook
} = require('../controllers/book.controller')

const { Router } = require('express')

const router = new Router();

router.get('/single/:id', getOneBook)
router.get('/multiple', getAllBooks)
router.post('/single', createBook)
router.patch('/single', updateBook)
router.delete('/single', deleteBook)

module.exports = router