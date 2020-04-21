import { Api, actions, mutations, getters } from 'vrudex';
import { booleanValueModel } from './models';
import config from '../../config';

const PAGE_SIZE = 24;

const booleanValuesApi = new Api(
    config.axios, 
    config.apiPath + 'boolean-values/'
);

const state = {
    MODEL: booleanValueModel,
    API: booleanValuesApi,
    FILTER: null,
    items: {},
    sortId: [],
    count: 0,
    pageNumber: 0,
    filter: null,
    orderBy: 'created_at',
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
