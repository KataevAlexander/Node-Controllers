import refs = require('application/refs');
import express = require('express');
import IndexController = require('application/controllers/page/IndexController');
import IndexModel = require('application/models/page/IndexModel/IndexModel');

var app = express();
//var route:express.IRouter = <any>express.Router;
//
//var controller = new IndexController();
//var model = new IndexModel();
//
//route.get(controller.get);
//
//app.use('/', route);

//var r = express.Router;
//
//function load() {
//    var controllerPath = 'application/controllers/page/IndexController';
//    var modelPath = 'application/models/page/IndexModel/IndexModel';
//    var route = exports.Router();
//
//    var Controller = require(controllerPath);
//    var Model = require(modelPath);
//
//    var controller = new Controller();
//
//    route.get('/', controller.get);
//}

app.get('/', function (req, res) {
    res.end('hello');
});

app.listen(3000, function () {
    console.log('start');
});