var path = require("path");
var dirConfig = require("./base/dir-config.js");

var configResolve = {
	extensions: ['.js', '.vue'],
	modules: [ 
		dirConfig.srcDir, 
		dirConfig.nondeModuleDir, 
	],
	alias: {
		"vue$": "vue/dist/vue.js",
		"js" : dirConfig.jsDir,
		"css" : dirConfig.cssDir,
		"components" : dirConfig.componentsDir,
		"eventBus" : path.resolve(dirConfig.componentsDir, './eventBus.js'),
		"capacityHintBox" : path.resolve(dirConfig.jsDir, './capacityHintBox/capacityBox-2.0.1.js'),
		"APIService" : path.resolve(dirConfig.jsDir, './service/APIService.js'),
	}
};

module.exports = configResolve;


