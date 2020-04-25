<template>

<div v-if="field" class="item-field-view">
    <el-form-item v-if="!editNested" :label="field.name">
        <query-select
            :multiple="field.multi"
            :disabled="!hasRelated"
            store="schemas/items"
            :params="params"
            :value="field.default"
        ></query-select>                
    </el-form-item>
    <template v-else>
        <template v-if="field.multi">
            <el-button         
                round
                small
                icon="el-icon-plus"
                @click="onAddItem"
            >
                Nuevo
            </el-button>
            <empty
                :title="field.name"
                :message="`Aún no se añadido ningún ${field.name}`"
                icon-size="3em"
                height="200px"
                icon="el-icon-tickets"
                background="#eee"
            ></empty>
        </template>
        <item-schema-view v-else :schema-id="field.targetSchema">
        </item-schema-view>
    </template>
</div>

</template>

<script>

import Empty from './Empty';
import QuerySelect from './QuerySelect';
import FieldViewMixin from './FieldViewMixin';

export default {
    name: 'ItemFieldView',

    components: {
        QuerySelect,
        Empty,
        ItemSchemaView: () => import('./ItemSchemaView')
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
        editNested() {
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
</style>
