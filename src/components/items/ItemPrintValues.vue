<template>

<component class="item-print-values" :is="node" :class="layout">
    <template v-if="layout === 'htable'">
        <tr v-if="showHeader" class="header-row">                
            <th v-for="value in values" :key="value.key">
                {{ value.name }}
            </th>
        </tr>
        <tr>
            <component
                v-for="value in values"
                :key="value.type + value.id"
                :is="value.type + '-print-row'"        
                :value-id="value.id"
                :layout="layout"
                :level="level + 1"
                class="print-row"
                :class="[layout, labels]"
            ></component>
        </tr>
    </template>

    <template v-else>
        <template v-for="value in values">
            <component
                :key="value.type + value.id"
                :is="value.type + '-print-row'"        
                :value-id="value.id"
                :layout="layout"
                :level="level + 1"
                class="print-row"
                :class="[layout, labels]"
            ></component>
        </template>
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

const nodes = {
    'blocks': 'div',
    'fluid': 'div',
    'vtable': 'table',
    'htable': 'table'
};

export default {
    name: 'ItemsPrintValues',

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
        },
        layout: {
            type: String,
            default: 'blocks',
            validator: val => val in nodes
        },
        labels: {
            type: String,
            default: 'stack',
            validator: val => ['stack', 'inline'].includes(val)
        },
        level: {
            type: Number,
            default: 1
        }
    },

    data() {
        return {};
    }, 

    computed: {
        node() {
            return nodes[this.layout];
        },
        showHeader() {
            if (this.layout !== 'htable') {
                return false;
            }
            return this.values.some(value => value.showLabel);
        }
    }

};
</script>
