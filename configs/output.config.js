var dirConfig = require("./base/dir-config.js");

var NODE_ENV = process.env.NODE_ENV;	// 判断开发环境还是生产环境

var configOutput = {
	path : dirConfig.buildDir,
	filename : 'js/[name]-[chunkhash:8].js',
};

module.exports = configOutput;


