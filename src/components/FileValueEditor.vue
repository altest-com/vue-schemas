<template>

<div v-if="value && field" class="file-value-editor">  
    <el-form-item :label="field.name"> 
        <file-uploader
            store="schemas/files"
            :multiple="field.multi"
            :value="value.value"                    
            @input="val => onParamChange({value: val})"
        ></file-uploader>
    </el-form-item>
</div>

</template>

<script>

import ValueEditorMixin from './ValueEditorMixin';
import FileUploader from './FileUploader';

export default {
    name: 'FileValueEditor',

    components: {
        FileUploader
    },

    mixins: [ValueEditorMixin],
    
    data() {
        return {
            fieldStore: 'fileFields',
            valueStore: 'fileValues'
        };
    }
};
</script>

<style lang="scss">
</style>
