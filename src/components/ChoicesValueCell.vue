<template>

<td 
    v-if="choicesValue" 
    class="choices-value-cell" 
    :style="{'max-width': '100px'}"
>
    <div class="cell">{{ display }}</div>
</td>

</template>

<script>

export default {
    name: 'ChoicesValueCell',
    
    props: {
        valueId: {
            type: [Number, String],
            required: true
        }
    },

    computed: {
        choicesValue() {
            this.$store.dispatch('schemas/choicesValues/getItem', this.valueId);
            return this.$store.state.schemas.choicesValues.items[this.valueId];          
        },
        choices() {
            const choices = [];
            this.choicesValue.value.forEach(choiceId => {
                this.$store.dispatch('schemas/choices/getItem', choiceId);
                const choice = this.$store.state.schemas.choices.items[choiceId];
                if (choice) {
                    choices.push(choice.name);
                }
            });
            return choices;
        },
        display() {
            const nChoices = this.choices.length;
            if (nChoices > 1) {
                return this.choices.join(',');
            } else if (nChoices === 1) {
                return this.choices[0];
            } else {
                return '';
            }
        }
    }
};
</script>

<style lang="scss">
</style>
