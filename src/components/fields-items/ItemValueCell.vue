<template>

<td class="item-value-cell">
    {{ display }}
</td>

</template>

<script>

import ValueCellMixin from '../fields/ValueCellMixin';
import ItemLabelMixin from './ItemLabelMixin';

export default {
    name: 'ItemValueCell',
    
    mixins: [ValueCellMixin, ItemLabelMixin],

    data() {
        return {
            valueStore: 'itemValues',
            display: ' '
        };
    },

    computed: {
    },

    watch: {
        'value.value': function() {
            this.update();
        }
    },

    created() {
        this.update();
    },

    methods: {
        async update() {
            const items = [];
            const storeItems = this.$store.state.schemas.items.items;
            for (const itemId of this.value.value) {
                let item = storeItems[itemId]; 
                if (!item) {
                    item = await this.$store.dispatch(
                        'schemas/items/retrieveItem', {
                            id: itemId,
                            fields: 'id,represent'
                        }
                    );
                }
                if (item) {
                    const itemLabel = await this.labelItem(item);
                    items.push(itemLabel);
                }                
            }
            this.display = items.map(item => item.label).join(', ');
        }
    }
};
</script>
