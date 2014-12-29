import ModelImpl = require('application/core/model/ModelImpl')

class TestModel extends ModelImpl {

	constructor() {
		super(['/test/'], ['get']);
	}

}

export = TestModel;