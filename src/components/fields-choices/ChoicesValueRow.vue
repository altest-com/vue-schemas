<template>

<div v-if="value && field" class="choices-value-row">
    <div v-if="showLabel" class="label">{{ field.name }}</div>
    <div class="value">{{ display }}</div>
</div>

</template>

<script>

export default {
    name: 'ChoicesValueRow',
    
    props: {
        valueId: {
            type: [Number, String],
            required: true
        },
        showLabel: {
            type: Boolean,
            default: true
        },
        layout: {
            type: String,
            default: 'vertical'
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
