<template>

<ab-split-view v-if="schema" class="items-index">
    <template v-slot:main>
        <ab-list-header 
            class="mb-4"
            :show-count="items.length"
            :total-count="itemsCount"
            add-text="Nuevo Objeto"
            @create="onCreateItem"
        />

        <div 
            v-if="booting" 
            v-loading="booting"
            :style="{'height': '400px'}"
        ></div>

        <items-list-wrapper
            v-else
            :schema-id="schemaId"
            :focus-id="curItemId"
            :headers="showHeaders"
            @update:focus-id="onItemListChange"
        ></items-list-wrapper>

        <ab-delete-dialog
            message="Por favor confirme que eliminar esta objeto de forma 
                permanente. Se eliminará cualquier dato asociado."
            :visible.sync="showDeleteDialog"
            :disabled="loading"
            @confirm="onConfirmDelete"
        />

        <el-dialog
            v-if="!booting"
            title="Seleccionar columnas"
            :visible.sync="showHeadersDialog"
            width="400px"
            center
        >
            <el-checkbox-group v-model="showKeys" class="visible-cols">
                <el-checkbox 
                    v-for="header in headers" 
                    :key="header.key"
                    :label="header.key"
                >
                    {{ header.label }}
                </el-checkbox>
            </el-checkbox-group>
            <div slot="footer" class="flex-row je dialog-footer">
                <el-button 
                    type="primary" 
                    icon="el-icon-check"
                    :disabled="loading"
                    size="small"
                    @click="showHeadersDialog = false"
                >
                    Aceptar
                </el-button>
            </div>
        </el-dialog>
    </template>

    <template v-slot:side-actions>
        <template v-if="panel === 'search'">
            <div class="text-lg text-w6">Búsqueda</div>
            <div class="flex-row">
                <ab-tool-button
                    class="ml-1"
                    tooltip="Seleccionar columnas" 
                    icon="el-icon-tickets"
                    @click="showHeadersDialog = true"
                />
                <ab-tool-button
                    class="ml-1"
                    tooltip="Restablecer filtro" 
                    icon="el-icon-refresh"
                    @click="onClearFilterClick"
                />
            </div>            
        </template>

        <template v-else-if="panel === 'details'">
            <div class="flex-row ac">
                <el-button 
                    type="text" 
                    icon="el-icon-back" 
                    class="mr-2 back"
                    @click="onCloseItemDetails"
                />
                <div class="text-lg text-w6">Detalles</div>
            </div>            
            <div class="flex-row">
                <ab-tool-button
                    class="ml-1"
                    tooltip="Editar objeto" 
                    icon="el-icon-edit"
                    @click="onOpenItemEditor"
                />
                <ab-tool-button
                    class="ml-1"
                    tooltip="Eliminar objeto" 
                    icon="el-icon-delete"
                    @click="showDeleteDialog = true"
                />
            </div>                    
        </template>

        <template v-else-if="panel === 'editor'">
            <div class="flex-row ac">
                <el-button 
                    type="text" 
                    icon="el-icon-back" 
                    class="mr-2 back"
                    @click="onCloseItemEditor"
                />
                <div class="text-lg text-w6">Editar Objeto</div>
            </div> 
            
            <div v-if="!autoSave" class="flex-row">
                <ab-tool-button
                    tooltip="Guardar cambios" 
                    icon="el-icon-check"
                    @click="onConfirmItemEdit"
                />
            </div>                    
        </template>
    </template>

    <template v-slot:side-content>
        <items-filter 
            v-if="panel === 'search' && !booting"
            :schema-id="schemaId"
        ></items-filter>

        <!-- <item-details
            v-else-if="panel === 'details'"
            :item-id="curItemId"
        ></item-details> -->

        <item-editor
            v-if="panel === 'editor'"
            :item-id="curItemId"
        ></item-editor>
    </template>
</ab-split-view>

</template>

<script>
import { mapGetters } from 'vuex';

import { itemModel } from '../../store/items/models';
import AbSplitView from '../blocks/AbSplitView';
import AbToolButton from '../blocks/AbToolButton';
import AbListHeader from '../blocks/AbListHeader';
import AbDeleteDialog from '../blocks/AbDeleteDialog';
import ItemsListWrapper from './ItemsListWrapper';
/* ItemDetails from './ItemDetails'; */
import ItemsFilter from './ItemsFilter';
import ItemEditor from './ItemEditor';
import params from '../../params';
import { loadSchema } from '../loader';

