import { Api, actions, mutations, getters } from 'vrudex';
import { booleanFieldModel } from './models';
import config from '../../config';

const PAGE_SIZE = 24;

const booleanFieldApi = new Api(
    config.axios, 
    config.apiPath + 'boolean-fields/'
);

Object.freeze(booleanFieldApi);

const state = {
    MODEL: booleanFieldModel,
    API: booleanFieldApi,
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
