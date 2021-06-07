const knex = require('../util/database').knex;
const Student = require('../models/student');
const bookshelf = require('bookshelf')(knex);

const express = require('express');
const app = express();
const router = express.Router();

var bodyparser = require('body-parser');
app.use (bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());



// to fetch all the details of the student
router.route('/student')
 .get(function (req, res) {
    Student.forge()
    .fetchAll()
    .then(function (collection) {
      res.send({ 
          status : 200,
          data: collection.toJSON()
        });
    })
    .catch(function (err) {
      res.send({
           status : 404,
           message: err.message
        });
    });
  })

  // to insert a details
  router.route('/student1')
  .post(function (req, res)  {
    Student.forge({
      name: req.body.name,
      email: req.body.email
      })
    .save()
    .then(function (result) {
      res.send({
          status:200, 
          data: {id: result.get('id')}
        });
    })
    .catch(function (err) 
    {
      res.send({
          status :500,
          error: true, 
          data: {message: err.message},
        });
    }); 
  });

  

  // fetch student
  router.route('/student2/:id')
  .get(function (req, res) {
    Student.forge({
        id: req.params.id
    })
    .fetch()
    .then(function (result) {
      if (result) {
        res.send({
            status: 200,
            error: false, 
            data: result.toJSON()
        });
      }
      else {
            res.send({
            status: 500,
            error: true, 
            message: 'No data found'
        });
      }
    })
    .catch(function (err) {
      res.send({
          status: 500,
          error: true, 
          message: err.message
        });
    });
  })



  //to update the details of the student
  router.route('/student3/:id')
  .put(function (req, res) {
    Student.forge({
        id: req.params.id,
        name: req.body.name,
        email: req.body.email 
      }).save()
    .then(function (result) {
        res.send({
            status: 200,
            error: false, 
            message: 'Student details got updated'
        });
      })
      .catch(function (err) {
        res.send({
            status: 500,
            error: true, 
            message: err.message
        });
      });
    })
    
  


  //delete the details of the student
  router.route('/student4/:id')
  .delete(function (req, res) {
    Student.forge({ 
        id: req.params.id
    })
    .fetch({require: true})
    .then(function (result) {
      result.destroy()
      .then(function () {
        res.send({
            status:200,
            error: true, 
            message: 'Student details got deleted.'
        });
      })
      .catch(function (err) {
        res.send({
            status:500,
            error: true, 
            message: err.message
        });
      });
    })
    .catch(function (err) {
      res.send({
          status:500,
          error: true, 
          message: err.message
        });
    });
  })

  //module.exports = router;
  app.use("/api",router);
  app.listen(3000,()=>{
    console.log("hey its working!!!!");
})