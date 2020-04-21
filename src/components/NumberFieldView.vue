<template>

<div v-if="field" class="number-field-view">
    <el-form-item :label="field.name">
        <el-input-number
            v-if="field.config.displayAs === 'input'"
            :value="field.default"                   
            controls-position="right"
        ></el-input-number>
        <el-slider
            v-else-if="field.config.displayAs === 'slider'"
            :value="field.default"
        ></el-slider>
    </el-form-item>
</div>

</template>

<script>

import FieldViewMixin from './FieldViewMixin';

export default {
    name: 'NumberFieldView',
    
    props: {
        fieldId: {
            type: [Number, String],
            required: true
        }
    },

    mixins: [FieldViewMixin],

    data() {
        return {
            fieldStore: 'numberFields'
        };
    }
};
</script>

<style lang="scss">
</style>
