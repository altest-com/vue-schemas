import { Api, actions, mutations, getters } from 'vrudex';
import { choicesValueModel } from './models';
import config from '../../config';

const PAGE_SIZE = 24;

const choicesValueApi = new Api(
    config.axios, 
    config.apiPath + 'choices-values/'
);

Object.freeze(choicesValueApi);

const state = {
    MODEL: choicesValueModel,
    API: choicesValueApi,
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
