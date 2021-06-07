const bookshelf = require('../util/database');
const Student = require('./student');

var Department = bookshelf.Model.extend({
     tableName: 'department',
     student: function () {
      return this.hasMany(Student);
    }
  });

module.exports = Department;