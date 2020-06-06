<template>

<div class="item-view">
    <div 
        v-if="booting" 
        v-loading="true" 
        :style="{'height': '400px'}"
    />

    <sections-layout v-else :schema-id="schema.id">
        <template v-if="config.sections.length" v-slot:section="{ sectionId }">
            <item-values-views
                class="mt-3"
                :values="sectionValues[sectionId]"
                :style="{maxWidth: formWidth}"
            />
        </template>
        <template v-else v-slot:fields>
            <item-values-views
                :values="sortedValues"
                :style="{maxWidth: formWidth}"
            />
        </template>
    </sections-layout>
</div>

</template>

<script>

import params from '../../params';
import ItemValuesViews from './ItemValuesViews';
import SectionsLayout from '../schemas/SectionsLayout';
import { loadSchema, loadItem } from '../loader';

export default {
    name: 'ItemEditor',

    components: {
        ItemValuesViews,
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
            booting: false
        };
    },

    computed: {

        item() {
            return this.$store.state.schemas.items.items[this.itemId];
        },

        schema() {
            const schemaId = this.item.schema;
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
                    const value = state[valueStore].items[valueId];
                    if (value) {
                        const fieldId = value.field;
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
            const sections = this.config.sections;
            if (sections.length) {
                sections.forEach(({ id }) => {
                    values[id] = [];
                });
                const sectionId_ = sections[0].id;
                this.sortedValues.forEach(value => {
                    const valueSection = value.section;
                    const sectionId = !values[valueSection] ? 
                        sectionId_ : valueSection;
                    values[sectionId].push(value);
                });
            }
            return values;
        }
    },

    created() {
        this.booting = true;
        loadItem(this.$store, this.itemId).then((item) => {
            loadSchema(this.$store, item.schema).then(() => {
                this.booting = false;
            });
        });        
    },

    methods: {
    }   
};
</script>

<style lang="scss">
</style>
