// http://10.26.3.91:9080/model

module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'https://www.climatips.fr'
            }
        }
    }
}
