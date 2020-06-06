import { Api, actions, mutations, getters } from 'vrudex';
import { numberValueModel } from './models';
import config from '../../config';

const PAGE_SIZE = 24;

const numberValuesApi = new Api(
    config.axios, 
    config.apiPath + 'number-values/'
);

Object.freeze(numberValuesApi);

const state = {
    MODEL: numberValueModel,
    API: numberValuesApi,
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