const nColumnsShow = 4;

export default {
    name: 'ItemsIndex',

    components: {
        AbSplitView,
        AbToolButton,
        AbListHeader,
        AbDeleteDialog,
        ItemsListWrapper,
        ItemsFilter,
        /* ItemDetails, */
        ItemEditor
    },

    props: {
        schemaId: {
            type: [Number, String],
            required: true
        }
    },

    data() {
        return {
            panel: 'search',
            curItemId: null,
            showDeleteDialog: false,
            showHeadersDialog: false,
            showKeys: [],
            loading: false,
            booting: false,
            autoSave: true
        };
    },

    computed: {
        ...mapGetters({
            items: 'schemas/items/sortedItems'
        }),
        itemsCount() {
            return this.$store.state.schemas.items.count;
        },
        curItem() {
            if (this.curItemId !== null) {
                return this.$store.state.schemas.items.items[this.curItemId];
            }
            return null;
        },
        schema() {
            return this.$store.state.schemas.itemSchemas.items[this.schemaId];
        },
        showHeaders() {
            return this.showKeys.length ? 
                this.headers.filter(({ key }) => this.showKeys.includes(key)) : 
                this.headers.slice(0, nColumnsShow);
        },
        headers() {
            const headers = [];
            const state = this.$store.state.schemas;
            Object.keys(params).forEach(key => {
                const store = params[key].fieldStore;
                const storeFields = state[store].items;
                this.schema[store].forEach(fieldId => {
                    const field = storeFields[fieldId];
                    if (field) {
                        headers.push({
                            label: field.name,
                            key: `${field.type}-${field.id}`,
                            order: field.order
                        });
                    }
                });
            });

            return Array.from(headers).sort(
                (fa, fb) => (fa.order < fb.order) ? 1 : -1
            );
        }
    },

    created() {        
        this.booting = true;
        loadSchema(this.$store, this.schemaId).then(() => {
            this.fetchItems().then(() => {
                this.booting = false;
            });            
        });
    },

    methods: {

        fetchItems() {
            return this.$store.dispatch('schemas/items/fetchItems', {
                'schema_id': this.schemaId
            });
        },

        onItemListChange(itemId) {            
            this.panel = itemId === null ? 'search' : 'details';
            this.curItemId = itemId;
        },

        onClearFilterClick() {
            this.$store.dispatch('schemas/items/resetFilter');
            this.$store.dispatch('schemas/items/fetchItems');
        },

        onOpenItemEditor() {
            if (this.curItemId !== null) {
                this.panel = 'editor';
            }            
        },

        onCreateItem() {
            const item = itemModel.create();
            item.schema = this.schemaId;
            this.$store.dispatch('schemas/items/createItem', {
                item: item,
                persist: true
            }).then(({ id }) => {
                this.fetchItems().then(() => {
                    this.curItemId = id;
                    this.panel = 'editor';
                });
            });          
        },

        onConfirmItemEdit() {
            this.panel = 'details';
            const state = this.$store.state.schemas;
            Object.keys(params).forEach(key => {
                const store = params[key].valueStore;
                this.curItem[store].forEach(valueId => {
                    const value = state[store].items[valueId];
                    if (value) {
                        this.$store.dispatch(`schemas/${store}/updateItem`, {
                            persist: true,
                            item: {id: value, ...value}
                        });
                    }
                });
            });          
        },

        onCloseItemEditor() {
            this.panel = 'details';
        },

        onCloseItemDetails() {
            this.panel = 'search';
            this.curItemId = null;
        },

        onConfirmDelete() {
            if (this.curItemId !== null && this.panel === 'details') {
                this.loading = true;
                this.$store.dispatch(
                    'schemas/items/destroyItem', this.curItemId
                ).then(() => {
                    this.loading = false;
                    this.panel = 'search';
                    this.curItemId = null;                    
                    this.showDeleteDialog = false;
                    this.fetchItems();
                });
            }
        }
    }
};
</script>

<style lang="scss">

.items-index {
    .visible-cols {
        .el-checkbox {
            width: 30%;
            margin-right: 2%;
        }
    }
}

</style>
