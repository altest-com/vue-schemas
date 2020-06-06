<template>

<div v-if="field" class="images-field-view">
    <el-form-item :label="label">
        <ab-image-uploader
            store="schemas/images"
            :multiple="true"
            :upload-url="uploadUrl"
            :upload-headers="uploadHeaders"
            :disabled="true"
            :height="field.config.height"
            :button="field.config.buttonType"
            :display="field.config.displayAs"
            :value="field.default"
        />
    </el-form-item>
</div>

</template>

<script>

import AbImageUploader from '../blocks/AbImageUploader';
import FieldViewMixin from '../fields/FieldViewMixin';
import { imagesApi } from "../../store/images";


export default {
    name: 'ImagesFieldView',

    components: {
        AbImageUploader
    },

    mixins: [FieldViewMixin],

    data() {
        return {
            fieldStore: 'imagesFields',
            uploadUrl: imagesApi.getUrl(),
            uploadHeaders: imagesApi.getHeader(),
        };
    }
};
</script>

<style lang="scss">
</style>
