<template>

<component class="item-print-table" :is="node">
    <template v-for="value in values"> 
        <component
            :is="value.type + '-print-row'"
            :key="value.type + value.id"
            :value-id="value.id"
        ></component> 
    </template>
</component>

</template>

<script>

import BooleanPrintRow from '../fields-booleans/BooleanPrintRow';
import ChoicesPrintRow from '../fields-choices/ChoicesPrintRow';
import DatetimePrintRow from '../fields-dates/DatetimePrintRow';
import FilePrintRow from '../fields-files/FilePrintRow';
import ImagesPrintRow from '../fields-images/ImagesPrintRow';
import ItemPrintRow from '../fields-items/ItemPrintRow';
import NumberPrintRow from '../fields-numbers/NumberPrintRow';
import TextPrintRow from '../fields-texts/TextPrintRow';

export default {
    name: 'ItemsPrintRows',

    components: {
        BooleanPrintRow,
        ChoicesPrintRow,
        DatetimePrintRow,
        FilePrintRow,
        ImagesPrintRow,
        NumberPrintRow,
        ItemPrintRow,
        TextPrintRow
    },

    props: {
        values: {
            type: Array,
            default: () => []
        }
    },

    data() {
        return {
            node: 'table'
        };
    }   
};
</script>
