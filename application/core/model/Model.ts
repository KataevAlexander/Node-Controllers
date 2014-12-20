interface Model {

	load():void;
	loadLocalization():void;

	getTplPath():string;
	getTplSettings():any;

}

export = Model;