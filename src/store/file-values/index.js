import { Api, actions, mutations, getters } from 'vrudex';
import { fileValueModel } from './models';
import config from '../../config';

const PAGE_SIZE = 24;

const fileValuesApi = new Api(
    config.axios, 
    config.apiPath + 'file-values/'
);

Object.freeze(fileValuesApi);

const state = {
    MODEL: fileValueModel,
    API: fileValuesApi,
    items: {},
    sortId: [],
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
    mutations,
    getters
};
