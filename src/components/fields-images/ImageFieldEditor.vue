<template>

<field-editor
    v-if="field"
    :field-id="fieldId" 
    store="imagesFields" 
    class="image-field-editor"
>
    <template v-slot:extend>
        <el-form
            ref="form"
            label-position="top"            
            size="small"
        >
            <el-form-item label="Imagen por defecto">
                <ab-image-uploader
                    store="schemas/images"
                    :multiple="true"
                    :upload-url="uploadUrl"
                    :upload-headers="uploadHeaders"
                    button="block"
                    display="labels"
                    :value="field.default"                    
                    @input="val => onParamChange({default: val})"
                />
            </el-form-item>

            <el-form-item label="Múltiples imágenes" class="switch">
                <el-switch
                    :value="field.multi"           
                    @change="val => onParamChange({multi: val})"
                ></el-switch>
            </el-form-item>

            <el-form-item label="Altura de las imágenes">
                <el-input
                    :value="field.config.height"                    
                    @input="val => onConfigChange({height: val})"                    
                ></el-input>
            </el-form-item>

            <el-form-item label="Mostrar imágenes como">
                <el-select
                    :value="field.config.displayAs"
                    @change="val => onConfigChange({displayAs: val})"
                >
                    <el-option
                        v-for="option in displayChoices"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="Tipo de control">
                <el-select
                    :value="field.config.buttonType"
                    @change="val => onConfigChange({buttonType: val})"
                >
                    <el-option
                        v-for="option in buttonChoices"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                    ></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </template>
</field-editor>

</template>

<script>

import { imageConfigModel as config } from '../../store/images-fields/models';
import { imagesApi } from '../../store/images';
import AbImageUploader from '../blocks/AbImageUploader';
import FieldEditor from '../fields/FieldEditor';
import FieldEditorMixin from '../fields/FieldEditorMixin';

const displayChoices = Object.keys(
    config.DISPLAY_CHOICES
).map(key => ({
    label: config.DISPLAY_CHOICES[key],
    value: key
}));

const buttonChoices = Object.keys(
    config.BUTTON_CHOICES
).map(key => ({
    label: config.BUTTON_CHOICES[key],
    value: key
}));

export default {
    name: 'ImageFieldEditor',

    components: {
        AbImageUploader,
        FieldEditor
    },

    mixins: [FieldEditorMixin],

    data() {
        return {
            fieldStore: 'imagesFields',
            displayChoices: displayChoices,
            buttonChoices: buttonChoices,
            uploadUrl: imagesApi.getUrl(),
            uploadHeaders: imagesApi.getHeader(),
        };
    }
};
</script>

<style lang="scss">
</style>
