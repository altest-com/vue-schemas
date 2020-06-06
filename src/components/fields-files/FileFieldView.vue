<template>

<div v-if="field" class="file-field-view">
    <el-form-item :label="label">
        <ab-file-uploader
            store="schemas/files"
            :disabled="true"
            :multiple="field.multi"
            :value="field.default"
        />
    </el-form-item>
</div>

</template>

<script>

import AbFileUploader from '../blocks/AbFileUploader';
import FieldViewMixin from '../fields/FieldViewMixin';

export default {
    name: 'FileFieldView',

    components: {
        AbFileUploader
    },

    mixins: [FieldViewMixin],
    
    data() {
        return {
            fieldStore: 'fileFields'
        };
    }
};
</script>

<style lang="scss">
</style>
