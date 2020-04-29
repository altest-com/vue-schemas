import { Api, actions, mutations, getters } from 'vrudex';
import { itemSchemaModel, schemasFilter } from './models';
import config from '../../config';

const PAGE_SIZE = 24;

const itemSchemaApi = new Api(
    config.axios, 
    config.apiPath + 'item-schemas/'
);

const state = {
    MODEL: itemSchemaModel,
    API: itemSchemaApi,
    FILTER: schemasFilter,    
    items: {},
    sortId: [],
    count: 0,
    pageNumber: 0,
    filter: schemasFilter.create(),
    pageSize: PAGE_SIZE,
    loading: false,
    getting: {},
    fieldKey: null
};

const SET_FIELD = (state, key) => {
    state.fieldKey = key;   
};

function setField(context, key) {
    context.commit('SET_FIELD', key);
}

export default {
    namespaced: true,
    state,
    actions: {...actions, setField},
    mutations: {...mutations, SET_FIELD},
    getters
};

export {
    itemSchemaApi
};
