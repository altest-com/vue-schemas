<template>

<td class="number-value-cell">
    {{ display }}
</td>

</template>

<script>

import ValueCellMixin from '../fields/ValueCellMixin';

export default {
    name: 'NumberValueCell',
    
    mixins: [ValueCellMixin],

    data() {
        return {
            valueStore: 'numberValues',
            fieldStore: 'numberFields'
        };
    },

    computed: {
        display() {
            const value = this.value.value;
            if (value) {
                const integer = this.field.config.integer;
                return integer ? value.toFixed(0) : value;
            }
            return '';
        }
    }
};
</script>
