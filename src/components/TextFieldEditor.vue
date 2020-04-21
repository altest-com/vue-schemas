<template>

<field-editor
    v-if="field"
    :field-id="fieldId" 
    store="textFields" 
    class="text-field-editor"
>
    <template v-slot:extend>
        <el-form
            ref="form"
            label-position="top"            
            size="small"
        >
            <el-form-item label="Número de filas">
                <el-input-number
                    controls-position="right"
                    :step-strictly="true"
                    :min="1"                       
                    :max="20"
                    :value="field.config.rows"
                    @input="val => onConfigChange({rows: val})"           
                ></el-input-number>
            </el-form-item>
            
            <el-form-item label="Valor por defecto">
                <el-input
                    :type="field.config.rows > 1 ? 'textarea' : 'text'"
                    :value="field.default"
                    :rows="field.config.rows" 
                    @input="val => onParamChange({default: val})"
                ></el-input>
            </el-form-item>
        </el-form>
    </template>
</field-editor>

</template>

<script>

import FieldEditor from './FieldEditor';
import FieldEditorMixin from './FieldEditorMixin';

export default {
    name: 'TextFieldEditor',

    components: {
        FieldEditor
    },

    mixins: [FieldEditorMixin],

    data() {
        return {
            fieldStore: 'textFields'
        };
    }
};
</script>

<style lang="scss">
</style>
