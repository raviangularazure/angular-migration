const path = require("path");
const webpack = require("webpack");
const helpers = require("./helpers");

const HtmlWebpackPlugin = require("html-webpack-plugin");
var BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const AotPlugin = require("@ngtools/webpack").AotPlugin;

const ENV = (process.env.NODE_ENV = process.env.ENV = "production");

module.exports = {
  entry: {
    polyfills: "./public/polyfills.ts",
    vendor: "./public/vendor-aot.ts", // The polyfills and vendor are created as separate bundles so that client browsers can cache them (not frequently changed)
    app: "./public/main-aot.ts", // angular 2 entry point
  },

  output: {
    path: helpers.root("dist/aot"),
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
        loader: "@ngtools/webpack", //Builds using Angular AOT compiler
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

    new AotPlugin({
      tsConfigPath: "./tsconfig.aot.json",
      entryModule: helpers.root("public/app/app.module#AppModule"),
    }),

    new HtmlWebpackPlugin({
      template: "config/index.html",
      chunks: ["app"],
    }),

    new webpack.optimize.UglifyJsPlugin({ // This is needed in prod build to minify
      beautify: false, // means uglify
      comments: false, // remove all comments
      compress: {
        warnings: false,
      },
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
