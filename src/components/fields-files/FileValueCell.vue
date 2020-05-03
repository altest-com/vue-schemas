<template>

<td 
    v-if="value" 
    class="file-value-cell" 
    :style="{'max-width': '200px'}"
>
    <div v-if="files.length" class="cell">
        <a :href="files[0].url"> {{ files[0].name }} </a>
    </div>
</td>

</template>

<script>

export default {
    name: 'FileValueCell',
    
    props: {
        valueId: {
            type: [Number, String],
            required: true
        }
    },

    computed: {
        value() {
            this.$store.dispatch('schemas/fileValues/getItem', this.valueId);
            return this.$store.state.schemas.fileValues.items[this.valueId];          
        },
        files() {
            const files = [];
            this.value.value.forEach(fileId => {
                this.$store.dispatch('schemas/files/getItem', fileId);
                const file = this.$store.state.schemas.files.items[fileId];
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
