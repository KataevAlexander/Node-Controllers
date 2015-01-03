import express = require('express');
import ControllerImpl = require('application/core/controller/ControllerImpl');

class IndexController extends ControllerImpl {

	get(request, response) {
		response.send('this is get');
	}

	post(request:express.Request, response:express.Response) {
		//var q = request.query.q;
		//response.write(request.query);
		response.json(request.query);
		//response.send('this is post');
		//response.send()
	}

}

export = IndexController;