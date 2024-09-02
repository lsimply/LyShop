const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});
module.exports = {
  // 基本路径
  publicPath: process.env.NODE_ENV === 'production' ? '/production-sub-path/' : '/',

  lintOnSave: false,
  // 输出文件目录
  outputDir: 'dist',

  // 静态资源目录 (js, css, img, fonts)
  assetsDir: 'assets',

  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,

  // CSS 相关选项
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false
  },

  // devServer 代理设置
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    https: false,
    open: true,
    proxy: {
      // 配置跨域处理 可以设置你想要代理的接口
      '/api': {
        target: 'http://api.example.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

  // 插件选项
  pluginOptions: {
    // ...
  },

  // configureWebpack 或 chainWebpack 调整内部 webpack 配置
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 生产环境配置
      config.plugins.push(new MyPlugin());
    } else {
      // 开发环境配置
    }
  },

  chainWebpack: config => {
    config.plugin('html').tap(args => {
      if (process.env.NODE_ENV === 'production') {
        // 修改html-webpack-plugin的配置
        args[0].minify.removeComments = true;
      }
      return args;
    });
  }
};
