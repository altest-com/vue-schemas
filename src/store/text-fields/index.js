import { Api, actions, mutations, getters } from 'vrudex';
import { textFieldModel } from './models';
import config from '../../config';

const PAGE_SIZE = 24;

const textFieldApi = new Api(
    config.axios, 
    config.apiPath + 'text-fields/'
);

const state = {
    MODEL: textFieldModel,
    API: textFieldApi,
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
