const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const OfflinePlugin = require('offline-plugin');


module.exports = {
  mode: 'development',
  entry: {
    app: path.join(__dirname, 'src', 'main.js'),
  },
  output: {
    // this make sure all the assets to be accessed from root, ie bundle.js be injected by HtmlWebpackPlugin
    // as "/bundle.js". This is necessary in SPA.
    publicPath: '/',
    filename: '[name].[hash:5].js',
    // Where to put the final 'compiled' file
    path: path.join(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, 'src'),
      // 'pixi.js': path.resolve(__dirname, 'node_modules/pixi.js/dist/pixi.min.js'),
      'rusha': path.resolve(__dirname, 'node_modules/rusha/dist/rusha.min.js'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [
          path.join(__dirname, 'src')
        ],
      },
      // copy the required assets to dist folder
      // use require() to get the actuall url
      {
        test: /\.(|png|jpg|mp3|ogg|atlas|txt|mp4|gif)$/,
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
        type: 'javascript/auto',
        test: /\.json/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'file-loader',
          options: { 
            name: '[name].[ext]' 
          },
        }],
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

  optimization: {
    // split the vendors 
    splitChunks: {
      chunks: 'all'
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'game',
      filename: 'index.html',
      inject: 'body',
      template: './src/index.html',
      env: {
        target: 'dev'
      }
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async'
    }),
    new webpack.DefinePlugin({
      // max upload file size in MB
      MAX_FILE_SIZE: 10,
      DOMAIN: JSON.stringify('http://localhost:8081'),
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
      }),
      FACEBOOK_APP_ID: '1971060603211861'
    }),
    new SpriteLoaderPlugin(),
    // new OfflinePlugin({
    //   autoUpdate: true,
    //   externals: [
    //     'https://use.typekit.net/mob0ykg.css',
    //     'https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenLite.min.js'
    //   ],
    // }),
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