import { Api, actions, mutations } from 'vrudex';
import { imageModel } from './models';
import config from '../../config';

const PAGE_SIZE = 24;

const imagesApi = new Api(
    config.axios, 
    config.apiPath + 'images/'
);

Object.freeze(imagesApi);

const state = {
    MODEL: imageModel,
    API: imagesApi,
    items: {},
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
    mutations
};

export {
    imagesApi
};
