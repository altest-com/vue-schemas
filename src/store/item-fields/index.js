import { Api, actions, mutations, getters } from 'vrudex';
import { itemFieldModel } from './models';
import config from '../../config';

const PAGE_SIZE = 24;

const itemFieldsApi = new Api(
    config.axios, 
    config.apiPath + 'item-fields/'
);

const state = {
    MODEL: itemFieldModel,
    API: itemFieldsApi,
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
