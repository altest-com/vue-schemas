<template>

<div class="schemas-list">

    <div v-if="schemas.length" class="mt-5">
        <div class="row-names">
            <div class="name"> Nombre </div>
            <div class="items-count"> Objetos </div>
            <div class="updated-at"> Actualizado </div>
            <div class="category"> Categoría </div>
        </div>
        <schema-list-row
            v-for="schema in schemas"
            :key="schema.id"
            :schema-id="schema.id"
            class="mb-2"
            :focus="schema.id === focusId"
            @click="onSchemaClick(schema.id)"             
        ></schema-list-row>
    </div>

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
        :total="schemasCount"
        @current-change="updatePage"
    ></el-pagination>       
</div>

</template>

<script>

import { mapGetters } from 'vuex';
import Empty from './Empty';
import SchemaListRow from './SchemaListRow';

export default {
    name: 'SchemasList',

    components: {
        SchemaListRow,
        Empty
    },

    props: {
        focusId: {
            type: [Number, String],
            default: null
        }
    },

    data() {
        return {
        };
    },

    computed: {
        ...mapGetters({
            schemas: 'schemas/itemSchemas/sortedItems'
        }),
        schemasCount() {
            return this.$store.state.schemas.itemSchemas.count;
        },
        pageNumber: function() {
            return this.$store.state.schemas.itemSchemas.pageNumber + 1;
        },
        pageSize() {
            return this.$store.state.schemas.itemSchemas.pageSize;
        }
    },

    methods: {         
        updatePage: function(number) {
            this.$store.dispatch('schemas/itemSchemas/setPage', number - 1);
            this.updateList();
        },
        updateList: function() {
            this.$store.dispatch('schemas/itemSchemas/fetchItems');
        },
        onSchemaClick(schemaId) {
            const focusId = schemaId === this.focusId ? null : schemaId;
            this.$emit('update:focus-id', focusId);
        }
    }
};
</script>

<style lang="scss">

.schemas-list {

    .row-names {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        font-weight: 700;
        margin-bottom: 12px;

        .name {
            margin-left: 90px;
            width: 200px;
            margin-right: 18px;
        }

        .items-count {
            width: 100px;
            margin-right: 18px;
        }

        .updated-at {
            width: 148px;
            margin-right: 18px;
        }

        .category {
            width: 112px;
            margin-right: 18px;
        }
    }
}

</style>
