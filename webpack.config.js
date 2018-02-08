const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
// const OfflinePlugin = require('offline-plugin');


module.exports = {
  entry: ['whatwg-fetch', path.join(__dirname, 'src', 'main.js')],
  output: {
    // this make sure all the assets to be accessed from root, ie bundle.js be injected by HtmlWebpackPlugin
    // as "/bundle.js". This is necessary in SPA.
    publicPath: '/',
    filename: 'bundle.js',
    // Where to put the final 'compiled' file
    path: path.join(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, 'src')
        ],
      },
      // copy the required assets to dist folder
      // use require() to get the actuall url
      {
        test: /\.(|png|jpg|json|mp3|ogg|atlas|txt)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              // name: '[name].[hash:5].[ext]',
              name: '[name].[ext]',
              context: path.join(__dirname, 'src/assets')
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.svg$/,
        use: [
          'svg-sprite-loader',
          // 'svgo-loader',
        ]
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'game',
      filename: 'index.html',
      inject: 'body',
      template: './src/index.html'
    }),
    new webpack.DefinePlugin({
      APP_VERSION: JSON.stringify(require("./package.json").version),
      'process.env.NODE_ENV': JSON.stringify('dev'),
      // staging
      FIREBASE_CONFIG: JSON.stringify({
        apiKey: "AIzaSyC760Njk0wan_MlFKoiHYawfSYy0CaeLUA",
        authDomain: "puppet-brain-staging.firebaseapp.com",
        databaseURL: "https://puppet-brain-staging.firebaseio.com",
        projectId: "puppet-brain-staging",
        storageBucket: "puppet-brain-staging.appspot.com",
        messagingSenderId: "868975802956"
      })
    }),
    new SpriteLoaderPlugin(),
    // new OfflinePlugin(),
  ],
  
  // Export full source map for debugging, maps to original source
  // This could be a little bit slow for bigger project build, but you can change it at anytime
  // to other type of source map to keep the build performance:
  //    http://webpack.github.io/docs/configuration.html#devtool
  devtool: 'source-map',
  devServer: {
    contentBase: './dist'
  },
}