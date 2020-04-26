<template>

<div v-if="value && field" class="boolean-value-editor">
    <el-form-item 
        :label="label" 
        :class="{'switch': field.config.displayAs === 'switch'}"
    >
        <el-switch
            v-if="field.config.displayAs === 'switch'"
            :value="value.value"
            @input="val => onParamChange({value: val})"
        ></el-switch>
        <el-radio-group 
            v-else-if="field.config.displayAs === 'radio'"
            :value="value.value"
            @input="val => onParamChange({value: val})"
        >
            <el-radio :label="true">Sí</el-radio>
            <el-radio :label="false">No</el-radio>
        </el-radio-group>
        <el-radio-group
            v-else-if="field.config.displayAs === 'buttons'"
            :value="value.value"
            @input="val => onParamChange({value: val})"
        >
            <el-radio-button :label="true">
                Sí
            </el-radio-button>
            <el-radio-button :label="false">
                No
            </el-radio-button>
        </el-radio-group>
    </el-form-item>
</div>

</template>

<script>

import ValueEditorMixin from './ValueEditorMixin';

export default {
    name: 'BooleanValueEditor',

    mixins: [ValueEditorMixin],

    data() {
        return {
            fieldStore: 'booleanFields',
            valueStore: 'booleanValues'
        };
    }
};
</script>

<style lang="scss">
</style>
