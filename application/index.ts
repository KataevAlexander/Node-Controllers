import swig = require('swig');
import express = require('express');
import fs = require('fs');
import path = require('path');
import winston = require('winston');

var home = __dirname;
var stat = __dirname + '/..';

module.exports = function main(app:express.Application) {

	app.engine('swig', swig.renderFile);

	app.set('view cache', false);
	app.set('view engine', 'swig');
	app.set('views', home + '/views');

	swig.setDefaults({
		cache: false,
		loader: swig.loaders.fs(home + '/views')
	});

	app.use(function (req, res, next) {
		winston.info(req.url);
		next();
	});

	app.use('/js', express.static(stat + '/js'));
	app.use('/css', express.static(stat + '/css'));
	app.use('/img', express.static(stat + '/img'));

	walk(home + '/controllers', function (path) {
		var Model = require(path
				.replace('controller', 'model')
				.replace('Controller', 'Model')
		);
		var Controller = require(path);

		var model = new Model();
		var controller = new Controller(model);

		model.urls.forEach(function (url) {
			model.methods.forEach(function (method) {
				app[method](url, function (request, response) {
					controller[method](request, response);
				});
			})
		});
	});

};

function walk(dir, callback) {
	fs.readdirSync(dir).forEach(function (file) {
		var filePath = path.join(dir, file);

		fs.statSync(filePath).isDirectory() ? walk(filePath, callback) : callback(filePath);
	});
}