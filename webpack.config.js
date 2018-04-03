const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // The entry path - should be a absolute path.
  entry: {
    index: path.join(__dirname + '/src/views/index.js'),
    reactiontime: path.join(__dirname + '/src/views/reaction-time.js')
  },
  
  // The output path object.
  // generate a different bundle for each entry point.
  output: {
    path: path.join(__dirname + '/public/'),
    filename: 'chunk-[name].js'
  },
  
  module: {
    rules: [

      {
        // Use babel to transpile JSX and ES6 features.
        // The presets are important - specified in .babelrc
        test: /\.(js|jsx)$/,
        exclude: path.join(__dirname + '/node_modules/'),
        use: 'babel-loader'
      }

    ]
  },

  plugins: [
    // Generate a seperate HTML and bundle for each part.
    new HtmlWebpackPlugin({
      inject: "true",
      chunks: ['index'],
      template: './public/template.html',
      filename: 'index.html', // filenames should not include the prefix/suffix defined in output object.
    }),

    new HtmlWebpackPlugin({
      inject: "true",
      filename: 'reactiontime.html',
      template: './public/template.html',
      chunks: ['reactiontime']
    })
  ],
  
  mode: process.env.NODE_ENV || 'development'
};


