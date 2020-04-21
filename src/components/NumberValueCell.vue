<template>

<td 
    v-if="value" 
    class="number-value-cell" 
    :style="{'max-width': '64px'}"
>
    <div class="cell">{{ display }}</div>
</td>

</template>

<script>

export default {
    name: 'DateValueCell',
    
    props: {
        valueId: {
            type: [Number, String],
            required: true
        }
    },

    computed: {
        value() {
            this.$store.dispatch('schemas/numberValues/getItem', this.valueId);
            return this.$store.state.schemas.numberValues.items[this.valueId];        
        },
        feld() {
            const fieldId = this.value.field;
            this.$store.dispatch('schemas/numberFields/getItem', fieldId);
            return this.$store.state.schemas.numberFields.items[fieldId];        
        },
        display() {
            const value = this.value.value;
            if (value) {
                return this.field.config.integer ? value.toFixed(0) : value;
            }
            return '';
        }
    }
};
</script>

<style lang="scss">
</style>
