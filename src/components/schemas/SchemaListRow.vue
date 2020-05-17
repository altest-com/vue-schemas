<template>

<div 
    v-if="itemSchema" 
    class="schema-list-row"
    :class="{'focus': focus}" 
    @click="$emit('click')"
>
    <el-card shadow="never">
        <div class="content">
            <img class="image" :src="imageUrl" alt="">       
            <div class="name"> {{ itemSchema.name }} </div>
            <div class="items-count"> {{ itemSchema.itemsCount }} </div>
            <div class="updated-at"> 
                {{ itemSchema.updatedAt | dateTimeFilter }} 
            </div>
            <router-link v-if="category" class="category" :to="category.route">
                {{ category.name }}
            </router-link>
            <div v-else class="category"> — </div>      
        </div>
    </el-card>
</div>

</template>

<script>
const defaultImage = require('../../assets/scheme.png');

export default {
    name: 'SchemaListRow',

    props: {
        schemaId: {
            type: [Number, String],
            required: true
        },
        focus: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
        };
    },

    computed: {

        itemSchema() {
            this.$store.dispatch('schemas/itemSchemas/getItem', this.schemaId);
            return this.$store.state.schemas.itemSchemas.items[this.schemaId];
        },

        imageUrl() {
            const imageId = this.itemSchema.image;
            if (imageId) {
                this.$store.dispatch('schemas/images/getItem', imageId);
                const image = this.$store.state.schemas.images.items[imageId];
                if (image) {
                    return image.image;
                }
            }
            return defaultImage;
        },

        category() {
            const categoryId = this.itemSchema.category;
            if (categoryId || categoryId === 0) {
                this.$store.dispatch('schemas/categories/getItem', categoryId);
                const category = this.$store.state.schemas.itemSchemas.items[categoryId];
                if (category) {
                    return {
                        name: category ? category.name : '',
                        route: {
                            name: 'SchemaDetails', 
                            params: { schemaId: categoryId }
                        }
                    };
                }                
            }
            return null;
        }
    },

    methods: {
    }   
};
</script>

<style lang="scss">

.schema-list-row {
    .el-card__body {
        padding: 14px 24px;
    }
    &:hover {
        cursor: pointer;
    }
    &.focus .el-card {
        box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
    }
    .content {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: flex-start;

        .image {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            object-fit: cover;
            margin-right: 18px;
        }

        .name {
            width: 200px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-right: 18px;
        }

        .items-count {
            width: 100px;
            margin-right: 18px;
        }

        .updated-at {
            width: 148px;
            font-weight: 300;
            font-size: 14px;
            margin-right: 18px;
        }

        .category {
            width: 112px;
            margin-right: 18px;
        }
    }

}
</style>
