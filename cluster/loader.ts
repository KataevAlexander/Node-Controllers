import express = require('express');

module.exports = function loader(app:express.Application) {

	app.get('/', function (req, res) {
		res.send('hello');
	})

};