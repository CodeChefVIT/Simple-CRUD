const { Schema, model } = require('mongoose');
const mongoose = require('mongoose')

const timestamps = { createdAt: 'created_at', updatedAt: 'updated_at' };
// database class for crud operation
class DatabaseOperation {
  // create monogoDB model
  createModel(modelName, schema) {
    try {
      const newSchema = new Schema(schema, { timestamps });
      return model(modelName, newSchema);
    } catch (e) {
      console.log(e);
    }
  }

  // create new document
  async create(modelClass, obj) {
    // async create(model) {
    obj._id = new mongoose.Types.ObjectId()
    const model = new modelClass(obj);
    return new Promise((resolve, reject) => {
      try {
        const data = Promise.resolve(model.save());
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
  
  // retrive document
  async get(modelClass, obj, option) {
    return new Promise((resolve, reject) => {
      try {
        const data = Promise.resolve(modelClass.find(obj));
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }


  // update document
  async update(modelClass, filter, updatedField) {
    const option = {
      new: true, // return updated doc
      runValidators: true // validate before update
    };
    return new Promise((resolve, reject) => {
      try {
        const data = Promise.resolve(
          modelClass.findOneAndUpdate(filter, updatedField, option)
        );
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }


  // delete document
  async delete(modelClass, filter) {
    return new Promise((resolve, reject) => {
      try {
        const data = Promise.resolve(modelClass.findOneAndRemove(filter));
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  // delete many document
  async deleteMany(modelClass, filter) {
    return new Promise((resolve, reject) => {
      try {
        const data = Promise.resolve(modelClass.deleteMany(filter));
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
}

const databaseOperation = new DatabaseOperation();

module.exports = databaseOperation