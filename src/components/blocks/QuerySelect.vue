<template>

<el-select
    filterable
    :multiple="multiple"
    :disabled="disabled"
    remote
    clearable
    :placeholder="placeholder"                              
    :remote-method="fetchData"
    :loading="querying"
    :automatic-dropdown="false"
    :value="elValue"
    @change="onChange"
>
    <el-option
        v-for="choice in choices"
        :key="choice.id"
        :label="choice.name"
        :value="choice.id"
    ></el-option>
</el-select>

</template>

<script>

export default {
    name: 'QuerySelect',

    props: {
        store: {
            type: String,
            required: true
        },
        value: {
            type: Array,
            default: () => []
        },        
        placeholder: {
            type: String,
            default: 'Seleccionar'
        },
        params: {
            type: Object,
            default: () => {}
        },
        multiple: {
            type: Boolean,
            default: true
        },
        query: {
            type: String,
            default: 'name'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        preload: {
            type: Boolean,
            default: true
        }
    },

    data() {
        return {
            querying: false,
            queriedChoices: [],
            defaultChoices: []
        };
    },

    computed: {
        state() {
            let state = this.$store.state;
            this.store.split('/').forEach(path => {
                state = path ? state[path] : state;
            });
            return state;
        },
        api() {
            return this.state.API;   
        },
        choices() {
            const choices = [];
            this.value.forEach(id => {
                if (id || id === 0) {
                    this.$store.dispatch(`${this.store}/getItem`, id);
                    const choice = this.state.items[id];
                    if (choice) {
                        choices.push({
                            id: choice.id,
                            name: choice.name || choice.id
                        });
                    }
                }                
            });

            const choices_ = this.queriedChoices.length ? 
                this.queriedChoices : this.defaultChoices;

            choices_.forEach(choice_ => {
                if (!choices.some(choice => choice.id === choice_.id)) {
                    choices.push({
                        id: choice_.id,
                        name: choice_.name || choice_.id
                    });
                }
            });
            return choices;          
        },
        elValue() {
            return this.multiple ? this.value : this.value[0]; 
        }
    },

    watch: {
        store(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.setDefaults();
            }
        }
    },

    created() {
        if (this.preload) {
            this.setDefaults();
        }
    },

    methods: {
        onChange(val) {
            if (this.multiple) {
                this.$emit('change', val);
            } else {
                this.$emit('change', (val || val === 0) ? [val] : []);
            }            
            this.queriedChoices = [];
        },

        setDefaults() {
            this.api.fetch({
                limit: 50,
                fields: 'id,name',
                ...this.params
            }).then(({ data }) => {
                const results = data.results || [];
                this.defaultChoices = results.map(choice => {
                    return {
                        id: choice.id,
                        name: choice.name
                    };
                });
            });
        },

        fetchData(query) {
            this.queriedChoices = [];
            if (query && query.length >= 2 && !this.querying) {                
                this.querying = true;                           
                this.api.fetch({
                    [this.query]: query, 
                    fields: 'id,name',
                    ...this.params
                }).then(({ data }) => {
                    const results = data.results || [];
                    this.queriedChoices = results.map(choice => {
                        return {
                            id: choice.id,
                            name: choice.name
                        };
                    });
                }).catch(error => {
                    console.error.error(error);
                }).finally(() => {
                    this.querying = false;
                });                
            }
        }
    }
};
</script>

<style lang="scss">
</style>
