import ModelImpl = require('application/common/model/ModelImpl')

class IndexModel extends ModelImpl {

	constructor() {
		super(['/'], ['get'], 'page/index.swig');
	}

}

export = IndexModel;