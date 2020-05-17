<template>

<div v-if="value && field" class="item-value-editor">
    <el-form-item v-if="!editNested" :label="label">
        <item-query
            :field-id="field.id"
            :value="value.value"
            @change="val => onParamChange({value: val})"
        />     
    </el-form-item>
    <template v-else>
        <label v-if="label" class="el-form-item__label">{{ label }}</label>
        <template v-if="field.multi">
            <div class="flex-row ac">
                <el-button
                    round
                    type="primary"
                    size="small"
                    class="block mb-4 mr-2"
                    icon="el-icon-plus"
                    @click="onAddItem"
                >
                    Añadir {{ field.name }}
                </el-button>
                <el-button
                    round
                    :disabled="!value.value.length"
                    size="small"
                    class="block mb-4"
                    icon="el-icon-delete"
                    @click="onDelItem"
                >
                    Eliminar {{ field.name }}
                </el-button>
            </div>

            <template v-if="value.value.length">
                <ab-step-views 
                    v-if="field.config.listAs === 'steps'"
                    v-model="step"
                    size="small"
                    :nsteps="value.value.length"
                >
                    <item-editor :item-id="value.value[step]">
                    </item-editor>
                </ab-step-views>
                <template v-if="field.config.listAs === 'blocks'">
                    <item-editor
                        v-for="itemId in value.value"
                        :key="itemId"
                        :item-id="itemId"
                    ></item-editor>
                </template>
            </template>
            <empty
                v-else
                :title="field.name"
                message="Aún no se han añadido ningún elemento"
                icon-size="2.5em"
                height="200px"
                icon="el-icon-warning-outline"
                background="#eee"
                class="mb-3"
            ></empty>            
        </template>
        <template v-else>
            <item-editor
                v-for="itemId in value.value"
                :key="itemId"
                :item-id="itemId"
            ></item-editor>
        </template> 
    </template>
</div>

</template>

<script>

import ItemQuery from './ItemQuery';
import ValueEditorMixin from '../fields/ValueEditorMixin';
import AbStepViews from '../blocks/AbStepViews';
import Empty from '../blocks/Empty';

export default {
    name: 'ItemValueEditor',

    components: {
        ItemQuery,
        Empty,
        AbStepViews,
        ItemEditor: () => import('../items/ItemEditor')
    },

    mixins: [ValueEditorMixin],
    
    data() {
        return {
            fieldStore: 'itemFields',
            valueStore: 'itemValues',
            step: 0
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
                    item: {id: this.valueId, value: [...this.value.value, id]}
                }).then(() => {
                    this.step = this.value.value.length - 1;
                });
            });
        },
        onDelItem() {
            if (this.step >= 0 && this.step < this.value.value.length) {
                const itemId = this.value.value[this.step];
                this.step = Math.max(this.step - 1, 0);

                this.$store.dispatch(`schemas/itemValues/updateItem`, {
                    persist: true,
                    item: {
                        id: this.valueId, 
                        value: this.value.value.filter(val => val !== itemId)                            
                    }
                }).then(() => {
                    this.$store.dispatch('schemas/items/destroyItem', itemId);
                });               
            }
        },
        async createTarget() {
            const state = this.$store.state.schemas;
            let value = state.itemValues.items[this.valueId];
            if (!value) {
                try {
                    value = await this.$store.dispatch(
                        'schemas/itemValues/retrieveItem', { id: this.valueId }
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
                        'schemas/itemFields/retrieveItem', { id: value.field }
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
