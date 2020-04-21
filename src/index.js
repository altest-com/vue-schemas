
import config from './config';

const install = (Vue, options = {}) => {
    config.axios = options.axios;
    config.apiPath = options.apiPath;

    const components = require('./components');
    const store = require('./store').default;

    for (const key in components) {
        if (!options.component || options.components.includes['key']) {
            const _key = options.prefix ? options.prefix + key : key;
            Vue.component(_key, components[key]);
        }
    }

    if (options.store) {
        options.store.registerModule('schemas', store);
    }
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default { 
    install 
};
