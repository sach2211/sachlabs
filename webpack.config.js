const path = require('path');

module.exports = {
  
  entry: path.join(__dirname + '/src/views/index.js'),
  
  output: {
    path: path.join(__dirname + '/public/'),
    filename: 'chunk.js'
  },
  
  module: {
    rules: [

      {
        test: /\.(js|jsx)$/,
        exclude: path.join(__dirname + '/node_modules/'),
        use: 'babel-loader'
      }

    ]
  },

  mode: process.env.NODE_ENV || 'development'
};