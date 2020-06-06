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
                <ab-file-uploader
                    store="schemas/files"
                    :multiple="field.multi"
                    :value="field.default"                    
                    @input="val => onParamChange({default: val})"
                />
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

import AbFileUploader from '../blocks/AbFileUploader';
import FieldEditor from '../fields/FieldEditor';
import FieldEditorMixin from '../fields/FieldEditorMixin';

export default {
    name: 'FileFieldEditor',

    components: {
        AbFileUploader,
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
