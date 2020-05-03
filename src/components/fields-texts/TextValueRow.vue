<template>

<div v-if="value && field" class="text-value-row">
    <div v-if="showLabel" class="label">{{ field.name }}</div>
    <div class="value">{{ display }}</div>
</div>

</template>

<script>

export default {
    name: 'TextValueCell',
    
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
            this.$store.dispatch('schemas/textValues/getItem', this.valueId);
            return this.$store.state.schemas.textValues.items[this.valueId];        
        },
        field() {
            const fieldId = this.value.field;
            this.$store.dispatch('schemas/textFields/getItem', fieldId);
            return this.$store.state.schemas.textFields.items[fieldId];        
        },
        display() {
            return this.value.value;
        }
    }
};
</script>

<style lang="scss">
</style>
