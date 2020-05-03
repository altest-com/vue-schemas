<template>

<component class="number-print-row" :is="node">
    <template v-if="view === 'table'">
        <td class="label">{{ label }}</td>
        <td class="value">{{ display }}</td>
    </template>
    <template v-else-if="view === 'list'">
        <div class="label">{{ label }}</div>
        <div class="value">{{ display }}</div>
    </template>
</component>

</template>

<script>

import ValuePrintRow from '../fields/ValuePrintRow';

export default {
    name: 'NumberPrintRow',

    mixins: [ValuePrintRow],

    data() {
        return {
            fieldStore: 'numberFields',
            valueStore: 'numberValues'
        };
    },

    computed: {
        display() {
            const value = this.value.value;
            if (value) {
                return this.field.config.integer ? value.toFixed(0) : value;
            }
            return '';
        }
    }
};
</script>

