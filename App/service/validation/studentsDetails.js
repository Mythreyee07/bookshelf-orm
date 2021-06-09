var express = require('express');
var bodyParser = require('body-parser');
 
var { Validator, ValidationError } = require('express-json-validator-middleware');
 
 

var validator = new Validator({allErrors: true}); 
 

var validate = validator.validate;
 

var StudentSchema = {
    type: 'object',
    required: ['id', 'name', 'email'],
    properties: {
        id: {
            type: 'number'
        },
        name: {
            type: 'string'
        },
        email: {
            type: 'string',
            
        }
    }
}

module.exports = StudentSchema;
 
 