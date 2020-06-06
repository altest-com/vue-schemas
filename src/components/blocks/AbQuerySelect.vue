<template>

<el-select
    filterable
    :multiple="multiple"
    :disabled="disabled"
    remote
    :clearable="clearable"
    :popper-class="popperClass"
    :placeholder="placeholder"                              
    :remote-method="fetchData"
    :loading="querying"
    :automatic-dropdown="false"
    :value="value"
    @change="onChange"
>
    <el-option
        v-for="choice in choices"
        :key="choice.id"
        :label="choice.label"
        :value="choice.id"
    >
        <slot :choice="choice"></slot>
    </el-option>
</el-select>

</template>

<script>

export default {
    name: 'AbQuerySelect',

    props: {
        store: {
            type: String,
            required: true
        },
        value: {
            type: null,
            default: null
        },        
        placeholder: {
            type: String,
            default: 'Seleccionar'
        },
        params: {
            type: Object,
            default: () => {}
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
            type: Number,
            default: 24
        },
        labels: {
            type: Array,
            default: () => ['name']
        },
        fields: {
            type: Array,
            default: () => ['name']
        },
        popperClass: {
            type: String,
            default: ''
        },
        clearable: {
            type: Boolean,
            default: true
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
        multiple() {
            return Array.isArray(this.value);
        },
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
            const choices = this.valueChoices.slice();

            const choices_ = this.queriedChoices.length ? 
                this.queriedChoices : this.defaultChoices;

            choices_.forEach(choice_ => {
                if (!choices.some(choice => choice.id === choice_.id)) {
                    choices.push(choice_);
                }
            });
            return choices;
        }
    },

    watch: {
        store(newVal, oldVal) {
            if (this.preload > 0 && newVal !== oldVal) {
                this.setDefaults();
            }
        },
        params() {
            if (this.preload > 0) {
                this.setDefaults();
            }
        },
        value(value) {
            this.updateValueChoices();
        }
    },

    created() {
        this.cachedChoices = {};
        this.updateValueChoices();
        if (this.preload > 0) {
            this.setDefaults();
        }
    },

    methods: {

        buildChoice(data) {
            const label = this.labels.map(val => data[val]).join(' ');
            const choice = {
                id: data.id, 
                label: label
            };
            this.fields.forEach(field => {
                choice[field] = data[field];
            });
            return choice;
        },

        updateValueChoices() {
            const values = this.multiple ? this.value : [this.value];
            const valueChoices = [];
            const proms = [];
            values.forEach(id => {
                if (id || id === 0) {
                    if (this.cachedChoices[id]) {
                        valueChoices.push(this.cachedChoices[id]);
                    } else {
                        proms.push(
                            this.api.retrieve(id).then(({ data }) => {
                                const choice_ = this.buildChoice(data);
                                valueChoices.push(choice_);
                                this.cachedChoices[id] = choice_;
                            })
                        );
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
            this.$emit('change', val);            
            this.queriedChoices = [];
        },

        setDefaults() {
            this.api.fetch({
                limit: this.preload,
                fields: 'id,' + this.fields.join(','),
                ...this.params
            }).then(({ data }) => {
                const results = data.results || [];
                this.defaultChoices = results.map(choice => {
                    return this.buildChoice(choice);
                });
            });
        },

        fetchData(query) {
            this.queriedChoices = [];
            if (query && query.length >= 2 && !this.querying) {                
                this.querying = true;                           
                this.api.fetch({
                    [this.query]: query, 
                    fields: 'id,' + this.fields.join(','),
                    ...this.params
                }).then(({ data }) => {
                    const results = data.results || [];
                    this.queriedChoices = results.map(choice => {
                        return this.buildChoice(choice);
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
