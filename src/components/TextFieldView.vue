<template>

<div class="text-field-view">
    <el-form-item :label="label">
        <el-input
            :type="field.config.rows > 1 ? 'textarea' : 'text'"
            :value="field.default"
            :rows="field.config.rows"
        ></el-input>
    </el-form-item>
</div>

</template>

<script>

import FieldViewMixin from './FieldViewMixin';

export default {
    name: 'TextFieldView',

    mixins: [FieldViewMixin],

    data() {
        return {
            fieldStore: 'textFields'
        };
    }
};
</script>

<style lang="scss">
</style>
