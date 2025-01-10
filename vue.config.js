const { defineConfig } = require("@vue/cli-service");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = defineConfig({
  // publicPath: process.env.NODE_ENV === "development" ? "./" : "/",
  // outputDir: "dist",
  // assetsDir: "static",
  // indexPath: "index.html",
  // devServer: {
  //   proxy: {
  //     "/api": {
  //       target: process.env.VUE_APP_BASEURL,
  //       changeOrigin: true,
  //       pathRewrite: {
  //         "^/api": "",
  //       },
  //     },
  //   },
  // },
  transpileDependencies: true,
  chainWebpack(config) {
    config.plugin("monaco").use(new MonacoWebpackPlugin());
  },
});
