<template>

<div v-if="field" class="images-field-view">
    <el-form-item :label="label">
        <image-uploader
            store="schemas/images"
            :multiple="field.multi"
            :disabled="true"
            :height="field.config.height"
            :button="field.config.buttonType"
            :display="field.config.displayAs"
            :value="field.default"
        ></image-uploader>
    </el-form-item>
</div>

</template>

<script>

import ImageUploader from '../blocks/ImageUploader';
import FieldViewMixin from '../fields/FieldViewMixin';

export default {
    name: 'ImagesFieldView',

    components: {
        ImageUploader
    },

    mixins: [FieldViewMixin],

    data() {
        return {
            fieldStore: 'imagesFields'
        };
    }
};
</script>

<style lang="scss">
</style>
