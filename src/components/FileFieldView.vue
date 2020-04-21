<template>

<div v-if="field" class="file-field-view">
    <el-form-item :label="field.name">
        <file-uploader
            store="schemas/files"
            :disabled="true"
            :multiple="field.multi"
            :value="field.default"
        ></file-uploader>
    </el-form-item>
</div>

</template>

<script>

import FileUploader from './FileUploader';
import FieldViewMixin from './FieldViewMixin';

export default {
    name: 'FileFieldView',

    components: {
        FileUploader
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
