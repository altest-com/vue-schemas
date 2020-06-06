<template>

<div v-if="value && field" class="file-value-editor">  
    <el-form-item :label="label"> 
        <ab-file-uploader
            store="schemas/files"
            :multiple="field.multi"
            :value="value.value"                    
            @input="val => onParamChange({value: val})"
        />
    </el-form-item>
</div>

</template>

<script>

import ValueEditorMixin from '../fields/ValueEditorMixin';
import AbFileUploader from '../blocks/AbFileUploader';

export default {
    name: 'FileValueEditor',

    components: {
        AbFileUploader
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
