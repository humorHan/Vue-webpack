/**
 * Created by humorHan on 2016/7/4.
 */
var webpack = require('webpack');
var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');

/**
 * webpack 配置
 * @param isWatch 监听模式包括watch和cache参数
 * @param isDev   调试模式
 * @param isRev   压缩
 */
module.exports = function(isWatch, isDev, isRev) {
    return {
        watch: isWatch,
        devtool: isDev ? "#inline-source-map" : null,//eval-source-map
        output: {
            path: path.join(__dirname, 'bundle', 'js'),
            publicPath: '/vue-webpack-demo/bundle/js/',
            filename: '[name].js',
            chunkFilename: '[name].chunk.js'
        },
        module: {
            loaders: [
                /*{test: /\.html$/, loader: 'vue-html'},*/
                {test: /\.vue$/, loader: 'vue'},
                {test: /\.css$/,loader:"style!css"},
                {test: /\.less$/,loader:"style!css!less"},
                {test: /\.(png|jpeg|jpg|gif)$/, loader: 'url?limit=8192'},
                {test: /^es5-sham\.min\.js|es5-shim\.min\.js$/, loader: 'script', exclude: node_modules}
            ]
        },
        vue: {
            loaders: {
                css: 'style!css!autoprefixer!less'
            }
        },
        cache:isWatch,
        resolve: {
            root: [path.join(__dirname, 'js'), path.join(__dirname, 'dep')],
            extensions:['.js','.tpl','.less','.json','.vue',''],
            modulesDirectories:['dep','tpl','node_modules'],
            alias: {
                //'WdatePicker': 'My97DatePicker/WdatePicker.js'
            }
        },
        plugins: (function (){
            if (isRev) {
                return [
                    new webpack.optimize.UglifyJsPlugin({
                        compress: {
                            warnings: false
                        }
                    }),
                    new webpack.optimize.CommonsChunkPlugin({
                        name: "vendor",
                        filename: "vendor.js",
                        minChunks: 5 //Infinity
                    })
                ]
            } else {
                return [
                    new webpack.optimize.CommonsChunkPlugin({
                        name: "vendor",
                        filename: "vendor.js",
                        minChunks: Infinity
                    }),
                    new webpack.ProvidePlugin({
                        "Vue": "Vue"
                    })
                ]
            }
        })(),
        externals: {
            'jquery': '$'
        }
    }
};