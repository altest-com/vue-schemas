<template>

<td 
    v-if="booleanValue" 
    class="boolean-value-cell"
>
    <div class="cell">{{ display }}</div>
</td>

</template>

<script>

export default {
    name: 'BooleanValueCell',
    
    props: {
        valueId: {
            type: [Number, String],
            required: true
        }
    },

    computed: {
        booleanValue() {
            this.$store.dispatch('schemas/booleanValues/getItem', this.valueId);
            return this.$store.state.schemas.booleanValues.items[this.valueId];          
        },
        display() {
            return this.booleanValue.value ? 'Sí' : 'No';
        }
    }
};
</script>

<style lang="scss">
</style>
