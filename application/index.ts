import swig = require('swig');
import express = require('express');
import winston = require('winston');

import FSService = require('application/services/FSService');
import AppService = require('application/services/AppService');

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

	FSService.walk(home + '/controllers', function (path) {
		AppService.addController(app, path);
	});

};

