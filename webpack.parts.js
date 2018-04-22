const webpack = require('webpack')
exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    stats: "errors-only",
    host,
    port,
    https: true,
    open: true,
    overlay: true,
    hotOnly: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
})
exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css/,
        include,
        exclude,
        use: [
          {
            loader: 'style-loader',
            options: {
              hmr: true
            }
          },
          'css-loader']
      }
    ]
  }
})
const ExtractTextPlugin = require('extract-text-webpack-plugin')
exports.extractCSS = ({ include, exclude, use } = {}) => {
  const plugin = new ExtractTextPlugin({
    allChunks: true,
    filename: "[name].css"
  })

  return {
    module: {
      rules: [
        {
          test: /\.css/,
          include,
          exclude,
          use: plugin.extract({
            use,
            fallback: 'style-loader'
          })
        }
      ]
    },
    plugins: [plugin]
  }
}
const PurifyCSSPlugin = require('purifycss-webpack')
exports.purifyCSS = ({ paths } = {}) => ({
  plugins: [new PurifyCSSPlugin({ paths })]
})
exports.autoprefix = () => ({
  loader: "postcss-loader",
  options: {
    plugins: () => [require('autoprefixer')()]
  }
})
const CleanWebpackPlugin = require('clean-webpack-plugin')
exports.clean = path => ({
  plugins: [new CleanWebpackPlugin([path])]
})
const GitRevisionPlugin = require('git-revision-webpack-plugin')
exports.attachRevision = () => ({
  plugins: [
    new webpack.BannerPlugin({
      banner: new GitRevisionPlugin().version()
    })
  ]
})
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin')
exports.minifyJavaScript = () => ({
  optimization: {
    minimizer: [new UglifyWebpackPlugin({ sourceMap: true })]
  }
})
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const cssnano = require('cssnano')
exports.minifyCSS = ({ options }) => ({
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: options,
      canPrint: false
    })
  ]
})