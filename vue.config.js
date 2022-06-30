module.exports = {
    lintOnSave:false,
    pluginOptions:{
        electronBuilder:{
            preload: 'src/preload.js',
            nodeIntegration:true
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