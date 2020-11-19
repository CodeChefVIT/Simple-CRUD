const DBOperation = require('../services/database_operation');
const mongoose = require('mongoose')

// mongoose schema
const schema = {
  _id: mongoose.Schema.Types.ObjectId,
	title: {
		type: String,
		trim: true,
	},
	author: {
		type: String,
		trim: true,
	},
	description: {
		type: String,
		trim: true,
  },
  image: {
    type: String,
    trim: true,
  },
  isbn_number: {
    type: Number,
  }
};
let BookModel = DBOperation.createModel('Book', schema);
class Book {
	async add(book) {
		return new Promise((resolve, reject) => {
			try {
				const addedBook = Promise.resolve(
					DBOperation.create(BookModel, book)
				);
				resolve(addedBook);
			} catch (err) {
				reject(err);
			}
		});
	}
	async get(filter, option) {
		return new Promise((resolve, reject) => {
			try {
				const book = Promise.resolve(
					DBOperation.get(BookModel, filter, option)
				);
				resolve(book);
			} catch (err) {
				reject(err);
			}
		});
	}
	async update(filter, updatedField) {
		return new Promise((resolve, reject) => {
			try {
				const updatedBook = Promise.resolve(
					DBOperation.update(BookModel, filter, updatedField)
				);
				resolve(updatedBook);
			} catch (err) {
				reject(err);
			}
		});
	}
	async delete(filter) {
		return new Promise((resolve, reject) => {
			try {
				const deletedBook = Promise.resolve(
					DBOperation.delete(BookModel, filter)
				);
				resolve(deletedBook);
			} catch (err) {
				reject(err);
			}
		});
	}
}

module.exports = Book;
