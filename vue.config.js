// const { defineConfig } = require('@vue/cli-service')
module.exports = {
    "publicPath": "",
    "productionSourceMap": false,
    devServer: {
        proxy: {
            '/trans': {
                target: 'http://api.fanyi.baidu.com/api',
                changeOrigin: true
            },
            "/sdapi": {
                target: "http://127.0.0.1:7860", // 接口的域名
                changeOrigin: true
            }
        },
    },
}
