import { Api, actions, mutations, getters } from 'vrudex';
import { booleanValueModel } from './models';
import config from '../../config';

const PAGE_SIZE = 24;

const booleanValuesApi = new Api(
    config.axios, 
    config.apiPath + 'boolean-values/'
);

Object.freeze(booleanValuesApi);

const state = {
    MODEL: booleanValueModel,
    API: booleanValuesApi,
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
