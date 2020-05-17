<template>

<div v-if="field && filter" class="boolean-value-filter">
    <el-form-item :label="label">
        <el-select
            clearable
            :value="filter[queryEq]"
            @input="val => onParamChange(queryEq, val)"
        >
            <el-option
                label="Si"
                :value="true"
            ></el-option>
            <el-option
                label="No"
                :value="false"
            ></el-option>
        </el-select>
    </el-form-item>
</div>

</template>

<script>

import ValueFilterMixin from '../fields/ValueFilterMixin';

export default {
    name: 'BooleanValueFilter',

    mixins: [ValueFilterMixin],

    data() {
        return {
            fieldStore: 'booleanFields'
        };
    },

    computed: {
        queryEq() {
            return `${this.field.id}-boolean_eq`;
        }
    }
};
</script>
