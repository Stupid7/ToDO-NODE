var bodyParser = require('body-parser');

// var data = [{item: 'Go Fishing'},{item:'Buy Bread'},{item:'Code Everything'}];

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://done:done@ds113700.mlab.com:13700/to-do');

//scheme creating

var todoSchema = new mongoose.Schema({
  item:String
});

var Todo = mongoose.model('Todo',todoSchema);
// var itemOne = Todo({item:'Go Outside'}).save(function(err){
//   if(err) throw err;
//   console.log('Item Saved');
// });

module.exports = function(app){


app.get('/todo',function(req,res){
    Todo.find({},function(err, data){
      if(err) throw err;
        res.render('todo',{todos:data});
    });


  });
  app.post('/todo', urlencodedParser, function(req,res){
      var newTodo = Todo(req.body).save(function(err,data){
        if(err) throw err;
        res.redirect('/todo');
      });
     // res.render('todo-add',{todos:data});
    // console.log('post');
  });
  // console.log(data);

  app.delete('/todo/:item',function(req,res){
    Todo.find({item:req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
      if(err) throw err;
      res.json(data);
    });
  });

}
