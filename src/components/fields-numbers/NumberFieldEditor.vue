<template>

<field-editor
    v-if="field"
    :field-id="fieldId" 
    store="numberFields" 
    class="number-field-editor"
>
    <template v-slot:extend>
        <el-form
            ref="form"
            label-position="top"            
            size="small"
        >
            <el-form-item label="Número entero" class="switch">
                <el-switch
                    :value="field.config.integer"                    
                    @change="val => onConfigChange({integer: val})"
                ></el-switch>
            </el-form-item>

            <el-form-item label="Valor por defecto">
                <el-input-number 
                    :value="field.default"
                    controls-position="right"
                    :step-strictly="field.config.integer"
                    :step="step"
                    :min="field.minValue"
                    :max="field.maxValue"
                    @change="val => onParamChange({default: val})"
                ></el-input-number>
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

            <div class="flex-row js">
                <el-form-item label="Valor mínimo" class="mr-2">
                    <el-input-number 
                        :value="field.minValue"
                        :step-strictly="field.config.integer"
                        controls-position="right"
                        @change="val => onParamChange({minValue: val})"
                    ></el-input-number>
                </el-form-item>

                <el-form-item label="Valor máximo">
                    <el-input-number 
                        :value="field.maxValue" 
                        :step-strictly="field.config.integer"
                        controls-position="right"
                        @change="val => onParamChange({maxValue: val})"
                    ></el-input-number>
                </el-form-item>
            </div>

            <div class="flex-row js">
                <el-form-item label="Prefijo" class="mr-2">
                    <el-input 
                        :value="field.config.prefix"
                        controls-position="right"
                        @input="val => onConfigChange({prefix: val})"
                    ></el-input>
                </el-form-item>

                <el-form-item label="Sufijo">
                    <el-input 
                        :value="field.config.suffix" 
                        controls-position="right"
                        @input="val => onConfigChange({suffix: val})"
                    ></el-input>
                </el-form-item>
            </div>
        </el-form>
    </template>
</field-editor>

</template>

<script>

import { numberConfigModel } from '../../store/number-fields/models';
import FieldEditor from '../fields/FieldEditor';
import FieldEditorMixin from '../fields/FieldEditorMixin';

const displayChoices = Object.keys(
    numberConfigModel.DISPLAY_CHOICES
).map(key => ({
    label: numberConfigModel.DISPLAY_CHOICES[key],
    value: key
}));

export default {
    name: 'NumberFieldEditor',

    components: {
        FieldEditor
    },

    mixins: [FieldEditorMixin],

    data() {
        return {
            displayChoices: displayChoices,
            fieldStore: 'numberFields'
        };
    },

    computed: {
        step() {
            const min = this.field.minValue;
            const max = this.field.maxValue;
            if (!this.field.config.integer && 
                (min || min === 0) && (max || max === 0)
            ) {
                return Math.max(0, (max - min) / 100);
            }
            return 1;
        }
    }
};
</script>

<style lang="scss">
</style>
