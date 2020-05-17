<template>

<div class="items-list">
    <el-card v-if="items.length" shadow="never" class="mt-5">
        <ab-flex-table>
            <tr>                
                <th v-for="header in headers" :key="header.key">
                    {{ header.label }}
                </th>
            </tr>
            <items-table-row 
                v-for="item in listItems" 
                :key="item.id"
                :item-id="item.id"
                :headers="headers"
                :focus="item.id === focusId"
                @click="onRowClick(item.id)"
            />
        </ab-flex-table>
    </el-card>

    <empty
        v-else
        title="Sin elementos"
        message="No existen resultados para mostrar"
        icon-size="3em"
        height="383px"
        icon="el-icon-warning-outline"
        background="#eee"
    ></empty> 

    <el-pagination 
        hide-on-single-page
        layout="prev, pager, next"
        class="mt-4"
        :page-size="pageSize" 
        :background="true"
        :current-page="pageNumber"
        :total="itemsCount"
        @current-change="updatePage"
    ></el-pagination>       
</div>

</template>

<script>

import { mapGetters } from 'vuex';
import Empty from '../blocks/Empty';
import AbFlexTable from '../blocks/AbFlexTable';
import ItemsTableRow from './ItemsTableRow';

export default {
    name: 'ItemsListWrapper',

    components: {
        Empty,
        ItemsTableRow,
        AbFlexTable
    },

    props: {
        focusId: {
            type: [Number, String],
            default: null
        },
        schemaId: {
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
        };
    },

    computed: {
        ...mapGetters({
            items: 'schemas/items/sortedItems'
        }),
        itemsCount() {
            return this.$store.state.schemas.items.count;
        },
        pageNumber: function() {
            return this.$store.state.schemas.items.pageNumber + 1;
        },
        pageSize() {
            return this.$store.state.schemas.items.pageSize;
        },
        listItems() {
            // eslint-disable-next-line eqeqeq
            return this.items.filter(item => item.schema == this.schemaId);
        }
    },

    methods: {         
        updatePage: function(number) {
            this.$store.dispatch('schemas/items/setPage', number - 1);
            this.updateList();
        },
        updateList: function() {
            this.$store.dispatch('schemas/items/fetchItems', {
                schema_id: this.schemaId
            });
        },
        onRowClick(itemId) {
            const focusId = itemId === this.focusId ? null : itemId;
            this.$emit('update:focus-id', focusId);
        }
    }
};
</script>

