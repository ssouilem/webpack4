const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const path = require('path')

const PATHS = {
  app: path.resolve(__dirname, 'app'),
  build: path.resolve(__dirname, 'build'),
  dist: path.resolve(__dirname, 'dist'),
  src: path.resolve(__dirname, 'src'),
}

const excludePaths = [path.resolve(__dirname, 'node_modules')]
const includePaths = [path.resolve(__dirname, './src')]

module.exports = {
  // app: function () {
  //   const app = express()
  //   const indexPath = path.join(__dirname, 'index.html')
  //   const publicPath = express.static(path.join(__dirname, '../dist'))
  //
  //   app.use('/dist', publicPath)
  //   app.use(function (req, res, next) {
  //     res.header('Access-Control-Allow-Origin', '*')
  //     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  //     next()
  //   })
  //   app.get('/', function (_, res) { res.sendFile(indexPath) })
  //
  //   return app
  // },
  devServer: {
    open: true,
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
  entry: {
    app: PATHS.src + '/index.js',
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: includePaths,
        exclude: excludePaths,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
          },
        },
      },
      // // this rule handles images
      // {
      //   test: /\.jpe?g$|\.gif$|\.ico$|\.png$|\.svg$/,
      //   use: 'file-loader?name=[name].[ext]?[hash]'
      // },
      // the following 3 rules handle font extraction
      {
        test: /\.eot(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[path][name].[ext]',
              prefix: 'fonts/',
            },
          },
        ],
      },
      // {
      //    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      //    loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      // },

      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
      {
        test: /\.otf(\?.*)?$/,
        use: 'file-loader?name=/fonts/[name].[ext]&mimetype=application/font-otf',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        // test: /\.less$/,
        // exclude: /node_modules/,
        // use: [
        //   MiniCssExtractPlugin.loader,
        //   'css-loader',
        //   'less-loader',
        //   // MiniCssExtractPlugin.loader,
        //   // {
        //   //     loader: 'css-loader',
        //   //     options: {
        //   //       importLoaders: 1,
        //   //       sourceMap: true,
        //   //       modules: true,
        //   //       localIdentName: '[local]___[hash:base64:5]'
        //   //     }
        //   //   },
        //   //   { loader: 'less-loader' },
        //   //   'less-loader'
        //
        // ],
        test: /\.less$/,
        include: includePaths,
        exclude: excludePaths,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'less-loader',
          options: {
            sourceMap: true,
            importLoaders: 1,
            modules: true,
            paths: [
              path.resolve(__dirname, 'node_modules'),
            ],
          },
        }],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      defaultSizes: 'gzip',
      analyzerMode: 'static',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      ACTIONS: path.resolve(__dirname, 'src/redux/modules'),
      COMPONENTS: path.resolve(__dirname, 'src/components'),
      CONTAINERS: path.resolve(__dirname, 'src/containers'),
      STYLES: path.resolve(__dirname, 'src/styles'),
      IMAGES: path.resolve(__dirname, 'src/styles/images'),
      SRC: path.resolve(__dirname, 'src'),
      FRONT_THEME: path.resolve(__dirname, '/semantic/src/'),
      INTL: path.resolve(__dirname, 'intl'),
      '../../theme.config$': path.resolve(__dirname, '/semantic/src/themes/theme.config'),
    },
  },
}
