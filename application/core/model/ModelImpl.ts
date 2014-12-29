import Model = require('application/core/model/Model');

class ModelImpl implements Model {

	load():void {
	}

	loadLocalization():void {
	}

	getTplPath():string {
		return undefined;
	}

	getTplSettings():any {
		return undefined;
	}

}

export = ModelImpl;