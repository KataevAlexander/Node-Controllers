import express = require('express');
import ControllerImpl = require('application/common/controller/ControllerImpl');

class TestController extends ControllerImpl {

	get(request, response) {
		throw new Error('oops');
	}

}

export = TestController;