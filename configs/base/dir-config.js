var path = require('path');
var moduleExports = {};

// 源文件目录
moduleExports.rootDir = path.resolve(__dirname, '../../'); // 项目根目录
moduleExports.srcDir = path.resolve(moduleExports.rootDir, './src'); // 项目业务代码根目录
moduleExports.jsDir = path.resolve(moduleExports.srcDir, './js'); // 项目业务代码 js 目录
moduleExports.cssDir = path.resolve(moduleExports.srcDir, './css'); // 项目业务代码 css 目录
moduleExports.viewsDir = path.resolve(moduleExports.srcDir, './views'); // 项目页面目录
moduleExports.libDir = path.resolve(moduleExports.srcDir, './lib'); // 项目业务代码 lib 目录
moduleExports.componentsDir = path.resolve(moduleExports.srcDir, './components'); // 项目业务代码组件目录


// 生成文件目录
moduleExports.buildDir = path.resolve(moduleExports.rootDir, './build'); 

// node_module 目录
moduleExports.nondeModuleDir = path.resolve(moduleExports.rootDir, './node_modules');

module.exports = moduleExports;
