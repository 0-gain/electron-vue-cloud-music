const path = require('path');
module.exports = {
    lintOnSave:false,
    pluginOptions:{
        electronBuilder:{
            preload: 'src/preload.js',
            nodeIntegration:true
        },
        'style-resources-loader':{
            preProcessor:'less',
            patterns:[
                // 全局变量路径
                path.resolve(__dirname,'./src/assets/css/base.less')
            ]
        }
    },
    devServer:{
        proxy:{
            '/api': {
                // target: 'https://www.codeman.store',
                target: 'http://www.codeman.ink:3000',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
}