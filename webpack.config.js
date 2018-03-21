module.exports = {
  entry: './index.js',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          plugins: [
            [
              'babel-plugin-transform-object-rest-spread',
              {
                useBuiltIns: true // we polyfill Object.assign in src/normalize.js
              }
            ]
          ]
        }
      },
	  {
		test: /\.css$/,
		loaders: ['style-loader', 'css-loader'],
	  }
    ]
  }
};