<template>

<div v-if="value && field" class="images-value-editor">
    <el-form-item :label="label"> 
        <ab-image-uploader
            store="schemas/images"
            :multiple="true"
            :upload-url="uploadUrl"
            :upload-headers="uploadHeaders"
            :height="field.config.height"
            :button="field.config.buttonType"
            :display="field.config.displayAs"
            :value="value.value"
            @input="val => onParamChange({value: val})"
        />
    </el-form-item>
</div>

</template>

<script>

import AbImageUploader from '../blocks/AbImageUploader';
import ValueEditorMixin from '../fields/ValueEditorMixin';
import { imagesApi } from "../../store/images";

export default {
    name: 'ImagesValueEditor',

    components: {
        AbImageUploader
    },

    mixins: [ValueEditorMixin],

    data() {
        return {
            fieldStore: 'imagesFields',
            valueStore: 'imagesValues',
            uploadUrl: imagesApi.getUrl(),
            uploadHeaders: imagesApi.getHeader(),
        };
    }
};
</script>

<style lang="scss">
</style>
