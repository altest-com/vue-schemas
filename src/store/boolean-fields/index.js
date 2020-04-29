import { Api, actions, mutations, getters } from 'vrudex';
import { booleanFieldModel } from './models';
import config from '../../config';

const PAGE_SIZE = 24;

const booleanFieldApi = new Api(
    config.axios, 
    config.apiPath + 'boolean-fields/'
);

const state = {
    MODEL: booleanFieldModel,
    API: booleanFieldApi,
    FILTER: null,
    items: {},
    sortId: [],
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
    mutations,
    getters
};
