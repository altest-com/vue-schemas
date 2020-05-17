<template>

<td v-if="value" class="boolean-value-cell">
    {{ display }}
</td>

</template>

<script>

import ValueCellMixin from '../fields/ValueCellMixin';

export default {
    name: 'BooleanValueCell',

    mixins: [ValueCellMixin],

    data() {
        return {
            valueStore: 'booleanValues'
        };
    },

    computed: {
        display() {
            return this.value.value ? 'Sí' : 'No';
        }
    }
};
</script>

<style lang="scss">
</style>
