const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const Parts = require('./webpack.parts')
const path = require('path')
const glob = require('glob')
// const ErrorOverlayWebpackPlugin = require('error-overlay-webpack-plugin')
const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'dist')
}

require('dotenv').config()

const commonConfig = merge([

  {
    // entry: {
    //     main: path.resolve(__dirname, './src/index.js'),
    //     style: glob.sync("./static/**/*.css")
    // },
    plugins: [
      new HtmlWebpackPlugin()
    ]
  }
])

const productionConfig = merge([
  Parts.minifyJavaScript(),
  {
    optimization: {
      // minimize: false,
      splitChunks: {
        chunks: 'initial'
      }
    }
  },
  Parts.clean(PATHS.build + '/*'),
  Parts.extractCSS({
    use: ['css-loader', Parts.autoprefix()]
  }),
  Parts.purifyCSS({
    paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true })
  }),
  Parts.minifyCSS({
    options: {
      discardComments: {
        removeAll: true
      },
      save: true
    }
  }),
  Parts.attachRevision()
])

const developmentConfig = merge([
  Parts.loadCSS(),
  Parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT
  })
])

module.exports = mode => {
  if (mode === 'production') {
    return merge(commonConfig, productionConfig, { mode })
  }
  return merge(commonConfig, developmentConfig, { mode })
}