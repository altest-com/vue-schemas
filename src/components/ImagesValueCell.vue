<template>

<td 
    v-if="value" 
    class="images-value-cell" 
    :style="{'width': '64px'}"
>
    <div class="cell">
        <img v-if="display" :src="display" alt="">
    </div>
</td>

</template>

<script>

export default {
    name: 'ImagesValueCell',
    
    props: {
        valueId: {
            type: [Number, String],
            required: true
        }
    },

    computed: {
        value() {
            this.$store.dispatch('schemas/imagesValues/getItem', this.valueId);
            return this.$store.state.schemas.imagesValues.items[this.valueId];          
        },
        display() {
            const value = this.value.value;
            if (value.length) {
                const imageId = value[0];
                this.$store.dispatch('schemas/images/getItem', imageId);
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

.images-value-cell {
    img {
        width: 100%;
        object-fit: contain;
    }
}

</style>
