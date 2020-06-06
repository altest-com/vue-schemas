import { Api, actions, mutations, getters } from 'vrudex';
import { fileFieldModel } from './models';
import config from '../../config';

const PAGE_SIZE = 24;

const fileFieldsApi = new Api(
    config.axios, 
    config.apiPath + 'file-fields/'
);

Object.freeze(fileFieldsApi);

const state = {
    MODEL: fileFieldModel,
    API: fileFieldsApi,
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
