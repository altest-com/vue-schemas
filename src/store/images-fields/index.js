import { Api, actions, mutations, getters } from 'vrudex';
import { imagesFieldModel } from './models';
import config from '../../config';

const PAGE_SIZE = 24;

const imagesFieldsApi = new Api(
    config.axios, 
    config.apiPath + 'images-fields/'
);

Object.freeze(imagesFieldsApi);

const state = {
    MODEL: imagesFieldModel,
    API: imagesFieldsApi,
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
