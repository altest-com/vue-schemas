<template>

<div v-if="value && field" class="date-value-editor">
    <el-form-item :label="label">
        <el-time-picker
            v-if="field.config.dataType === 'time'"
            arrow-control
            :value="value.value"
            @input="val => onParamChange({value: val})"
        ></el-time-picker>
        <el-date-picker
            v-else
            :type="field.config.dataType"
            :value="value.value"
            @input="val => onParamChange({value: val})"
        ></el-date-picker>
    </el-form-item>
</div>

</template>

<script>

import ValueEditorMixin from './ValueEditorMixin';

export default {
    name: 'DateValueEditor',
    mixins: [ValueEditorMixin],
    data() {
        return {
            fieldStore: 'dateTimeFields',
            valueStore: 'dateTimeValues'
        };
    }
};
</script>

<style lang="scss">
</style>
