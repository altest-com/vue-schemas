<template>

<component class="boolean-print-row" :is="node">
    <div v-if="layout === 'blocks' || layout === 'fluid'">
        <div class="label">{{ label }}</div>
        <div class="value">{{ display }}</div>
    </div>
    <template v-if="layout === 'vtable'">
        <td class="label">{{ label }}</td>
        <td class="value">{{ display }}</td>
    </template>
    <template v-if="layout === 'htable'">
        {{ display }}
    </template>
</component>

</template>

<script>

import ValuePrintRow from '../fields/ValuePrintRow';

export default {
    name: 'BooleanPrintRow',

    mixins: [ValuePrintRow],

    data() {
        return {
            fieldStore: 'booleanFields',
            valueStore: 'booleanValues'
        };
    },

    computed: {
        display() {
            return this.value.value ? 'Sí' : 'No';
        }
    }
};
</script>

