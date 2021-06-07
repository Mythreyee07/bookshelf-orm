const knex = require('../util/database').knex;
const bookshelf = require('bookshelf')(knex);

var Student = bookshelf.Model.extend({
    tableName: 'student'
  });

  module.exports = Student;