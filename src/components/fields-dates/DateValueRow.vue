<template>

<div v-if="value && field" class="date-value-row">
    <div v-if="showLabel" class="label">{{ field.name }}</div>
    <div class="value">{{ display }}</div>
</div>

</template>

<script>

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
    name: 'DateValueRow',
    
    props: {
        valueId: {
            type: [Number, String],
            required: true
        },
        showLabel: {
            type: Boolean,
            default: true
        },
        layout: {
            type: String,
            default: 'vertical'
        }
    },

    computed: {
        value() {
            this.$store.dispatch('schemas/dateTimeValues/getItem', this.valueId);
            return this.$store.state.schemas.dateTimeValues.items[this.valueId];          
        },
        field() {
            const fieldId = this.value.field;
            this.$store.dispatch('schemas/dateTimeFields/getItem', fieldId);
            return this.$store.state.schemas.dateTimeFields.items[fieldId];         
        },
        display() {
            const value = this.value.value;
            if (value) {
                return renders[this.field.config.dataType](value);
            } 
            return '';
        }
    }
};
</script>

<style lang="scss">
</style>
