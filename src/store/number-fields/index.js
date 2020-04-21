import { Api, actions, mutations, getters } from 'vrudex';
import { numberFieldModel } from './models';
import config from '../../config';

const PAGE_SIZE = 24;

const numberFieldApi = new Api(
    config.axios, 
    config.apiPath + 'number-fields/'
);

const state = {
    MODEL: numberFieldModel,
    API: numberFieldApi,
    FILTER: null,
    items: {},
    sortId: [],
    count: 0,
    pageNumber: 0,
    filter: null,
    orderBy: 'order',
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
