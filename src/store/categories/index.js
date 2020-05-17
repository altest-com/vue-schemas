import { Api, actions, mutations } from 'vrudex';
import { categoryModel } from './models';
import config from '../../config';

const PAGE_SIZE = 24;

const categoriesApi = new Api(
    config.axios, 
    config.apiPath + 'categories/'
);

Object.freeze(categoriesApi);

const state = {
    MODEL: categoryModel,
    API: categoriesApi,
    items: {},
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
    mutations
};

export {
    categoriesApi
};

