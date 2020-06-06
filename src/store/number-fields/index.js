import { Api, actions, mutations, getters } from 'vrudex';
import { numberFieldModel } from './models';
import config from '../../config';

const PAGE_SIZE = 24;

const numberFieldApi = new Api(
    config.axios, 
    config.apiPath + 'number-fields/'
);

Object.freeze(numberFieldApi);

const state = {
    MODEL: numberFieldModel,
    API: numberFieldApi,
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
