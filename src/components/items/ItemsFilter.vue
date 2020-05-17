<template>

<el-form
    label-position="top" 
    size="small" 
    class="items-filter"
>
<!--     <div 
        v-if="booting" 
        v-loading="true" 
        :style="{'height': '400px'}"
    ></div> -->

    <template v-for="field in fields">
        <component 
            :is="`${field.type}-value-filter`"
            :key="field.type + field.id"
            :field-id="field.id"
            @change="onFilterChange"
        />
    </template>
</el-form>

</template>

<script>

import BooleanValueFilter from '../fields-booleans/BooleanValueFilter';
import ChoicesValueFilter from '../fields-choices/ChoicesValueFilter';
import DatetimeValueFilter from '../fields-dates/DatetimeValueFilter';
/* import ItemValueFilter from '../fields-items/ItemValueFilter'; */
import NumberValueFilter from '../fields-numbers/NumberValueFilter';
import TextValueFilter from '../fields-texts/TextValueFilter';

import params from '../../params';
/* import { loadSchema } from '../loader'; */

export default {
    name: 'ItemsFilter',

    components: {
        BooleanValueFilter,
        ChoicesValueFilter,
        DatetimeValueFilter,
        /* ItemValueFilter, */
        NumberValueFilter,
        TextValueFilter
    },

    props: {
        schemaId: {
            type: [Number, String],
            required: true
        }
    },

    data() {
        return {
            /* booting: false */
        };
    },

    computed: {

        schema() {
            const state = this.$store.state.schemas;
            return state.itemSchemas.items[this.schemaId];
        },

        filter() {
            return this.$store.state.schemas.items.filters[this.schemaId];
        },

        fields() {
            const fields = [];
            Object.keys(params).forEach(key => {
                const storeKey = params[key].fieldStore;
                const storeFields = this.$store.state.schemas[storeKey].items;
                this.schema[storeKey].forEach(fieldId => {
                    const field = storeFields[fieldId];
                    if (field && (field.type !== 'item' && field.type !== 'image' && field.type !== 'file')) {
                        fields.push({
                            type: field.type,
                            id: field.id,
                            order: field.order
                        });
                    }
                });
            });
            return fields.sort(
                (fa, fb) => (fa.order < fb.order) ? 1 : -1
            );
        }
    },

    created() {
        if (!this.filter) {
            this.$store.dispatch(`schemas/items/createFilter`, {
                id: this.schemaId
            });
        }       
    },

    methods: {
        onFilterChange() {
            this.$store.dispatch('schemas/items/fetchItems', {
                ...this.filter,
                schema_id: this.schemaId                
            });
        }
    }   
};
</script>
