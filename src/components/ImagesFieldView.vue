<template>

<div v-if="field" class="images-field-view">
    <el-form-item :label="field.name">
        <image-uploader
            store="schemas/images"
            :multiple="field.multi"
            :disabled="true"
            button="drag"
            display="carousel"
            :value="field.default"
        ></image-uploader>
    </el-form-item>
</div>

</template>

<script>

import ImageUploader from './ImageUploader';
import FieldViewMixin from './FieldViewMixin';

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
