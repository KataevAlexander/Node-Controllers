import express = require('express');
import Model = require("application/core/model/Model");
import Controller = require("application/core/controller/Controller");

class ControllerImpl implements Controller {

	//todo protected
	model:Model;

	constructor(model:Model) {
		this.model = model;
	}

	get(request:Express.Request, response:express.Response) {
		var model = this.model;

		model.load();
		model.loadLocalization();

		response.render(model.getTplPath(), model.getTplSettings());
	}

	post(request:Express.Request, response:express.Response) {
	}

	put(request:Express.Request, response:express.Response) {
	}

	delete(request:Express.Request, response:express.Response) {
	}

	before(request:express.Request, app:express.Application) {

	}

	after(request:express.Request, response:express.Response, app:express.Application) {

	}

}

export = ControllerImpl;