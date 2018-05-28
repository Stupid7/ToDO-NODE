var express = require('express');
var todoController = require('./Controller/todoController');
var app = express();



//set Template engine
app.set('view engine','ejs');

//set Sattic files
app.use(express.static('./public'));


//fire Controller
todoController(app);


//listening port
app.listen(3000);
console.log('listening to port 3000');
