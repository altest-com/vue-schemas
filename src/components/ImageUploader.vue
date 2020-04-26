<template>

<div class="image-uploader">

    <template v-if="display === 'carousel'">
        <empty
            v-if="images.length === 0"
            v-loading="loading"
            title="Imagen"
            message=""
            icon-size="3em"
            :height="height"
            icon="el-icon-camera-solid"
            background="#eee"
        ></empty>
        
        <el-carousel 
            v-else-if="multiple"
            :autoplay="false"
            :height="height"
        >
            <el-carousel-item
                v-for="image in images"
                :key="image.id"
            >
                <image-overlay 
                    :image="image.url" 
                    :height="height"
                    width="100%"
                >
                    <div class="actions flex-row ac jc">
                        <el-button
                            icon="el-icon-delete"
                            size="small"
                            type="text"
                            class="mr-3"
                            @click="onRemoveImage(image.id)"
                        >
                            Eliminar
                        </el-button>
                        <el-button
                            icon="el-icon-view" 
                            size="small"
                            type="text"
                            @click="onPreviewImage(image.url)"
                        >
                            Ampliar
                        </el-button>
                    </div>
                </image-overlay>
            </el-carousel-item>
        </el-carousel>

        <image-overlay
            v-else
            :image="images[0].url" 
            :height="height"
            width="100%"
        >
            <div class="actions flex-row ac jc">
                <el-button
                    icon="el-icon-delete"
                    size="small"
                    type="text"
                    class="mr-3"
                    @click="onRemoveImage(images[0].id)"
                >
                    Eliminar
                </el-button>
                <el-button
                    icon="el-icon-view" 
                    size="small"
                    type="text"
                    @click="onPreviewImage(images[0].url)"
                >
                    Ampliar
                </el-button>
            </div>
        </image-overlay>
    </template>

    <template v-else-if="display === 'labels'">
        <div v-if="images.length" class="image-list">
            <div 
                v-for="image in images" 
                :key="image.id" 
                class="image-label"
            >
                <div class="name" @click="onPreviewImage(image.url)"> 
                    {{ image.name }} 
                </div>
                <el-button 
                    type="text" 
                    icon="el-icon-close" 
                    size="small"
                    @click="onRemoveImage(image.id)"
                ></el-button>
            </div>            
        </div>
    </template>    

    <el-upload
        class="upload"
        :disabled="disabled || loading"
        :class="{'has-labels': display === 'labels'}"
        :drag="button === 'drag'"
        :multiple="multiple"
        :name="imageUploadName"
        :action="imageUploadUrl"
        :headers="imageUploadHeader"
        :before-upload="onBeforeUploadImage"
        :on-success="onSuccessImageUpload"
        :on-error="onImageUploadOnError"
        :show-file-list="false"
        accept="image/png, image/jpeg"
    >
        <template v-if="button === 'drag'">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
                Arrasta una imagen aquí o <em>haz click para seleccionar</em>
            </div>
        </template>

        <el-button 
            v-else-if="button === 'block'"
            plain
            type="primary"
            size="small"
            icon="el-icon-upload"
        >
            Cargar imagen
        </el-button>
    </el-upload>

    <el-dialog v-if="showImage" :visible.sync="showImageDialog">
        <img width="100%" :src="showImage" alt="">
    </el-dialog> 
</div>

</template>

<script>

import Empty from './Empty';
import ImageOverlay from './ImageOverlay';
import { imagesApi } from '../store/images';

export default {
    name: 'ImageUploader',

    components: {
        Empty,
        ImageOverlay
    },
    
    props: {
        store: {
            type: String,
            required: true
        },
        value: {
            type: Array,
            default: () => []
        },
        disabled: {
            type: Boolean,
            default: false
        },
        multiple: {
            type: Boolean,
            default: false
        },
        height: {
            type: String,
            default: '300px'
        },
        button: {
            type: String,
            default: 'block',
            validator: val => [
                'block',
                'drag'
            ].includes(val)
        },
        display: {
            type: String,
            default: 'labels',
            validator: val => [
                'labels',
                'carousel'
            ].includes(val)
        }
    },

    data() {
        return {
            imageUploadName: 'image',
            imageUploadUrl: imagesApi.getUrl(),
            imageUploadHeader: imagesApi.getHeader(),            
            loading: false,
            alertMessage: null,
            showImage: '',
            showImageDialog: false
        };
    },

    computed: {
        state() {
            let state = this.$store.state;
            this.store.split('/').forEach(path => {
                state = path ? state[path] : state;
            });
            return state;
        },
        images() {
            const images = [];
            this.value.forEach(imageId => {
                if (imageId || imageId === 0) {
                    this.$store.dispatch(`${this.store}/getItem`, imageId);
                    const image = this.state.items[imageId];
                    if (image) {
                        images.push({
                            id: image.id,
                            name: this.fileName(image.image),
                            url: image.image
                        });
                    }
                }                
            });
            return images;
        }
    },

    methods: {

        fileName(url) {
            if (url) {
                const parts = new URL(url).pathname.split('/');
                for (let i = parts.length - 1; i >= 0; i--) {
                    if (parts[i]) {
                        return parts[i];
                    }                    
                }
            }
            return url;            
        },

        onBeforeUploadImage(file) {
            this.loading = true;
        },

        onSuccessImageUpload(response, file) {
            this.loading = false;
            if (this.multiple) {
                this.$emit('input', [...this.value, response.id]); 
            } else {
                this.$emit('input', [response.id]);   
            }                               
        },

        onImageUploadOnError(error, file, fileList) {
            this.loading = false;
            self.alertMessage = {
                type: 'error',
                text: 'Ha ocurrido un error y no se ha podido cargar la imagen.' 
            };
            this.$log(error);
        },

        onRemoveImage(imageId) {
            this.loading = true;
            this.$store.dispatch(
                `${this.store}/destroyItem`, imageId
            ).then(() => {  
                this.loading = false;
                if (this.multiple) {
                    this.$emit('input', this.value.filter(
                        val => val !== imageId
                    )); 
                } else {
                    this.$emit('input', []); 
                }
            });
        },

        onPreviewImage(imageUrl) {
            this.showImage = imageUrl;
            this.showImageDialog = true;
        }
    }
};
</script>

<style lang="scss">

.image-uploader {
    .image-overlay img {
        height: 100%;
        width: 100%;
        background-color: #000000;
        object-fit: contain;
    }
    .el-carousel__item {
        text-align: center;
    }
    .el-carousel__indicators {
        display: none;
    }
    .upload.has-labels .el-upload {
        margin-top: 0px;
    }
    .image-list {
        margin-top: 8px;
        margin-bottom: 8px;
    }
    .image-label {
        display: flex;
        align-items: center;
        flex: 1;
        min-width: 0;
        height: 30px;
        background-color: #f4f4f5;
        color: #606266;
        border-radius: 6px; 
        font-size: 12px;
        padding: 0 12px;       
        .name {
            flex: 1;  
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            &:hover {
                cursor: pointer;
            }
        }
    }
    .actions {
        >.el-button {
            color: #fff;
        }
    }
}

</style>
