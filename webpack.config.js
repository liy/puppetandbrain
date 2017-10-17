const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
 

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    filename: 'index.js',
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
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'game',
      filename: 'index.html',
      inject: 'body',
      template: './src/index.html'
    })
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