<template>

<td 
    v-if="value && field" 
    class="date-value-cell"
>
    <div class="cell">{{ display }}</div>
</td>

</template>

<script>

import filters from '../filters';
import { dateConfigModel } from '../store/datetime-fields/models';

const renders = {
    [dateConfigModel.TYPE_TIME]: filters.timeFilter,
    [dateConfigModel.TYPE_DATE]: filters.dateFilter,
    [dateConfigModel.TYPE_YEAR]: filters.yearFilter,
    [dateConfigModel.TYPE_MONTH]: filters.monthFilter,
    [dateConfigModel.TYPE_DATETIME]: filters.dateTimeFilter
};

export default {
    name: 'DateValueCell',
    
    props: {
        valueId: {
            type: [Number, String],
            required: true
        }
    },

    computed: {
        value() {
            this.$store.dispatch('schemas/dateTimeValues/getItem', this.valueId);
            return this.$store.state.schemas.dateTimeValues.items[this.valueId];          
        },
        field() {
            const fieldId = this.dateValue.field;
            this.$store.dispatch('schemas/dateTimeFields/getItem', fieldId);
            return this.$store.state.schemas.dateTimeFields.items[fieldId];         
        },
        display() {
            const value = this.dateValue.value;
            if (value) {
                return renders[this.dateField.config.dataType](value);
            } 
            return '';
        }
    }
};
</script>

<style lang="scss">
</style>
