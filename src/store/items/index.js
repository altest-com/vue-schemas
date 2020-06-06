import Vue from 'vue';
import { Api, actions, mutations, getters } from 'vrudex';
import { itemModel } from './models';
import config from '../../config';

const PAGE_SIZE = 24;

const itemsApi = new Api(
    config.axios, 
    config.apiPath + 'items/'
);

Object.freeze(itemsApi);

const state = {
    MODEL: itemModel,
    API: itemsApi,    
    items: {},
    sortId: [],
    count: 0,
    pageNumber: 0,
    filters: {},
    pageSize: PAGE_SIZE,
    loading: false,
    getting: {}
};

const _actions = {
    createFilter({ commit }, filter) {
        commit('CREATE_FILTER', filter);
    },
    updateFilter({ commit }, filter) {
        commit('UPDATE_FILTER', filter);
    }
};

const _mutations = {
    CREATE_FILTER(state, {id, ...params}) {
        Vue.set(state.filters, id, params);
    },
    UPDATE_FILTER(state, {id, ...params}) {
        if (!state.filters[id]) {
            Vue.set(state.filters, id, params);
        } else {
            for (const key in params) {
                Vue.set(state.filters[id], key, params[key]);
            }
        }
    }
};

export default {
    namespaced: true,
    state,
    actions: {...actions, ..._actions},
    mutations: {...mutations, ..._mutations},
    getters
};

export {
    itemsApi
};
