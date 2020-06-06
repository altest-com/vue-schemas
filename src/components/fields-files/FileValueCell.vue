<template>

<td class="file-value-cell">
    <div v-if="files.length" class="cell">
        <a :href="files[0].url"> {{ files[0].name }} </a>
    </div>
</td>

</template>

<script>

import ValueCellMixin from '../fields/ValueCellMixin';

export default {
    name: 'FileValueCell',

    mixins: [ValueCellMixin],

    data() {
        return {
            valueStore: 'fileValues'
        };
    },

    computed: {
        files() {
            const files = [];
            const storeFiles = this.$store.state.schemas.files.items;
            this.value.value.forEach(fileId => {
                const file = storeFiles[fileId];
                if (file) {
                    files.push({
                        id: file.id,
                        name: this.fileName(file.file),
                        url: file.file
                    });
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
        }
    }
};
</script>

<style lang="scss">
</style>
