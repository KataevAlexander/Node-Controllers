import fs = require('fs');
import path = require('path');

export function walk(dir:string, callback:(path:string) => void) {
	fs.readdirSync(dir).forEach(function (file) {
		var filePath = path.join(dir, file);

		fs.statSync(filePath).isDirectory() ? walk(filePath, callback) : callback(filePath);
	});
}