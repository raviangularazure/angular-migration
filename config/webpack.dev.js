const path = require("path");
const webpack = require("webpack");
const helpers = require("./helpers");

const HtmlWebpackPlugin = require("html-webpack-plugin");
var BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const ENV = (process.env.NODE_ENV = process.env.ENV = "development");

module.exports = {
  entry: {
    polyfills: "./public/polyfills.ts",
    vendor: "./public/vendor.ts", // The polyfills and vendor are created as separate bundles so that client browsers can cache them (not frequently changed)
    ng1: "./public/index.ts", // angular 2 entry point
    app: "./public/main.ts", // angular 2 entry point
  },

  output: {
    path: helpers.root("dist/dev"),
    publicPath: "/",
    filename: "[name].bundle.js",
    chunkFilename: "[id].chunk.js",
  },

  resolve: {
    extensions: [".ts", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: ["awesome-typescript-loader", "angular2-template-loader"], // works for both angular 1 and angular 2 files
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
    ],
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "common",
      minChunks: Infinity,
    }),

    new webpack.optimize.CommonsChunkPlugin({
      //this plug in is to make sure anything common between vendor and app entry points goes into ONLY vendor and not 2 times. Is this done in ICC?
      name: "vendor",
      chunks: ["vendor", "app"],
      minChunks: 2,
    }),

    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map[query]",
      moduleFilenameTemplate: "[resource-path]",
      fallbackModuleFilenameTemplate: "[resource-path]?[hash]",
      sourceRoot: "webpack:///",
    }),

    new HtmlWebpackPlugin({
      template: "config/index.html",
      chunks: ['app']
    }),

    new webpack.DefinePlugin({
      "process.env": {
        ENV: JSON.stringify(ENV),
      },
    }),

    new webpack.ContextReplacementPlugin( // deals with path issues during build
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root("./src"),
      {}
    ),

    new BundleAnalyzerPlugin({
      analyzerMode: "static",
    }),
  ],
};
