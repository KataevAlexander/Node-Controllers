import ModelImpl = require('../../core/model/ModelImpl')

class IndexModel extends ModelImpl {

	getTplPath() {
		return 'page/index.swig';
	}

	getTplSettings():any {
		return {};
	}

}

export = IndexModel;