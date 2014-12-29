import ModelImpl = require('application/core/model/ModelImpl')

class IndexModel extends ModelImpl {

	constructor() {
		super(['/'], ['get'], 'page/index.swig');
	}

}

export = IndexModel;