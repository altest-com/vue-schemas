<template>

<component class="item-print-row" :is="node">
    <template v-if="view === 'table'">
        <td class="label">{{ label }}</td>
        <div class="value">
            <img 
                v-for="item in items"
                :key="item.id"
                :src="item.item"
            >
        </div>
    </template>
    <template v-else-if="view === 'list'">
        <div class="label">{{ label }}</div>
        <div class="value">
            <img 
                v-for="item in items"
                :key="item.id"
                :src="item.item"
            >
        </div>
    </template>
</component>

</template>

<script>

import ValuePrintRow from '../fields/ValuePrintRow';

export default {
    name: 'ItemPrintRow',

    mixins: [ValuePrintRow],

    data() {
        return {
            fieldStore: 'itemFields',
            valueStore: 'itemValues'
        };
    },

    computed: {

    }
};
</script>

