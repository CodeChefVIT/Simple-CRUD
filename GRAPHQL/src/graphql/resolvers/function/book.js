const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')

const Query = {
	getAllBooks: async (_parent, { first, skip }, { book }) => {
    try {
      let books = await book.get({})
      if (first && !skip) {
        books = books.splice(0, first + 0);
      }
      if (skip && !first) {
        books = books.splice(skip, books.length - 1);
      }
      if (skip && first) {
        books = books.splice(skip, skip + first - 1 );
      }
      console.log(books)
      return books
    } catch (e) {
      console.log(e)
      throw Error(e)
    }
  },
  getBook: async ( _parent, args, { book }) => {
    try {
      const [bookDoc] = await book.get({ _id: args.id })
      console.log(bookDoc)
      return bookDoc
    } catch (e) {
      console.log(e)
      throw Error(e)
    }
  },

};

const Mutation = {
	createBook: async (_parent, args, { book }, _info) => {
    try {
      const bookExists = await book.get({ isbn_number: args.bookDoc.isbn_number })
      if(bookExists.length >= 1) {
        console.log(bookExists)
        throw Error(`Account with isbn_number ${bookExists[0].isbn_number} already exists.`)
      }
      const addedBook = await book.add(args.bookDoc)
      console.log(addedBook)
      return addedBook
    } catch (e)	{
      console.log(e)
      throw Error(e)
    }
  },
  updateBook: async (_parent, args, { book }, _info) => {
    try {
      const updatedBook = await book.update({_id: args.bookDoc._id},args.bookDoc)
      console.log(updatedBook)
      return updatedBook
    } catch (e)	{
      console.log(e)
      throw Error(e)
    }
  },
  deleteBook: async (_parent, args, { book }, _info) => {
    try {
      const deletedBook = await book.delete({ _id: args.id })
      console.log(deletedBook)
      return deletedBook
    } catch (e)	{
      console.log(e)
      throw Error(e)
    }
  }
};
module.exports = {
  BookQuery: Query,
  BookMutation: Mutation
};
