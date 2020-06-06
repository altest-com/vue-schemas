<template>

<div class="item-print">
    <div 
        v-if="booting" 
        v-loading="true" 
        :style="{'height': '400px'}"
    />

    <template v-else-if="config.sections.length">
        <div v-for="section in config.sections" :key="section.id">
            <div class="section-title" :style="titleStyle"> 
                {{ section.name }}
            </div>
            <item-print-values 
                :values="sectionValues[section.id]"
                :layout="config.printLayout"
                :level="level"
                :labels="config.printLabels"
            />
        </div>
    </template>

    <template v-else>
        <item-print-values 
            :values="sortedValues" 
            :layout="config.printLayout"
            :labels="config.printLabels"
            :level="level"
        />
    </template>
</div>

</template>

<script>

import params from '../../params';
import ItemPrintValues from './ItemPrintValues';
import { loadSchema, loadItem } from '../loader';

const maxTitleSize = 18;
const minTitleSize = 12;
const maxTitleMargin = 18;
const minTitleMargin = 12;
const varTitleSize = 0.9;

export default {
    name: 'ItemPrint',

    components: {
        ItemPrintValues
    },

    props: {
        itemId: {
            type: [Number, String],
            required: true
        },
        level: {
            type: Number,
            default: 1
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
                            const key = value.type + value.id;
                            values[key] = {
                                id: value.id,
                                key: key,
                                type: value.type,
                                order: value.order,
                                name: field.name,
                                showLabel: field.config.showLabel,
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
        },

        titleStyle() {
            const ratio = Math.pow(varTitleSize, this.level - 1);
            const size = Math.max(minTitleSize, ratio * maxTitleSize);
            const margin = Math.max(minTitleMargin, ratio * maxTitleMargin);

            return {
                fontSize: size + 'pt',
                marginTop: (2 * margin).toFixed(1) + 'pt',
                marginBottom: margin.toFixed(1) + 'pt' 
            };
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

@import'../../styles/print.scss';

</style>
