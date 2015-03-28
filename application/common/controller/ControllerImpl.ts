import express = require('express');

import Model = require('application/common/model/Model');
import Controller = require('application/common/controller/Controller');

class ControllerImpl implements Controller {

	protected model:Model;

	constructor(model:Model) {
		this.model = model;
	}

	get(request:express.Request, response:express.Response) {
		var model = this.model;

		model.load();
		//model.loadLocalization();

		response.render(model.tplPath, model.tplSettings);
	}

	post(request:express.Request, response:express.Response) {
	}

	put(request:express.Request, response:express.Response) {
	}

	delete(request:express.Request, response:express.Response) {
	}

	before(request:express.Request, response:express.Response) {

	}

	after(request:express.Request, response:express.Response, app:express.Application) {

	}

}

export = ControllerImpl;