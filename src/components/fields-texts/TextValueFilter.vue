<template>

<div v-if="field && filter" class="text-value-filter">
    <el-form-item :label="label">
        <el-input
            clearable
            :value="filter[queryIc]"
            @input="val => onParamChange(queryIc, val)"
        ></el-input>
    </el-form-item>
</div>

</template>

<script>

import ValueFilterMixin from '../fields/ValueFilterMixin';

export default {
    name: 'TextValueFilter',

    mixins: [ValueFilterMixin],

    data() {
        return {
            fieldStore: 'textFields'
        };
    },

    computed: {
        queryIc() {
            return `${this.field.id}-text_ic`;
        }
    }
};
</script>
