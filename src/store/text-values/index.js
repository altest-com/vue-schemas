import { Api, actions, mutations, getters } from 'vrudex';
import { textValueModel } from './models';
import config from '../../config';

const PAGE_SIZE = 24;

const textValuesApi = new Api(
    config.axios, 
    config.apiPath + 'text-values/'
);

const state = {
    MODEL: textValueModel,
    API: textValuesApi,
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
