const knex = require('../util/database').knex;
const Student = require('../models/student');
const bookshelf = require('bookshelf')(knex);

const express = require('express');
const app = express();
const router = express.Router();

var bodyparser = require('body-parser');
app.use (bodyparser.urlencoded({extended:false}));
 app.use(bodyparser.json());


var studentDetails = require('../service/studentsDetails/studentsDetails');
 //all student details
 router.route('/student').get(function(req,res){
    studentDetails.allStudents(req,res);
 })

 //single student detail
 router.route('/student2/:id').get(function(req,res){
     studentDetails.particularStudent(req,res);
 })

 // insertion of a student detail
 router.route('/student1').post(function(req,res){
     studentDetails.insertStudent(req,res);
 })

 // updating a student details
 router.route('/student3/:id').put(function(req,res){
     studentDetails.updatetudent(req,res);
 })
 
 //deleting a student details
 router.route('/student4/:id').delete(function(req,res)
 {
     studentDetails.deleteStudent(req,res);
 })

 
 app.use("/api",router);


 app.listen(3000,()=>{
     console.log("hey its working!!!!");
 })
 
 
