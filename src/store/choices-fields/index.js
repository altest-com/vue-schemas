import { Api, actions, mutations, getters } from 'vrudex';
import { choicesFieldModel } from './models';
import config from '../../config';

const PAGE_SIZE = 24;

const choicesFieldApi = new Api(
    config.axios, 
    config.apiPath + 'choices-fields/'
);

const state = {
    MODEL: choicesFieldModel,
    API: choicesFieldApi,
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
