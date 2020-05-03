<template>

<component class="text-print-row" :is="node">
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
    name: 'TextPrintRow',

    mixins: [ValuePrintRow],

    data() {
        return {
            fieldStore: 'textFields',
            valueStore: 'textValues'
        };
    },

    computed: {
        display() {
            return this.value.value;
        }
    }
};
</script>

