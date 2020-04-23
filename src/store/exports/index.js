import { Api } from 'vrudex';
import config from '../../config';
import { saveAs } from 'file-saver';

const exportApi = new Api(
    config.axios, 
    config.apiPath + 'export/'
);

const importApi = new Api(
    config.axios, 
    config.apiPath + 'import/'
);

const mutations = {
    SET_LOADING(state, loading) {
        state.loading = loading;
    }
};

const actions = {
    export(context, params = {}) {    
        context.commit('SET_LOADING', true);
    
        return new Promise((resolve, reject) => {
            exportApi.download(params).then((response) => {
                const fileNameHeader = 'filename';
                let fileName = response.headers[fileNameHeader];
                if (!fileName) {
                    const date = new Date().toISOString().slice(0, 16);
                    fileName = `schemas-${date}.json`;
                }
                saveAs(response.data, fileName);
                context.commit('SET_LOADING', false);
                resolve();
            }).catch(error => {
                context.commit('SET_LOADING', false);
                reject(error);
            });
        });
    }
};

const state = {
    loading: false
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
};

export {
    exportApi,
    importApi
};
