import ModelImpl = require('application/common/model/ModelImpl')

class TestModel extends ModelImpl {

	constructor() {
		super(['/test/'], ['get']);
	}

}

export = TestModel;