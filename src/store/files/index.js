import { Api, actions, mutations } from 'vrudex';
import { fileModel } from './models';
import config from '../../config';

const PAGE_SIZE = 24;

const filesApi = new Api(
    config.axios, 
    config.apiPath + 'files/'
);

const state = {
    MODEL: fileModel,
    API: filesApi,
    FILTER: null,
    items: {},
    count: 0,
    pageNumber: 0,
    filter: null,
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
