<template>

<component class="choices-print-row" :is="node">
    <template v-if="view === 'table'">
        <td class="label">{{ label }}</td>
        <td class="value">{{ display }}</td>
    </template>
    <template v-else-if="view === 'list'">
        <div class="label">{{ label }}</div>
        <div class="value">{{ display }}</div>
    </template>
</component>

</template>

<script>

import ValuePrintRow from '../fields/ValuePrintRow';

export default {
    name: 'ChoicesPrintRow',

    mixins: [ValuePrintRow],

    data() {
        return {
            fieldStore: 'choicesFields',
            valueStore: 'choicesValues'
        };
    },

    computed: {
        choices() {
            const choices = [];
            this.value.value.forEach(choiceId => {
                const choice = this.state.choices.items[choiceId];
                if (choice) {
                    choices.push(choice.name);
                }
            });
            return choices;
        },
        display() {
            return this.choices.join(',');
        }
    }
};
</script>

