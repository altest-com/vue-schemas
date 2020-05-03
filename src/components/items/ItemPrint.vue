<template>

<div class="item-print">
    <div 
        v-if="booting" 
        v-loading="true" 
        :style="{'height': '400px'}"
    ></div>

    <template v-else-if="config.sections.length">
        <div v-for="section in config.sections" :key="section.id">
            <div class="section-title"> 
                {{ section.name }}
            </div>
            <item-print-values :values="sectionValues[section.id]">
            </item-print-values>
        </div>
    </template>

    <template v-else>
        <item-print-values :values="sortedValues">
        </item-print-values>
    </template>
</div>

</template>

<script>

import params from '../../params';
import ItemPrintValues from './ItemPrintValues';
import { loadSchema, loadItem } from '../loader';

export default {
    name: 'ItemEditor',

    components: {
        ItemPrintValues
    },

    props: {
        itemId: {
            type: [Number, String],
            required: true
        }
    },

    data() {
        return {
            booting: false
        };
    },

    computed: {

        state() {
            return this.$store.state.schemas;
        },

        item() {
            return this.state.items.items[this.itemId];
        },

        schema() {
            const schemaId = this.item.schema;
            return this.state.itemSchemas.items[schemaId];
        },

        config() {
            return this.schema.config;
        },

        values() {
            const values = {};

            Object.keys(params).forEach(key => {
                const valueStore = params[key].valueStore;
                const fieldStore = params[key].fieldStore;
                this.item[valueStore].forEach(valueId => {
                    const value = this.state[valueStore].items[valueId];
                    if (value) {
                        const fieldId = value.field;
                        const field = this.state[fieldStore].items[fieldId];
                        if (field) {
                            values[value.type + value.id] = {
                                id: value.id,
                                type: value.type,
                                order: value.order,
                                section: field.config.section
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
