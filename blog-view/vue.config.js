const path = require("path");

const webpack = require("webpack");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["js", "css"];
const isProduction = process.env.NODE_ENV === "production";
// vue.config.js
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
  //     port: 8889,
  //     // proxy: 'http://192.168.1.3:8080'
  // }
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@i": path.resolve(__dirname, "./src/assets"),
      },
    },
    externals: {
      vue: "Vue",
      "element-ui": "ELEMENT",
      "bootstrap-vue": "bootstrapVue",
      "mavon-editor": "MavonEditor",
    },
  },
};
