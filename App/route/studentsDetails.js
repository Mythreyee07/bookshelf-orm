const knex = require('../util/database').knex;
const Student = require('../models/student');
const bookshelf = require('bookshelf')(knex);
const StudentSchema = require('../service/validation/studentsDetails');

const express = require('express');
const app = express();
const router = express.Router();

var bodyparser = require('body-parser');
app.use (bodyparser.urlencoded({extended:false}));
 app.use(bodyparser.json());

var { Validator, ValidationError } = require('express-json-validator-middleware');
var validator = new Validator({allErrors: true}); 
var validate = validator.validate;
 

var studentDetails = require('../service/studentsDetails/studentsDetails');
 //all student details
 router.route('/student') .get(function(req,res){
    studentDetails.allStudents(req,res);
 })

 //single student detail
 router.route('/student2/:id').get(function(req,res){
     studentDetails.particularStudent(req,res);
 })

 // insertion of a student detail
 router.route('/student1').post(validate({body: StudentSchema}),function(req,res){
     studentDetails.insertStudent(req,res);
 })

 // updating a student details
 router.route('/student3/:id').put(validate({body: StudentSchema}),function(req,res){
     studentDetails.updateStudent(req,res);
 })
 
 //deleting a student details
 router.route('/student4/:id').delete(function(req,res)
 {
     studentDetails.deleteStudent(req,res);
 })

 router.use(function(err, req, res, next) {
    if (err instanceof ValidationError) {

        res.status(400).send(err);
        next();
    }
    else next(err); 
});

 app.use("/api",router);


 app.listen(3000,()=>{
     console.log("hey its working!!!!");
 })
 
 
