<template>

<component class="image-print-row" :is="node">
    <template v-if="view === 'table'">
        <td class="label">{{ label }}</td>
        <div class="value">
            <img 
                v-for="image in images"
                :key="image.id"
                :src="image.image"
            >
        </div>
    </template>
    <template v-else-if="view === 'list'">
        <div class="label">{{ label }}</div>
        <div class="value">
            <img 
                v-for="image in images"
                :key="image.id"
                :src="image.image"
            >
        </div>
    </template>
</component>

</template>

<script>

import ValuePrintRow from '../fields/ValuePrintRow';

export default {
    name: 'ImagesPrintRow',

    mixins: [ValuePrintRow],

    data() {
        return {
            fieldStore: 'imagesFields',
            valueStore: 'imagesValues'
        };
    },

    computed: {
        images() {
            const images = [];
            this.value.value.forEach(imageId => {
                const image = this.state.images.items[imageId];
                if (image) {
                    images.push(image);
                }
            });
            return images;
        }
    }
};
</script>

