<template>

<component class="file-print-row" :is="node">
    <div v-if="layout === 'blocks' || layout === 'fluid'">
        <div class="label">{{ label }}</div>
        <div class="value">
            <a v-for="file in files" :key="file.id" :href="file.url"> 
                {{ file.name }}
            </a>
        </div>
    </div>
    <template v-if="layout === 'vtable'">
        <td class="label">{{ label }}</td>
        <td class="value">
            <a v-for="file in files" :key="file.id" :href="file.url"> 
                {{ file.name }}
            </a>
        </td>
    </template>
    <template v-if="layout === 'htable'">
        <a v-for="file in files" :key="file.id" :href="file.url"> 
            {{ file.name }}
        </a>
    </template>
</component>

</template>

<script>

import ValuePrintRow from '../fields/ValuePrintRow';

export default {
    name: 'FilePrintRow',

    mixins: [ValuePrintRow],

    data() {
        return {
            fieldStore: 'fileFields',
            valueStore: 'fileValues'
        };
    },

    computed: {
        files() {
            const files = [];
            this.value.value.forEach(fileId => {
                const file = this.state.files.items[fileId];
                if (file) {
                    files.push({
                        id: file.id,
                        name: this.fileName(file.file),
                        url: file.file
                    });
                }
            });
            return files;
        },
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

