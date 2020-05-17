<template>

<td class="text-value-cell">
    {{ display }}
</td>

</template>

<script>

import ValueCellMixin from '../fields/ValueCellMixin';

export default {
    name: 'TextValueCell',
    
    mixins: [ValueCellMixin],

    data() {
        return {
            valueStore: 'textValues'
        };
    },

    computed: {
        display() {
            return this.value.value;
        }
    }
};
</script>

<style lang="scss">
</style>
