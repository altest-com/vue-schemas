<template>

<split-view class="schemas-index">
    <template v-slot:main>
        <list-header 
            class="mb-4"
            :show-count="schemas.length"
            :total-count="schemasCount"
            add-text="Nuevo Esquema"
            @create="onCreateSchema"
        ></list-header>

        <schemas-list
            :focus-id="curSchemaId"
            @update:focus-id="onSchemaListChange"
        ></schemas-list>

        <el-dialog
            title="Advertencia"
            :visible.sync="showDeleteDialog"
            width="400px"
            center
        >
            <p>
                ¿Seguro deseas eliminar este esquema de forma permanente? 
                Se eliminarán todos los objetos asociados.
            </p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showDeleteDialog = false">
                    Cancelar
                </el-button>
                <el-button 
                    type="primary" 
                    :disabled="loading"
                    @click="onConfirmDelete"
                >
                    Confirmar
                </el-button>
            </span>
        </el-dialog>
    </template>

    <template v-slot:side-actions>
        <template v-if="panel === 'search'">
            <div class="text-lg text-w6">Búsqueda</div>
            <div class="flex-row">
                <tool-button
                    class="mr-1"
                    tooltip="Restablecer filtro" 
                    icon="el-icon-refresh"
                    @click="onClearFilter"
                ></tool-button>
                <tool-button
                    tooltip="Exportar esquemas" 
                    :icon="exporting ? 'el-icon-loading' : 'el-icon-download'"
                    @click="onExport"
                ></tool-button>
            </div>
        </template>

        <template v-else-if="panel === 'details'">
            <div class="text-lg text-w6">Detalles</div>
            <div class="flex-row">
                <tool-button
                    class="ml-1"
                    tooltip="Editar esquema" 
                    icon="el-icon-edit"
                    :disabled="!canEdit"
                    @click="onSchemaEdit"
                ></tool-button>
                <tool-button
                    class="ml-1"
                    tooltip="Eliminar esquema" 
                    icon="el-icon-delete"
                    :disabled="!canEdit"
                    @click="showDeleteDialog = true"
                ></tool-button>
            </div>                    
        </template>
    </template>

    <template v-slot:side-content>
<!--         <schemas-filter 
            v-if="panel === 'search'"
        ></schemas-filter>

        <schema-details
            v-else-if="panel === 'details'"
            :schema-id="curSchemaId"
        ></schema-details> -->
    </template>
</split-view>

</template>

<script>
import { mapGetters } from 'vuex';
import ToolButton from './ToolButton';
import { itemSchemaModel } from '../store/item-schemas/models';
import ListHeader from './ListHeader';
import SplitView from './SplitView';
import SchemasList from './SchemasList';
/* import SchemasFilter from './components/SchemasFilter';
import SchemaDetails from './components/SchemaDetails'; */

const newSchemaId = 'newId';

export default {
    name: 'SchemasIndex',

    components: {
        SplitView,
        ListHeader,
        SchemasList,
        ToolButton/* ,
        SchemasFilter,        
        SchemaDetails  */       
    },

    data() {
        return {
            newSchemaId: newSchemaId,
            panel: 'search',
            curSchemaId: null,
            showDeleteDialog: false,
            loading: false,
            exporting: false
        };
    },

    computed: {
        ...mapGetters({
            schemas: 'schemas/itemSchemas/sortedItems'
        }),
        schemasCount() {
            return this.$store.state.schemas.itemSchemas.count;
        },
        curSchema() {
            if (this.curSchemaId !== null) {
                this.$store.dispatch('schemas/itemSchemas/getItem', this.curSchemaId);
                return this.$store.state.schemas.itemSchemas.items[this.curSchemaId];
            }
            return null;
        },
        canEdit() {
            if (this.curSchema) {
                return true;
            }
            return false;
        }
    },

    created() {
        this.$store.dispatch('schemas/itemSchemas/fetchItems');
    },

    methods: {

        onSchemaEdit() {
            if (this.curSchemaId !== null) {
                this.$router.push({
                    name: 'SchemaEditor', 
                    params: { schemaId: this.curSchemaId }
                });
            }            
        },

        onCreateSchema() {
            const itemSchemaData = itemSchemaModel.create();
            this.$store.dispatch('schemas/itemSchemas/createItem', {
                persist: true,
                item: itemSchemaData
            }).then((itemSchema) => {
                this.$router.push({
                    name: 'SchemaEditor', 
                    params: { schemaId: itemSchema.id }
                });
            });        
        },

        onSchemaListChange(schemaId) {            
            this.panel = schemaId === null ? 'search' : 'details';
            this.curSchemaId = schemaId;
        },

        onClearFilter() {
            this.$store.dispatch('schemas/itemSchemas/resetFilter');
            this.$store.dispatch('schemas/itemSchemas/fetchItems');
        },

        onConfirmDelete() {
            if (this.curSchemaId !== null && this.panel === 'details') {
                this.loading = true;
                this.$store.dispatch(
                    'schemas/itemSchemas/destroyItem', this.curSchemaId
                ).then(() => {
                    this.loading = false;
                    this.curSchemaId = null;
                    this.panel = 'search';
                    this.showDeleteDialog = false;
                    this.$store.dispatch('schemas/itemSchemas/fetchItems');
                });
            }
        },

        onExport() {
            this.exporting = true;
            this.$store.dispatch(
                'schemas/exports/export'
            ).finally(() => {
                this.exporting = false;
            }).catch(error => {
                console.log(error);
            });
        }
    }
};
</script>

<style lang="scss">
</style>
