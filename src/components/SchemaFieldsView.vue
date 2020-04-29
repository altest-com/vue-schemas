<template>

<sections-layout
    v-if="schema"
    :schema-id="schemaId" 
    :section="section"
    @update:section="val => $emit('update:section', val)"
>
    <template v-if="config.sections.length" v-slot:section="{ sectionId }">
        <field-views-list
            class="mt-3"
            :fields="sectionFields[sectionId]"
        ></field-views-list>
    </template>
    <template v-else v-slot:fields>
        <field-views-list
            class="mt-3"
            :fields="fields"
        ></field-views-list>
    </template>
</sections-layout>

</template>

<script>

import FieldViewsList from './FieldViewsList';
import SectionsLayout from './SectionsLayout';

export default {
    name: 'SchemaFieldsView',

    components: {
        FieldViewsList,
        SectionsLayout
    },
    
    props: {
        schemaId: {
            type: [Number, String],
            required: true
        },
        fields: {
            type: Array,
            default: () => []
        },
        section: {
            type: String,
            default: undefined
        }
    },

    data() {
        return {
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
        sectionFields() {
            const fields = {};
            const sections = this.config.sections;
            if (sections.length) {
                sections.forEach(({ id }) => {
                    fields[id] = [];
                });
                const sectionId_ = sections[0].id;
                this.fields.forEach(field => {
                    const fieldSection = field.config.section;
                    const sectionId = !fields[fieldSection] ? 
                        sectionId_ : fieldSection;
                    fields[sectionId].push(field);
                });
            }
            return fields;
        }
    }
};
</script>

<style lang="scss">
</style>
