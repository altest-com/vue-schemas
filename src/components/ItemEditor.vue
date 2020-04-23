<template>

<div v-if="item && schema" class="items-editor">
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
                <items-value-editors
                    class="mt-3"
                    :values="sectionValues[section.id]"
                    :style="{maxWidth: formWidth}"
                ></items-value-editors>
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
                <items-value-editors
                    class="mt-3"
                    :values="sectionValues[section.id]"
                    :style="{maxWidth: formWidth}"
                ></items-value-editors>
            </el-collapse-item>
        </el-collapse>
    </template>

    <items-value-editors
        v-else
        :values="sortedValues"
        :style="{maxWidth: formWidth}"
    ></items-value-editors>
    
</div>

</template>

<script>

import params from '../params';
import ItemsValueEditors from './ItemsValueEditors';

export default {
    name: 'ItemEditor',

    components: {
        ItemsValueEditors
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
            curSection_: undefined
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

        curSection: {
            get() {
                if (
                    this.curSection_ === undefined && 
                    this.config.sections.length
                ) {
                    return this.config.sections[0].id;
                }
                return this.curSection_;
            },
            set(val) {
                this.curSection_ = val;
            }
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
                                field: field
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
                    const field = value.field;
                    const sectionId = field.config.section || sectionId_;
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

.items-editor {
    .el-collapse-item__header {
        font-size: 16px;
        font-weight: 700;
    }
    .el-tabs--left .el-tabs__content {
        padding-left: 24px;
    }
}

</style>
