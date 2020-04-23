<template>

<div v-if="schema" class="items-list">
    <el-card v-if="items.length" shadow="never" class="mt-5">
        <table class="items-table">
            <tr class="header-row">                
                <th v-for="header in tableHeader" :key="header.key">
                    <div class="cell"> {{ header.label }} </div>
                </th>
            </tr>
            <tr 
                v-for="item in tableData" 
                :key="item.id" 
                class="data-row"
                :class="{'focus': item.id === focusId}"
                @click="onRowClick(item.id)"
            > 
                <template v-for="value in item.values">
                    <template v-if="value">
                        <boolean-value-cell 
                            v-if="value.type === 'boolean'"
                            :key="value.key"
                            :value-id="value.id"
                        ></boolean-value-cell>
                        <choices-value-cell 
                            v-else-if="value.type === 'choices'"
                            :key="value.key"
                            :value-id="value.id"
                        ></choices-value-cell>
                        <date-value-cell 
                            v-else-if="value.type === 'datetime'"
                            :key="value.key"
                            :value-id="value.id"
                        ></date-value-cell>
                        <file-value-cell 
                            v-else-if="value.type === 'file'"
                            :key="value.key"
                            :value-id="value.id"
                        ></file-value-cell>
                        <images-value-cell
                            v-else-if="value.type === 'image'"
                            :key="value.key"
                            :value-id="value.id"
                        ></images-value-cell>
                        <item-value-cell
                            v-else-if="value.type === 'item'"
                            :key="value.key"
                            :value-id="value.id"
                        ></item-value-cell>
                        <number-value-cell 
                            v-else-if="value.type === 'number'"
                            :key="value.key"
                            :value-id="value.id"
                        ></number-value-cell>
                        <text-value-cell 
                            v-else-if="value.type === 'text'"
                            :key="value.key"
                            :long="true"
                            :value-id="value.id"
                        ></text-value-cell> 
                    </template>
                    <td v-else :key="value"></td>               
                </template>
            </tr>
        </table>
    </el-card>

    <empty
        v-else
        title="Sin elementos"
        message="No existen resultados para mostrar"
        icon-size="3em"
        height="383px"
        icon="el-icon-user"
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
import Empty from './Empty';
import params from '../params';

import BooleanValueCell from './BooleanValueCell';
import ChoicesValueCell from './ChoicesValueCell';
import DateValueCell from './DateValueCell';
import FileValueCell from './FileValueCell';
import ImagesValueCell from './ImagesValueCell';
import ItemValueCell from './ItemValueCell';
import NumberValueCell from './NumberValueCell';
import TextValueCell from './TextValueCell';

const nColumnsShow = 4;

export default {
    name: 'ItemsList',

    components: {
        Empty,
        BooleanValueCell,
        ChoicesValueCell,
        DateValueCell,
        FileValueCell,
        ImagesValueCell,
        ItemValueCell,
        NumberValueCell,
        TextValueCell
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
        columns: {
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
        schema() {
            this.$store.dispatch('schemas/itemSchemas/getItem', this.schemaId);
            return this.$store.state.schemas.itemSchemas.items[this.schemaId];
        },
        tableHeader() {
            const headers = [];
            Object.keys(params).forEach(key => {
                const store = params[key].fieldStore;
                this.schema[store].forEach(fieldId => {
                    this.$store.dispatch(`schemas/${store}/getItem`, fieldId);
                    const field = this.$store.state.schemas[store].items[fieldId];
                    if (field) {
                        const key = `${field.type}-${field.id}`;
                        if (this.columns.length === 0 || 
                            this.columns.includes(key)
                        ) {
                            headers.push({
                                order: field.order,
                                label: field.name,
                                type: field.type,
                                key: `${field.type}-${field.id}`
                            });
                        }
                    }
                });
            });

            const headers_ = Array.from(headers).sort(
                (fa, fb) => (fa.order > fb.order) ? 1 : -1
            );

            return this.columns.length === 0 ? 
                headers_.slice(0, nColumnsShow) : headers_;
        },
        tableData() {
            const data = [];
            this.items.forEach(item => {
                data.push({
                    id: item.id, 
                    values: this.getItemData(item)
                });
            });
            return data;
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
        },
        getItemData(item) {
            const data = {};
            data.id = item.id;
            Object.keys(params).forEach(key => {
                const store = params[key].valueStore;
                item[store].forEach(valueId => {
                    this.$store.dispatch(`schemas/${store}/getItem`, valueId);
                    const value = this.$store.state.schemas[store].items[valueId];
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
            return this.tableHeader.map(({key}) => data[key]);
        }
    }
};
</script>

<style lang="scss">

.items-list {
    .items-table {
        border-collapse: collapse;
        width: 100%;
        th, td {
            text-align: left;
            border-bottom: 1px solid #ebeef5;
            padding: 12px 0;
            min-width: 0;
            box-sizing: border-box;
            text-overflow: ellipsis;
            vertical-align: middle;
            position: relative;
            text-align: left;
        }
        td {
            transition: background-color .25s ease;
        }
        tr.data-row:hover {
            background-color:#f5f7fa;
            cursor: pointer;
        }
        tr.data-row.focus {
            background-color:#ecf5ff;
        }
        .cell {
            box-sizing: border-box;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-break: break-all;
            line-height: 23px;
            padding-left: 10px;
            padding-right: 10px;
        }
    }
}

</style>
