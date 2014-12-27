var express = require('express');
var app = express();

require('../application/index')(app);

app.listen(3000, function () {
	console.log('start cluster');
});