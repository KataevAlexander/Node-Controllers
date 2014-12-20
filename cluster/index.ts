import express = require('express');
import loader = require('./loader');

var app = express();

loader(app);

app.listen(3000, function () {
	console.log('start cluster');
});