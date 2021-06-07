var express = require('express');
var app = express();

var bodyparser = require('body-parser');
app.use (bodyparser.urlencoded({extended:false}));
app.use(express.static(__dirname));



var route = require('./controller/route');
app.use(route);


app.listen(3000,()=>{
    console.log("hey its working!!!!");
})
