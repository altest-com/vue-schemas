<template>

<field-editor
    v-if="field"
    :field-id="fieldId" 
    store="imagesFields" 
    class="images-field-editor"
>
    <template v-slot:extend>
        <el-form
            ref="form"
            label-position="top"            
            size="small"
        >
            <el-form-item label="Imagen por defecto">
                <image-uploader
                    store="schemas/images"
                    :multiple="field.multi"
                    button="block"
                    display="labels"
                    :value="field.default"                    
                    @input="val => onParamChange({default: val})"
                ></image-uploader>
            </el-form-item>

            <el-form-item label="Múltiples imágenes" class="mr-2">
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

import ImageUploader from './ImageUploader';
import FieldEditor from './FieldEditor';
import FieldEditorMixin from './FieldEditorMixin';

export default {
    name: 'ImagesFieldEditor',

    components: {
        ImageUploader,
        FieldEditor
    },

    mixins: [FieldEditorMixin],

    data() {
        return {
            fieldStore: 'imagesFields'
        };
    }
};
</script>

<style lang="scss">
</style>
