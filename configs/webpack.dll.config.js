const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ParallelUglifyPlugin  = require('webpack-parallel-uglify-plugin');
const hashedChunkIdPlugin = require('webpack-hashed-chunk-id-plugin');

const dirConfig = require("./base/dir-config.js");

/**
 * 建立第三方类库 索引 主要用于打包优化
 */
module.exports = {
    entry: {
		// 对于业务代码中要用到的第三方依赖，基本不会改动，最好都在这里列出来一起打包到 dll 中
        dll: ['react','react-dom',"react-router-dom","redux","react-redux","react-router-redux","redux-thunk"]	
    },
    output: {
        path : dirConfig.rootDir,
        filename : 'build/dll/[name]-[chunkhash:8].js',
        library : '[name]_[chunkhash:8]'
    },
	module : require("./module.config.js"),
    plugins : [
		/* 清空 build 文件夹下的 dll 文件夹，防止新生成的文件冗余 */
		new CleanWebpackPlugin( [path.resolve(dirConfig.buildDir ,"./dll") ] ,{
            root : dirConfig.rootDir
        }),
		/* 生成 dll 模块依赖树 */
        new webpack.DllPlugin({
			path: 'manifest.json',
			name: '[name]_[chunkhash:8]',
			context : dirConfig.rootDir,
		}),
		/* 开启多线程压缩代码，默认是压缩 js ,并把压缩的内容缓存 */
		new ParallelUglifyPlugin({
			cacheDir: path.resolve(dirConfig.rootDir ,"./cache"),
			test : /\.(js|vue)$/,
			uglifyJS : {
				output : {
					comments: false
				},
				compress : {
					warnings: false
				}
			}
		}),
		/* 使用 webpack 自带的压缩插件，压缩 js 代码 */
		/*new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),*/
		/* 设置 webpack 当前默认的打包环境 */
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV : JSON.stringify('production'),
			},
		}),
		/* 用文件名的 hash 替换打包时候的 ModulesID , 保持 modulesID 不变利于前端持久化 */
		new webpack.HashedModuleIdsPlugin(),
		/* 用文件名的 hash 替换打包时候的 ChunkId ,保持 ChunkId 不变利于前端持久化 */
		new hashedChunkIdPlugin({
			length: 10
		}),
    ],
	resolve: require("./resolve.config.js"),
};
