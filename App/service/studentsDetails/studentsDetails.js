const knex = require('../../util/database').knex;
const Student = require('../../models/student');
const bookshelf = require('bookshelf')(knex);


class studentDetails 
{

  // all student details
  allStudents(req,res)
  {
    Student.forge()
    .fetchAll()
    .then(function (collection) {
      return res.send({ 
        status : 200, 
        data: collection.toJSON()
      });
    })
    .catch(function (err) {
     return res.send({
           status : 404,
           message: err.message
        });
    });
  }
  
  // single student details
  particularStudent(req,res)
  {
    Student.forge({
      id: req.params.id
  })
  .fetch()
  .then(function (result) {
    if (result) {
       return res.send({
          status: 200,
          error: false, 
          data: result.toJSON()
      });
    }
    else {
        return  res.send({
          status: 500,
          error: true, 
          message: 'No data found'
      });
    }
  })
  .catch(function (err) {
    return res.send({
        status: 500,
        error: true, 
        message: err.message
      });
  });
  }

  //inserting a student details
  insertStudent(req,res)
  {
    Student.forge({
      name: req.body.name,
      email: req.body.email
      })
    .save()
    .then(function (result) {
      return res.send({
          status:200, 
          data: {id: result.get('id')}
        });
    })
    .catch(function (err) 
    {
       return res.send({
          status :500,
          error: true, 
          data: {message: err.message},
        });
    });
  }

  //updating a student details
  updatetudent(req,res)
  {
    Student.forge({
      id: req.params.id,
      name: req.body.name,
      email: req.body.email 
    }).save()
  .then(function (result) {
     return res.send({
          status: 200,
          error: false, 
          message: 'Student details got updated'
      });
    })
    .catch(function (err) {
      return res.send({
          status: 500,
          error: true, 
          message: err.message
      });
    });
  }
  //deleting a student details
  deleteStudent(req,res){
    Student.forge({ 
      id: req.params.id
  })
  .fetch({require: true})
  .then(function (result) {
    result.destroy()
    .then(function () {
      return res.send({
          status:200,
          error: true, 
          message: 'Student details got deleted.'
      });
    })
    .catch(function (err) {
     return res.send({
          status:500,
          error: true, 
          message: err.message
      });
    });
  })
  .catch(function (err) {
    return res.send({
        status:500,
        error: true, 
        message: err.message
      });
  });
  }
}

module.exports = exports= new studentDetails();

    
