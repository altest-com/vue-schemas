<template>

<div v-if="value && field" class="number-value-editor">
    <el-form-item :label="label">
        <el-input-number
            v-if="field.config.displayAs === 'input'"
            controls-position="right"
            :step-strictly="field.config.integer"
            :step="step"
            :min="field.min"                    
            :max="field.max"
            :value="value.value"
            @input="val => onValueChange(val)"           
        ></el-input-number>
        <el-slider
            v-else-if="field.config.displayAs === 'slider'"
            :step="step"
            :min="field.minValue"                    
            :max="field.maxValue"
            :value="value.value"
            @input="val => onValueChange(val)"           
        ></el-slider>
    </el-form-item>
</div>

</template>

<script>

import ValueEditorMixin from '../fields/ValueEditorMixin';

export default {
    name: 'NumberValueEditor',

    mixins: [ValueEditorMixin],

    data() {
        return {
            fieldStore: 'numberFields',
            valueStore: 'numberValues'
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
    },

    methods: {
        onValueChange(value) {
            const value_ = this.value.value;
            // Bug fixing
            if (value === value_ || (!value && value !== 0)) {
                return;
            }
            this.onParamChange({value: value});
        }
    }
};
</script>

<style lang="scss">
</style>
