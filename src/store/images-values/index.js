import { Api, actions, mutations, getters } from 'vrudex';
import { imagesValueModel } from './models';
import config from '../../config';

const PAGE_SIZE = 24;

const imagesValuesApi = new Api(
    config.axios, 
    config.apiPath + 'images-values/'
);

Object.freeze(imagesValuesApi);

const state = {
    MODEL: imagesValueModel,
    API: imagesValuesApi,
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
