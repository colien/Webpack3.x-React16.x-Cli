var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ParallelUglifyPlugin  = require('webpack-parallel-uglify-plugin');
var AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
var hashedChunkIdPlugin = require('webpack-hashed-chunk-id-plugin');

var pageList = require("./base/page-list.js");
var dirConfig = require("./base/dir-config.js");

var NODE_ENV = process.env.NODE_ENV; //环境变量
var isProduction = NODE_ENV == "prod" || NODE_ENV == "dev";

var configPlugins = [
	/* 清空 build 文件夹下面除了 dll 文件夹外的所有文件 */ 
	new CleanWebpackPlugin(	
		["build"],
		{
			root : dirConfig.rootDir,
			exclude : [ 'dll' ], //排除 dll 文件夹
			verbose : true,
		}
	),
	/* 引用 manifest.json 文件 */
	new webpack.DllReferencePlugin({	
		context : dirConfig.rootDir,
		manifest : require(path.resolve(dirConfig.rootDir ,"./manifest.json")),
    }),
    
    /* 抽取出所有通用的部分 */
    new webpack.optimize.CommonsChunkPlugin({
        name: 'commons',
        filename: '[name]/bundle-[chunkhash:8].js',
        minChunks: (module,count) => {
			/*console.log(module.resource + '引用了'+ count + '次');
			if(count == 3){
				console.log('-----------------------------------------');
			}*/
			/* 除了图片和视屏文件，其他的都参与提取 */
			return !/\.(woff2?|eot|ttf|otf|png|svg|jpg|jpeg|gif|mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/.test(module.resource) 
					&& count >= (pageList.length >= 4 ? 4 : 2)
		},
    }),
    /*  抽取出 webpack 的 runtime 代码，避免稍微修改一下入口文件就会改动 commonChunk ，导致原本有效的浏览器缓存失效 */
    new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime',
        filename: 'commons/runtime'+(isProduction ? "-[chunkhash:8]" : "" )+ '.js',
        chunks: ['commons'],
    }),

	/* 用文件名的 hash 替换打包时候的 ModulesID , 保持 modulesID 不变利于前端持久化 */
	new webpack.HashedModuleIdsPlugin(),
	/* 用文件名的 hash 替换打包时候的 ChunkId ,保持 ChunkId 不变利于前端持久化 */
	new hashedChunkIdPlugin({
        length: 10
    }),
	
	/* 将一些 js , css 等静态文件插入到 HTML 模板中 */
	new AddAssetHtmlPlugin({
        filepath : path.resolve(dirConfig.buildDir, './dll/dll-*.js'),
        publicPath : '/dll',
        includeSourcemap : false,
        outputPath : '/dll',
        hash : true,
    }),
	/* 设置当前的默认环境 */
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV : isProduction ? JSON.stringify('production') : JSON.stringify('development'),
		},
	}),
];

/* 提取出外部 css 文件 */
isProduction && configPlugins.push(
	new ExtractTextPlugin("css/[name]-[contenthash:8].css")
);

/* 开启多线程压缩代码，默认是压缩 js ,并把压缩的内容缓存 */
isProduction && configPlugins.push(
	new ParallelUglifyPlugin({
		cacheDir : path.resolve(dirConfig.rootDir ,'./cache/'),
		uglifyJS : {
			output : {
				comments: false
			},
			compress : {
				warnings: false
			}
		}
	})
);

/* 使用模板生成页面文件 */
pageList.forEach((page) => {
	var htmlPlugin = new HtmlWebpackPlugin({
		filename: "views/"+page+'.html',
		template: path.resolve(dirConfig.srcDir ,"./template.html"),
		chunks: ["runtime","commons",page],
		chunksSortMode : 'manual',
		inject : 'body',
		minify: true,
		favicon : path.resolve(dirConfig.rootDir ,"./favicon.png"),
	});
	configPlugins.push(htmlPlugin);
}); 

module.exports = configPlugins;
