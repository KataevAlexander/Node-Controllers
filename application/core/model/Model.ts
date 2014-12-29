interface Model {

	urls:Array<string>;
	methods:Array<string>;
	tplPath:string;
	tplSettings:any;

	load():void;
	loadLocalization():void;

}

export = Model;