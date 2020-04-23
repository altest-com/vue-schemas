<template>

<div v-if="schema" class="item-schema-view">
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
                    :focus="false"
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
                    :focus="false"
                ></field-views-list>
            </el-collapse-item>
        </el-collapse>
    </template>

    <field-views-list
        v-else
        class="mt-3"
        :fields="sortedFields"
        :focus="false"
    ></field-views-list>
</div>

</template>

<script>

import FieldViewsList from './FieldViewsList';
import params from '../params';

export default {
    name: 'ItemSchemaView',

    components: {
        FieldViewsList
    },
    
    props: {
        schemaId: {
            type: [Number, String],
            required: true
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
            if (this.config.sections.length) {
                const sectionId_ = this.config.sections[0].id;
                this.sortedFields.forEach(field => {
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
                if (this.curSection_ === undefined && this.config.sections.length) {
                    return this.config.sections[0].id;                  
                }
                return this.curSection_;
            },
            set(val) {
                this.curSection_ = val;
            }
        }
    }
};
</script>

<style lang="scss">
</style>
