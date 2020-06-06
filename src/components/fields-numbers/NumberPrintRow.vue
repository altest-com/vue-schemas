<template>

<component class="number-print-row" :is="node">
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

