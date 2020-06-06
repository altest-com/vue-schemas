<template>

<div v-if="value && field" class="boolean-value-editor">
    <el-form-item 
        :label="label" 
        :class="{'switch': displayAs === 'switch'}"
    >
        <el-switch
            v-if="displayAs === 'switch'"
            :value="value.value"
            @input="val => onParamChange({value: val})"
        ></el-switch>
        <el-radio-group 
            v-else-if="displayAs === 'radio'"
            :value="value.value"
            @input="val => onParamChange({value: val})"
        >
            <el-radio :label="true">Sí</el-radio>
            <el-radio :label="false">No</el-radio>
        </el-radio-group>
        <el-radio-group
            v-else-if="displayAs === 'buttons'"
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

import ValueEditorMixin from '../fields/ValueEditorMixin';

export default {
    name: 'BooleanValueEditor',

    mixins: [ValueEditorMixin],

    data() {
        return {
            fieldStore: 'booleanFields',
            valueStore: 'booleanValues'
        };
    },

    computed: {
        displayAs() {
            return this.field.config.displayAs;
        }
    }
};
</script>

<style lang="scss">
</style>
