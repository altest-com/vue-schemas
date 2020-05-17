<template>

<div v-if="field && filter" class="datetime-value-filter">
    <el-form-item :label="label" class="range">
        <template v-if="type === 'time'">
            <el-time-picker                
                arrow-control
                placeholder="Desde"
                :value="filter[queryGt]"
                @input="val => setValue(queryGt, val)"
            />
            <span class="px-2">—</span>
            <el-time-picker                
                arrow-control
                placeholder="Desde"
                :value="filter[queryLt]"
                @input="val => setValue(queryGt, val)"
            />
        </template>

        <template v-else>
            <el-date-picker
                placeholder="Desde"
                :type="type"
                :value="filter[queryGt]"
                @input="val => setValue(queryGt, val)"
            />
            <span class="px-2">—</span>
            <el-date-picker
                placeholder="Hasta"
                :type="type"
                :value="filter[queryLt]"
                @input="val => setValue(queryLt, val)"
            />
        </template>
    </el-form-item>
</div>

</template>

<script>

import ValueFilterMixin from '../fields/ValueFilterMixin';
import { writers } from 'vrudex';

const writersChoices = {
    datetime: Date,
    date: writers.dateWriter,
    time: writers.timeWriter,
    year: writers.yearWriter
};

export default {
    name: 'DatetimeValueFilter',

    mixins: [ValueFilterMixin],

    data() {
        return {
            fieldStore: 'dateTimeFields'
        };
    },

    computed: {
        queryGt() {
            return `${this.field.id}-${this.type}_gt`;
        },
        queryLt() {
            return `${this.field.id}-${this.type}_lt`;
        },
        type() {
            return this.field.config.dataType;
        }
    },

    methods: {
        setValue(query, value) {
            value = writersChoices[this.type](value);
            this.onParamChange(query, value);
        }
    }
};
</script>
