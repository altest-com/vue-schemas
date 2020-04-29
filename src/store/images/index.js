import { Api, actions, mutations } from 'vrudex';
import { imageModel } from './models';
import config from '../../config';

const PAGE_SIZE = 24;

const imagesApi = new Api(
    config.axios, 
    config.apiPath + 'images/'
);

const state = {
    MODEL: imageModel,
    API: imagesApi,
    FILTER: null,
    items: {},
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
    mutations
};

export {
    imagesApi
};
