module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  },
  // publicPath: './',
  // outputDir: 'dist',
  // devServer: {
  //   port:8888,
  // }
}