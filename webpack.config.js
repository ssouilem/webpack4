const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
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
         loader: 'file-loader'
      },
      {
        test: /\.otf(\?.*)?$/,
        use: 'file-loader?name=/fonts/[name].[ext]&mimetype=application/font-otf'
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
        //   //     loader: "css-loader",
        //   //     options: {
        //   //       importLoaders: 1,
        //   //       sourceMap: true,
        //   //       modules: true,
        //   //       localIdentName: "[local]___[hash:base64:5]"
        //   //     }
        //   //   },
        //   //   { loader: 'less-loader' },
        //   //   "less-loader"
        //
        // ],
        test: /\.less$/,
          use: [{
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }, {
            loader: 'less-loader', options: {
              paths: [
                path.resolve(__dirname, 'node_modules')
              ]
            }
          }]
      }
    ],
  },
  devServer: {
    historyApiFallback: true,
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
      INTL: path.resolve(__dirname,'intl'),
      '../../theme.config$': path.resolve(__dirname, '/semantic/src/themes/theme.config'),
    },
  },
}
