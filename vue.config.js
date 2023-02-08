const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 关闭 eslint 校检
  lintOnSave: false,
  // 取消打包时产生的map文件
  productionSourceMap: false,
  transpileDependencies: true,
  devServer: {
    proxy: {
      // 代表只有路径后面有 api 时才会调用这个代理
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn'
      }
    }
  }
})
