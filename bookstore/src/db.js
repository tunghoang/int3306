const { Sequelize, DataTypes, Model } = require('sequelize');
let db = new Sequelize("mysql://root:newpass123@172.17.0.1/bookstore2020");

const bookModel = require('./models/book');
const authorModel = require('./models/author');

class Book extends Model { }

Book.init(bookModel.schema, {
  sequelize: db,
  modelName: bookModel.modelName
});

class Author extends Model { }

Author.init(authorModel.schema, {
  sequelize: db,
  modelName: authorModel.modelName
});

Book.belongsTo(Author);
Author.hasMany(Book);

async function init() {
  await db.authenticate();
  await db.sync();
}

module.exports = {
  models: db.models,
  init: init
}
