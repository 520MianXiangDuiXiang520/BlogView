// vue.config.js
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const isProduction = process.env.NODE_ENV === 'production'
module.exports = {
    publicPath: "./",
    outputDir: "dist",
    assetsDir: "assets",
    indexPath: "index.html",
    filenameHashing: true,
    pages: undefined,
    lintOnSave: true,
    runtimeCompiler: false,
    transpileDependencies: [],
    productionSourceMap: false,
    crossorigin: undefined,
    integrity: false,
    // devServer: {//代理
    //     port: 8080,
    //     proxy: 'http://192.168.1.3:8080'
    // }
}
configureWebpack: {
    plugins: [
        // Ignore all locale files of moment.js
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    drop_debugger: true,
                    drop_console: true
                }
            },
            sourceMap: false,
            parallel: true
        }),
        // 配置compression-webpack-plugin压缩
        new CompressionWebpackPlugin({
            algorithm: 'gzip',
            test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
            threshold: 10240,
            minRatio: 0.8
        })
    ]
}