<template>

<td class="choices-value-cell">
    {{ display }}
</td>

</template>

<script>

import ValueCellMixin from '../fields/ValueCellMixin';

export default {
    name: 'ChoicesValueCell',

    mixins: [ValueCellMixin],

    data() {
        return {
            valueStore: 'choicesValues'
        };
    },

    computed: {
        choices() {
            const choices = [];
            const storeChoices = this.$store.state.schemas.choices.items;
            this.value.value.forEach(choiceId => {
                const choice = storeChoices[choiceId];
                if (choice) {
                    choices.push(choice.name);
                }
            });
            return choices;
        },
        display() {
            return this.choices.join(' • ');
        }
    }
};
</script>

<style lang="scss">
</style>
