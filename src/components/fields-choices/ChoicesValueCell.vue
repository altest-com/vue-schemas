<template>

<td 
    v-if="value" 
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
        value() {
            this.$store.dispatch('schemas/choicesValues/getItem', this.valueId);
            return this.$store.state.schemas.choicesValues.items[this.valueId];          
        },
        choices() {
            const choices = [];
            this.value.value.forEach(choiceId => {
                /* this.$store.dispatch('schemas/choices/getItem', choiceId); */
                const choice = this.$store.state.schemas.choices.items[choiceId];
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

<style lang="scss">
</style>
