var path = require("path");
var pageList = require("./base/page-list.js");
var dirConfig = require("./base/dir-config.js");

var configEntrys = {};

// 读取入口文件名
pageList.forEach((page) => {
	configEntrys[page] = (path.resolve(dirConfig.viewsDir ,"./"+page+".js"));
});

module.exports = configEntrys;
