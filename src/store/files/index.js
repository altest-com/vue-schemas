import { Api, actions, mutations } from 'vrudex';
import { fileModel } from './models';
import config from '../../config';

const PAGE_SIZE = 24;

const filesApi = new Api(
    config.axios, 
    config.apiPath + 'files/'
);

Object.freeze(filesApi);

const state = {
    MODEL: fileModel,
    API: filesApi,
    items: {},
    count: 0,
    pageNumber: 0,
    pageSize: PAGE_SIZE,
    loading: false,
    getting: {}
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
};

export {
    filesApi
};
