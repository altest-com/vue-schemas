<template>

<div class="file-uploader">
    <div v-if="files.length" class="file-list">
        <div 
            v-for="file in files" 
            :key="file.id" 
            class="file"
        >
            <i class="el-icon-paperclip"></i>
            <div class="name"> {{ file.name }} </div>
            <el-button 
                type="text" 
                icon="el-icon-close" 
                size="small"
                @click="onRemoveFile(file.id)"
            ></el-button>
        </div>
    </div>

    <el-upload
        class="upload"
        :disabled="disabled || loading"
        :name="fileUploadName"
        :action="fileUploadUrl"
        :headers="fileUploadHeader"
        :before-upload="onBeforeUploadFile"
        :on-success="onSuccessFileUpload"
        :on-error="onFileUploadOnError"
        :multiple="multiple"
        :show-file-list="false"
    >
        <el-button 
            size="small"
            icon="el-icon-upload"
            class="block"
        >
            Cargar archivo
        </el-button>
    </el-upload>    
</div>

</template>

<script>

import { filesApi } from '../store/files';

export default {
    name: 'FileUpload',
    
    props: {
        value: {
            type: Array,
            default: () => []
        },
        store: {
            type: String,
            required: true
        },
        multiple: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            fileUploadName: 'file',
            fileUploadUrl: filesApi.getUrl(),
            fileUploadHeader: filesApi.getHeader(),            
            loading: false,
            showFileDialog: false,
            fileDialogUrl: ''
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
        files() {
            const files = [];
            this.value.forEach(fileId => {
                if (fileId || fileId === 0) {
                    this.$store.dispatch(`${this.store}/getItem`, fileId);
                    const file = this.state.items[fileId];
                    if (file) {
                        files.push({
                            id: file.id,
                            name: this.fileName(file.file)
                        });
                    }
                }
            });
            return files;
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

        onBeforeUploadFile(file) {
            this.loading = true;
        },

        onSuccessFileUpload(response, file) {
            this.loading = false;
            if (this.multiple) {
                this.$emit('input', [...this.value, response.id]); 
            } else {
                this.$emit('input', [response.id]);   
            }                 
        },

        onFileUploadOnError(error, file, fileList) {
            this.loading = false;
            this.$log(error);
        },

        onRemoveFile(fileId) {
            this.loading = true;
            this.$store.dispatch(
                `${this.store}/destroyItem`, fileId
            ).then(() => {  
                this.loading = false;
                if (this.multiple) {
                    this.$emit('input', this.value.filter(
                        val => val !== fileId
                    )); 
                } else {
                    this.$emit('input', []); 
                }
            });
        }
    }
};
</script>

<style lang="scss">

.file-uploader {
    .el-upload {
        margin: 0;
    }
    .file-list {
        margin-top: 8px;
        margin-bottom: 8px;
    }
    .file {
        display: flex;
        align-items: center;
        min-width: 0;
        height: 24px;
        background-color: #f4f4f5;
        color: #606266;
        border-radius: 6px;
        font-size: 12px;
        padding: 0 12px;     
        i {
            white-space: nowrap;
            display: block;
            padding-right: 4px;
        }
        .name {
            flex: 1;  
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}

</style>
