import { Api, actions, mutations, getters } from 'vrudex';
import { dateTimeFieldModel } from './models';
import config from '../../config';

const PAGE_SIZE = 24;

const dateTimeFieldApi = new Api(
    config.axios, 
    config.apiPath + 'datetime-fields/'
);

const state = {
    MODEL: dateTimeFieldModel,
    API: dateTimeFieldApi,
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
