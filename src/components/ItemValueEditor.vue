<template>

<div v-if="value && field" class="item-value-editor">
    <el-form-item :label="field.name">
        <query-select
            :multiple="field.multi"
            :disabled="!hasRelated"
            store="schemas/items"
            :params="params"
            :value="value.value"
            @change="val => onParamChange({value: val})"
        ></query-select>        
    </el-form-item>
</div>

</template>

<script>

import QuerySelect from './QuerySelect';
import ValueEditorMixin from './ValueEditorMixin';

export default {
    name: 'ItemValueEditor',

    components: {
        QuerySelect
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
            return this.hasRelated ? {schema_pk: this.field.targetSchema} : {};
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
