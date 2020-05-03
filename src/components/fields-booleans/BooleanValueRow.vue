<template>

<div v-if="value && field" class="boolean-value-row">
    <div v-if="showLabel" class="label">{{ field.name }}</div>
    <div class="value">{{ display }}</div>
</div>

</template>

<script>

export default {
    name: 'BooleanValueRow',
    
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
            return this.$store.state.schemas.booleanValues.items[this.valueId];          
        },
        field() {
            const fieldId = this.value.field;
            return this.$store.state.schemas.booleanFields.items[fieldId];          
        },
        display() {
            return this.value.value ? 'Sí' : 'No';
        }
    }
};
</script>

<style lang="scss">
</style>
