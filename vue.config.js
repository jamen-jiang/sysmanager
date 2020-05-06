module.exports = {
  devServer: {
    // overlay: {
    //     warnings: false,
    //     errors: false
    // },
    port: 8081, // 端口号
    proxy: {
      '/apis': {
          target: 'https://localhost:44348',
          changeOrigin: true,
          ws: true,
          pathRewrite: {
            "^/apis": "" //请求的时候使用这个api就可以
          }
      }
    }
  },
  lintOnSave: false
}