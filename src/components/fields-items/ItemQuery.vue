<template>

<el-select
    filterable
    remote
    placeholder="Seleccionar"
    :clearable="true"
    :automatic-dropdown="false"
    :multiple="field.multi"
    :disabled="!schema"                                    
    :remote-method="loadData"
    :loading="querying"    
    :value="field.multi ? value : value[0]"
    @change="onChange"
>
    <el-option
        v-for="choice in choices"
        :key="choice.value"
        :label="choice.label"
        :value="choice.value"
    >
        <slot :choice="choice" />
    </el-option>
</el-select>

</template>

<script>

const queryName = 'query';
import { itemsApi } from '../../store/items';
import ItemLabelMixin from './ItemLabelMixin';

export default {
    name: 'ItemQuery',

    mixins: [ItemLabelMixin],

    props: {
        fieldId: {
            type: [Number, String]
        },
        value: {
            type: Array,
            default: () => []
        },
        load: {
            type: Number,
            default: 24
        },
        preload: {
            type: Number,
            default: 0
        }
    },

    data() {
        return {
            querying: false,
            queriedChoices: [],
            defaultChoices: [],
            valueChoices: []
        };
    },

    computed: {
        field() {
            return this.$store.state.schemas.itemFields.items[this.fieldId];
        },
        schema() {
            const schemaId = this.field.targetSchema;
            if (schemaId) {
                this.$store.dispatch('schemas/itemSchemas/getItem', schemaId);
                return this.$store.state.schemas.itemSchemas.items[schemaId];
            }
            return null;
        },
        choices() {
            const choices = this.valueChoices.slice();
            const choices_ = this.queriedChoices.length ? 
                this.queriedChoices : this.defaultChoices;

            choices_.forEach(choice_ => {
                if (!choices.some(choice => choice.value === choice_.value)) {
                    choices.push(choice_);
                }
            });
            return choices;
        }
    },

    watch: {
        'value': function(value) {
            this.updateValueChoices();
        },
        'field.targetSchema': function() {
            this.initChoices();
        }
    },

    created() {
        this.initChoices();
    },

    methods: {
        initChoices() {
            this.cachedChoices = {};
            this.updateValueChoices();
            if (this.preload > 0 && this.schema) {
                this.preloadData();
            }
        },

        updateValueChoices() {
            const valueChoices = [];
            const proms = [];
            this.value.forEach(itemId => {
                if (itemId) {
                    const choice = this.cachedChoices[itemId];
                    if (choice) {
                        valueChoices.push(choice);
                    } else {                        
                        proms.push(itemsApi.retrieve(itemId, {
                            fields: 'id,represent'
                        }).then(({ data }) => {
                            proms.push(this.labelItem(data).then(choice => {
                                valueChoices.push(choice);
                                this.cachedChoices[itemId] = choice;
                            }));                                
                        }));
                    }
                }                
            });
            if (proms.length) {
                Promise.all(proms).then(() => {
                    this.valueChoices = valueChoices;                 
                });
            } else {
                this.valueChoices = valueChoices;
            }
        }, 

        onChange(val) {
            this.$emit('change', 
                this.field.multi ? val : (val ? [val] : [])
            );            
            this.queriedChoices = [];
        },

        preloadData() {
            this.apiCall({
                'schema_id': this.schema.id,
                fields: 'id,represent',
                limit: this.preload
            }).then(choices => {
                this.defaultChoices = choices;
            }).catch(error => {
                console.error(error);
            });
        },

        loadData(query) {
            this.queriedChoices = [];
            if (query && query.length >= 2 && !this.querying) {                
                this.querying = true; 
                this.apiCall({
                    'schema_id': this.schema.id,
                    [queryName]: query,
                    fields: 'id,represent',
                    limit: this.load
                }).then(choices => {
                    this.queriedChoices = choices;
                    this.querying = false;
                }).catch(error => {
                    this.querying = false;
                    console.error(error);
                });
            }
        },

        apiCall(params) {
            return new Promise((resolve, reject) => {
                itemsApi.fetch(params).then(({ data }) => {
                    const results = data.results || [];
                    const proms = [];
                    const choices = [];
                    results.forEach(item => {
                        const choice = this.cachedChoices[item.id];
                        if (choice) {
                            choices.push(choice);
                        } else {
                            proms.push(
                                this.labelItem(item).then(choice => {
                                    choices.push(choice);
                                    this.cachedChoices[item.id] = choice;
                                })
                            );
                        }
                    });
                    Promise.all(proms).then(() => {
                        resolve(choices);
                    }).catch(error => {
                        reject(error);
                    });
                }).catch(error => {
                    reject(error);                   
                });
            });            
        }
    }
};
</script>

<style lang="scss">
</style>
