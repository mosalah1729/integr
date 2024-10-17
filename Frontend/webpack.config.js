const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js', // Entry point for your React app
  output: {
    path: path.resolve(__dirname, '../Frontend/build'), // Adjust the path to your Django static folder
    filename: 'static/js/bundle.[contenthash].js', // Set the JS output prefix to 'static/js/'
    chunkFilename: 'static/js/[name].[contenthash].js', // Handle dynamically imported chunks
    publicPath: '/', // For React Router, useful in production
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Transpile JS and JSX files
        exclude: /node_modules/, // Exclude node_modules from transpilation
        use: ['babel-loader'],
      },
      {
        test: /\.css$/, // Load CSS files
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,  // Add the 'i' flag to make the test case-insensitive
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',  // Use the original file name and extension
              outputPath: 'media/src/Image/',  // Output directory inside the build folder
              publicPath: '/media/src/Image/', // Public URL to access the images (relative to build folder)
            },
          },
        ],
      }
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'], // Resolve JS and JSX extensions
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Use your React's index.html file
      filename: path.resolve(__dirname, '../Frontend/build/index.html'), // Django will use this to render the base HTML
      inject: true, // Automatically injects scripts and links
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, '../Frontend/build/static'), // Serve from the static folder for development
    hot: true, // Enable hot module reloading
    historyApiFallback: true, // Ensures proper routing with React Router
    port: 3000, // Port for the Webpack dev server
    proxy: {
      '/api': 'http://localhost:8000', // Proxy API calls to Django backend
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all', // Splits vendor code into separate chunks for optimization
    },
  },
};
