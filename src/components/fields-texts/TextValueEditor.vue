<template>

<div v-if="value && field" class="text-value-editor">        
    <el-form-item :label="label">
        <el-input
            :type="field.config.rows > 1 ? 'textarea' : 'text'"
            :value="value.value"
            :rows="field.config.rows" 
            @input="val => onParamChange({value: val})"
        ></el-input>
    </el-form-item>
</div>

</template>

<script>

import ValueEditorMixin from '../fields/ValueEditorMixin';

export default {
    name: 'TextValueEditor',

    mixins: [ValueEditorMixin],

    data() {
        return {
            fieldStore: 'textFields',
            valueStore: 'textValues'
        };
    }
};
</script>

<style lang="scss">
</style>
