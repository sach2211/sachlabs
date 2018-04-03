const path = require('path');

module.exports = {
  // The entry path - should be a absolute path.
  entry: path.join(__dirname + '/src/views/index.js'),
  
  // The output path object.
  output: {
    path: path.join(__dirname + '/public/'),
    filename: 'chunk.js'
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

  mode: process.env.NODE_ENV || 'development'
};