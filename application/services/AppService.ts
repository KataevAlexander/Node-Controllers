export function addController(app, path) {
	var Model = require(path
			.replace('controller', 'model')
			.replace('Controller', 'Model')
	);
	var Controller = require(path);

	var model = new Model();
	var controller = new Controller(model);

	model.urls.forEach(function (url) {
		model.methods.forEach(function (method) {
			app[method](url, function (request, response) {
				controller[method](request, response);
			});
		})
	});
}