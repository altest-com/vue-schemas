<template>

<field-editor 
    v-if="field"
    :field-id="fieldId" 
    store="dateTimeFields" 
    class="datetime-field-editor"
>
    <template v-slot:extend>
        <el-form
            ref="form"
            label-position="top"            
            size="small"
        >
            <el-form-item label="Tipo de dato">
                <el-select
                    :value="field.config.dataType"
                    @change="val => onConfigChange({dataType: val})"
                >
                    <el-option
                        v-for="option in typeChoices"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="Valor por defecto">
                <el-time-picker
                    v-if="field.config.dataType === 'time'"
                    arrow-control
                    :value="field.default"
                    @input="val => onParamChange({default: val})"
                ></el-time-picker>
                <el-date-picker
                    v-else
                    :type="field.config.dataType"
                    :value="field.default"
                    @input="val => onParamChange({default: val})"
                ></el-date-picker>
            </el-form-item>

            <div class="flex-row js">

                <el-form-item label="Valor mínimo" class="mr-2">
                    <el-time-picker
                        v-if="field.config.dataType === 'time'"
                        arrow-control
                        :value="field.minValue"
                        @input="val => onParamChange({minValue: val})"
                    ></el-time-picker>
                    <el-date-picker
                        v-else
                        :type="field.config.dataType"
                        :value="field.maxValue"
                        @input="val => onParamChange({maxValue: val})"
                    ></el-date-picker>
                </el-form-item>

                <el-form-item label="Valor máximo">
                    <el-time-picker
                        v-if="field.config.dataType === 'time'"
                        arrow-control
                        :value="field.maxValue"
                        @input="val => onParamChange({maxValue: val})"
                    ></el-time-picker>
                    <el-date-picker
                        v-else
                        :type="field.config.dataType"
                        :value="field.maxValue"
                        @input="val => onParamChange({maxValue: val})"
                    ></el-date-picker>
                </el-form-item>
            </div>
        </el-form>
    </template>
</field-editor>

</template>

<script>

import { dateConfigModel } from '../../store/datetime-fields/models';
import FieldEditor from '../fields/FieldEditor';
import FieldEditorMixin from '../fields/FieldEditorMixin';

const typeChoices = Object.keys(
    dateConfigModel.TYPE_CHOICES
).map(key => ({
    label: dateConfigModel.TYPE_CHOICES[key],
    value: key
}));

export default {
    name: 'DatetimeFieldEditor',

    components: {
        FieldEditor
    },

    mixins: [FieldEditorMixin],

    data() {
        return {
            typeChoices: typeChoices,
            fieldStore: 'dateTimeFields',
            pickerOptions: {
                disabledDate: (date) => {
                    const min = this.field.minValue;
                    const max = this.field.maxValue;
                    if (min && date.getTime() < min.getTime()) {
                        return true;
                    } else if (max && date.getTime() > max.getTime()) {
                        return true;
                    }
                    return false;
                }
            }
        };
    }
};
</script>

<style lang="scss">
</style>
