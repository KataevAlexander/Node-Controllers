import express = require('express');
var app = express();

require('.././index')(app);

app.listen(3000, function () {
	console.log('start cluster');
});