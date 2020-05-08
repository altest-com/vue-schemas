<template>

<component class="image-print-row" :is="node">

    <div v-if="layout === 'blocks' || layout === 'fluid'">
        <div class="label">{{ label }}</div>
        <div class="value">
            <img v-for="image in images" :key="image.id" :src="image.image">
        </div>
    </div>
    <template v-if="layout === 'vtable'">
        <td class="label">{{ label }}</td>
        <td class="value">
            <img v-for="image in images" :key="image.id" :src="image.image">
        </td>
    </template>
    <template v-if="layout === 'htable'">
        <img v-for="image in images" :key="image.id" :src="image.image">
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

