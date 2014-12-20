import swig = require('swig');
import express = require('express');

var DR = __dirname;

module.exports = function main(app:express.Application) {

	app.engine('swig', swig.renderFile);

	app.set('view cache', false);
	app.set('view engine', 'swig');
	app.set('views', DR + '/views');

	swig.setDefaults({
		cache: false,
		loader: swig.loaders.fs(DR + '/views')
	});

	var Model:any = require('./models/page/IndexModel');
	var Controller:any = require('./controllers/page/IndexController');

	var model = new Model();
	var controller = new Controller(model);

	app.get('/', function (req, res) {
		controller.get(req, res);
	})

};