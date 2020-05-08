<template>

<div v-if="field" class="item-field-view">
    <el-form-item v-if="!isNested" :label="label">
        <query-select
            :multiple="field.multi"
            :disabled="!hasRelated"
            store="schemas/items"
            :params="params"
            :value="field.default"
        ></query-select>                
    </el-form-item>
    <template v-else>
        <label v-if="label" class="el-form-item__label nest">
            {{ label }}
        </label>
        <template v-if="field.multi">
            <div class="flex-row ac">
                <el-button
                    round
                    type="primary"
                    size="small"
                    class="block mb-4 mr-2"
                    icon="el-icon-plus"
                >
                    Añadir {{ field.name }}
                </el-button>
                <el-button
                    round
                    size="small"
                    class="block mb-4"
                    icon="el-icon-delete"
                >
                    Eliminar {{ field.name }}
                </el-button>
            </div>
            <empty
                :title="field.name"
                message="Aún no se han añadido ningún elemento"
                icon-size="2.5em"
                height="200px"
                icon="el-icon-warning-outline"
                background="#eee"
                class="mb-3"
            ></empty>
        </template>
        <item-schema-view v-else :schema-id="field.targetSchema">
        </item-schema-view>
    </template>
</div>

</template>

<script>

import Empty from '../blocks/Empty';
import QuerySelect from '../blocks/QuerySelect';
import FieldViewMixin from '../fields/FieldViewMixin';

export default {
    name: 'ItemFieldView',

    components: {
        QuerySelect,
        Empty,
        ItemSchemaView: () => import('../items/ItemSchemaView')
    },

    mixins: [FieldViewMixin],

    data() {
        return {
            fieldStore: 'itemFields'
        };
    },

    computed: {
        hasRelated() {
            return !!this.field.targetSchema || this.field.targetSchema === 0; 
        },
        params() {
            return this.hasRelated ? {schema_id: this.field.targetSchema} : {};
        },
        isNested() {
            return (
                this.hasRelated && 
                this.field.targetSchema !== this.field.schema && 
                this.field.config.displayAs === 'nest'
            );
        }
    }
};
</script>

<style lang="scss">

.item-field-view {
    .el-form-item__label.nest {
        font-weight: 600;
    }    
}

</style>
