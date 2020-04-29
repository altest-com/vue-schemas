import { Api, actions, mutations, getters } from 'vrudex';
import { numberValueModel } from './models';
import config from '../../config';

const PAGE_SIZE = 24;

const numberValuesApi = new Api(
    config.axios, 
    config.apiPath + 'number-values/'
);

const state = {
    MODEL: numberValueModel,
    API: numberValuesApi,
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
