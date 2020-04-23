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
    <item-schema-view v-else :schema-id="field.targetSchema">
    </item-schema-view>
</div>

</template>

<script>

import QuerySelect from './QuerySelect';
import FieldViewMixin from './FieldViewMixin';

export default {
    name: 'ItemFieldView',

    components: {
        QuerySelect,
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
