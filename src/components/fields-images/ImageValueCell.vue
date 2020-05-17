<template>

<td class="image-value-cell">
    <img v-if="display" :src="display" alt="">
</td>

</template>

<script>

import ValueCellMixin from '../fields/ValueCellMixin';

export default {
    name: 'ImageValueCell',
    
    mixins: [ValueCellMixin],

    data() {
        return {
            valueStore: 'imagesValues'
        };
    },

    computed: {
        display() {
            const value = this.value.value;
            if (value.length) {
                const imageId = value[0];
                const image = this.$store.state.schemas.images.items[imageId];
                if (image) {
                    return image.image;
                } 
            }
            return '';
        }
    }
};
</script>

<style lang="scss">

.image-value-cell {
    img {
        width: 28px;
        height: 32px;
        border-radius: 4px;
        object-fit: cover;
        display: block;
    }
}

</style>
