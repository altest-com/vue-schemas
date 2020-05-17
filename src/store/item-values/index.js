import { Api, actions, mutations, getters } from 'vrudex';
import { itemValueModel } from './models';
import config from '../../config';

const PAGE_SIZE = 24;

const itemValuesApi = new Api(
    config.axios, 
    config.apiPath + 'item-values/'
);

Object.freeze(itemValuesApi);

const state = {
    MODEL: itemValueModel,
    API: itemValuesApi,
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
