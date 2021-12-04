// http://10.26.3.91:9080/model

module.exports = {
    devServer: {
        proxy: {
            '^/model': {
                target: 'http://10.26.3.91:9080'
            }
        }
    }
}
