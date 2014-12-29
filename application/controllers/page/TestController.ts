import express = require('express');
import ControllerImpl = require('application/core/controller/ControllerImpl');

class TestController extends ControllerImpl {

	get(request, response) {
		throw new Error('oops');
	}

}

export = TestController;