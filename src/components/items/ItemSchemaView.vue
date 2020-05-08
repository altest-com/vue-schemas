<template>

<div class="item-schema-view">
    <div 
        v-if="booting" 
        v-loading="true" 
        :style="{'height': '400px'}"
    ></div>

    <sections-layout v-else :schema-id="schema.id">
        <template v-if="config.sections.length" v-slot:section="{ sectionId }">
            <field-views-list
                :fields="sectionFields[sectionId]"
                :focus="false"
            ></field-views-list>
        </template>
        <template v-else v-slot:fields>
            <field-views-list
                :fields="sortedFields"
                :focus="false"
            ></field-views-list>
        </template>
    </sections-layout>
</div>

</template>

<script>

import FieldViewsList from '../schemas/FieldViewsList';
import SectionsLayout from '../schemas/SectionsLayout';
import params from '../../params';
import { loadSchema } from '../loader';

export default {
    name: 'ItemSchemaView',

    components: {
        FieldViewsList,
        SectionsLayout
    },
    
    props: {
        schemaId: {
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
        schema() {
            this.$store.dispatch('schemas/itemSchemas/getItem', this.schemaId);
            return this.state.itemSchemas.items[this.schemaId];
        },
        config() {
            return this.schema.config;
        },
        fields() {
            const fields = {};
            Object.keys(params).forEach(key => {
                const store = params[key].fieldStore;
                this.schema[store].forEach(fieldId => {
                    this.$store.dispatch(`schemas/${store}/getItem`, fieldId);
                    const field = this.state[store].items[fieldId];
                    if (field) {
                        fields[field.type + field.id] = field;
                    }
                });
            });
            return fields;
        },

        sortedFields() {
            return Object.values(this.fields).sort(
                (fa, fb) => (fa.order < fb.order) ? 1 : -1
            );
        },

        sectionFields() {
            const fields = {};
            const sections = this.config.sections;
            if (sections.length) {
                sections.forEach(({ id }) => {
                    fields[id] = [];
                });
                const sectionId_ = sections[0].id;
                this.sortedFields.forEach(field => {
                    const fieldSection = field.config.section;
                    const sectionId = !fields[fieldSection] ? 
                        sectionId_ : fieldSection;
                    fields[sectionId].push(field);
                });
            }
            return fields;
        }
    },

    created() {
        this.booting = true;
        loadSchema(this.$store, this.schemaId).then(() => {
            this.booting = false;
        });
    }
};
</script>

<style lang="scss">
</style>
