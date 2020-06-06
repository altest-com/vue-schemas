<template>

<div v-if="field" class="boolean-field-view">
    <el-form-item 
        :label="label"
        :class="{'switch': field.config.displayAs === 'switch'}"
    >
        <el-switch
            v-if="field.config.displayAs === 'switch'"
            :value="field.default"
        ></el-switch>
        <el-radio-group 
            v-else-if="field.config.displayAs === 'radio'"
            :value="field.default"
        >
            <el-radio :label="true">Sí</el-radio>
            <el-radio :label="false">No</el-radio>
        </el-radio-group>
        <el-radio-group
            v-else-if="field.config.displayAs === 'buttons'"
            :value="field.default"
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

import FieldViewMixin from '../fields/FieldViewMixin';

export default {
    name: 'BooleanFieldView',

    mixins: [FieldViewMixin],
    
    data() {
        return {
            fieldStore: 'booleanFields'
        };
    }
};
</script>

<style lang="scss">
</style>
