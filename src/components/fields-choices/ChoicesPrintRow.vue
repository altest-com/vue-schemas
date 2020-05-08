<template>

<component class="choices-print-row" :is="node">
    <div v-if="layout === 'blocks' || layout === 'fluid'">
        <div class="label">{{ label }}</div>
        <div class="value">{{ display }}</div>
    </div>
    <template v-if="layout === 'vtable'">
        <td class="label">{{ label }}</td>
        <td class="value">{{ display }}</td>
    </template>
    <template v-if="layout === 'htable'">
        {{ display }}
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
            return this.choices.join(', ');
        }
    }
};
</script>

