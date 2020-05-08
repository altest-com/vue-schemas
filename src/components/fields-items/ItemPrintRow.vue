<template>

<component class="item-print-row" :is="node">

    <div v-if="layout === 'blocks' || layout === 'fluid'">
        <div class="label">{{ label }}</div>
        <div class="value">
            <item-print 
                v-for="itemId in value.value"
                :key="itemId"
                :item-id="itemId"
                :level="level"
            ></item-print>
        </div>
    </div>

    <template v-else-if="layout === 'vtable'">
        <td class="label">{{ label }}</td>
        <td class="value">
            <item-print 
                v-for="itemId in value.value"
                :key="itemId"
                :item-id="itemId"
                :level="level"
            ></item-print>
        </td>
    </template>

    <template v-else-if="layout === 'htable'">
        <item-print 
            v-for="itemId in value.value"
            :key="itemId"
            :item-id="itemId"
            :level="level"
        ></item-print>
    </template>
</component>

</template>

<script>

import ValuePrintRow from '../fields/ValuePrintRow';

export default {
    name: 'ItemPrintRow',

    components: {
        ItemPrint: () => import('../items/ItemPrint')
    },

    mixins: [ValuePrintRow],

    data() {
        return {
            fieldStore: 'itemFields',
            valueStore: 'itemValues'
        };
    },

    computed: {
        hasRelated() {
            return !!this.field.targetSchema || this.field.targetSchema === 0; 
        },
        isNested() {
            return (
                this.hasRelated && 
                this.field.targetSchema !== this.field.schema && 
                this.field.config.displayAs === 'nest'
            );
        }
    }
};
</script>

