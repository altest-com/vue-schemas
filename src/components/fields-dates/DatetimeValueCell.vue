<template>

<td class="datetime-value-cell">
    {{ display }}
</td>

</template>

<script>

import ValueCellMixin from '../fields/ValueCellMixin';
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
    name: 'DatetimeValueCell',

    mixins: [ValueCellMixin],
    
    data() {
        return {
            valueStore: 'dateTimeValues',
            fieldStore: 'dateTimeFields'
        };
    },

    computed: {
        display() {
            const value = this.value.value;
            if (value) {
                const type = this.field.config.dataType;
                return renders[type](value);
            } 
            return '';
        }
    }
};
</script>
