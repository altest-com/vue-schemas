<template>

<div v-if="field" class="date-field-view">
    <el-form-item :label="label">
        <el-time-picker
            v-if="field.config.dataType === 'time'"
            arrow-control
            :value="field.default"
        ></el-time-picker>
        <el-date-picker
            v-else
            :type="field.config.dataType"
            :value="field.default"
        ></el-date-picker>
    </el-form-item>
</div>

</template>

<script>

import FieldViewMixin from '../fields/FieldViewMixin';

export default {
    name: 'DateFieldView',

    mixins: [FieldViewMixin],
    
    data() {
        return {
            fieldStore: 'dateTimeFields'
        };
    }
};
</script>

<style lang="scss">
</style>
