// webpack.config.js
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')


const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
const webpack = require('webpack')
module.exports = {
  // ...
  configureWebpack:config=>{
    config.plugins.push(AutoImport({
      resolvers: [ElementPlusResolver()],
    }))
  },
  configureWebpack:config=>{
    config.plugins.push( Components({
      resolvers: [ElementPlusResolver()],
    }))
  },
  chainWebpack(config) {
    // 设置 svg-sprite-loader
    // config 为 webpack 配置对象
    // config.module 表示创建一个具名规则，以后用来修改规则
    config.module
      // 规则
      .rule('svg')
      // 忽略
      .exclude.add(resolve('src/icons'))
      // 结束
      .end()
    // config.module 表示创建一个具名规则，以后用来修改规则
    config.module
      // 规则
      .rule('icons')
      // 正则，解析 .svg 格式文件
      .test(/\.svg$/)
      // 解析的文件
      .include.add(resolve('src/icons'))
      // 结束
      .end()
      // 新增了一个解析的loader
      .use('svg-sprite-loader')
      // 具体的loader
      .loader('svg-sprite-loader')
      // loader 的配置
      .options({
        symbolId: 'icon-[name]'
      })
      // 结束
      .end()
    config
      .plugin('ignore')
      .use(
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/)
      )
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  devServer: {
    https:false,
    proxy: {
      // 当你vue请求路径中包含/api，那么vue会自动帮你代理请求到你的后端地址
      // 比如我vue请求的是 '/api/user/getUser'，那么会帮我代理请求到后端地址
        '/api': {
          // 后端地址
            target: "https://lianghj.top:8888/api/private/v1/",
            /**
              官方文档的意思：将主机头的来源更改为目标 URL
              简单理解就是需不需要代理
            **/
            changeOrigin: true,
            /**
              重写目标地址，比如我vue请求的是/api/user/getUser
              经历过重写之后，我们请求的地址是http://localhost:8081/user/getUser
              这里用的是正则表达式，^符号是用来限制开头
              意思就是匹配vue请求的开头是否为/api，是的话就进行重写替换
            **/
            pathRewrite: {
                ["^/api"]: ""
            }
        }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        
        additionalData: //或 prependData:   // 8版本用prependData: 
        `
          @import "@/styles/variables.scss";  // scss文件地址
          @import "@/styles/mixin.scss";     // scss文件地址
        `
      }
    }
  }

  
}