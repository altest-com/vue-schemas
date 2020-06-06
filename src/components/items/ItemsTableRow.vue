<template>

<tr
    class="items-table-row"
    :v-loading="booting"
    :class="{'focus': focus}"  
    @click="$emit('click')"
>

    <template v-if="booting">
        <td v-for="header in headers" :key="header.key" v-html="'&nbsp;'" />
    </template>
    <template v-else>
        <component
            v-for="value in values" 
            :key="value.key"
            :is="`${value.type}-value-cell`"
            :value-id="value.id"
        />
    </template>
</tr>

</template>

<script>

import params from '../../params';

import BooleanValueCell from '../fields-booleans/BooleanValueCell';
import ChoicesValueCell from '../fields-choices/ChoicesValueCell';
import DatetimeValueCell from '../fields-dates/DatetimeValueCell';
import FileValueCell from '../fields-files/FileValueCell';
import ImageValueCell from '../fields-images/ImageValueCell';
import ItemValueCell from '../fields-items/ItemValueCell';
import NumberValueCell from '../fields-numbers/NumberValueCell';
import TextValueCell from '../fields-texts/TextValueCell';

import { loadItem } from '../loader';

export default {
    name: 'ItemsTableRow',

    components: {
        BooleanValueCell,
        ChoicesValueCell,
        DatetimeValueCell,
        FileValueCell,
        ImageValueCell,
        ItemValueCell,
        NumberValueCell,
        TextValueCell
    },

    props: {
        focus: {
            type: Boolean,
            default: false
        },
        itemId: {
            type: [Number, String],
            required: true
        },
        headers: {
            type: Array,
            default: () => []
        }
    },

    data() {
        return {
            booting: false
        };
    },

    computed: {
        item() {
            return this.$store.state.schemas.items.items[this.itemId];
        },
        values() {
            const data = {};
            Object.keys(params).forEach(key => {
                const store = params[key].valueStore;
                const storeValues = this.$store.state.schemas[store].items;
                this.item[store].forEach(valueId => {
                    const value = storeValues[valueId];
                    if (value) {
                        const key = `${value.type}-${value.field}`;
                        data[key] = {
                            id: value.id,
                            type: value.type,
                            key: key
                        };
                    }
                });
            });
            return this.headers.map(header => data[header.key]);
        }
    },

    created() {
        this.booting = true;
        loadItem(this.$store, this.itemId).then(() => {
            this.booting = false;
        });        
    }
};
</script>
