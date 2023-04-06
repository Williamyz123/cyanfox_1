// const { defineConfig } = require('@vue/cli-service')
module.exports = {
    "publicPath": "",
    "productionSourceMap": false,
    devServer: {
        proxy: "http://localhost:8081" // 这里存放的是真正的服务器
    }
}
