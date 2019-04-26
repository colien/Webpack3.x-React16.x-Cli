var path = require("path");
var glob = require("glob");
var dirConfig = require("./dir-config.js");

var entry = [];

//读取开发目录,并进行路径裁剪
glob.sync(path.resolve(dirConfig.viewsDir,'./*.js'))
	.forEach(function(name) {
		var start = name.indexOf('src/views/') + 10,
			end = name.length - 3,
			n = name.slice(start, end);
		entry.push(n);
	});
module.exports = entry;
