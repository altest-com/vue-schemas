import { Api, actions, mutations, getters } from 'vrudex';
import { imagesFieldModel } from './models';
import config from '../../config';

const PAGE_SIZE = 24;

const imagesFieldsApi = new Api(
    config.axios, 
    config.apiPath + 'images-fields/'
);

const state = {
    MODEL: imagesFieldModel,
    API: imagesFieldsApi,
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
