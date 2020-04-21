module.exports = {
    chainWebpack: (config) => {
        config.externals({
            'element-ui': 'element-ui'
        });
    }
};
