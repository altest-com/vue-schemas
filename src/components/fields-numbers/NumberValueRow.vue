<template>

<div v-if="value && field" class="number-value-row">
    <div v-if="showLabel" class="label">{{ field.name }}</div>
    <div class="value">{{ display }}</div>
</div>

</template>

<script>

export default {
    name: 'NumberValueRow',
    
    props: {
        valueId: {
            type: [Number, String],
            required: true
        },
        showLabel: {
            type: Boolean,
            default: true
        }
    },

    computed: {
        value() {
            this.$store.dispatch('schemas/numberValues/getItem', this.valueId);
            return this.$store.state.schemas.numberValues.items[this.valueId];        
        },
        field() {
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
