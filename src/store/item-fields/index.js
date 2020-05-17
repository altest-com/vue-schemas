import { Api, actions, mutations, getters } from 'vrudex';
import { itemFieldModel } from './models';
import config from '../../config';

const PAGE_SIZE = 24;

const itemFieldsApi = new Api(
    config.axios, 
    config.apiPath + 'item-fields/'
);

Object.freeze(itemFieldsApi);

const state = {
    MODEL: itemFieldModel,
    API: itemFieldsApi,
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
