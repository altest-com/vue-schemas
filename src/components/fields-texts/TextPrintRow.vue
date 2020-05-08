<template>

<component class="text-print-row" :is="node">
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

