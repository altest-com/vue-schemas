import { Api, actions, mutations, getters } from 'vrudex';
import { dateTimeValueModel } from './models';
import config from '../../config';

const PAGE_SIZE = 24;

const dateTimeValuesApi = new Api(
    config.axios, 
    config.apiPath + 'datetime-values/'
);

const state = {
    MODEL: dateTimeValueModel,
    API: dateTimeValuesApi,
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
