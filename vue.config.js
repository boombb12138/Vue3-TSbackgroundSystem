const path = require('path')

module.exports = {
  // 配置方式一 vuecli提供的属性 类似于webpack中的配置
  outputDir: 'bundler',
  // publicPath: './',
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:5000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
  // 配置方式二 和webpack中的配置完全一样的 configureWebpack对应一个对象 会合并到原来的webpack中
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components'
      }
    }
    // }
    // // 配置方式三 configureWebpack对应一个函数
    // configureWebpack: (config) => {
    //   config.resolve.alias = {
    //     '@': path.resolve(__dirname, 'src'),
    //     components: '@/components'
    //   }
    // }
    // // 配置方式四
    // chainWebpack: (config) => {
    //   config.resolve.alias
    //     .set('@', path.resolve(__dirname, 'src'))
    //     .set('components', '@/components')
    // }
  }
}
