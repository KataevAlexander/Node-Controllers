import swig = require('swig');
import express = require('express');
import fs = require('fs');
import path = require('path');

var home = __dirname;

module.exports = function main(app:express.Application) {

	app.engine('swig', swig.renderFile);

	app.set('view cache', false);
	app.set('view engine', 'swig');
	app.set('views', home + '/views');

	swig.setDefaults({
		cache: false,
		loader: swig.loaders.fs(home + '/views')
	});

	walk(home + '/controllers', function (path) {
		var Model = require(path
				.replace('controller', 'model')
				.replace('Controller', 'Model')
		);
		var Controller = require(path);

		var model = new Model();
		var controller = new Controller(model);
		
		app.get('/', function (request, response) {
			controller.get(request, response);
		});
	});

};

function walk(dir, callback) {
	fs.readdirSync(dir).forEach(function (file) {
		var filePath = path.join(dir, file);

		fs.statSync(filePath).isDirectory() ? walk(filePath, callback) : callback(filePath);
	});
}