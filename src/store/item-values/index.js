import { Api, actions, mutations, getters } from 'vrudex';
import { itemValueModel } from './models';
import config from '../../config';

const PAGE_SIZE = 24;

const itemValuesApi = new Api(
    config.axios, 
    config.apiPath + 'item-values/'
);

const state = {
    MODEL: itemValueModel,
    API: itemValuesApi,
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
