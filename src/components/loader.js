
import params from '../params';

const loadingSchemas = {};
const loadingItems = {};

export function loadFields(store, schema) {
    const proms = [];
    const state = store.state.schemas; 

    Object.keys(params).forEach(key => {
        const path = params[key].fieldStore;
        const fieldsId = schema[path];
        if (fieldsId.length) {
            const fetch = fieldsId.some(fieldId => !state[path].items[fieldId]);
            if (fetch) {               
                const fp = store.dispatch(
                    `schemas/${path}/fetchItems`, {
                        'item_schema_id__in': [schema.id]
                    }
                );
                proms.push(fp);
            }
        }            
    });

    if (schema.choicesFields.length) {
        const cp = store.dispatch(
            `schemas/choices/fetchItems`, {
                'field__item_schema_id__in': [schema.id],
                'limit': null
            }
        );
        proms.push(cp);
    }

    return new Promise((resolve, reject) => {
        Promise.all(proms).then(() => {
            resolve();
        }).catch(error => {
            console.log(error);
            reject(error);
        });
    });
}

export function loadSchema(store, schemaId) {
    let prom = loadingSchemas[schemaId];

    if (prom) {
        return prom;
    } else {
        prom = new Promise((resolve, reject) => {
            const schema = store.state.schemas.itemSchemas.items[schemaId];
    
            if (schema) {
                loadFields(store, schema).then(() => {                    
                    resolve(schema);
                }).catch(error => {
                    reject(error);
                }).finally(() => {
                    loadingSchemas[schemaId] = null;
                });
            } else {
                store.dispatch(
                    'schemas/itemSchemas/retrieveItem', { id: schemaId }
                ).then(schema => {
                    loadFields(store, schema).then(() => {
                        resolve(schema);
                    }).catch(error => {
                        reject(error);
                    }).finally(() => {
                        loadingSchemas[schemaId] = null;
                    });
                }).catch(error => {
                    console.log(error);
                    reject(error);
                });
            }
        });

        loadingSchemas[schemaId] = prom;

        return prom;
    }       
}

export function loadValues(store, item) {
    const proms = [];
    const state = store.state.schemas; 
    Object.keys(params).forEach(key => {
        const path = params[key].valueStore;
        const valuesId = item[path];
        if (item[path].length) {
            const fetch = valuesId.some(id => !state[path].items[id]);
            if (fetch) {
                proms.push(store.dispatch(
                    `schemas/${path}/fetchItems`, {
                        'item_id__in': [item.id]
                    }
                ));
            }
        }            
    });

    return new Promise((resolve, reject) => {
        Promise.all(proms).then(() => {
            resolve();
        }).catch(error => {
            console.log(error);
            reject(error);
        });
    });
}

export function loadItem(store, itemId) {
    let prom = loadingItems[itemId];

    if (prom) {
        return prom;
    } else {
        prom = new Promise((resolve, reject) => {
            const item = store.state.schemas.items.items[itemId];
    
            if (item) {
                loadValues(store, item).then(() => {
                    resolve(item);
                }).catch(error => {
                    reject(error);
                }).finally(() => {
                    loadingItems[itemId] = null;
                });
            } else {
                store.dispatch(
                    'schemas/items/retrieveItem', { id: itemId }
                ).then(item => {
                    loadValues(store, item).then(() => {
                        resolve(item);
                    }).catch(error => {
                        reject(error);
                    }).finally(() => {
                        loadingItems[itemId] = null;
                    });
                }).catch(error => {
                    console.log(error);
                    reject(error);
                });
            }
        }); 

        loadingItems[itemId] = prom;

        return prom;
    }   
}
