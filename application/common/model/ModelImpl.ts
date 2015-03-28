import _ = require('lodash');
import Model = require('application/common/model/Model');

class ModelImpl implements Model {

	private _urls:Array<string>;
	private _methods:Array<string>;
	private _tplPath:string;
	private _tplSettings:any;

	constructor(urls:Array<string>, methods:Array<string>, tplPath?:string, tplSettings?:any) {
		this._urls = urls;
		this._methods = methods;
		this._tplPath = tplPath;
		this._tplSettings = tplSettings;
	}

	load():void {
	}

	loadLocalization():void {
	}

	get urls() {
		return this._urls;
	}

	get methods() {
		return this._methods;
	}

	get tplPath() {
		return this._tplPath;
	}

	get tplSettings() {
		return this._tplSettings;
	}

	set tplSettings(tplSettings:any) {
		this._tplSettings = _.merge(this._tplSettings, tplSettings);
	}

}

export = ModelImpl;