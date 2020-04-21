<template>

<field-editor
    v-if="field"
    :field-id="fieldId" 
    store="fileFields" 
    class="file-field-editor"
>
    <template v-slot:extend>
        <el-form
            ref="form"
            label-position="top"            
            size="small"
        >
            <el-form-item label="Archivo por defecto">
                <file-uploader
                    store="schemas/files"
                    :multiple="field.multi"
                    :value="field.default"                    
                    @input="val => onParamChange({default: val})"
                ></file-uploader>
            </el-form-item>

            <el-form-item label="Múltiples archivos" class="mr-2">
                <el-radio-group 
                    :value="field.multi"
                    @input="val => onParamChange({multi: val})"
                >
                    <el-radio-button :label="true">
                        Si
                    </el-radio-button>
                    <el-radio-button :label="false">
                        No
                    </el-radio-button>
                </el-radio-group>
            </el-form-item>
        </el-form>
    </template>
</field-editor>

</template>

<script>

import FileUploader from './FileUploader';
import FieldEditor from './FieldEditor';
import FieldEditorMixin from './FieldEditorMixin';

export default {
    name: 'FileFieldEditor',

    components: {
        FileUploader,
        FieldEditor
    },

    mixins: [FieldEditorMixin],

    data() {
        return {
            fieldStore: 'fileFields'
        };
    }
};
</script>

<style lang="scss">
</style>
