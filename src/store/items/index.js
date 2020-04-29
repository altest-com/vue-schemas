import { Api, actions, mutations, getters } from 'vrudex';
import { itemModel } from './models';
import config from '../../config';

const PAGE_SIZE = 24;

const itemsApi = new Api(
    config.axios, 
    config.apiPath + 'items/'
);

const state = {
    MODEL: itemModel,
    API: itemsApi,
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

export {
    itemsApi
};
