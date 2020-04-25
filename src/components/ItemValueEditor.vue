<template>

<div v-if="value && field" class="item-value-editor">
    <el-form-item v-if="!editNested" :label="field.name">
        <query-select
            :multiple="field.multi"
            :disabled="!hasRelated"
            store="schemas/items"
            :params="params"
            :value="value.value"
            @change="val => onParamChange({value: val})"
        ></query-select>        
    </el-form-item>
    <template v-else>
        <el-button
            v-if="field.multi"           
            round
            small
            icon="el-icon-plus"
            @click="onAddItem"
        >
            Nuevo
        </el-button>
        <item-editor
            v-for="itemId in value.value"
            :key="itemId"
            :item-id="itemId"
        ></item-editor>   
    </template>
</div>

</template>

<script>

import QuerySelect from './QuerySelect';
import ValueEditorMixin from './ValueEditorMixin';

export default {
    name: 'ItemValueEditor',

    components: {
        QuerySelect,
        ItemEditor: () => import('./ItemEditor')
    },

    mixins: [ValueEditorMixin],
    
    data() {
        return {
            fieldStore: 'itemFields',
            valueStore: 'itemValues'
        };
    },

    computed: {
        hasRelated() {
            return !!this.field.targetSchema || this.field.targetSchema === 0; 
        },
        params() {
            return this.hasRelated ? {schema_id: this.field.targetSchema} : {};
        },
        editNested() {
            return (
                this.hasRelated && 
                this.field.targetSchema !== this.field.schema && 
                this.field.config.displayAs === 'nest'
            );
        }
    },

    created() {
        this.createTarget().catch(() => {
            console.log('Error creating target item');
        });
    },

    methods: {
        onAddItem() {
            this.$store.dispatch('schemas/items/createItem', {
                item: {schema: this.field.targetSchema},
                persist: true
            }).then(({ id }) => {
                this.$store.dispatch(`schemas/itemValues/updateItem`, {
                    persist: true,
                    item: {id: this.valueId, value: [...this.value, id]}
                });
            });
        },
        async createTarget() {
            const state = this.$store.state.schemas;
            let value = state.itemValues.items[this.valueId];
            if (!value) {
                try {
                    value = await this.$store.dispatch(
                        'schemas/itemValues/retrieveItem', this.valueId
                    );
                } catch (error) {
                    console.log('Error retrieving item value');
                    return;
                }
            }

            if (value.value.length) {
                return;
            }
                
            let field = state.itemFields.items[value.field];

            if (!field) {
                try {
                    field = await this.$store.dispatch(
                        'schemas/itemFields/retrieveItem', value.field
                    );
                } catch (error) {
                    console.log('Error retrieving item value field');
                    return;
                }
            }

            if (field.config.displayAs === 'nest' &
                (!!field.targetSchema || 
                field.targetSchema === 0) &&  
                field.targetSchema !== field.schema &&
                !field.multi
            ) {
                this.$store.dispatch('schemas/items/createItem', {
                    item: {schema: field.targetSchema},
                    persist: true
                }).then(({ id }) => {
                    this.$store.dispatch(`schemas/itemValues/updateItem`, {
                        persist: true,
                        item: {id: this.valueId, value: [id]}
                    });
                });
            }
        }
    }
};
</script>

<style lang="scss">

.item-value-editor {
    .no-options {
        background-color: #f4f4f5;
        border-radius: 6px;
        padding-left: 12px;
        color: #9b9b9b;
        font-weight: 600;
    }
}

</style>
