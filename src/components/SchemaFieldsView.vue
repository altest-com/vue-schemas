<template>

<div v-if="schema" class="schema-fields-view">
    <template v-if="config.sections.length">
        <el-tabs 
            v-if="config.sectionsType === 'tabs'"
            v-model="curSection"
            :tab-position="config.tabsPosition"
            class="mt-3"
        >
            <el-tab-pane 
                v-for="section in config.sections"
                :key="section.id"
                :label="section.name" 
                :name="section.id"
            >
                <field-views-list
                    class="mt-3"
                    :fields="sectionFields[section.id]"
                ></field-views-list>
            </el-tab-pane>
        </el-tabs>

        <el-collapse 
            v-if="config.sectionsType === 'accordion'"
            v-model="curSection"
            class="mt-3"
            accordion
        >
            <el-collapse-item 
                v-for="section in config.sections"
                :key="section.id"
                :title="section.name" 
                :name="section.id"
            >
                <field-views-list
                    class="mt-3"
                    :fields="sectionFields[section.id]"
                ></field-views-list>
            </el-collapse-item>
        </el-collapse>
    </template>

    <field-views-list
        v-else
        class="mt-3"
        :fields="fields"
    ></field-views-list>
</div>

</template>

<script>

import FieldViewsList from './FieldViewsList';

export default {
    name: 'SchemaFieldsView',

    components: {
        FieldViewsList
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
            curSection_: undefined
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
            if (this.config.sections.length) {
                const sectionId_ = this.config.sections[0].id;
                this.fields.forEach(field => {
                    const sectionId = field.config.section || sectionId_;
                    if (fields[sectionId]) {
                        fields[sectionId].push(field);
                    } else {
                        fields[sectionId] = [field];
                    }
                });
            }
            return fields;
        },
        curSection: {
            get() {
                if (this.section === undefined && this.config.sections.length) {
                    const val = this.config.sections[0].id;
                    this.$emit('update:section', val);
                    return val;                    
                }
                return this.section;
            },
            set(val) {
                this.$emit('update:section', val);
            }
        }
    }
};
</script>

<style lang="scss">
</style>
