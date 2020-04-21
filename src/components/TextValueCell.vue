<template>

<td 
    v-if="value" 
    class="text-value-cell" 
    :style="{'max-width': '200px'}"
>
    <div class="cell">{{ display }}</div>
</td>

</template>

<script>

export default {
    name: 'TextValueCell',
    
    props: {
        valueId: {
            type: [Number, String],
            required: true
        }
    },

    computed: {
        value() {
            this.$store.dispatch('schemas/textValues/getItem', this.valueId);
            return this.$store.state.schemas.textValues.items[this.valueId];        
        },
        display() {
            return this.value.value;
        }
    }
};
</script>

<style lang="scss">
</style>
