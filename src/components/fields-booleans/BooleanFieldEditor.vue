<template>

<field-editor
    v-if="field"
    :field-id="fieldId" 
    store="booleanFields" 
    class="boolean-field-editor"
>
    <template v-slot:extend>
        <el-form
            ref="form"
            label-position="top"            
            size="small"
        >
            <el-form-item label="Valor por defecto" class="switch">
                <el-switch
                    :value="field.default"                    
                    @change="val => onParamChange({default: val})"
                ></el-switch>
            </el-form-item>

            <el-form-item label="Mostrar como">
                <el-select
                    :value="field.config.displayAs"
                    @change="val => onConfigChange({displayAs: val})"
                >
                    <el-option
                        v-for="option in displayChoices"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="Representar relación" class="switch">
                <el-switch
                    :value="field.represent"                    
                    @change="val => onParamChange({represent: val})"
                ></el-switch>
            </el-form-item>
        </el-form>
    </template>
</field-editor>

</template>

<script>

import { booleanConfigModel as config } from '../../store/boolean-fields/models';
import FieldEditor from '../fields/FieldEditor';
import FieldEditorMixin from '../fields/FieldEditorMixin';

const displayChoices = Object.keys(
    config.DISPLAY_CHOICES
).map(key => ({
    label: config.DISPLAY_CHOICES[key],
    value: key
}));

export default {
    name: 'BooleanFieldEditor',

    components: {
        FieldEditor
    },

    mixins: [FieldEditorMixin],

    data() {
        return {
            displayChoices: displayChoices,
            fieldStore: 'booleanFields'
        };
    }
};
</script>

<style lang="scss">
</style>
