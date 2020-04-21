import { Api, actions, mutations } from 'vrudex';
import { categoryModel } from './models';
import config from '../../config';

const PAGE_SIZE = 24;

const categoriesApi = new Api(
    config.axios, 
    config.apiPath + 'categories/'
);

const state = {
    MODEL: categoryModel,
    API: categoriesApi,
    FILTER: null,
    items: {},
    count: 0,
    pageNumber: 0,
    filter: null,
    orderBy: '',
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

