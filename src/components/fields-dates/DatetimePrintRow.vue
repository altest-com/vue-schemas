<template>

<component class="date-print-row" :is="node">
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
import filters from '../../filters';
import { dateConfigModel as config } from '../../store/datetime-fields/models';

const renders = {
    [config.TYPE_TIME]: filters.timeFilter,
    [config.TYPE_DATE]: filters.dateFilter,
    [config.TYPE_YEAR]: filters.yearFilter,
    [config.TYPE_MONTH]: filters.monthFilter,
    [config.TYPE_DATETIME]: filters.dateTimeFilter
};

export default {
    name: 'DatetimePrintRow',

    mixins: [ValuePrintRow],

    data() {
        return {
            fieldStore: 'dateTimeFields',
            valueStore: 'dateTimeValues'
        };
    },

    computed: {
        display() {
            const value = this.value.value;
            return value ? renders[this.field.config.dataType](value) : '';
        }
    }
};
</script>

