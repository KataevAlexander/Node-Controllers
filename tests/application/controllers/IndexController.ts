import express = require('express');
import assert = require('assert');
import request = require('supertest');

import AppService = require('application/services/AppService');

var app = express();

describe('IndexController', function () {
	AppService.addController(app, 'application/controllers/page/IndexController');

	describe('GET Request', function () {
		it('should return 200 status', function (done) {
			request(app)
				.get('/')
				.expect('Content-Type', 'text/html')
				.expect(200, done)
		});
	});
});