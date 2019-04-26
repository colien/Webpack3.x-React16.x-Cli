var path = require("path");
var webpack = require("webpack");
var extractTextWebpackPlugin = require('extract-text-webpack-plugin');
var dirConfig = require("./base/dir-config.js");
var utils = require("./base/utils.js");

var NODE_ENV = process.env.NODE_ENV; //环境变量
var isProduction = NODE_ENV == "prod" || NODE_ENV == "dev";

var moduleConfig = {
	rules : utils.styleLoaders({	// 处理 css less sass/scss stylus 文件的处理器
			sourceMap: false, 
			extract: isProduction,		// 是否提取出外部 css 文件
			usePostCSS: isProduction ,	// 是否自动处理 css 浏览器兼容
		}).concat([	// 本想把样式加载器放到后面加载，但是 dev 环境打包会有问题
		(false ? {	// 暂时先不检查， isProduction 为 true 就检查， 为 false 不检查
			test: /\.(js|vue)$/,
			loader: 'eslint-loader',
			enforce: 'pre',
			include: dirConfig.srcDir,
			options: {
				formatter: require('eslint-friendly-formatter'),
				emitWarning: true,
				// 使用 configFile 参数可以引用指定文件配置，但是其他加载器不一定有这个配置
				configFile: path.resolve(dirConfig.rootDir, './eslint.config.js'),
			}
		} : {}),
		{
			test:/\.(jsx|js)$/,
			exclude: /(node_modules|bower_components)/,
			use:{
				loader:'babel-loader',
				options:{
					presets:[
						"es2015","react"
					],
					cacheDirectory: true
				}
			},
		},
		{
			test : /\.js$/,
			include : dirConfig.srcDir,
			use : {
				loader : "babel-loader",
				// 有四种方式，但是最终还是配在了 package.json 中，没有使用 .babelrc 是因为这个文件在部署的时候移除不了
				//options : require(path.resolve(dirConfig.rootDir, './babel.config.js')),
				/*options : {
					presets : [
						"es2015",
						["env", {
							"modules": false,
							"targets": {
							"browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
							}
						}],
						"stage-0",
						"stage-2",
					],
					plugins : ["transform-runtime"],
				}*/
			}
		},
		{
			test: /\.(htm|html)$/,	// 处理 html 文件中对于图片的引用路径
			include: dirConfig.srcDir,
			loader: 'html-withimg-loader',
			options: {
				cacheDirectory: true,
				minimize: isProduction,
			}
		},
		{
			test: /\.(htm|html)$/,
			include: dirConfig.srcDir,
			loader:'html-loader',
			options: {
				cacheDirectory: true,
			}
		},
		{
			test:/\.json$/,
			include : dirConfig.srcDir,
			loader:"json-loader",
		},
		{
			test:/\.(png|svg|jpg|jpeg|gif)(\?.*)?$/i,
			include: dirConfig.srcDir,
			loader:'url-loader',
			options : {
				limit: 1024,							// 把小于1kB的文件打成 Base64 的格式，写入 JS
				name: 'images/[name].[hash:8].[ext]',	// 放在文件夹的路径及命名
				publicPath: '/',						// 路径上添加两个点指向正确路径,
				cacheDirectory: true,
			}
		},
		{
			test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
			loader: 'url-loader',
			options: {
				limit: 1024,							// 把小于1kB的文件打成 Base64 的格式，写入 JS
				name: 'media/[name].[hash:8].[ext]',
				publicPath: '/',						// 路径上添加两个点指向正确路径,
				cacheDirectory: true,
			}
		},
		{
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			loader: 'url-loader',
			options: {
				limit: 1024,							// 把小于1kB的文件打成 Base64 的格式，写入 JS
				name: 'fonts/[name].[hash:7].[ext]',
				publicPath: '/',						// 路径上添加两个点指向正确路径,
				cacheDirectory: true,
			}
		}
	])
}

module.exports = moduleConfig;
