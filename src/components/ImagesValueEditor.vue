<template>

<div v-if="value && field" class="images-value-editor">
    <el-form-item :label="label"> 
        <image-uploader
            store="schemas/images"
            :multiple="field.multi"
            :height="field.config.height"
            :button="field.config.buttonType"
            :display="field.config.displayAs"
            :value="value.value"
            @input="val => onParamChange({value: val})"
        ></image-uploader>
    </el-form-item>
</div>

</template>

<script>

import ImageUploader from './ImageUploader';
import ValueEditorMixin from './ValueEditorMixin';

export default {
    name: 'ImagesValueEditor',

    components: {
        ImageUploader
    },

    mixins: [ValueEditorMixin],

    data() {
        return {
            fieldStore: 'imagesFields',
            valueStore: 'imagesValues'
        };
    }
};
</script>

<style lang="scss">
</style>
