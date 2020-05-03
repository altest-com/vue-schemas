<template>

<td 
    v-if="value" 
    class="item-value-cell" 
    :style="{'max-width': '100px'}"
>
    <div class="cell">{{ display }}</div>
</td>

</template>

<script>

export default {
    name: 'ItemValueCell',
    
    props: {
        valueId: {
            type: [Number, String],
            required: true
        }
    },

    computed: {
        value() {
            this.$store.dispatch('schemas/itemValues/getItem', this.valueId);
            return this.$store.state.schemas.itemValues.items[this.valueId];          
        },
        display() {
            const items = [];
            this.value.value.forEach(itemId => {
                this.$store.dispatch('schemas/items/getItem', itemId);
                const item = this.$store.state.schemas.items.items[itemId]; 
                if (item) {
                    items.push({
                        id: item.id,
                        name: item.name
                    });
                }                
            });
            return items.map(item => item.name).join(', ');
        }
    }
};
</script>

<style lang="scss">
</style>
