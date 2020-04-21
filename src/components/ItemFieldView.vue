<template>

<div v-if="field" class="item-field-view">
    <el-form-item :label="field.name">
        <query-select
            :multiple="field.multi"
            :disabled="!hasRelated"
            store="schemas/items"
            :params="params"
            :value="field.default"
        ></query-select>                
    </el-form-item>
</div>

</template>

<script>

import QuerySelect from './QuerySelect';
import FieldViewMixin from './FieldViewMixin';

export default {
    name: 'ItemFieldView',

    components: {
        QuerySelect
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
            return this.hasRelated ? {schema_pk: this.field.targetSchema} : {};
        }
    }
};
</script>

<style lang="scss">
</style>
