var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restful_task');

var TaskSchema = new mongoose.Schema({
  title:  { type: String, required: true},
  description: { type: String, default: ""},
  completed: { type: Boolean, default: false},
  created_at: { type: Date, default: Date.now()},
  updated_at: { type: Date, default: Date.now()}
})
mongoose.model('Task', TaskSchema); // We are setting this Schema in our Models as 'User'
var Task = mongoose.model('Task') // We are retrieving this Schema from our Models, named 'User'

app.use(bodyParser.json());
app.use(express.static( __dirname + '/RestfulAngular/dist' ));
app.get('/task', function(req, res) {
  Task.find({}, function(err, tasks){
    if(err){
      res.json({message: "Error", error: err})
    }
    else {
      res.json({data: tasks})
    }
  })
})
app.post('/task/new/', function(req, res) {
  let task = new Task(req.body)
  task.save(function(err) {
    // if there is an error console.log that something went wrong!
    if(err) {
      res.json({message: "Error when adding new task", error: err})
    } 
    else { // else console.log that we did well and then redirect to the root route
      res.json({message: "Success in adding new task", data: task})
    }
  })
})
app.get('/task/:id', function(req, res){
  Task.find({_id: req.params.id}, function(err, tasks){
    if(err){
      res.json({message: "Error", error: err})
    }
    else {
      res.json({data: tasks})
    }
  })
})
app.get('/task/remove/:id', function(req, res){
  Task.remove({_id: req.params.id}, function(err){
    if(err){
      res.json({message: "Error", error: err})
    }
    else {
      res.end()
    }
  })
})
app.get('/task/update/:id/:newtitle', function(req, res){
  Task.update({_id: req.params.id}, {title: req.params.newtitle}, function(err){
    if(err){
      res.json({message: "Error", error: err})
    }
    else {
      res.json({message: "Success in updating new task"})
    }
  })
})
app.listen(8000, function() {
 console.log("listening on port 8000");
});
//5ace7b2a44c7e404a1937bac