<template>

<div v-if="field && filter" class="number-value-filter">
    <el-form-item :label="label" class="range">
        <el-input-number
            placeholder="Mínimo"
            :value="filter[queryGt]"
            controls-position="right"
            @change="val => onParamChange(queryGt, val)"
        ></el-input-number>
        <span class="px-2">—</span>
        <el-input-number
            placeholder="Máximo"
            :value="filter[queryLt]"
            controls-position="right"
            @change="val => onParamChange(queryLt, val)"
        ></el-input-number>
    </el-form-item>
</div>

</template>

<script>

import ValueFilterMixin from '../fields/ValueFilterMixin';

export default {
    name: 'NumberValueFilter',

    mixins: [ValueFilterMixin],

    data() {
        return {
            fieldStore: 'numberFields'
        };
    },

    computed: {
        queryGt() {
            return `${this.field.id}-number_gt`;
        },
        queryLt() {
            return `${this.field.id}-number_lt`;
        }
    }
};
</script>
