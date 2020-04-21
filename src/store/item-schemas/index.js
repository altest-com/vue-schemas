import { Api, actions, mutations, getters } from 'vrudex';
import { itemSchemaModel } from './models';
import config from '../../config';

const PAGE_SIZE = 24;

const itemSchemaApi = new Api(
    config.axios, 
    config.apiPath + 'item-schemas/'
);

const state = {
    MODEL: itemSchemaModel,
    API: itemSchemaApi,
    FILTER: null,    
    items: {},
    sortId: [],
    count: 0,
    pageNumber: 0,
    filter: null,
    orderBy: 'name',
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
    itemSchemaApi
};
