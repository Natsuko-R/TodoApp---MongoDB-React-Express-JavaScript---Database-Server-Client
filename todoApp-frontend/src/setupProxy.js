const { createProxyMiddleware: proxy } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        proxy('/api', { // 遇到 /api 前缀的请求，就会触发该代理配置
            target: 'http://localhost:8080/', // 请求转发给谁
            changeOrigin: true, // 控制服务器收到的响应头中的 Host 字段值 （建议都写）
            pathRewrite: { '^/api': '' } // 重写请求路径（必须写）
        })
    )
}
