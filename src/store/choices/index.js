import { Api, actions, mutations, getters } from 'vrudex';
import { choiceModel } from './models';
import config from '../../config';

const PAGE_SIZE = 24;

const choicesApi = new Api(
    config.axios, 
    config.apiPath + 'choices/'
);

Object.freeze(choicesApi);

const state = {
    MODEL: choiceModel,
    API: choicesApi,
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
