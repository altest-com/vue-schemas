import { itemSchemaApi } from '../item-schemas';
import { categoriesApi } from '../categories';

const staticRoutes = [{
    route: { name: 'SchemasIndex' },
    key: 'SchemasIndex',
    meta: {
        title: 'Esquemas',
        icon: 'dashboard'
    }
}];

const state = {
    routes: staticRoutes
};

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.routes = routes;   
    }
};

function buildTree(array, parent) {
    let tree = [];
    parent = parent !== undefined ? parent : { id: null };

    var children = array.filter(child => child.parent === parent.id);
    if (children.length) {
        if (parent.id === null) {
            tree = children;
        } else {
            parent['children'] = children;
        }
        children.forEach(function(child) {
            buildTree(array, child);
        });
    }
    return tree;
}

const actions = {    
    buildRoutes({ commit }) {  
        return new Promise((resolve, reject) => {
            const sp = itemSchemaApi.fetch({ fields: 'id,name,category' });
            const cp = categoriesApi.fetch({ fields: 'id,name,parent' });
            const routes = [];
            
            sp.then(({ data }) => {
                const results = data.results ? data.results : [];                
                results.forEach(schema => {
                    routes.push({
                        route: { 
                            name: 'ItemsIndex',
                            params: {schemaId: schema.id} 
                        },
                        key: `Items-${schema.id}`,
                        meta: {
                            title: schema.name
                        },
                        parent: schema.category
                    });
                });
            });

            cp.then(({ data }) => {
                const results = data.results ? data.results : [];                
                results.forEach(category => {
                    routes.push({
                        key: `Category-${category.id}`,
                        meta: {
                            title: category.name
                        },
                        id: category.id,
                        parent: category.parent
                    });
                });
            });

            Promise.all([sp, cp]).then(() => {
                const treeRoutes = buildTree(routes);
                commit('SET_ROUTES', staticRoutes.concat({
                    key: 'ItemsIndex',
                    meta: {
                        title: 'Objetos',
                        icon: 'dashboard'
                    },
                    children: treeRoutes
                }));
                resolve(treeRoutes);
            }).catch(error => {
                reject(error);
            });
        });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
