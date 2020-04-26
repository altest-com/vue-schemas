<template>

<sections-layout v-if="item && schema" :schema-id="schema.id">
    <template v-slot:section="{ sectionId }">
        <items-value-editors
            class="mt-3"
            :values="sectionValues[sectionId]"
            :style="{maxWidth: formWidth}"
        ></items-value-editors>
    </template>
    <template v-slot:fields>
        <items-value-editors
            :values="sortedValues"
            :style="{maxWidth: formWidth}"
        ></items-value-editors>
    </template>
</sections-layout>

</template>

<script>

import params from '../params';
import ItemsValueEditors from './ItemsValueEditors';
import SectionsLayout from './SectionsLayout';

export default {
    name: 'ItemEditor',

    components: {
        ItemsValueEditors,
        SectionsLayout
    },

    props: {
        itemId: {
            type: [Number, String],
            required: true
        },
        formWidth: {
            type: String,
            default: '100%'
        }
    },

    data() {
        return {
        };
    },

    computed: {

        item() {
            this.$store.dispatch('schemas/items/getItem', this.itemId);
            return this.$store.state.schemas.items.items[this.itemId];
        },

        schema() {
            const schemaId = this.item.schema;
            this.$store.dispatch('schemas/itemSchemas/getItem', schemaId);
            return this.$store.state.schemas.itemSchemas.items[schemaId];
        },

        config() {
            return this.schema.config;
        },

        values() {
            const values = {};
            const state = this.$store.state.schemas;

            Object.keys(params).forEach(key => {
                const valueStore = params[key].valueStore;
                const fieldStore = params[key].fieldStore;
                this.item[valueStore].forEach(valueId => {
                    this.$store.dispatch(`schemas/${valueStore}/getItem`, valueId);
                    const value = state[valueStore].items[valueId];
                    if (value) {
                        const fieldId = value.field;
                        this.$store.dispatch(`schemas/${fieldStore}/getItem`, fieldId);
                        const field = state[fieldStore].items[fieldId];
                        if (field) {
                            values[value.type + value.id] = {
                                id: value.id,
                                type: value.type,
                                order: value.order,
                                section: field.config.section,
                                width: field.config.width
                            };
                        }                        
                    }
                });
            });
            return values;
        },

        sortedValues() {
            return Object.values(this.values).sort(
                (va, vb) => (va.order < vb.order) ? 1 : -1
            );
        },

        sectionValues() {
            const values = {};
            if (this.config.sections.length) {
                const sectionId_ = this.config.sections[0].id;
                this.sortedValues.forEach(value => {
                    const sectionId = value.section || sectionId_;
                    if (values[sectionId]) {
                        values[sectionId].push(value);
                    } else {
                        values[sectionId] = [value];
                    }
                });
            }
            return values;
        }
    },

    methods: {
    }   
};
</script>}

<style lang="scss">
</style>
