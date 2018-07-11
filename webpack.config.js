const path = require('path');
const webpack = require('webpack');
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const paths = {
  build: 'web/dist',
  entry: 'web/index.html',
  urlPrefix: '/dist/'
};

const rules = [
  { test: /\.html$/, loader: 'html-loader' },
  { test: /\.scss$/, loaders: ['raw-loader', 'sass-loader'] },
  { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file-loader' }
];

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
  }),
  new CleanWebpackPlugin([paths.build, paths.entry]),
  new HtmlWebpackPlugin({
    chunksSortMode: 'none',
    template: './templates/index.html',
    filename: path.resolve(__dirname, paths.entry),
    alwaysWriteToDisk: true
  }),
  new HtmlWebpackHarddiskPlugin()
];

let output = {
  publicPath: paths.urlPrefix,
  path: path.resolve(__dirname, paths.build)
};

if (process.env.NODE_ENV === 'production') {
  rules.push({
    test: /\.ts$/,
    loaders: ['@ngtools/webpack']
  });

  plugins.push(
    new AngularCompilerPlugin({
      tsConfigPath: './tsconfig.json',
      entryModule: 'src/app/app.module#AppModule'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.HashedModuleIdsPlugin()
  );

  output = {
    ...output,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name]-chunk.[chunkhash].js'
  };
} else {
  rules.push({
    test: /\.ts$/,
    loaders: [
      'awesome-typescript-loader',
      'angular-router-loader',
      'angular2-template-loader'
    ]
  });

  plugins.push(
    new webpack.NamedModulesPlugin(),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      path.resolve(__dirname, './notfound')
    )
  );

  output = {
    ...output,
    filename: '[name].js',
    chunkFilename: '[name]-chunk.js'
  };
}

module.exports = {
  cache: true,
  context: __dirname,
  devServer: {
    contentBase: path.join(__dirname, 'web'),
    historyApiFallback: true,
    stats: {
      chunks: false,
      chunkModules: false,
      chunkOrigins: false,
      errors: true,
      errorDetails: false,
      hash: false,
      timings: false,
      modules: false,
      warnings: false
    },
    publicPath: paths.urlPrefix,
    port: 3000
  },
  devtool: 'sourcemap',
  entry: {
    app: ['zone.js/dist/zone', './src/main.ts']
  },
  output,
  node: {
    console: false,
    global: true,
    process: true,
    Buffer: false,
    setImmediate: false
  },
  module: {
    rules
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: ['src', 'node_modules']
  },
  plugins,
  optimization: {
    //runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};
