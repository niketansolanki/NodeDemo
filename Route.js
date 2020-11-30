var express = require('express');
var router = express.Router();
var fs = require("fs");
var model = require('./Models/model').User;
var bodyParser = require('body-parser');
var promise = require('promise');
var crudFunction = require('./functions/function');
var uuid = require('uuid');
var couchbase = require("couchbase");

var cluster = new couchbase.Cluster("couchbase://localhost", {
  username: "Administrator",
  password: "admin123"
});
var bucket = cluster.bucket("test");
var collection = bucket.defaultCollection();

router.use(bodyParser.json());

router.use(function (req, res,next) {
    res.header("Access-Control-Allow-Origin", '*'); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

//Method : Get
router.get('/', function (req, res,next) {
    crudFunction.getData()
    .then(function(result){
      console.log(result);
      var users = {};
      result.rows.forEach((row) => {
        var userObject = new model(row.test);
        users[userObject.id] = userObject;
        console.log('Query row: ', row)
      })
      res.send(users);
    })
    .catch(function(error){
      console.log(error)
      next(new Error(error))
    })
})


router.get('/search/:data', function (req, res,next) {
  console.log("data received");
  console.log("data",req.params.data);
  crudFunction.searchData(req.params.data)
  .then(function(result){
    console.log(result);
    var users = {};
    result.rows.forEach((row) => {
      var userObject = new model(row.test);
      users[userObject.id] = userObject;
      console.log('Query row: ', row)
    })
    res.send(users);
  })
  .catch(function(error){
    console.log(error)
    next
})
})
//Method : Get/id
router.get('/:id', function (req, res, next) {
  crudFunction.getDataById("u"+req.params.id)
    .then(function(result){
        var userObject = new model(result);
        res.send(userObject);
    })
    .catch(function(error){
      next(new Error(error));
    })
})

//Method : Post
router.post('/', function (req, res, next) {
    console.log("Post Method : ");
    var user = req.body;
    var id = uuid.v4();
    userObject = new model(user);
    userObject.id = id;
    crudFunction.insertData("u"+id,JSON.stringify(userObject))
    .then(function(result){
      res.send(result)
    })
    .catch(function(error){
      next(new Error(error))
    })
})

//Method : Post/id
router.post('/:id', function (req, res, next) {
    console.log("Put Method : ");
    var userObject = new model(req.body);
    crudFunction.updateData('u'+req.params.id,JSON.stringify(userObject))
    .then(function(result){
      res.send(result)
    })
    .catch(function(error){
      next(new Error(error))
    })
})


//Method : Delete
router.delete('/:id', function (req, res, next) {
  console.log("delete");
  crudFunction.deleteData(req.params.id)
    .then(function(result){
      res.send(result)
    })
    .catch(function(error){
      next(new Error(error))
    })
})


module.exports = router;